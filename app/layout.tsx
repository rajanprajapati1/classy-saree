import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // optional CSS variable
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zarika - Premium Ethnic Wear Direct from Manufacturer",
  description: "Discover premium sarees, suits, and ethnic wear directly from our manufacturing unit. Authentic craftsmanship, factory prices, and quality guaranteed."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
