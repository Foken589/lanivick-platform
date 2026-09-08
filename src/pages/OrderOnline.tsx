import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { dataService } from '../services/dataService';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCategory } from '../types';

export const OrderOnline: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const products = dataService.getProducts();

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  const categories = [
    { id: 'all', label: 'All Delicacies', icon: '✨' },
    { id: 'cakes', label: 'Cakes', icon: '🎂' },
    { id: 'pastries', label: 'Pastries & Snacks', icon: '🥧' },
    { id: 'meals', label: 'Meals', icon: '🍲' },
    { id: 'treats', label: 'Treats', icon: '🍓' },
  ];

  return (
    <div className="bg-[#fffdfa] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-wine-900 block mb-1">
            Lanivick Confectionary Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ink-900">
            Order Something Delicious
          </h1>
          <p className="mt-3 text-sm text-ink-500">
            From signature celebration cakes to warm savory meat pies and hearty party jollof.
            Delivery to Lokoja and Abuja or free hub pickup.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-borderLine shadow-soft mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vanilla cakes, meat pie, parfait, party jollof..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-borderLine text-sm focus:border-wine-900 focus:outline-none bg-cream-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ink-500 hover:text-ink-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & In-stock toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3.5 py-3 rounded-2xl border border-borderLine text-xs font-bold text-ink-800 bg-cream-50/50 focus:border-wine-900 focus:outline-none"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-ink-800 cursor-pointer whitespace-nowrap px-3 py-3 rounded-2xl border border-borderLine bg-cream-50/50 hover:bg-cream-100">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-wine-900 rounded"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-borderLine/70 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-wine-900 text-white shadow-sm'
                    : 'bg-cream-50 text-ink-800 hover:bg-cream-100 border border-borderLine/70'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-borderLine p-8">
            <div className="w-16 h-16 rounded-full bg-cream-100 text-wine-900 flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-ink-900 mb-1">No items found</h3>
            <p className="text-xs text-ink-500 max-w-sm mx-auto mb-6">
              We couldn't find any delicious items matching your filters. Try clearing your search
              term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyInStock(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-wine-900 text-white text-xs font-bold shadow-md hover:bg-wine-800 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
