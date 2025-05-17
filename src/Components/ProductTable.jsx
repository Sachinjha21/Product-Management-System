"use client"
import EditProductForm from "./EditProductForm"

function ProductTable({ products, loading, onDelete, onEdit, editingProduct, onUpdate, onCancelEdit }) {
  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  return (
    <div className="table-responsive">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-products">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                {editingProduct && editingProduct.id === product.id ? (
                  <td colSpan="6">
                    <EditProductForm product={editingProduct} onUpdate={onUpdate} onCancel={onCancelEdit} />
                  </td>
                ) : (
                  <>
                    <td>
                      <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
                    </td>
                    <td>{product.title}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>
                      <span className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => onEdit(product)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(product.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
