import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { AuthProvider } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "Saree Manufactory - Premium Ethnic Wear Direct from Manufacturer",
  description: "Discover premium sarees, suits, and ethnic wear directly from our manufacturing unit. Authentic craftsmanship, factory prices, and quality guaranteed.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
