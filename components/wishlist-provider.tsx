"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, getWishlist, addToWishlist as addToWishlistStorage, removeFromWishlist as removeFromWishlistStorage, isInWishlist as isInWishlistStorage } from '@/lib/storage'

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  getWishlistCount: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])

  useEffect(() => {
    setWishlist(getWishlist())
  }, [])

  const addToWishlist = (product: Product) => {
    const updatedWishlist = addToWishlistStorage(product)
    setWishlist(updatedWishlist)
  }

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = removeFromWishlistStorage(productId)
    setWishlist(updatedWishlist)
  }

  const isInWishlist = (productId: number) => {
    return isInWishlistStorage(productId)
  }

  const getWishlistCount = () => {
    return wishlist.length
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
