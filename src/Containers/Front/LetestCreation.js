import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import creationA1 from "../../Assets/images/home/creation-a1.png";
import creation1 from "../../Assets/images/home/letest-creation-1.jpg";
import creation2 from "../../Assets/images/home/letest-creation-2.jpg";
import creation3 from "../../Assets/images/home/letest-creation-3.jpg";
import creation4 from "../../Assets/images/home/letest-creation-4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Letestcreation = () => {


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
            <section className="rcs_letest_creation_section1 rcs_letest_creation_desk_section1 ">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg="3" col="12">
                            <div className="rcs_letest_creation_img">
                                <img src={creationA1} alt="latest-creation" title="latest-creation"/>
                            </div>
                        </Col>

                        <Col lg={9} col={12} >
                            <Col lg={7} className="m-auto">
                                <div className="rcs_letest_creation_title">
                                    <h1> LATEST CREATIONS </h1>
                                    <p> We've curated a covetable collection of trend-forward jewelry pieces that will never go out of style. </p>
                                </div>
                            </Col>

                            <Row>
                                <Col lg={3} col={12} >
                                    <div className="rcs_letest_creation_box">
                                        <div className="rcs_letest_creation_box_img">
                                            <Link to="#">   <img src={creation1} alt="" title=""/> </Link>
                                        </div>
                                        <div className="rcs_letest_creation_box_text">
                                            <Link to="#">
                                                <p> 3.09 Carat GIA Fancy Yellow Diamond Ring </p>
                                                <span> $31,200 </span>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={3} col={12} >
                                    <div className="rcs_letest_creation_box">
                                        <div className="rcs_letest_creation_box_img">
                                            <Link to="#">   <img src={creation2} alt="" title=""/> </Link>
                                        </div>
                                        <div className="rcs_letest_creation_box_text">
                                            <Link to="#">
                                                <p> 3.15 Carat GIA Light Yellow Diamond Ring </p>
                                                <span> $22,800 </span>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={3} col={12} >
                                    <div className="rcs_letest_creation_box">
                                        <div className="rcs_letest_creation_box_img">
                                            <Link to="#">   <img src={creation3} alt="" title=""/> </Link>
                                        </div>
                                        <div className="rcs_letest_creation_box_text">
                                            <Link to="#">
                                                <p> 7.10 Carat GIA Fancy Light Yellow Diamond Ring </p>
                                                <span> $91,700 </span>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>

                                <Col lg={3} col={12} >
                                    <div className="rcs_letest_creation_box">
                                        <div className="rcs_letest_creation_box_img">
                                            <Link to="#">   <img src={creation4} alt="" title=""/> </Link>
                                        </div>
                                        <div className="rcs_letest_creation_box_text">
                                            <Link to="#">
                                                <p> 3.03 Carat GIA Fancy Yellow Green Diamond Ring </p>
                                                <span> $84,000 </span>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>


                            </Row>

                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mobile section  */}
            <section className="rcs_letest_creation_section1 rcs_letest_creation_Mobile_section d-lg-none">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg="3" col="12">
                            <div className="rcs_letest_creation_img">
                                <img src={creationA1} alt="creation-a1" title="creation-a1"/>
                            </div>
                        </Col>

                        <Col lg={9} col={12} >
                            <Col lg={7} className="m-auto">
                                <div className="rcs_letest_creation_title">
                                    <h1> LATEST CREATIONS</h1>
                                    <p> We've curated a covetable collection of trend-forward jewelry pieces that will never go out of style. </p>
                                </div>
                            </Col>

                            <Row>

                                <Col lg={12}>
                                    <div className="rcs_customer_review_slider">
                                        <Slider className="rcs_customer_say_inner" {...settings2}>
                                            <div className="rcs_letest_creation_box rcs_letest_creation_mobile_box">
                                                <div className="rcs_letest_creation_box_img">
                                                    <Link to="#">   <img src={creation1} alt="" title=""/> </Link>
                                                </div>
                                                <div className="rcs_letest_creation_box_text">
                                                    <Link to="#">
                                                        <p> 3.09 Carat GIA Fancy Yellow Diamond Ring </p>
                                                        <span> $31,200 </span>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="rcs_letest_creation_box rcs_letest_creation_mobile_box">
                                                <div className="rcs_letest_creation_box_img">
                                                    <Link to="#">   <img src={creation2} alt="" title=""/> </Link>
                                                </div>
                                                <div className="rcs_letest_creation_box_text">
                                                    <Link to="#">
                                                        <p> 3.15 Carat GIA Light Yellow Diamond Ring </p>
                                                        <span> $22,800 </span>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="rcs_letest_creation_box rcs_letest_creation_mobile_box">
                                                <div className="rcs_letest_creation_box_img">
                                                    <Link to="#">   <img src={creation3} alt="" title=""/> </Link>
                                                </div>
                                                <div className="rcs_letest_creation_box_text">
                                                    <Link to="#">
                                                        <p> 7.10 Carat GIA Fancy Light Yellow Diamond Ring </p>
                                                        <span> $91,700 </span>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="rcs_letest_creation_box rcs_letest_creation_mobile_box">
                                                <div className="rcs_letest_creation_box_img">
                                                    <Link to="#">   <img src={creation4} alt="" title=""/> </Link>
                                                </div>
                                                <div className="rcs_letest_creation_box_text">
                                                    <Link to="#">
                                                        <p> 3.03 Carat GIA Fancy Yellow Green Diamond Ring </p>
                                                        <span> $84,000 </span>
                                                    </Link>
                                                </div>
                                            </div>

                                        </Slider>
                                    </div>
                                </Col>

                            </Row>

                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    );
}

export default Letestcreation;
