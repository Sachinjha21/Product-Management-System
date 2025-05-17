"use client"

function ProductItem({ product, onDelete, onEdit }) {
  return (
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
  )
}

export default ProductItem
