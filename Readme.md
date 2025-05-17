# E-commerce Product Management App

A React application for managing e-commerce products with CRUD operations.

## Features

1. **List Products**
   - Fetches products from the Fake Store API
   - Displays products in a table with name, price, category, and stock
   - Shows product images
   - Auto-refreshes data every 15 seconds
   - Shows status badge for stock availability

2. **Add Product**
   - Form to add new products
   - Sends a POST request to the API
   - Updates the list immediately after adding

3. **Update Product**
   - Edit product details (name, price, category, stock)
   - Sends a PUT request to the API
   - Updates the list with the edited product

4. **Delete Product**
   - Delete any product from the list
   - Sends a DELETE request to the API
   - Removes the product from the list

5. **Bonus Features**
   - Status badge for out-of-stock products
   - localStorage implementation to store added/edited products
   - Responsive design for all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/ecommerce-product-management.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`
   cd ecommerce-product-management
   \`\`\`

3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

4. Start the development server:
   \`\`\`
   npm start
   \`\`\`

5. Open your browser and navigate to:
   \`\`\`
   http://localhost:3000
   \`\`\`

## Project Structure

\`\`\`
public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProductTable.jsx
│   │   ├── ProductItem.jsx
│   │   ├── AddProductForm.jsx
│   │   └── EditProductForm.jsx
│   ├── App.jsx
│   ├── api.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
\`\`\`

## API

The application uses the [Fake Store API](https://fakestoreapi.com/) for product data.

## Local Storage

The application uses localStorage to:
- Store added products
- Store edited products
- Ensure data persistence even if the API is unavailable

## License

This project is licensed under the MIT License.
