"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useWishlist } from '@/components/wishlist-provider'
import { useAuth } from '@/components/auth-provider'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { getCartCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const { user, logout, isLoggedIn } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/collections?search=${encodeURIComponent(searchQuery)}`
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light tracking-wider text-black">
            Zarika 
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link href="/collections?category=sarees" className="text-black hover:text-gray-600 transition-colors font-light tracking-wide">
              Sarees
            </Link>
            <Link href="/collections?category=suits" className="text-black hover:text-gray-600 transition-colors font-light tracking-wide">
              Suits
            </Link>
            <Link href="/collections?category=fabrics" className="text-black hover:text-gray-600 transition-colors font-light tracking-wide">
              Fabrics
            </Link>
            <Link href="/collections" className="text-black hover:text-gray-600 transition-colors font-light tracking-wide">
              Collections
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="h-5 w-5 text-black" />
            </button>

            {/* User */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-light">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <User className="h-5 w-5 text-black" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="h-5 w-5 text-black" />
              </Link>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="h-5 w-5 text-black" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5 text-black" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-black" /> : <Menu className="h-5 w-5 text-black" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                type="text"
                placeholder="Search for sarees, suits, fabrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-gray-300 rounded-none font-light tracking-wide"
                autoFocus
              />
              <Button 
                type="submit" 
                className="bg-black text-white hover:bg-gray-800 rounded-none font-light tracking-wide px-8"
              >
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-6">
            <nav className="flex flex-col space-y-6">
              <Link 
                href="/collections?category=sarees" 
                className="text-black hover:text-gray-600 transition-colors font-light tracking-wide text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sarees
              </Link>
              <Link 
                href="/collections?category=suits" 
                className="text-black hover:text-gray-600 transition-colors font-light tracking-wide text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Suits
              </Link>
              <Link 
                href="/collections?category=fabrics" 
                className="text-black hover:text-gray-600 transition-colors font-light tracking-wide text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Fabrics
              </Link>
              <Link 
                href="/collections" 
                className="text-black hover:text-gray-600 transition-colors font-light tracking-wide text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              {isLoggedIn && (
                <Link 
                  href="/orders" 
                  className="text-black hover:text-gray-600 transition-colors font-light tracking-wide text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
