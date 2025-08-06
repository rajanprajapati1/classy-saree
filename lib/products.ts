// Sample product data with working images
export const sampleProducts = [
  {
    id: 1,
    name: "Handwoven Banarasi Silk Saree",
    price: 12999,
    originalPrice: 18999,
    image: "/placeholder.svg?height=400&width=300&text=Banarasi+Silk+Saree",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 124,
    fabric: "Silk",
    color: "Golden",
    occasion: "Wedding",
    category: "Sarees",
    description: "Exquisite handwoven Banarasi silk saree featuring traditional motifs and intricate zari work.",
    features: [
      "Handwoven by master craftsmen",
      "Pure silk with gold zari work",
      "Traditional Banarasi motifs",
      "Includes matching blouse piece"
    ]
  },
  {
    id: 2,
    name: "Cotton Chanderi Suit Set",
    price: 4999,
    originalPrice: 7999,
    image: "/placeholder.svg?height=400&width=300&text=Chanderi+Suit+Set",
    badge: "New",
    rating: 4.9,
    reviews: 89,
    fabric: "Cotton",
    color: "Pink",
    occasion: "Casual",
    category: "Suits",
    description: "Elegant cotton Chanderi suit set perfect for daily wear and casual occasions.",
    features: [
      "Soft cotton Chanderi fabric",
      "Comfortable fit",
      "Machine washable",
      "Includes dupatta"
    ]
  },
  {
    id: 3,
    name: "Georgette Party Wear Saree",
    price: 8999,
    originalPrice: 12999,
    image: "/placeholder.svg?height=400&width=300&text=Georgette+Party+Saree",
    badge: "Limited",
    rating: 4.7,
    reviews: 156,
    fabric: "Georgette",
    color: "Maroon",
    occasion: "Party",
    category: "Sarees",
    description: "Stunning georgette saree with elegant drape, perfect for parties and celebrations.",
    features: [
      "Lightweight georgette fabric",
      "Beautiful drape",
      "Party wear design",
      "Easy to carry"
    ]
  },
  {
    id: 4,
    name: "Pure Silk Anarkali Suit",
    price: 15999,
    originalPrice: 22999,
    image: "/placeholder.svg?height=400&width=300&text=Silk+Anarkali+Suit",
    badge: "Premium",
    rating: 4.9,
    reviews: 203,
    fabric: "Silk",
    color: "Blue",
    occasion: "Wedding",
    category: "Suits",
    description: "Luxurious pure silk Anarkali suit with intricate embroidery work.",
    features: [
      "Pure silk fabric",
      "Intricate embroidery",
      "Wedding collection",
      "Premium quality"
    ]
  },
  {
    id: 5,
    name: "Chiffon Floral Print Saree",
    price: 6999,
    originalPrice: 9999,
    image: "/placeholder.svg?height=400&width=300&text=Chiffon+Floral+Saree",
    badge: "Sale",
    rating: 4.6,
    reviews: 78,
    fabric: "Chiffon",
    color: "Green",
    occasion: "Office",
    category: "Sarees",
    description: "Elegant chiffon saree with beautiful floral prints, ideal for office wear.",
    features: [
      "Soft chiffon fabric",
      "Floral print design",
      "Office appropriate",
      "Comfortable wear"
    ]
  },
  {
    id: 6,
    name: "Embroidered Palazzo Suit",
    price: 7999,
    originalPrice: 11999,
    image: "/placeholder.svg?height=400&width=300&text=Palazzo+Suit+Set",
    badge: "Trending",
    rating: 4.8,
    reviews: 145,
    fabric: "Cotton",
    color: "Cream",
    occasion: "Festive",
    category: "Suits",
    description: "Trendy palazzo suit with beautiful embroidery work, perfect for festive occasions.",
    features: [
      "Comfortable palazzo style",
      "Beautiful embroidery",
      "Festive wear",
      "Modern design"
    ]
  },
  {
    id: 7,
    name: "Kanjivaram Silk Saree",
    price: 18999,
    originalPrice: 25999,
    image: "/placeholder.svg?height=400&width=300&text=Kanjivaram+Silk+Saree",
    badge: "Heritage",
    rating: 4.9,
    reviews: 267,
    fabric: "Silk",
    color: "Red",
    occasion: "Wedding",
    category: "Sarees",
    description: "Traditional Kanjivaram silk saree with rich zari work and vibrant colors.",
    features: [
      "Authentic Kanjivaram silk",
      "Rich zari work",
      "Traditional design",
      "Wedding special"
    ]
  },
  {
    id: 8,
    name: "Linen Casual Suit Set",
    price: 3999,
    originalPrice: 5999,
    image: "/placeholder.svg?height=400&width=300&text=Linen+Casual+Suit",
    badge: "Comfort",
    rating: 4.5,
    reviews: 92,
    fabric: "Linen",
    color: "White",
    occasion: "Casual",
    category: "Suits",
    description: "Comfortable linen suit set perfect for casual outings and daily wear.",
    features: [
      "Breathable linen fabric",
      "Casual comfort",
      "Easy maintenance",
      "Summer friendly"
    ]
  }
]

export const getProductById = (id: number) => {
  return sampleProducts.find(product => product.id === id)
}

export const getProductsByCategory = (category: string) => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}

export const searchProducts = (query: string) => {
  return sampleProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.fabric.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  )
}
