
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { ChevronDown, Filter, X, SlidersHorizontal } from 'lucide-react';
import { useProducts, type Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

const ProductListingPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { data: allProducts, isLoading, error, refetch } = useProducts(category);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Color options for filter
  const colorOptions = [
    { value: '#000000', label: 'Black' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#C4C4C4', label: 'Gray' },
    { value: '#A52A2A', label: 'Brown' },
    { value: '#3B5998', label: 'Blue' }
  ];
  
  // Filter and sort products
  useEffect(() => {
    if (!allProducts) return;
    
    let filteredProducts = [...allProducts];
    
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
        // In a real app, we'd sort by created_at
        break;
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (recommended)
        break;
    }
    
    setProducts(filteredProducts);
  }, [allProducts, selectedSort, priceRange, selectedColors]);
  
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
        <div className="hidden md:block w-64 shrink-0">
          <div className="border border-gray-200 rounded-md p-5 shadow-sm bg-white">
            <h3 className="font-semibold mb-5 text-lg">Filters</h3>
            
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
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color.value) ? 'ring-2 ring-fashion-accent' : 'ring-1 ring-gray-300'
                    } transition-all`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => toggleColorSelection(color.value)}
                    aria-label={`Filter by color ${color.label}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Sidebar */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="h-full w-80 max-w-full bg-white p-5 ml-auto animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-fashion-gray-800 hover:text-fashion-gray-900"
                >
                  <X size={20} />
                </button>
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
              
              <Button 
                className="w-full mt-4"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Products */}
        <div className="flex-grow">
          {/* Sort dropdown */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-fashion-gray-800">{products.length} products</p>
            
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
          </div>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
              products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_urls[0]}
                  colors={product.variants?.filter(v => v.color !== null).map(v => v.color as string) || []}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
