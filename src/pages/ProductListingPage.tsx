
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ChevronDown, Filter, X } from 'lucide-react';

// Mock product data
const allProducts = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#FFFFFF', '#C4C4C4'],
    category: 'men',
    subcategory: 'tops'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#3B5998', '#1F2937'],
    category: 'men',
    subcategory: 'bottoms'
  },
  {
    id: '3',
    name: 'Classic Leather Jacket',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000'],
    category: 'men',
    subcategory: 'outerwear'
  },
  {
    id: '4',
    name: 'Structured Blazer',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#403F3F', '#6D7688'],
    category: 'women',
    subcategory: 'outerwear'
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#704214'],
    category: 'accessories',
    subcategory: 'eyewear'
  },
  {
    id: '6',
    name: 'Casual Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#E5E7EB', '#000000'],
    category: 'accessories',
    subcategory: 'footwear'
  },
  {
    id: '7',
    name: 'Wool Scarf',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1520903183477-2b9d394c8073?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C45850', '#A4C2F4', '#B4B4B4'],
    category: 'accessories',
    subcategory: 'scarves'
  },
  {
    id: '8',
    name: 'Leather Belt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000'],
    category: 'accessories',
    subcategory: 'belts'
  },
  {
    id: '9',
    name: 'Floral Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#FFD8D8', '#8FBDD3'],
    category: 'women',
    subcategory: 'dresses'
  },
  {
    id: '10',
    name: 'High-Waisted Pants',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#F5F5DC', '#696969'],
    category: 'women',
    subcategory: 'bottoms'
  },
  {
    id: '11',
    name: 'Silk Blouse',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#FFDAB9', '#000000'],
    category: 'women',
    subcategory: 'tops'
  },
  {
    id: '12',
    name: 'Leather Handbag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#A52A2A', '#000000', '#8B4513'],
    category: 'accessories',
    subcategory: 'bags'
  }
];

// Sort options
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

const ProductListingPage = () => {
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState(allProducts);
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
  
  // Filter products based on category
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Filter by selected colors
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Sort products
    switch (selectedSort) {
      case 'newest':
        // In a real app, we'd sort by date
        break;
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting (recommended) - could be based on ratings or other factors
        break;
    }
    
    setProducts(filteredProducts);
  }, [category, selectedSort, priceRange, selectedColors]);
  
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
                <ProductCard key={product.id} {...product} />
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
