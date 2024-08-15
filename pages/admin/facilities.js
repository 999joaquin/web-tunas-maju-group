import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]); 
  const [newFacility, setNewFacility] = useState({ name: '', description: '', image: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/api/facilities');
      setFacilities(response.data.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFacility({ ...newFacility, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  const addFacility = async () => {
    if (facilities.length >= 3) {
      alert("You can't add more than 3 facilities.");
      return;
    }

    const imagePath = await uploadFile(selectedFile);
    const facilityToAdd = { ...newFacility, image: imagePath };
    try {
      await axios.post('/api/facilities', facilityToAdd);
      fetchFacilities(); 
      setNewFacility({ name: '', description: '', image: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding facility:', error);
    }
  };

  const deleteFacility = async (id) => {
    try {
      await axios.delete(`/api/facilities/${id}`);
      fetchFacilities(); 
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Facilities - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Facilities</h1>
      <div className="bg-white p-4 shadow rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-4">Add New Facility</h2>
        <input
          type="text"
          name="name"
          placeholder="Facility Name"
          value={newFacility.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
          disabled={facilities.length >= 3}
        />
        <textarea
          name="description"
          placeholder="Facility Description"
          value={newFacility.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
          disabled={facilities.length >= 3}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 mb-2 w-full rounded-md"
          disabled={facilities.length >= 3}
        />
        <button
          onClick={addFacility}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ${
            facilities.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={facilities.length >= 3}
        >
          Add Facility
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Current Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {facilities.map((facility) => (
          <div key={facility.id} className="p-4 bg-white shadow rounded-md">
            <h2 className="text-xl font-semibold mb-4">{facility.name}</h2>
            {facility.image && <img src={facility.image} alt={facility.name} className="w-full h-32 object-cover mb-4 rounded-md" />}
            <p className="mb-4">{facility.description}</p>
            <button
              onClick={() => deleteFacility(facility.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ManageFacilities;
