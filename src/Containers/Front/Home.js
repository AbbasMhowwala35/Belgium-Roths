import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import { helmet_url } from '../../Helpers/request';
import { Helmet } from 'react-helmet';
import BannerSlider from './Bannerslider';
import Featured from './featured';
import Collection1 from './Collection1';
import StateJewelry from './Statejewelry';
import Collection2 from './Collection2';
import IndianJewelry from './Indianjewelry';
import Philanthropy from './Philanthropy';
import Testimonial from './Testimonial';
import Newsletter from './Newsletter';
import Insta from './insta';
import AboutSection from './AboutSection';
import ExploreCollection from './ExploreCollection';
import Colordiamond from './ColorDiamond';
import Letestcreation from './LetestCreation';
import Virtualappointment from './VirtualAppointment';
import ServiceSection from './ServiceSection';
import Customer from './Customer';
import ShopDiamondShape from "./ShopDiamondShape";
import Gemstones from "./GemstoneShop";
import RingStyle from "./RingStyle";
import Ringbuilderhome from "./Ringbuilderhome";
import SignupTo from "./SignupTo";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Belgium Webnet- Making these Extraordinary Diamonds Attainable</title>
        <meta name="description" content="Specializing in fancy color diamonds including; pink, yellow, blue, green, orange, purple, and white diamonds. Colored diamond jewelry. Offering a luxury experience to clients worldwide."></meta>
        <meta name="keywords" content="Charlotte jewelry stores, fine jewelry Charlotte NC, jewelers in Charlotte NC, best jewelers in Charlotte, jewelry stores Charlotte NC, fine jewelry stores in Charlotte NC, gold jewelry stores in Charlotte NC"></meta>
        {/*Og Tags */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Belgium Webnet- Making these Extraordinary Diamonds Attainable" />
        <meta property="og:description" content="Specializing in fancy color diamonds including; pink, yellow, blue, green, orange, purple, and white diamonds. Colored diamond jewelry. Offering a luxury experience to clients worldwide." />
        <meta property="og:url" content={helmet_url} />
        <meta property="og:site_name" content="Belgium Webnet" />
      </Helmet>

      <BannerSlider />
      <RingStyle />            
      <ExploreCollection />
      <Ringbuilderhome />
      <ShopDiamondShape />      
      <Gemstones />
      <Virtualappointment/>      
      <Customer />
      <Insta />
      <SignupTo />

      {/* <AboutSection/> */}
      {/* <Colordiamond /> */}
      {/* <Letestcreation/> */}
      {/* <ServiceSection /> */}
      {/* <SignupTo /> */}
      {/* <Newsletter /> */}
      {/* <Featured /> */}
      {/*Collection1 :- Wedding band,Diamonds Earrings,Fine Jewelry */}
      {/* <Collection1 /> */}
      {/* <StateJewelry /> */}
      {/*Collection2 :- Pendants,Bracelets,Gemstones */}
      {/* <Collection2 /> */}
      {/* <IndianJewelry /> */}
      {/* <Philanthropy /> */}
      {/* <Testimonial /> */}
      {/* <Insta /> */}
      {/* <Newsletter /> */}
    </>
  )
}

export default Home;