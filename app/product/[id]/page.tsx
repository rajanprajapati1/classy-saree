"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Star, Truck, Shield, RotateCcw, Ruler, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Header } from "@/components/header"
import { getProductById, sampleProducts } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("Free Size")
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const foundProduct = getProductById(productId)
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        images: [
          foundProduct.image,
          foundProduct.image.replace('text=', 'text=View+2+'),
          foundProduct.image.replace('text=', 'text=View+3+'),
          foundProduct.image.replace('text=', 'text=View+4+')
        ],
        sizes: ["Free Size", "S", "M", "L", "XL"],
        colors: ["Default", "Red", "Blue", "Green"],
        care: "Dry clean only",
        origin: "Made in India"
      })
    }
  }, [productId])

  const relatedProducts = sampleProducts.filter(p => 
    p.id !== productId && p.category === product?.category
  ).slice(0, 3)

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely stunning! The quality is exceptional and the fabric feels premium. Perfect for my daughter's wedding.",
      verified: true
    },
    {
      name: "Anita Gupta",
      rating: 5,
      date: "1 month ago",
      comment: "Love the traditional design and the craftsmanship is top-notch. Received many compliments when I wore it.",
      verified: true
    },
    {
      name: "Meera Patel",
      rating: 4,
      date: "2 months ago",
      comment: "Beautiful product but took a bit longer to deliver. Overall satisfied with the purchase.",
      verified: true
    }
  ]

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize, quantity)
      alert(`${product.name} added to cart!`)
    }
  }

  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/collections">
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">
              Browse Collections
            </Button>
          </Link>
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
          <Link href="/collections" className="hover:text-rose-600">Collections</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections?category=${product.category.toLowerCase()}`} className="hover:text-rose-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 left-4 bg-rose-600 text-white">
                {product.badge}
              </Badge>
              <button
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isInWishlist(product.id) ? 'bg-rose-600 text-white' : 'bg-white/80 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-rose-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews || 0} reviews)</span>
                </div>
                <button className="flex items-center gap-1 text-sm text-rose-600 hover:underline">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-rose-600">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Product Options */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size: string) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3"
                size="lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="border-rose-600 text-rose-600 hover:bg-rose-50 py-3"
                size="lg"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders above ₹2999</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-600">7-day return policy</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Authentic</p>
                <p className="text-xs text-gray-600">Direct from manufacturer</p>
              </div>
            </div>

            {/* Why Buy From Us */}
            <Card className="bg-rose-50 border-rose-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-rose-800 mb-3">Why Buy From Us?</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-rose-700">
                      <span className="text-rose-600 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews || 0})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Product Specifications</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Fabric:</dt>
                          <dd className="font-medium">{product.fabric}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Category:</dt>
                          <dd className="font-medium">{product.category}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Occasion:</dt>
                          <dd className="font-medium">{product.occasion}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Origin:</dt>
                          <dd className="font-medium">{product.origin}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Available Colors</h3>
                      <div className="flex gap-2">
                        {product.colors.map((color: string) => (
                          <div key={color} className="text-center">
                            <div 
                              className="w-8 h-8 rounded-full border-2 border-gray-300 mb-1"
                              style={{ backgroundColor: color.toLowerCase() === 'default' ? product.color?.toLowerCase() : color.toLowerCase() }}
                            />
                            <span className="text-xs text-gray-600">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="size-guide" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Ruler className="h-5 w-5 text-rose-600" />
                    <h3 className="font-semibold">Size Guide</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    This {product.category.toLowerCase()} comes in standard sizes. Please refer to our size chart for the perfect fit.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Size Chart:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Size</th>
                            <th className="text-left py-2">Bust (inches)</th>
                            <th className="text-left py-2">Waist (inches)</th>
                            <th className="text-left py-2">Hip (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-1">S</td><td>32-34</td><td>26-28</td><td>34-36</td></tr>
                          <tr><td className="py-1">M</td><td>34-36</td><td>28-30</td><td>36-38</td></tr>
                          <tr><td className="py-1">L</td><td>36-38</td><td>30-32</td><td>38-40</td></tr>
                          <tr><td className="py-1">XL</td><td>38-40</td><td>32-34</td><td>40-42</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Care Instructions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-rose-600 mb-2">Washing</h4>
                      <p className="text-gray-600">{product.care}. Handle with care to maintain fabric quality and color.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-rose-600 mb-2">Storage</h4>
                      <p className="text-gray-600">Store in a cool, dry place. Use muslin cloth or cotton bags for storage. Avoid plastic bags.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-rose-600 mb-2">Ironing</h4>
                      <p className="text-gray-600">Iron on low to medium heat. Use a cloth between the iron and fabric for delicate materials.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Customer Reviews</h3>
                    <Button variant="outline" size="sm">Write a Review</Button>
                  </div>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{review.name}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={250}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({relatedProduct.rating})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-rose-600">₹{relatedProduct.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">₹{relatedProduct.originalPrice.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
