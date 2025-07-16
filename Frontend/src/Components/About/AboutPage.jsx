import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About Swift Shop LTD</h2>
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
            At SWIFT SHOP LTD, we started with a simple mission: to bring unique,
             stylish, and high-quality home decor items to customers worldwide. 
             From the charm of elegant chandeliers to the coziness of ambient strip lights, 
             we’ve grown our collection with care and attention to detail.
          </h4>
          <p>
            What began as a passion project has now become a 
            trusted name in online home decor shopping. We take 
            pride in curating products that bring warmth, character,
             and personality to every space. Whether you're decorating
              a new home or refreshing your current one, our goal is to 
              make style accessible and enjoyable for everyone.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Mission</h5>
              <p>
                To provide beautifully designed, reliable, and affordable
                 home decor items that elevate living spaces and bring joy to homes across the globe.
              </p>
            </div>
            <div className="contentBox">
              <h5>Our Vision</h5>
              <p>
                To become a leading name in global home decor retail,
                 known for exceptional customer service, trusted quality, and trend-forward design.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="" />
            </div>
            <div className="textContent">
              <h5>The Company</h5>
              <p>
                SWIFT SHOP LTD is a UK-registered business committed to
                 delivering high-quality home improvement and decor items
                  to customers both locally and internationally. With a strong
                   presence on platforms like Facebook and eBay, and a growing
                    online store, we strive to offer convenience, value, and 
                    trust in every transaction. From decorative lighting to wall
                     accents and artificial greenery, our diverse product line reflects 
                     modern aesthetics and practical design. Our team is dedicated to making
                      home decoration simple, stylish, and satisfying for every customer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Payment Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;
