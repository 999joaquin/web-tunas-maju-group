// app/page.tsx
'use client';

import Header from './components/Header';
import Banner from './components/Banner';
import CompanyProfile from './components/CompanyProfile';
// Remove OurHistory import
import OurProducts from './components/OurProducts';
import Coverage from './components/Coverage';
import OurFacility from './components/OurFacility';
import WaveTop from './components/WaveTop';
import WaveBottom from './components/WaveBottom';
import Wave from './components/Wave';
import OurPartners from './components/OurPartners';
import WaveTopCoverage from './components/WaveTopCoverage';
import Footer from './components/Footer';
import Spacer from './components/Spacer';
import { Element } from 'react-scroll';

export default function Home() {
  return (
    <div>
      <Header />
      <Element name="home">
        <Banner />
      </Element>
      <Spacer />
      <Element name="profile">
        <CompanyProfile />
      </Element>
      <Wave />
      <Spacer />
      <Element name="products">
        <OurProducts />
      </Element>
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <WaveBottom />
      <Element name="facility">
        <OurFacility />
      </Element>
      <WaveTop />
      <WaveTopCoverage />
      <Element name="coverage">
        <Coverage />
      </Element>
      <Element name="partners">
        <OurPartners />
      </Element>
      <WaveTop />
      <Spacer />
      <Element name="contact">
        <Footer />
      </Element>
    </div>
  );
}
