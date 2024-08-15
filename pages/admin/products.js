import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageProducts = () => {
  const [catalog, setCatalog] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const response = await axios.get('/api/catalog/1');
      console.log('API response:', response.data);
      const { catalog: fetchedCatalog, featured: fetchedFeatured } = response.data;
      console.log('Fetched catalog:', fetchedCatalog);
      console.log('Fetched featured products:', fetchedFeatured);
      if (Array.isArray(fetchedCatalog)) {
        setCatalog(fetchedCatalog);
      } else {
        console.error('Fetched catalog is not an array');
      }
      if (Array.isArray(fetchedFeatured)) {
        setSelectedProducts(fetchedFeatured);
      } else {
        console.error('Fetched featured products are not an array');
      }
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  };  

  const handleSelectProduct = (productId) => {
    const updatedSelectedProducts = [...selectedProducts];
    if (updatedSelectedProducts.includes(productId)) {
      const index = updatedSelectedProducts.indexOf(productId);
      updatedSelectedProducts.splice(index, 1);
    } else if (updatedSelectedProducts.length < 3) {
      updatedSelectedProducts.push(productId);
    }
    setSelectedProducts(updatedSelectedProducts);
  };

  const saveSelectedProducts = async () => {
    try {
      await axios.post('/api/catalog/1', { products: selectedProducts });
      alert('Featured products updated successfully');
    } catch (error) {
      console.error('Error saving selected products:', error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Products - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <h2 className="text-xl font-semibold mb-4">Select 3 Products to Feature on the Website</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {catalog.length > 0 ? (
          catalog.map((product) => (
            <div
              key={product.id}
              className={`bg-white p-4 shadow rounded-md cursor-pointer ${selectedProducts.includes(product.id) ? 'border-2 border-blue-500' : ''}`}
              style={{ width: '178.5px', height: '268px' }}
              onClick={() => handleSelectProduct(product.id)}
            >
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
              )}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="mb-2 text-center">{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <button
        onClick={saveSelectedProducts}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
      >
        Save Featured Products
      </button>
    </AdminLayout>
  );
};

export default ManageProducts;
