"use client"

import { useState } from "react"

function AddProductForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!title || !price || !category || !stock) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const newProduct = {
        title,
        price: Number(price),
        category,
        stock: Number(stock),
        image: image || "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Default image
        rating: { rate: 0, count: Number(stock) },
      }

      await onAdd(newProduct)

      // Reset form
      setTitle("")
      setPrice("")
      setCategory("")
      setStock("")
      setImage("")
    } catch (error) {
      setError("Error adding product. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Product Name *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($) *</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock *</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="0"
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL (optional)</label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  )
}

export default AddProductForm
