// app/components/Footer.tsx
'use client';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">PT. Tunas Maju Group</h3>
            <p className="text-sm">
              Jl. Example No. 123<br />
              Jakarta, Indonesia<br />
              Phone: (021) 123-4567<br />
              Email: info@tunasmajugroup.com
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Products</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.56v15.44c0 .8-.65 1.46-1.46 1.46H1.46C.65 21.46 0 20.8 0 20V4.56C0 3.75.65 3.1 1.46 3.1h21.08c.8 0 1.46.65 1.46 1.46zm-4.26 0h-2.68a2.74 2.74 0 00-2.74 2.74v2.68h-2.68V12h2.68v6.24h3.56V12h2.68s.8-4.24 0-6.3h-2.68V7.3h-1.78a1.35 1.35 0 01-1.35-1.35V4.56c0-.8.65-1.46 1.46-1.46h2.68V4.56z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.84 7.58a6.53 6.53 0 01-1.88.52 3.26 3.26 0 001.43-1.8 6.55 6.55 0 01-2.08.8 3.27 3.27 0 00-5.56 2.99 9.27 9.27 0 01-6.74-3.42 3.27 3.27 0 001.01 4.36 3.28 3.28 0 01-1.48-.41v.04a3.28 3.28 0 002.62 3.21 3.27 3.27 0 01-1.48.06 3.28 3.28 0 003.06 2.27 6.58 6.58 0 01-4.07 1.4A6.68 6.68 0 010 17.54a9.27 9.27 0 005.03 1.47c6.04 0 9.34-5 9.34-9.34v-.43a6.68 6.68 0 001.63-1.69z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04C6.48 2.04 2 6.52 2 12c0 4.84 3.66 8.84 8.41 9.79.61.11.82-.26.82-.58v-2.1c-3.4.74-4.11-1.64-4.11-1.64-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.75.08-.75 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.62-2.71-.31-5.56-1.35-5.56-6.01 0-1.33.47-2.42 1.24-3.27-.12-.31-.54-1.56.12-3.24 0 0 1.01-.32 3.3 1.24.96-.27 1.98-.41 3-.41 1.02 0 2.04.14 3 .41 2.28-1.56 3.29-1.24 3.29-1.24.67 1.68.25 2.93.12 3.24.77.85 1.24 1.94 1.24 3.27 0 4.67-2.86 5.7-5.58 6.01.43.37.82 1.1.82 2.21v3.28c0 .32.21.7.82.58 4.75-.95 8.41-4.95 8.41-9.79 0-5.48-4.48-9.96-10-9.96z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} PT. Tunas Maju Group. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
