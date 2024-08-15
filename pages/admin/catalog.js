import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageCatalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      const response = await axios.get('/api/catalog');
      setCatalog(response.data.data);
    } catch (error) {
      console.error('Error fetching catalog:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.filePath;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  const addProduct = async () => {
    const imagePath = await uploadFile();
    const productToAdd = { ...newProduct, image: imagePath };
    try {
      await axios.post('/api/catalog', productToAdd);
      fetchCatalog();
      setNewProduct({ name: '', description: '', image: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id) => {
    const imagePath = selectedFile ? await uploadFile() : editingProduct.image;
    const updatedProduct = { ...editingProduct, image: imagePath };
    try {
      await axios.put(`/api/catalog/${id}`, updatedProduct);
      fetchCatalog();
      setEditingProduct(null);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/catalog/${id}`);
      fetchCatalog();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', description: '', image: '' });
    setSelectedFile(null);
  };

  const toggleFeaturedProduct = async (productId, isFeatured) => {
    try {
      await axios.put(`/api/catalog/${productId}`, { featured: isFeatured ? 1 : 0 });
      fetchCatalog(); // Re-fetch catalog to update the list
    } catch (error) {
      console.error('Error updating featured product:', error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Catalog - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Catalog</h1>
      <div className="bg-white p-4 shadow rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Current Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {catalog.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded-md flex flex-col items-center">
            {editingProduct?.id === product.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full rounded-md"
                />
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="border p-2 mb-2 w-full rounded-md"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border p-2 mb-2 w-full rounded-md"
                />
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => updateProduct(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
                )}
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="mb-2 text-center">{product.description}</p>
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => startEditing(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 w-full">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={product.featured === 1}
                      onChange={(e) => toggleFeaturedProduct(product.id, e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">Feature this product</span>
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageCatalog;
