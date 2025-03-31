
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  tracking_number: string | null;
  items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_size: string | null;
  product_color: string | null;
  quantity: number;
  price: number;
};

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export const useOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Get user's orders
  const ordersQuery = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!isAuthenticated) return [];

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: isAuthenticated
  });

  // Get single order with items
  const useOrderDetails = (orderId: string) => {
    return useQuery({
      queryKey: ['order', orderId],
      queryFn: async () => {
        if (!isAuthenticated || !orderId) return null;

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user!.id)
          .single();

        if (orderError) throw orderError;

        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', orderId);

        if (itemsError) throw itemsError;

        return {
          ...order,
          items
        } as Order;
      },
      enabled: isAuthenticated && !!orderId
    });
  };

  // Create a new order
  const createOrderMutation = useMutation({
    mutationFn: async ({
      cartItems,
      shippingInfo,
      totalAmount
    }: {
      cartItems: any[];
      shippingInfo: ShippingInfo;
      totalAmount: number;
    }) => {
      if (!isAuthenticated) {
        throw new Error("You must be logged in to place an order");
      }

      // Begin transaction
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user!.id,
          total_amount: totalAmount,
          shipping_address: shippingInfo.address,
          shipping_city: shippingInfo.city,
          shipping_state: shippingInfo.state,
          shipping_zip: shippingInfo.zip,
          shipping_country: shippingInfo.country,
          status: 'confirmed'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_variant_id: item.product_variant_id,
        product_name: item.product.name,
        product_size: item.variant.size,
        product_color: item.variant.color,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart
      const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user!.id)
        .limit(1)
        .single();

      if (cart) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('cart_id', cart.id);
      }

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['orders', user?.id] });
      toast.success('Order placed successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to place order');
    }
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutate,
    useOrderDetails
  };
};
