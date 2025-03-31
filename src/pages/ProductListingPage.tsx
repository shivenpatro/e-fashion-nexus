import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useProducts, type Product } from '@/hooks/useProducts';

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

const ProductListingPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { data: allProducts, isLoading, error } = useProducts(category);
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
    
    // Filter by selected colors - Note: in a real app, you'd need to fetch the variants
    // and check their colors, but here we'll simplify
    if (selectedColors.length > 0) {
      // This is simplified - in real app you'd need to check product variants
      filteredProducts = filteredProducts.filter(product => {
        // For demo purposes - in real implementation, check variants
        return selectedColors.some(color => 
          product.id.includes(color) // Just a placeholder logic
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
  
  // Title based on category
  const getPageTitle = () => {
    if (!category || category === 'all') return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (isLoading) {
    return <div className="container-custom py-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="container-custom py-8 text-center">Error loading products. Please try again.</div>;
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-semibold mb-8">{getPageTitle()}</h1>
      
      {/* Mobile filter button */}
      <div className="md:hidden mb-6">
        <button 
          className="btn-outline inline-flex items-center"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter size={18} className="mr-2" /> Filters
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex justify-between mb-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            
            {/* Colors */}
            <div>
              <h4 className="font-medium mb-2">Colors</h4>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    className={`w-6 h-6 rounded-full border ${
                      selectedColors.includes(color.value) ? 'ring-2 ring-fashion-accent' : 'ring-1 ring-gray-300'
                    }`}
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
            <div className="h-full w-80 max-w-full bg-white p-4 ml-auto animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-fashion-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex justify-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      className={`w-6 h-6 rounded-full border ${
                        selectedColors.includes(color.value) ? 'ring-2 ring-fashion-accent' : 'ring-1 ring-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => toggleColorSelection(color.value)}
                      aria-label={`Filter by color ${color.label}`}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                className="btn-primary w-full mt-4"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Products */}
        <div className="flex-grow">
          {/* Sort dropdown */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-fashion-gray-800">{products.length} products</p>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2">
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
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image_urls[0]}
                  colors={[]} // In a real app, you'd get these from product variants
                  category={product.category}
                  subcategory={product.subcategory || ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-fashion-gray-800">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
