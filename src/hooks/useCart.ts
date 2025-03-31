
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  product_variant_id: string;
  quantity: number;
  product?: {
    name: string;
    price: number;
    image_url: string;
  };
  variant?: {
    size: string | null;
    color: string | null;
  };
};

export const useCart = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Get user's cart
  const getCart = async () => {
    if (!isAuthenticated) return null;

    // Check if user has a cart
    const { data: carts } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user!.id)
      .limit(1);

    if (!carts || carts.length === 0) {
      // Create a new cart
      const { data: newCart, error } = await supabase
        .from('carts')
        .insert({ user_id: user!.id })
        .select()
        .single();

      if (error) throw error;
      return newCart;
    }

    return carts[0];
  };

  // Query for cart items
  const cartQuery = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      const cart = await getCart();
      if (!cart) return [];

      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product_variants(
            *,
            products(*)
          )
        `)
        .eq('cart_id', cart.id);

      if (error) throw error;

      return data.map(item => ({
        id: item.id,
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
        product: {
          name: item.product_variants.products.name,
          price: item.product_variants.products.price,
          image_url: item.product_variants.products.image_urls[0]
        },
        variant: {
          size: item.product_variants.size,
          color: item.product_variants.color
        }
      })) as CartItem[];
    },
    enabled: isAuthenticated
  });

  // Add item to cart
  const addToCartMutation = useMutation({
    mutationFn: async ({ productVariantId, quantity }: { productVariantId: string, quantity: number }) => {
      if (!isAuthenticated) {
        throw new Error("You must be logged in to add items to cart");
      }

      const cart = await getCart();
      
      // Check if item already exists in cart
      const { data: existingItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_variant_id', productVariantId);

      if (existingItems && existingItems.length > 0) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItems[0].quantity + quantity })
          .eq('id', existingItems[0].id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_variant_id: productVariantId,
            quantity
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Item added to cart');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add item to cart');
    }
  });

  // Update cart item quantity
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string, quantity: number }) => {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
    },
    onError: () => {
      toast.error('Failed to update cart');
    }
  });

  // Remove item from cart
  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user?.id] });
      toast.success('Item removed from cart');
    },
    onError: () => {
      toast.error('Failed to remove item from cart');
    }
  });

  return {
    cart: cartQuery.data || [],
    isLoading: cartQuery.isLoading,
    error: cartQuery.error,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate
  };
};
