'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const CompanyProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/company-profile');
        const data = response.data.data;
        
        // Assume the first profile contains the necessary information
        if (data.length > 0) {
          const profile = data[0];
          setDescription(profile.description);
          setSlides([
            { id: 1, image: profile.image, description: 'Profile 1' },
            { id: 2, image: profile.image, description: 'Profile 2' },
            { id: 3, image: profile.image, description: 'Profile 3' },
          ]);
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to load company profile.');
        setLoading(false);
      }
    };

    fetchProfile();

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative bg-secondary text-white">
      <div className="flex items-center justify-between p-8 h-screen">
        <div className="w-1/2 p-8">
          <h2 className="text-4xl font-bold mb-4">Profile</h2>
          <p className="text-lg">
            {description}
          </p>
        </div>
        <div className="w-1/2 relative h-full flex items-center justify-center">
          <div className="relative w-3/4 h-3/4 border-4 border-white rounded-lg overflow-hidden bg-white flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute transition-opacity duration-1000 w-full h-full ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image src={slide.image} alt={slide.description} fill style={{ objectFit: 'cover' }} objectFit="cover" className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
