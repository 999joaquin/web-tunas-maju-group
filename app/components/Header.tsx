// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Link, Events } from 'react-scroll';
import './Header.css'; // Import the CSS file for the animation

const Header = () => {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    Events.scrollEvent.register('begin', (to, element) => {
      setActiveLink(to);
    });

    Events.scrollEvent.register('end', (to, element) => {
      // Use a timeout to ensure the animation plays out fully
      setTimeout(() => {
        setActiveLink('');
      }, 1000);
    });

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  const handleSetActive = (to: string) => {
    setActiveLink(to);
    setTimeout(() => setActiveLink(''), 1000); // Remove the active class after 1 second
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-100 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="images/logo/logo.png" alt="PT. Tunas Maju Group" width={50} height={50} />
          <span className="ml-2 text-lg font-bold">PT. Tunas Maju Group</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleSetActive('home')}
                className={`cursor-pointer link ${activeLink === 'home' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="profile"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleSetActive('profile')}
                className={`cursor-pointer link ${activeLink === 'profile' ? 'active' : ''}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="products"
                smooth={true}
                duration={500}
                offset={-230}
                onClick={() => handleSetActive('products')}
                className={`cursor-pointer link ${activeLink === 'products' ? 'active' : ''}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="facility"
                smooth={true}
                duration={500}
                offset={-150}
                onClick={() => handleSetActive('facility')}
                className={`cursor-pointer link ${activeLink === 'facility' ? 'active' : ''}`}
              >
                Facility
              </Link>
            </li>
            <li>
              <Link
                to="coverage"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleSetActive('coverage')}
                className={`cursor-pointer link ${activeLink === 'coverage' ? 'active' : ''}`}
              >
                Coverage
              </Link>
            </li>
            <li>
              <Link
                to="partners"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleSetActive('partners')}
                className={`cursor-pointer link ${activeLink === 'partners' ? 'active' : ''}`}
              >
                Partners
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => handleSetActive('contact')}
                className={`cursor-pointer link ${activeLink === 'contact' ? 'active' : ''}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
