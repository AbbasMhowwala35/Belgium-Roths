import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import collection1 from "../../Assets/images/home/earring.png";
import collection2 from "../../Assets/images/home/ring.png";
import collection3 from "../../Assets/images/home/bracelet1.png";
import collection4 from "../../Assets/images/home/necklace.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const ExploreCollection = () => {
    var settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>

            <section className="rcs_collection_section1 rcs_collection_section1_desk">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg="12" col="12">
                            <div className="rcs_collection1_title">
                                <h2> EXPLORE OUR COLLECTION </h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="rcs_exp_collection_main">
                                <ul>
                                    <li>
                                        <div className="rcs_collection1_box_img rcs_collection_height">
                                            <img src={collection2} alt="shop-ring" title="shop-ring" />
                                            <div className="rcs_collection1_box_btn rcs_collection1_btn_hover">
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow">  <Link to="/jewelry/fashion-rings"> Shop RINGS  </Link> </Button>
                                            </div>
                                        </div>
                                        <div className="rcs_collection1_box_btn">
                                            <h2> Rings </h2>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="rcs_collection1_box_img rcs_collection_height">
                                            <img src={collection4} alt="shop-necklace" title="shop-necklace" />
                                            <div className="rcs_collection1_box_btn rcs_collection1_btn_hover">
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow">  <Link to="/jewelry/necklaces"> shop NECKLACES </Link>   </Button>
                                            </div>
                                        </div>
                                        <div className="rcs_collection1_box_btn">
                                            <h2> Necklaces </h2>
                                        </div>
                                    </li>

                                    <li>

                                        <div className="rcs_collection1_box_img rcs_collection_height">
                                            <img src={collection1} alt="shop-earring" title="shop-earring" />
                                            <div className="rcs_collection1_box_btn rcs_collection1_btn_hover">
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow">  <Link to="/jewelry/earrings">  Shop Earrings </Link>  </Button>
                                            </div>
                                        </div>
                                        <div className="rcs_collection1_box_btn">
                                            <h2> Earrings </h2>
                                        </div>
                                    </li>

                                    <li>
                                            <div className="rcs_collection1_box_img rcs_collection_height">
                                                <img src={collection3} alt="shop-bracelet" title="shop-bracelet" />
                                                <div className="rcs_collection1_box_btn rcs_collection1_btn_hover">
                                                    <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow">  <Link to="/jewelry/bracelets"> shop BRACELETS </Link>  </Button>
                                                </div>
                                            </div>
                                            <div className="rcs_collection1_box_btn">
                                                <h2> Bracelets </h2>
                                            </div>
                               
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="rcs_collection_section1 d-lg-none">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg="12" col="12">
                            <div className="rcs_collection1_title rcs__mobile_collection_title">
                                <h2> EXPLORE OUR COLLECTION </h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="rcs_customer_review_slider">
                                <Slider className="rcs_customer_say_inner" {...settings2}>
                                    <div className="rcs_collection1_box rcs_mobile_collection1_box">
                                        <Link to="/jewelry/fashion-rings">
                                            <div className="rcs_collection1_box_img">
                                                <img src={collection2} alt="shop-ring" title="shop-ring" />
                                            </div>
                                            <div className="rcs_collection1_box_btn ">
                                                <h2> Rings </h2>
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow"> Shop RINGS </Button>
                                            </div>
                                        </Link>

                                    </div>
                                    <div className="rcs_collection1_box rcs_mobile_collection1_box">
                                        <Link to="/jewelry/necklaces">
                                            <div className="rcs_collection1_box_img">
                                                <img src={collection4} alt="shop-necklace" title="shop-necklace" />
                                            </div>
                                            <div className="rcs_collection1_box_btn">
                                                <h2> Necklaces </h2>
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow"> shop NECKLACES </Button>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rcs_collection1_box rcs_mobile_collection1_box" >
                                        <Link to="/jewelry/earrings">
                                            <div className="rcs_collection1_box_img">
                                                <img src={collection1} alt="shop-earring" title="shop-earring" />
                                            </div>
                                            <div className="rcs_collection1_box_btn">
                                                <h2> Earrings </h2>
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_shadow"> Shop Earrings </Button>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="rcs_collection1_box rcs_mobile_collection1_box">
                                        <Link to="/jewelry/bracelets">
                                            <div className="rcs_collection1_box_img">
                                                <img src={collection3} alt="shop-bracelet" title="shop-bracelet" />
                                            </div>
                                            <div className="rcs_collection1_box_btn">
                                                <h2> Bracelets </h2>
                                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_btn_rcs_btn_shadow"> shop BRACELETS </Button>
                                            </div>
                                        </Link>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



        </>
    );
}
export default ExploreCollection;
