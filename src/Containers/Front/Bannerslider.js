import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import Slider from "react-slick";
import { isMobileOnly } from 'react-device-detect';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const BannerSlider = () => {
  const history = useHistory();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    accessibility: true,
    arrows: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const banner = localStorage.getItem('bw-bannerdata') ? JSON.parse(localStorage.getItem('bw-bannerdata')) : []
  const bannerimg = isMobileOnly ? banner[0]?.mobile_image : banner[0]?.image;
  return (
    <>
      {/* <Slider className="rcs_slider_img" {...settings}>
        {banner?.map((val, index) =>
          <div>
            {isMobileOnly ?
              <img src={val.mobile_image} /> : <img src={val.image} />}
          </div>
        )}
      </Slider> */}
      {banner?.map((val, index) =>
        <div className="rcs_hero_slider" style={{ backgroundImage: `url(${bannerimg})` }}>
          <div className={"rcs_hero_img text-" + val.text_direction_class}>
            <Container fluid>
              <Row className='m-auto w-100'>
                <Col sm={12} md={6} lg={8}></Col>
                <Col sm={12} md={6} lg={4}>
                  <h1>{(val.title)}</h1>
                  <p>{(val.short_text)}</p>
                  <Button onClick={() => { history.push('/' + val.btn_link) }} variant="outline-dark">{val.btn_text}</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  )
}

export default BannerSlider;