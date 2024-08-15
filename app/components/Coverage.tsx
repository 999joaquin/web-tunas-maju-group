// app/components/Coverage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

const Coverage = () => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const pins = [
    { id: 1, left: '36%', top: '70%', text: 'Jakarta' },
    { id: 2, left: '32.4%', top: '52%', text: 'Palembang' },
    { id: 3, left: '42.5%', top: '80%', text: 'Surabaya' },
  ];

  return (
    <div className="relative bg-black text-white py-8">
      <h2 className="text-2xl font-bold mb-2 text-center pt-12">Coverage</h2>
      <p className="text-center mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <div className="relative w-full h-96">
        <Image src="/images/coverage/indonesia-map.png" alt="Indonesia Map" layout="fill" objectFit="contain" />
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute cursor-pointer"
            style={{ left: pin.left, top: pin.top }}
            onMouseEnter={() => setHoveredPin(pin.id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
                fill="red"
              />
            </svg>
            {hoveredPin === pin.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md">
                {pin.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coverage;
