'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OurFacility.css';

const OurFacility = () => {
  const [facilities, setFacilities] = useState([{}, {}, {}]); // Initialize with 3 empty objects
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    const fetchedFacilities = await Promise.all([1, 2, 3].map(facility => fetchFacility(facility)));
    setFacilities(fetchedFacilities);
  };

  const fetchFacility = async (facilityNumber) => {
    try {
      const response = await axios.get(`/api/facilities/${facilityNumber}`);
      return response.data.data || {};
    } catch (error) {
      console.error(`Error fetching facility ${facilityNumber}:`, error);
      return {};
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
  };

  return (
    <div className="relative w-full h-screen bg-black text-white">
      <h2 className="text-4xl font-bold mb-4 text-center">Facilities</h2>
      <Slider {...settings} className="w-full h-full">
        {facilities.map((facility, index) => (
          <div key={index} className="relative w-full h-full">
            <div className="relative w-full h-full" style={{ height: '60vh' }}>
              {facility.image && (
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center p-4">
                <p className="text-white text-lg">{facility.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OurFacility;
 