import { Button } from '@mui/material';
import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/productlist.css";
import "../../../Assets/css/gift_guide.css"
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import bracelet from '../../../Assets/images/static/indianJewelry/bracelet.jpg';
import earrings from '../../../Assets/images/static/indianJewelry/earrings.jpg';
import necklace from '../../../Assets/images/static/indianJewelry/necklace.jpg';
import rings from '../../../Assets/images/static/indianJewelry/rings.jpg';
import coins1 from '../../../Assets/images/static/indianJewelry/coins1.jpeg';
import coins2 from '../../../Assets/images/static/indianJewelry/coins2.jpeg';
import coins3 from '../../../Assets/images/static/indianJewelry/coins3.jpeg';
import coins4 from '../../../Assets/images/static/indianJewelry/coins4.jpeg';
import coins5 from '../../../Assets/images/static/indianJewelry/coins5.jpeg';
import coins6 from '../../../Assets/images/static/indianJewelry/coins6.jpeg';
import { Helmet } from 'react-helmet';

const IndianJewelry = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false
    };
    var settings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false
    };
    var settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false
    };
    var settings3 = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fine Indian Jewelry | South Asian Jewelry | Belgium Webnet</title>
                <meta name="description" content="Belgium Webnet carries the largest and fastest-growing selection of Indian jewelry in Charlotte, NC. Browse our collection of South Asian jewelry today."></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_indian_jewelry_banner">
            </div>
            <div className="rcs_indian_jewelry_content mt-5">
                <Container>
                    <Row className="w-100 m-auto">
                        <Col>
                            <p className="text-center">Belgium Webnet carries the largest and fastest-growing selection of Indian jewelry in Charlotte, NC. This collection of South Asian jewelry, Asian gold jewelry includes authentic, 22k yellow gold necklaces, chains, bangles, earrings, rings, solid gold bars and gold Lakshmi coins.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_testimonials1">
                <Container>
                    <h5 class="text-center"> Necklace</h5>
                    <Row className="w-100 mt-5">
                        <Col className="p-md-0">
                            <div className="rcs_indian_jewelery_slider">
                                <Slider className="rcs_indian_jewelery_slider_inner" {...settings}>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={necklace} alt="necklace"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Ruby/Pearl Necklace</h3>
                                        <p>$1,810.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_testimonials">
                <Container>
                    <h5 class="text-center"> Earrings</h5>
                    <Row className="w-100 mt-5">
                        <Col className="p-md-0">
                            <div className="rcs_indian_jewelery_slider">
                                <Slider className="rcs_indian_jewelery_slider_inner" {...settings1}>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={earrings} alt="earrings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold Dangle Earrings</h3>
                                        <p>$700.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_testimonials1">
                <Container>
                    <h5 class="text-center"> Bracelet</h5>
                    <Row className="w-100 mt-5">
                        <Col className="p-md-0">
                            <div className="rcs_indian_jewelery_slider">
                                <Slider className="rcs_indian_jewelery_slider_inner" {...settings3}>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={bracelet} alt="bracelet"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>Cuban Chain Bracelet</h3>
                                        <p>$6,300.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_testimonials">
                <Container>
                    <h5 class="text-center"> Rings</h5>
                    <Row className="w-100 mt-5">
                        <Col className="p-md-0">
                            <div className="rcs_indian_jewelery_slider">
                                <Slider className="rcs_indian_jewelery_slider_inner" {...settings2}>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                    <div className="rcs_indian_jewelery_slider_item">
                                        <Image src={rings} alt="rings"></Image>
                                        <i className="far fa-heart"></i>
                                        <h3>22k Gold & Cubic Zirconia Ring</h3>
                                        <p>$800.00</p>
                                        <Button variant="secondary" className="rcs_cancel_button">View Details</Button>
                                    </div>
                                </Slider>
                            </div>
                            <NavLink to="/"><Button variant="contained" className="rcs_about_button mt-5"> See The Full Collection </Button></NavLink>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_traditional_coins mt-5 mb-5">
                <Container>
                    <Row className="m-auto w-100 justify-content-center">
                        <div className="rcs_story_content">
                            <Col>
                                <h2 className="text-center">LAKSHMI COINS</h2>
                                <p className="text-center mt-3">PRICES VARY DAILY. INQUIRE ABOUT PRICING IN STORE.</p>
                            </Col>
                        </div>
                    </Row>
                    <Row>
                        <Col sm={6} md={4}>
                            <Image src={coins1} alt="coins"></Image>
                        </Col>
                        <Col sm={6} md={4}>
                            <Image src={coins2} alt="coins"></Image>
                        </Col>
                        <Col sm={6} md={4}>
                            <Image src={coins3} alt="coins"></Image>
                        </Col>
                        <Col sm={6} md={4}>
                            <Image src={coins4} alt="coins"></Image>
                        </Col>
                        <Col sm={6} md={4}>
                            <Image src={coins5} alt="coins"></Image>
                        </Col>
                        <Col sm={6} md={4}>
                            <Image src={coins6} alt="coins"></Image>
                        </Col>
                    </Row>
                    <Row>
                        <div className="rcs_story_content">
                            <Col>
                                <p className="text-center">We are in the midst of a lengthy festive and wedding season and finding unique looks to wear for each occasion, can be a struggle. Indian Gold Jewellery gives you the opportunity to dress up an otherwise simple outfit. Take a dressy palazzo pant with a subdued colour kurta, add a south indian jewelry pendant and indian gold jewelry to it, and you have a look that is dressy, festive and ever elegant. Allowing you to style even your Indo-western looks, Jewellery is extremely versatile, match floor length black dress with this Navaratna set of a 22k white gold necklace and earrings, and you have a sparkling look that definitely stands apart.</p>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default IndianJewelry;