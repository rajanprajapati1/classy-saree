// Local Storage utilities for cart, wishlist, orders, and auth

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  badge?: string
  rating: number
  reviews?: number
  fabric?: string
  color?: string
  occasion?: string
  category?: string
  size?: string
  quantity?: number
}

export interface CartItem extends Product {
  quantity: number
  size: string
}

export interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered'
  total: number
  items: CartItem[]
  tracking?: string
  estimatedDelivery?: string
  deliveryDate?: string
}

export interface User {
  email: string
  name: string
  phone?: string
}

// Cart functions
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const addToCart = (product: Product, size: string = 'Free Size', quantity: number = 1) => {
  const cart = getCart()
  const existingItem = cart.find(item => item.id === product.id && item.size === size)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ ...product, size, quantity })
  }
  
  saveCart(cart)
  return cart
}

export const removeFromCart = (productId: number, size: string) => {
  const cart = getCart()
  const updatedCart = cart.filter(item => !(item.id === productId && item.size === size))
  saveCart(updatedCart)
  return updatedCart
}

export const updateCartQuantity = (productId: number, size: string, quantity: number) => {
  const cart = getCart()
  const item = cart.find(item => item.id === productId && item.size === size)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId, size)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export const clearCart = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('cart')
}

// Wishlist functions
export const getWishlist = (): Product[] => {
  if (typeof window === 'undefined') return []
  const wishlist = localStorage.getItem('wishlist')
  return wishlist ? JSON.parse(wishlist) : []
}

export const saveWishlist = (wishlist: Product[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

export const addToWishlist = (product: Product) => {
  const wishlist = getWishlist()
  const exists = wishlist.find(item => item.id === product.id)
  
  if (!exists) {
    wishlist.push(product)
    saveWishlist(wishlist)
  }
  
  return wishlist
}

export const removeFromWishlist = (productId: number) => {
  const wishlist = getWishlist()
  const updatedWishlist = wishlist.filter(item => item.id !== productId)
  saveWishlist(updatedWishlist)
  return updatedWishlist
}

export const isInWishlist = (productId: number): boolean => {
  const wishlist = getWishlist()
  return wishlist.some(item => item.id === productId)
}

// Orders functions
export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return []
  const orders = localStorage.getItem('orders')
  return orders ? JSON.parse(orders) : []
}

export const saveOrders = (orders: Order[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('orders', JSON.stringify(orders))
}

export const createOrder = (cartItems: CartItem[]): Order => {
  const orders = getOrders()
  const orderId = `ORD-${Date.now()}`
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  const newOrder: Order = {
    id: orderId,
    date: new Date().toISOString(),
    status: 'processing',
    total,
    items: cartItems,
    tracking: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
  
  orders.unshift(newOrder)
  saveOrders(orders)
  clearCart()
  
  return newOrder
}

// Auth functions
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

export const saveCurrentUser = (user: User) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export const logout = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('currentUser')
}

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null
}
