"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, Clock, Eye, RotateCcw } from 'lucide-react'
import { Header } from "@/components/header"
import { useAuth } from "@/components/auth-provider"
import { getOrders, Order } from "@/lib/storage"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      setOrders(getOrders())
    }
  }, [isLoggedIn])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />
      case 'shipped':
        return <Truck className="h-4 w-4" />
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filterOrdersByStatus = (status: string) => {
    if (status === 'all') return orders
    return orders.filter(order => order.status === status)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-bold text-gray-800 mb-4">Please Login</h1>
            <p className="text-gray-600 mb-8">You need to login to view your orders.</p>
            <Link href="/login">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                Login
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
          <span>My Orders</span>
        </nav>

        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-8">My Orders</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({filterOrdersByStatus('processing').length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({filterOrdersByStatus('shipped').length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({filterOrdersByStatus('delivered').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <OrdersList orders={orders} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
          </TabsContent>
          
          <TabsContent value="processing">
            <OrdersList orders={filterOrdersByStatus('processing')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
          </TabsContent>
          
          <TabsContent value="shipped">
            <OrdersList orders={filterOrdersByStatus('shipped')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
          </TabsContent>
          
          <TabsContent value="delivered">
            <OrdersList orders={filterOrdersByStatus('delivered')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OrdersList({ orders, getStatusIcon, getStatusColor }: any) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
        <p className="text-gray-600 mb-6">You haven't placed any orders in this category yet.</p>
        <Link href="/collections">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white">
            Start Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order: Order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardContent className="p-6">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Order {order.id}</h3>
                <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <span className="text-lg font-bold text-rose-600">₹{order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600">Size: {item.size} • Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-rose-600">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Status Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              {order.status === 'processing' && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Your order is being processed. We'll notify you once it's shipped.</span>
                </div>
              )}
              {order.status === 'shipped' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Your order has been shipped. Tracking ID: {order.tracking}</span>
                  </div>
                  {order.estimatedDelivery && (
                    <div className="text-sm text-gray-600">
                      Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                    </div>
                  )}
                </div>
              )}
              {order.status === 'delivered' && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Delivered on {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('en-IN') : 'N/A'}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Details
              </Button>
              
              {order.status === 'shipped' && (
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Track Order
                </Button>
              )}
              
              {order.status === 'delivered' && (
                <>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Return/Exchange
                  </Button>
                  <Button variant="outline" size="sm" className="bg-rose-600 text-white hover:bg-rose-700">
                    Reorder
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
