"use client"

import { useState, useEffect } from "react"

import { fetchProducts, addProduct, updateProduct, deleteProduct } from "./api"
import ProductTable from "./Components/ProductTable"
import AddProductForm from "./Components/AddProductForm"

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")
  const [editingProduct, setEditingProduct] = useState(null)

  // Function to get products from localStorage
  const getLocalProducts = () => {
    const localData = localStorage.getItem("products")
    return localData ? JSON.parse(localData) : []
  }

  // Function to save products to localStorage
  const saveLocalProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products))
  }

  // Function to load products from API and merge with localStorage
  const loadProducts = async () => {
    try {
      setLoading(true)
      const apiProducts = await fetchProducts()

      // Get products from localStorage
      const localProducts = getLocalProducts()

      // Merge API products with local products, giving priority to local ones
      const mergedProducts = [...apiProducts]

      localProducts.forEach((localProduct) => {
        const index = mergedProducts.findIndex((p) => p.id === localProduct.id)
        if (index >= 0) {
          mergedProducts[index] = localProduct
        } else {
          mergedProducts.push(localProduct)
        }
      })

      setProducts(mergedProducts)
    } catch (error) {
      console.error("Error loading products:", error)

      // If API fails, use local products
      const localProducts = getLocalProducts()
      if (localProducts.length > 0) {
        setProducts(localProducts)
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle adding a new product
  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct)

      // Update state with new product
      const updatedProducts = [...products, addedProduct]
      setProducts(updatedProducts)

      // Save to localStorage
      const localProducts = getLocalProducts()
      saveLocalProducts([...localProducts, addedProduct])

      // Switch to products tab
      setActiveTab("products")

      return addedProduct
    } catch (error) {
      console.error("Error adding product:", error)

      // Even if API fails, add to local state with a random ID
      const localProduct = {
        ...newProduct,
        id: Math.floor(Math.random() * 1000) + 100,
      }

      const updatedProducts = [...products, localProduct]
      setProducts(updatedProducts)

      // Save to localStorage
      const localProducts = getLocalProducts()
      saveLocalProducts([...localProducts, localProduct])

      // Switch to products tab
      setActiveTab("products")

      return localProduct
    }
  }

  // Handle updating a product
  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct)

      // Update state
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      )

      setProducts(updatedProducts)

      // Update localStorage
      const localProducts = getLocalProducts()
      const updatedLocalProducts = localProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      )

      // If product doesn't exist in localStorage, add it
      if (!localProducts.some((p) => p.id === id)) {
        const productToUpdate = products.find((p) => p.id === id)
        if (productToUpdate) {
          updatedLocalProducts.push({ ...productToUpdate, ...updatedProduct })
        }
      }

      saveLocalProducts(updatedLocalProducts)
      setEditingProduct(null)
    } catch (error) {
      console.error("Error updating product:", error)

      // Even if API fails, update local state
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      )

      setProducts(updatedProducts)

      // Update localStorage
      const localProducts = getLocalProducts()
      const updatedLocalProducts = localProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product,
      )

      // If product doesn't exist in localStorage, add it
      if (!localProducts.some((p) => p.id === id)) {
        const productToUpdate = products.find((p) => p.id === id)
        if (productToUpdate) {
          updatedLocalProducts.push({ ...productToUpdate, ...updatedProduct })
        }
      }

      saveLocalProducts(updatedLocalProducts)
      setEditingProduct(null)
    }
  }

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id)

      // Update state
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)

      // Update localStorage
      const localProducts = getLocalProducts()
      const updatedLocalProducts = localProducts.filter((product) => product.id !== id)
      saveLocalProducts(updatedLocalProducts)
    } catch (error) {
      console.error("Error deleting product:", error)

      // Even if API fails, update local state
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)

      // Update localStorage
      const localProducts = getLocalProducts()
      const updatedLocalProducts = localProducts.filter((product) => product.id !== id)
      saveLocalProducts(updatedLocalProducts)
    }
  }

  // Initial data load and set up refresh interval
  useEffect(() => {
    loadProducts()

    // Set up refresh interval (15 seconds)
    const intervalId = setInterval(() => {
      loadProducts()
    }, 15000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>E-commerce Product Management</h1>
      </header>

      <div className="tabs">
        <button className={`tab ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
          Products
        </button>
        <button className={`tab ${activeTab === "add" ? "active" : ""}`} onClick={() => setActiveTab("add")}>
          Add Product
        </button>
      </div>

      <main className="app-main">
        {activeTab === "products" ? (
          <div className="card">
            <div className="card-header">
              <h2>Product List</h2>
              <p className="refresh-note">Data refreshes automatically every 15 seconds</p>
            </div>
            <div className="card-body">
              <ProductTable
                products={products}
                loading={loading}
                onDelete={handleDeleteProduct}
                onEdit={setEditingProduct}
                editingProduct={editingProduct}
                onUpdate={handleUpdateProduct}
                onCancelEdit={() => setEditingProduct(null)}
              />
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h2>Add New Product</h2>
            </div>
            <div className="card-body">
              <AddProductForm onAdd={handleAddProduct} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
