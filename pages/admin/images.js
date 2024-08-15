import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageImages = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ url: '', alt_text: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await axios.get('/api/images');
    setImages(response.data.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage({ ...newImage, [name]: value });
  };

  const addImage = async () => {
    await axios.post('/api/images', newImage);
    fetchImages();
    setNewImage({ url: '', alt_text: '' });
  };

  const deleteImage = async (id) => {
    await axios.delete(`/api/images/${id}`);
    fetchImages();
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Images - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Images</h1>
      <div className="mb-4">
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={newImage.url}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <input
          type="text"
          name="alt_text"
          placeholder="Alt Text"
          value={newImage.alt_text}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <button onClick={addImage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Add Image</button>
      </div>
      <ul>
        {images.map((image) => (
          <li key={image.id} className="mb-4 flex items-center bg-white p-4 shadow rounded-md">
            <img src={image.url} alt={image.alt_text} className="w-32 h-32 object-cover mr-4 rounded-md" />
            <p className="flex-1">{image.alt_text}</p>
            <button onClick={() => deleteImage(image.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default ManageImages;
