"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, X, ShoppingBag, ArrowLeft, Tag } from 'lucide-react'
import { Header } from "@/components/header"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { createOrder } from "@/lib/storage"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { isLoggedIn } = useAuth()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [couponDiscount, setCouponDiscount] = useState(0)

  const applyCoupon = () => {
    const validCoupons: { [key: string]: number } = {
      "WELCOME10": 10,
      "SAVE20": 20,
      "FIRST50": 50
    }
    
    if (validCoupons[couponCode]) {
      setAppliedCoupon(couponCode)
      setCouponDiscount(validCoupons[couponCode])
      setCouponCode("")
    } else {
      alert("Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon("")
    setCouponDiscount(0)
  }

  const subtotal = getCartTotal()
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const couponDiscountAmount = (subtotal * couponDiscount) / 100
  const shipping = subtotal > 2999 ? 0 : 199
  const total = subtotal - couponDiscountAmount + shipping

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please login to proceed with checkout")
      window.location.href = "/login"
      return
    }

    if (cart.length === 0) {
      alert("Your cart is empty")
      return
    }

    const order = createOrder(cart)
    alert(`Order placed successfully! Order ID: ${order.id}`)
    window.location.href = "/orders"
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/collections">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                Continue Shopping
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
          <span>Shopping Cart</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-serif font-bold text-gray-800">Shopping Cart</h1>
              <span className="text-gray-600">{cart.length} items</span>
            </div>

            <div className="space-y-4">
              {cart.map(item => (
                <Card key={`${item.id}-${item.size}`} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-32 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-rose-600 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <span>Size: {item.size}</span>
                          <span className="mx-2">•</span>
                          <span>Color: {item.color}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="p-1 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-1 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold text-rose-600">₹{(item.price * item.quantity).toLocaleString()}</div>
                            <div className="text-sm text-gray-500 line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/collections" className="inline-flex items-center text-rose-600 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{appliedCoupon}</span>
                        <span className="text-sm text-green-600">(-{couponDiscount}%)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={applyCoupon}
                        variant="outline"
                        className="border-rose-600 text-rose-600 hover:bg-rose-50"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Try: WELCOME10, SAVE20, FIRST50
                  </p>
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                  
                  {couponDiscountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Add ₹{(2999 - subtotal).toLocaleString()} more for free shipping
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-rose-600">₹{total.toLocaleString()}</span>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-rose-600 hover:bg-rose-700 text-white py-3"
                >
                  Proceed to Checkout
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      🔒 Secure Checkout
                    </p>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      🚚 Free shipping above ₹2999
                    </p>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      ↩️ 7-day easy returns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
