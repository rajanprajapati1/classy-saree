// Sample product data with working images
export const sampleProducts = [
  {
    id: 1,
    name: "Handwoven Banarasi Silk Saree",
    price: 12999,
    originalPrice: 18999,
    image: "https://rmkv.com/cdn/shop/files/dy7818.1.webp?v=1728709005",
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
    image: "https://frontierphagwara.com/cdn/shop/files/Heritage-6565_1000x_b874e42e-a999-43e4-9401-fb4fd514f7f5.jpg?v=1716794775",
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
    image: "https://assets0.mirraw.com/images/11327253/image_zoom.jpeg?1678969642",
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
    image: "https://www.anantexports.in/cdn/shop/files/rn-image_picker_lib_temp_faf6a165-1244-4162-af90-ada4bcc0c04f.jpg?v=1722327330&width=1946",
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
    image: "https://www.asthanarang.com/cdn/shop/files/aasthanarang2633_1800x1800.jpg?v=1749904214",
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
    image: "https://fabanza.com/media/catalog/product/cache/c26a0736877cb8c5e2d45478f82a04d0/anishka-creation/202303/peach-georgette-embroidered-palazzo-suit-fabsl21404.jpg",
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
    image: "https://peachmode.com/cdn/shop/files/1_DWJF-SATIAARADHYA04-PEACHMODE.jpg?v=1737632909",
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
    image: "https://rainandrainbow.com/cdn/shop/files/SPP_7428.jpg?v=1741257631&width=650",
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
