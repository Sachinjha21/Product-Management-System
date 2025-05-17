"use client"

import { useState } from "react"

function EditProductForm({ product, onUpdate, onCancel }) {
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [category, setCategory] = useState(product.category)
  const [stock, setStock] = useState(product.stock)
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
      const updatedProduct = {
        title,
        price: Number(price),
        category,
        stock: Number(stock),
      }

      await onUpdate(product.id, updatedProduct)
    } catch (error) {
      setError("Error updating product. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="edit-form-container">
      <h3>Edit Product</h3>

      {error && <div className="error-message">{error}</div>}

      <form className="product-form edit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-title">Product Name</label>
            <input id="edit-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="edit-price">Price ($)</label>
            <input
              id="edit-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-stock">Stock</label>
            <input
              id="edit-stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm
