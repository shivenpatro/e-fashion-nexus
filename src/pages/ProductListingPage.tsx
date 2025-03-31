
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { ChevronDown, Filter, X, SlidersHorizontal, Search } from 'lucide-react';
import { useProducts, type Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
];

const ProductListingPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { data: allProducts, isLoading, error, refetch } = useProducts(category);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Color options for filter
  const colorOptions = [
    { value: '#000000', label: 'Black' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#C4C4C4', label: 'Gray' },
    { value: '#A52A2A', label: 'Brown' },
    { value: '#3B5998', label: 'Blue' },
    { value: '#FF0000', label: 'Red' },
    { value: '#008000', label: 'Green' },
    { value: '#FFFF00', label: 'Yellow' }
  ];
  
  // Generate placeholder products when real data doesn't have enough
  const generatePlaceholderProducts = (count: number, existingProducts: Product[]) => {
    const placeholders: Product[] = [];
    const categories = ['women', 'men', 'accessories', 'shoes'];
    const names = [
      'Classic T-Shirt', 'Slim Fit Jeans', 'Cotton Sweater', 'Leather Jacket',
      'Casual Dress', 'Formal Shirt', 'Summer Shorts', 'Winter Coat',
      'Designer Bag', 'Running Shoes', 'Wool Scarf', 'Denim Jacket',
      'Floral Skirt', 'Casual Hoodie', 'Business Suit', 'Vintage Watch',
      'Summer Hat', 'Silk Tie', 'Leather Belt', 'Designer Sunglasses'
    ];
    
    for (let i = 0; i < count; i++) {
      const id = `generated-${existingProducts.length + i}`;
      const nameIndex = i % names.length;
      const name = names[nameIndex];
      const categoryIndex = i % categories.length;
      const price = 20 + Math.floor(Math.random() * 180);
      
      placeholders.push({
        id,
        name: `${name} ${i + 1}`,
        description: `A great quality ${name.toLowerCase()} for any occasion.`,
        price,
        category: categories[categoryIndex],
        subcategory: null,
        image_urls: ['https://placehold.co/800x1000/f8f9fa/343a40?text=Product+Image'],
        is_featured: i < 5,
        is_new: i < 8,
        discount_percent: i % 5 === 0 ? 15 : 0,
        variants: Array(3).fill(null).map((_, vIndex) => ({
          id: `var-${id}-${vIndex}`,
          product_id: id,
          size: ['S', 'M', 'L', 'XL'][vIndex % 4],
          color: colorOptions[vIndex % colorOptions.length].value,
          stock_quantity: 10 + Math.floor(Math.random() * 90),
          sku: `SKU-${id}-${vIndex}`
        }))
      });
    }
    
    return placeholders;
  };
  
  // Filter and sort products
  useEffect(() => {
    if (!allProducts) return;
    
    let workingProducts = [...allProducts];
    
    // If we have fewer than 20 products, add placeholders
    if (workingProducts.length < 20) {
      const placeholders = generatePlaceholderProducts(20 - workingProducts.length, workingProducts);
      workingProducts = [...workingProducts, ...placeholders];
    }
    
    let filteredProducts = [...workingProducts];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p => p.name.toLowerCase().includes(query) || 
             (p.description && p.description.toLowerCase().includes(query))
      );
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Filter by selected colors
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        if (!product.variants || product.variants.length === 0) return false;
        
        return product.variants.some(variant => 
          variant.color && selectedColors.includes(variant.color)
        );
      });
    }
    
    // Sort products
    switch (selectedSort) {
      case 'newest':
        // For demo purposes, sort by ID as a proxy for "newest"
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (recommended)
        // Mix featured products first, then sort by name
        filteredProducts.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }
    
    setProducts(filteredProducts);
  }, [allProducts, selectedSort, priceRange, selectedColors, searchQuery]);
  
  // Handle color selection
  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedColors([]);
    setSelectedSort('recommended');
    setSearchQuery('');
  };
  
  // Title based on category
  const getPageTitle = () => {
    if (!category || category === 'all') return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-semibold mb-8">{getPageTitle()}</h1>
      
      {/* Mobile filter button */}
      <div className="md:hidden mb-6">
        <Button 
          variant="outline"
          className="inline-flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal size={18} className="mr-2" /> Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <motion.div 
          className="hidden md:block w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border border-gray-200 rounded-md p-5 shadow-sm bg-white sticky top-20">
            <h3 className="font-semibold mb-5 text-lg flex items-center">
              <Filter size={16} className="mr-2" /> Filters
            </h3>

            {/* Search */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm">Search</h4>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm">Price Range</h4>
              <div className="flex justify-between mb-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-fashion-accent"
              />
            </div>
            
            {/* Colors */}
            <div>
              <h4 className="font-medium mb-3 text-sm">Colors</h4>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <motion.button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color.value) ? 'ring-2 ring-fashion-accent' : 'ring-1 ring-gray-300'
                    } transition-all`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => toggleColorSelection(color.value)}
                    aria-label={`Filter by color ${color.label}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 200 || searchQuery) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="mt-6 w-full"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </motion.div>
        
        {/* Mobile Filters Sidebar */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div 
              className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="h-full w-80 max-w-full bg-white p-5 ml-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="text-fashion-gray-800 hover:text-fashion-gray-900"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm">Search</h4>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm">Price Range</h4>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-fashion-accent"
                  />
                </div>
                
                {/* Colors */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map(color => (
                      <div key={color.value} className="flex flex-col items-center">
                        <button
                          className={`w-8 h-8 rounded-full border mb-1 ${
                            selectedColors.includes(color.value) ? 'ring-2 ring-fashion-accent' : 'ring-1 ring-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => toggleColorSelection(color.value)}
                          aria-label={`Filter by color ${color.label}`}
                        />
                        <span className="text-xs">{color.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <Button 
                    className="flex-1"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Apply Filters
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      clearFilters();
                      setShowMobileFilters(false);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Products */}
        <div className="flex-grow">
          {/* Sort dropdown */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-fashion-gray-800 font-medium">
              {products.length} {products.length === 1 ? 'product' : 'products'}
              {selectedColors.length > 0 && ' • Filtered by color'}
              {(priceRange[0] > 0 || priceRange[1] < 200) && ' • Filtered by price'}
              {searchQuery && ` • Search for "${searchQuery}"`}
            </p>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 bg-white shadow-sm">
                <span className="text-sm">Sort by:</span>
                <select 
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-transparent pr-6 text-sm focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 pointer-events-none" />
              </div>
            </div>
          </motion.div>
          
          {/* Product grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, staggerChildren: 0.05 }}
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-fashion-gray-800 mb-4">Failed to load products. Please try again.</p>
                <Button 
                  onClick={() => refetch()}
                  variant="default"
                >
                  Retry
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-fashion-gray-800 mb-4">No products match your filter criteria.</p>
                <Button 
                  onClick={clearFilters}
                  variant="default"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_urls[0]}
                    colors={product.variants?.filter(v => v.color !== null).map(v => v.color as string) || []}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
