'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/catalog/featured');
        setProducts(response.data.data); // Assuming the API returns an array of featured products
        setLoading(false);
      } catch (error) {
        setError('Failed to load featured products.');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Products</h2>
      <div className="flex justify-center space-x-8">
        {products.map((product) => (
          <div key={product.id} className="w-1/4 bg-black text-white p-4 rounded-lg flex flex-col items-center">
            <div className="w-full h-64 relative">
              <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <span className="mt-4">{product.name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/products/catalog" legacyBehavior>
          <a className="bg-blue-500 text-white px-4 py-2 rounded">Show More</a>
        </Link>
      </div>
    </div>
  );
};

export default OurProducts;
