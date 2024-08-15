import { useState } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', description: '', image: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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
    const newProduct = { ...product, image: imagePath };
    try {
      await axios.post('/api/catalog/add', newProduct);
      setProduct({ name: '', description: '', image: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Add Product - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <div className="bg-white p-4 shadow rounded-md">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
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
    </AdminLayout>
  );
};

export default AddProduct;
