"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Star, X } from 'lucide-react'
import { Header } from "@/components/header"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const moveToCart = (product: any) => {
    addToCart(product)
    alert(`${product.name} moved to cart!`)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">Save your favorite items to your wishlist and shop them later.</p>
            <Link href="/collections">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-rose-600">Home</Link>
          <span className="mx-2">/</span>
          <span>Wishlist</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800">My Wishlist</h1>
          <span className="text-gray-600">{wishlist.length} items</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative">
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              
              <div className="relative">
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                {item.badge && (
                  <Badge className="absolute top-3 left-3 bg-rose-600 text-white">
                    {item.badge}
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-rose-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.rating})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-rose-600">₹{item.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                </div>
                
                <Button
                  onClick={() => moveToCart(item)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link href="/collections">
            <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
