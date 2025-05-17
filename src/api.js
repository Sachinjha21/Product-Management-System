// API functions for product management

// Fetch all products from the API
export const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
  
    // Transform API data to include stock (which is not in the original API)
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      stock: item.rating?.count ? Math.min(item.rating.count, 100) : Math.floor(Math.random() * 100), // Use rating.count as stock or generate random
      rating: item.rating,
    }))
  }
  
  // Add a new product (fake POST request)
  export const addProduct = async (product) => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
  
    const data = await response.json()
  
    // Create new product with API-generated ID or a random one
    return {
      ...product,
      id: data.id || Math.floor(Math.random() * 1000) + 100,
    }
  }
  
  // Update a product (fake PUT request)
  export const updateProduct = async (id, product) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
  
    return await response.json()
  }
  
  // Delete a product (fake DELETE request)
  export const deleteProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
  
    return await response.json()
  }
  