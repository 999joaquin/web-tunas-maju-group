import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageBanners = () => {
  const [slides, setSlides] = useState([{}, {}, {}]);
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [texts, setTexts] = useState(['', '', '']);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const fetchedSlides = await Promise.all([1, 2, 3].map(slide => fetchSlide(slide)));
    setSlides(fetchedSlides);
    setTexts(fetchedSlides.map(slide => slide.text || ''));
  };

  const fetchSlide = async (slideNumber) => {
    try {
      const response = await axios.get(`/api/banners/${slideNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching slide ${slideNumber}:`, error);
      return {};
    }
  };

  const handleFileChange = (index, e) => {
    const files = [...selectedFiles];
    files[index] = e.target.files[0];
    setSelectedFiles(files);
  };

  const handleTextChange = (index, e) => {
    const newTexts = [...texts];
    newTexts[index] = e.target.value;
    setTexts(newTexts);
  };

  const uploadFile = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append('file', file);
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

  const saveSlide = async (index) => {
    const imagePath = selectedFiles[index] ? await uploadFile(selectedFiles[index]) : slides[index].image;
    const updatedSlide = { ...slides[index], text: texts[index], image: imagePath };
    try {
      await axios.put(`/api/banners/${index + 1}`, updatedSlide);
      fetchSlides();
      setSelectedFiles([null, null, null]);
    } catch (error) {
      console.error(`Error updating slide ${index + 1}:`, error);
    }
  };

  const deleteSlide = async (index) => {
    try {
      await axios.delete(`/api/banners/${index + 1}`);
      fetchSlides();
      setSelectedFiles([null, null, null]);
      setTexts(texts.map((text, i) => (i === index ? '' : text)));
    } catch (error) {
      console.error(`Error deleting slide ${index + 1}:`, error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Banners - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Banners</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slides.map((slide, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-md">
            <h2 className="text-xl font-semibold mb-4">Slide {index + 1}</h2>
            {slide.image && <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-32 object-cover mb-4 rounded-md" />}
            <input
              type="text"
              placeholder="Text"
              value={texts[index]}
              onChange={(e) => handleTextChange(index, e)}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <input
              type="file"
              onChange={(e) => handleFileChange(index, e)}
              className="border p-2 mb-2 w-full rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={() => saveSlide(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => deleteSlide(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageBanners;
