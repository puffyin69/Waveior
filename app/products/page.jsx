"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Nav from "@/components/nav";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🎯 FILTER STATE
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    sortBy: "name",
  });

  // 🎯 SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products", { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🎯 FILTER LOGIC
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "under-500":
          filtered = filtered.filter((product) => product.price < 500);
          break;
        case "500-1000":
          filtered = filtered.filter(
            (product) => product.price >= 500 && product.price <= 1000
          );
          break;
        case "1000-2000":
          filtered = filtered.filter(
            (product) => product.price >= 1000 && product.price <= 2000
          );
          break;
        case "over-2000":
          filtered = filtered.filter((product) => product.price > 2000);
          break;
      }
    }

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  // 🎯 FILTER HANDLERS
  const handleCategoryChange = (category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handlePriceChange = (priceRange) => {
    setFilters((prev) => ({ ...prev, priceRange }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      sortBy: "name",
    });
    setSearchTerm("");
  };

  const getCategories = () => {
    const categories = [...new Set(products.map((product) => product.category))];
    return categories;
  };

  const filteredProducts = getFilteredProducts();

  // 🎨 ENHANCED LOADING STATE
  if (loading) {
    return (
      <>
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Nav />
        </div>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-slate-400 rounded-full animate-spin mx-auto"
                style={{ animationDelay: "0.1s" }}
              ></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-700">
                Curating Amazing Products
              </h3>
              <p className="text-slate-500 text-sm">
                Please wait while we load the best items for you
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 🎨 ENHANCED ERROR STATE
  if (error) {
    return (
      <>
        <div className="sticky top-0 z-50 backdrop-blur-md">
          <Nav />
        </div>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6 space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Something went wrong
              </h2>
              <p className="text-slate-600 leading-relaxed">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-md">
        <Nav />
      </div>

      {/* 🎨 ENHANCED HERO SECTION */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
              Discover Amazing Products
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Carefully curated collection of {products.length} premium items just
              for you
            </p>
          </div>
        </div>
      </div>

      {/* 🎨 ENHANCED FILTER BAR */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* 🔍 Enhanced Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white/70 backdrop-blur-sm placeholder-slate-400 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 text-slate-400 hover:text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* 🎨 Enhanced Filter Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white/70 backdrop-blur-sm text-slate-700 font-medium cursor-pointer transition-all duration-200 hover:border-slate-400"
                >
                  <option value="all">All Categories</option>
                  {getCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={filters.priceRange}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white/70 backdrop-blur-sm text-slate-700 font-medium cursor-pointer transition-all duration-200 hover:border-slate-400"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500">Under ₹500</option>
                  <option value="500-1000">₹500 - ₹1,000</option>
                  <option value="1000-2000">₹1,000 - ₹2,000</option>
                  <option value="over-2000">Over ₹2,000</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white/70 backdrop-blur-sm text-slate-700 font-medium cursor-pointer transition-all duration-200 hover:border-slate-400"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-300"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* 🎨 Enhanced Active Filters */}
          {(filters.category !== "all" ||
            filters.priceRange !== "all" ||
            searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-200">
              {filters.category !== "all" && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {filters.category}
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {filters.priceRange !== "all" && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {filters.priceRange}
                  <button
                    onClick={() => handlePriceChange("all")}
                    className="ml-2 text-green-500 hover:text-green-700 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}

          {/* 🎨 Enhanced Results Count */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {products.length}
              </span>{" "}
              products
            </span>
            {filteredProducts.length !== products.length && (
              <span className="text-slate-500">Filtered results</span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid - UNCHANGED as requested */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product._id} className="group">
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
                  {/* Product Image */}
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={product.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={product.name}
                    />
                  </CardItem>

                  {/* Product Info */}
                  <div className="flex justify-between items-center mt-4">
                    <CardItem
                      translateZ={20}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {product.category}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>

                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {product.name}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {product.description}
                  </CardItem>

                  <CardItem
                    translateZ="60"
                    className="text-lg font-semibold text-green-600 mt-4"
                  >
                    ₹{product.price?.toLocaleString()}
                  </CardItem>

                  <div className="flex justify-center items-center mt-10">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={`/products/${product.slug}`}
                      className="px-6 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-gray-800"
                    >
                      View Details →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>

        {/* 🎨 Enhanced No Results */}
        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-800">
                No products found
              </h3>
              <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                We couldn't find any products matching your criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
                </svg>
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
