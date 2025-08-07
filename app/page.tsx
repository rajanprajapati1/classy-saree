"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Header } from "@/components/header"
import { sampleProducts } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categorySlide, setCategorySlide] = useState(0)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const heroSlides = [
    {
      image: "https://ravya.co.in/cdn/shop/files/H12.jpg?v=1741271366&width=3600",
      title: "New Festive '25",
      subtitle: "Collection",
      description: "Timeless elegance meets contemporary design",
      cta: "Shop Sarees",
      link: "/collections?category=sarees"
    },
    {
      image: "https://ravya.co.in/cdn/shop/files/H9.jpg?v=1741271684&width=3600",
      title: "Modern",
      subtitle: "Suits",
      description: "Redefining ethnic sophistication",
      cta: "Shop Suits",
      link: "/collections?category=suits"
    },
    {
      image: "https://nishasilkhandloom.com/wp-content/uploads/2025/01/Ace_Your_Saree_Banner_D.jpg",
      title: "Premium",
      subtitle: "Fabrics",
      description: "Curated from India's finest mills",
      cta: "Shop Fabrics",
      link: "/collections?category=fabrics"
    }
  ]

  const featuredCollections = [
    {
      title: "Modern Sarees",
      subtitle: "Contemporary drapes for the modern woman",
      image: "https://varavastram.com/cdn/shop/files/31876506_Gold_0.jpg?v=1752052474&width=1445",
      link: "/collections?category=sarees&style=modern"
    },
    {
      title: "Elegant Suits",
      subtitle: "Sophisticated silhouettes for every occasion",
      image: "https://www.lavanyathelabel.com/cdn/shop/files/1_e8889eaa-f942-4d00-b408-0a9c517b0a8d_1200x.jpg?v=1753948443",
      link: "/collections?category=suits&style=elegant"
    },
    {
      title: "Unstitched Fabrics",
      subtitle: "Premium textiles for bespoke creations",
      image: "https://www.wholesalefactory.in/images/product/2024/06/anju-fabrics-fusion-vol-4-viscose-fancy-party-wear-cord-set-6-pcs-catalog--2024-06-08_00_39_10.jpeg",
      link: "/collections?category=fabrics"
    }
  ]

 const categories = [
  {
    name: "Sarees",
    image: "https://varavastram.com/cdn/shop/files/31876506_Gold_0.jpg?v=1752052474&width=1445",
    link: "/collections?category=sarees"
  },
  {
    name: "Suits",
    image: "https://cdn.shopify.com/s/files/1/0597/5592/1540/files/10753NAVYBLUEMAROON_main_669x892_14f0b1a3-af3b-4f86-a493-5717d1b5d17e_1024x1024.jpg?v=1721116395",
    link: "/collections?category=suits"
  },
  {
    name: "Fabrics",
    image: "https://lh5.googleusercontent.com/dNSbiwc72WooqjoP6v0jT7ZJtmWFXSKppsYOt5CEIvY7Z_9GRmh-6yDX6N5TFv1SibH5Ps4IPkkwubbALF_l9eg0MRK5uq0y76Qbn3YPniDkgk4I5WiuztY5fCUNh_XOXhVa8gIS",
    link: "/collections?category=fabrics"
  },
  {
    name: "Dupattas",
    image: "https://imagescdn.jaypore.com/img/app/product/3/39576428-11327689.jpg?w=500&auto=format",
    link: "/collections?category=dupattas"
  },
  {
    name: "Blouses",
    image: "https://fabcurate.com/cdn/shop/files/BLOUSE0835_1.jpg?v=1710327872&width=1200",
    link: "/collections?category=blouses"
  },
  {
    name: "Lehengas",
    image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/23518754/2023/6/3/03da58e0-c564-404f-ba84-2b201deb08ca1685791226037panchhiTealGold-TonedEmbellishedSequinnedSemi-StitchedLeheng1.jpg",
    link: "/collections?category=lehengas"
  }
];


  const bestsellers = sampleProducts.slice(0, 6)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const handleQuickAdd = (product: any) => {
    addToCart(product)
  }

  const nextCategorySlide = () => {
    setCategorySlide((prev) => (prev + 1) % Math.ceil(categories.length / 4))
  }

  const prevCategorySlide = () => {
    setCategorySlide((prev) => (prev - 1 + Math.ceil(categories.length / 4)) % Math.ceil(categories.length / 4))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <div className="mb-8">
                    <h1 className="text-6xl md:text-8xl font-light tracking-wider mb-2">
                      {slide.title}
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-light tracking-wider">
                      {slide.subtitle}
                    </h2>
                  </div>
                  <p className="text-lg md:text-xl font-light mb-12 tracking-wide opacity-90">
                    {slide.description}
                  </p>
                  <Link href={slide.link}>
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 font-medium tracking-wide px-12 py-4 text-lg border-0 rounded-none"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-black mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 text-lg font-light tracking-wide">
              Curated for the discerning wardrobe
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <Link key={index} href={collection.link} className="group">
                <div className="relative overflow-hidden bg-white">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-light tracking-wide text-black mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-gray-600 font-light tracking-wide">
                      {collection.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook / Editorial Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="https://infashionbusiness.com/admin_assets/images/products/infashion-1686244838.jpg"
                  alt="Editorial Lookbook"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl md:text-6xl font-light tracking-wider text-black mb-6">
                  Minimal.
                  <br />
                  Ethnic.
                  <br />
                  Essential.
                </h2>
                <p className="text-xl font-light text-gray-600 leading-relaxed tracking-wide">
                  Where traditional craftsmanship meets contemporary minimalism. 
                  Each piece tells a story of heritage, reimagined for the modern world.
                </p>
              </div>
              <Link href="/collections">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 font-medium tracking-wide px-12 py-4 text-lg border-0 rounded-none"
                >
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Slider */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-black mb-4">
              Shop by Category
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${categorySlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {categories.slice(slideIndex * 4, (slideIndex + 1) * 4).map((category, index) => (
                        <Link key={index} href={category.link} className="group">
                          <div className="relative overflow-hidden bg-white">
                            <div className="aspect-[3/4] relative overflow-hidden">
                              <Image
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            <div className="p-6 text-center">
                              <h3 className="text-lg font-medium tracking-wide text-black">
                                {category.name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCategorySlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
            <button
              onClick={nextCategorySlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-black mb-4">
              Bestsellers
            </h2>
            <p className="text-gray-600 text-lg font-light tracking-wide">
              Most loved by our customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestsellers.map((product) => (
              <div key={product.id} className="group">
                <div className="relative overflow-hidden bg-white">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Quick Add Button */}
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Plus className="h-5 w-5 text-black" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-lg font-medium tracking-wide text-black mb-2 hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xl font-light text-black">
                          ₹{product.price.toLocaleString()}
                        </p>
                        {product.originalPrice > product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/collections">
              <Button 
                size="lg" 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white font-medium tracking-wide px-12 py-4 text-lg rounded-none"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Brand Strip */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
            From India's Textile Heartland to Your Closet
          </h2>
          <p className="text-lg font-light tracking-wide opacity-90 max-w-3xl mx-auto leading-relaxed">
            Direct from our manufacturing units, we bring you authentic craftsmanship 
            without the middleman markup. Every thread tells a story of heritage, 
            every weave speaks of generations of expertise.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light tracking-wider text-black mb-6">
              Stay Updated
            </h2>
            <p className="text-lg font-light text-gray-600 mb-12 tracking-wide">
              Be the first to know about new collections and exclusive offers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 border-black rounded-none py-4 px-6 text-lg font-light tracking-wide"
              />
              <Button 
                className="bg-black text-white hover:bg-gray-800 font-medium tracking-wide px-8 py-4 text-lg rounded-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light tracking-wider text-black mb-6">
                Saree Manufactory
              </h3>
              <p className="text-gray-600 font-light leading-relaxed mb-8 max-w-md">
                Premium ethnic wear directly from India's finest textile manufacturers. 
                Authentic craftsmanship, contemporary design.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.438-.928-.928 0-.49.438-.928.928-.928.49 0 .928.438.928.928 0 .49-.438.928-.928.928zm-7.83 1.297c.928 0 1.785.368 2.448 1.031.663.663 1.031 1.52 1.031 2.448s-.368 1.785-1.031 2.448c-.663.663-1.52 1.031-2.448 1.031s-1.785-.368-2.448-1.031c-.663-.663-1.031-1.52-1.031-2.448s.368-1.785 1.031-2.448c.663-.663 1.52-1.031 2.448-1.031z"/>
                  </svg>
                </a>
                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-black hover:text-gray-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium tracking-wide text-black mb-6">Shop</h4>
              <ul className="space-y-4 text-gray-600 font-light">
                <li><Link href="/collections?category=sarees" className="hover:text-black transition-colors">Sarees</Link></li>
                <li><Link href="/collections?category=suits" className="hover:text-black transition-colors">Suits</Link></li>
                <li><Link href="/collections?category=fabrics" className="hover:text-black transition-colors">Fabrics</Link></li>
                <li><Link href="/collections?category=dupattas" className="hover:text-black transition-colors">Dupattas</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium tracking-wide text-black mb-6">Support</h4>
              <ul className="space-y-4 text-gray-600 font-light">
                <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                <li><Link href="/size-guide" className="hover:text-black transition-colors">Size Guide</Link></li>
                <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-black transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-16 pt-8 text-center">
            <p className="text-gray-600 font-light tracking-wide">
              © 2024 Saree Manufactory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
