"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, getCart, saveCart, addToCart as addToCartStorage, removeFromCart as removeFromCartStorage, updateCartQuantity as updateCartQuantityStorage } from '@/lib/storage'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: any, size?: string, quantity?: number) => void
  removeFromCart: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  getCartCount: () => number
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(getCart())
  }, [])

  const addToCart = (product: any, size: string = 'Free Size', quantity: number = 1) => {
    const updatedCart = addToCartStorage(product, size, quantity)
    setCart(updatedCart)
  }

  const removeFromCart = (productId: number, size: string) => {
    const updatedCart = removeFromCartStorage(productId, size)
    setCart(updatedCart)
  }

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    const updatedCart = updateCartQuantityStorage(productId, size, quantity)
    setCart(updatedCart)
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
