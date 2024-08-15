import { useState, useEffect } from 'react';
import AdminLayout from './layout';
import axios from 'axios';
import Head from 'next/head';

const ManageCompanyProfile = () => {
  const [profile, setProfile] = useState({ description: '', image: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/company-profile');
      if (response.data.data.length > 0) {
        setProfile(response.data.data[0]); // Assume there's only one profile
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    if (!file) return profile.image;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.filePath;
    } catch (error) {
      console.error('File upload error:', error);
      return profile.image;
    }
  };

  const saveProfile = async () => {
    const imagePath = await uploadFile(selectedFile);
    const profileToSave = { ...profile, image: imagePath };

    try {
      if (profile.id) {
        // Update existing profile
        await axios.put(`/api/company-profile/${profile.id}`, profileToSave);
      } else {
        // Create a new profile if it doesn't exist
        await axios.post('/api/company-profile', profileToSave);
      }
      fetchProfile(); // Refresh the profile data
      setSelectedFile(null);
    } catch (error) {
      console.error('Error saving company profile:', error);
    }
  };

  const deleteProfile = async () => {
    try {
      if (profile.id) {
        await axios.delete(`/api/company-profile/${profile.id}`);
        setProfile({ description: '', image: '' });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Error deleting company profile:', error);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Company Profile - PT. Tunas Maju Group Admin</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Manage Company Profile</h1>
      <div className="bg-white p-4 shadow rounded-md mb-4">
        <input
          type="text"
          name="description"
          placeholder="Profile Description"
          value={profile.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 mb-2 w-full rounded-md"
        />
        {profile.image && (
          <div className="mb-4">
            <img src={profile.image} alt="Company Profile" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
        <button
          onClick={saveProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mr-2"
        >
          Save Profile
        </button>
        {profile.id && (
          <button
            onClick={deleteProfile}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Delete Profile
          </button>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageCompanyProfile;
