'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/catalog'); // Assuming your API endpoint is /api/catalog
        setProducts(response.data.data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="catalog-page p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
      <div className="search-filter-bar mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <Link href="/" legacyBehavior>
          <a className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Back to Dashboard
          </a>
        </Link>
      </div>
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item border p-4 rounded-lg">
            {product.image && (
              <div className="relative w-full h-48 mb-4">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-lg" 
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
