
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  subcategory: string | null;
  image_urls: string[];
  is_featured: boolean;
  is_new: boolean;
  discount_percent: number;
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  stock_quantity: number;
  sku: string | null;
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product[];
    }
  });
};

export const useProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      // Fetch product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (productError) {
        throw new Error(productError.message);
      }
      
      // Fetch product variants
      const { data: variants, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId);
      
      if (variantsError) {
        throw new Error(variantsError.message);
      }
      
      const result = {
        ...product,
        variants
      } as Product;
      
      return result;
    },
    enabled: !!productId
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product[];
    }
  });
};

export const useNewProducts = () => {
  return useQuery({
    queryKey: ['newProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_new', true)
        .limit(8);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Product[];
    }
  });
};
