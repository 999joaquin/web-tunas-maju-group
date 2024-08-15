// app/components/OurPartners.tsx
'use client';

import Image from 'next/image';

const OurPartners = () => {
  return (
    <div className="bg-black text-white py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Partners</h2>
      <div className="relative w-full h-full">
        <Image src="/images/partners/partners.png" alt="Our Partners" layout="responsive" width={1440} height={400} objectFit="contain" />
      </div>
    </div>
  );
};

export default OurPartners;
