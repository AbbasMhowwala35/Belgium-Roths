import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import Slider from "react-slick";
import { Button } from '@material-ui/core';
import brand1 from "../../Assets/images/brand/brand1.jpg";
import brand2 from "../../Assets/images/brand/brand2.jpg";
import brand3 from "../../Assets/images/brand/brand3.jpg";
import brand4 from "../../Assets/images/brand/brand4.png";
import brand5 from "../../Assets/images/brand/brand5.jpg";
import brand6 from "../../Assets/images/brand/brand6.jpg";
import brand7 from "../../Assets/images/brand/brand7.jpg";
import brand8 from "../../Assets/images/brand/brand8.jpg";
import brand9 from "../../Assets/images/brand/brand9.jpg";
import brand10 from "../../Assets/images/brand/brand10.jpg";
import brand11 from "../../Assets/images/brand/brand11.jpg";
import brand12 from "../../Assets/images/brand/brand12.jpg";
import brand13 from "../../Assets/images/brand/brand13.jpg";
import brand14 from "../../Assets/images/brand/brand14.jpg";
import brand15 from "../../Assets/images/brand/brand15.jpg";
import brand16 from "../../Assets/images/brand/brand16.png";
import { useHistory } from 'react-router-dom'; 

const Philanthropy = () => {
  const history = useHistory();

  var brandSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    accessibility: true,
    arrows: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="rcs_philan">
        <Container>
          <Row>
            <Col sm="12">
              <div className="rcs_philan_content">
                <h3> PHILANTHROPY </h3>
                <p>In addition to helping couples find the perfect engagement rings and wedding bands, Belgium Webnet donates time and money to support local charities.
                  It is our responsibility and privilege to give back to the community that has given so much to us. </p>
                <Slider {...brandSlider}>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.rmhofcharlotte.org/", "_blank")} to='#'><img src={brand1} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("#")}><img src={brand2} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.charlottecatholic.org/", "_blank")} to='#'><img src={brand3} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://jewelersforchildren.org/", "_blank")} to='#'><img src={brand4} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.hadassah.org/regions/southern-seaboard/chapters/charlotte", "_blank")} to='#'><img src={brand5} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://hope41.com/", "_blank")} to='#'><img src={brand6} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.facebook.com/JewelersForVeterans/", "_blank")} to='#'><img src={brand7} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.ucps.k12.nc.us/reaview", "_blank")} to='#'><img src={brand8} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("#")}><img src={brand9} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.stjude.org/", "_blank")} to='#'><img src={brand10} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://stmatthewcatholic.org/", "_blank")} to='#'><img src={brand11} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.stnektarios.org/", "_blank")} to='#'><img src={brand12} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.komen.org/", "_blank")} to='#'><img src={brand13} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://templebethel.org/", "_blank")} to='#'><img src={brand14} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.toysfortots.org/", "_blank")} to='#'><img src={brand15} /></div>
                  <div className="rcs_brand_item" onClick={() => window.open("https://www.shalomcharlotte.org/", "_blank")} to='#'><img src={brand16} /></div>
                </Slider>
              </div>
            </Col>
          </Row>
          <div className="js_belowslider">
            <Row className="m-0 w-100">
              <Col sm={12} md={12} lg={12}>
                <div className="gs_col text-center">
                  <h1> it is our privilege to support our community by giving back. </h1>
                  <p>Here at Belgium Webnet we are blessed with the opportunity to give back to the community that has given so much to us.</p>
                  <Button onClick={() => history.push("/charities")} className="rcs_how_btn"> How We Give Back </Button> </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Philanthropy;