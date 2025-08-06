"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Filter, Grid3X3, List, Star, X } from 'lucide-react'
import { Header } from "@/components/header"
import { sampleProducts } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

function CollectionsContent() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedFilters, setSelectedFilters] = useState({
    fabric: [] as string[],
    color: [] as string[],
    occasion: [] as string[],
    category: [] as string[]
  })
  const [sortBy, setSortBy] = useState('featured')

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filterOptions = {
    fabric: ["Cotton", "Silk", "Georgette", "Chiffon", "Chanderi", "Linen"],
    color: ["Red", "Blue", "Green", "Pink", "Golden", "Maroon", "Cream", "Black", "White"],
    occasion: ["Wedding", "Party", "Casual", "Office", "Festive"],
    category: ["Sarees", "Suits", "Dupattas", "Fabrics"]
  }

  // Get URL parameters
  const urlCategory = searchParams.get('category')
  const urlOccasion = searchParams.get('occasion')
  const urlSearch = searchParams.get('search')

  // Apply URL filters and user filters together
  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts]

    // Apply URL filters first
    if (urlCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === urlCategory.toLowerCase()
      )
    }

    if (urlOccasion) {
      filtered = filtered.filter(product => 
        product.occasion?.toLowerCase() === urlOccasion.toLowerCase()
      )
    }

    if (urlSearch) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
        product.fabric?.toLowerCase().includes(urlSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(urlSearch.toLowerCase())
      )
    }

    // Apply user-selected filters
    filtered = filtered.filter(product => {
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1]
      const fabricMatch = selectedFilters.fabric.length === 0 || selectedFilters.fabric.includes(product.fabric || '')
      const colorMatch = selectedFilters.color.length === 0 || selectedFilters.color.includes(product.color || '')
      const occasionMatch = selectedFilters.occasion.length === 0 || selectedFilters.occasion.includes(product.occasion || '')
      const categoryMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category)
      
      return priceInRange && fabricMatch && colorMatch && occasionMatch && categoryMatch
    })

    return filtered
  }, [urlCategory, urlOccasion, urlSearch, priceRange, selectedFilters])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      fabric: [],
      color: [],
      occasion: [],
      category: []
    })
    setPriceRange([0, 50000])
  }

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    alert(`${product.name} added to cart!`)
  }

  // Get page title based on URL parameters
  const getPageTitle = () => {
    if (urlCategory) {
      return `${urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)} Collection`
    }
    if (urlOccasion) {
      return `${urlOccasion.charAt(0).toUpperCase() + urlOccasion.slice(1)} Wear`
    }
    if (urlSearch) {
      return `Search Results for "${urlSearch}"`
    }
    return "All Collections"
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 font-light">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Collections</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-wider text-black mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-gray-600 font-light tracking-wide">
              Discover our curated selection of premium ethnic wear
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-gray-300 rounded-none font-light">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-gray-50 p-8 h-fit sticky top-24`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-light tracking-wide text-black">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-600 hover:text-black font-light"
              >
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black tracking-wide">Price Range</h4>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={50000}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600 font-light">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black tracking-wide">Category</h4>
              <div className="space-y-3">
                {filterOptions.category.map(category => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedFilters.category.includes(category)}
                      onCheckedChange={() => handleFilterChange('category', category)}
                    />
                    <Label 
                      htmlFor={`category-${category}`} 
                      className="text-sm font-light text-gray-700 cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black tracking-wide">Fabric</h4>
              <div className="space-y-3">
                {filterOptions.fabric.map(fabric => (
                  <div key={fabric} className="flex items-center space-x-3">
                    <Checkbox
                      id={`fabric-${fabric}`}
                      checked={selectedFilters.fabric.includes(fabric)}
                      onCheckedChange={() => handleFilterChange('fabric', fabric)}
                    />
                    <Label 
                      htmlFor={`fabric-${fabric}`} 
                      className="text-sm font-light text-gray-700 cursor-pointer"
                    >
                      {fabric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="mb-8">
              <h4 className="font-medium mb-4 text-black tracking-wide">Occasion</h4>
              <div className="space-y-3">
                {filterOptions.occasion.map(occasion => (
                  <div key={occasion} className="flex items-center space-x-3">
                    <Checkbox
                      id={`occasion-${occasion}`}
                      checked={selectedFilters.occasion.includes(occasion)}
                      onCheckedChange={() => handleFilterChange('occasion', occasion)}
                    />
                    <Label 
                      htmlFor={`occasion-${occasion}`} 
                      className="text-sm font-light text-gray-700 cursor-pointer"
                    >
                      {occasion}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full border-gray-300 rounded-none font-light"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600 font-light">
                Showing {sortedProducts.length} of {sampleProducts.length} products
              </p>
            </div>

            {/* Products */}
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map(product => (
                <div key={product.id} className={`group ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                  <div className={`relative overflow-hidden bg-white ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <div className={`aspect-[3/4] relative overflow-hidden ${viewMode === 'list' ? 'h-64' : ''}`}>
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      
                      {product.badge && (
                        <Badge className="absolute top-4 left-4 bg-black text-white font-light tracking-wide">
                          {product.badge}
                        </Badge>
                      )}
                      
                      <button 
                        onClick={() => handleWishlistToggle(product)}
                        className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'text-black fill-current' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1 py-4' : 'pt-6'}`}>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium tracking-wide text-black mb-2 hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 font-light">({product.reviews || 0})</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-light text-black">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through font-light">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4 font-light">
                      <span>{product.fabric} • {product.color} • {product.occasion}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black text-white hover:bg-gray-800 font-medium tracking-wide rounded-none"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-6 font-light text-lg">No products found matching your criteria.</p>
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  className="border-black text-black hover:bg-black hover:text-white font-light tracking-wide rounded-none px-8"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-300 rounded-none font-light">
                    Previous
                  </Button>
                  <Button size="sm" className="bg-black text-white rounded-none font-light">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 rounded-none font-light">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 rounded-none font-light">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 rounded-none font-light">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-12"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[3/4] bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CollectionsContent />
    </Suspense>
  )
}
