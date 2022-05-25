import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import amazing from "../../Assets/images/home/amazing-value-img.png";
import expert from "../../Assets/images/home/expert-guidance.png";
import Eordinary from "../../Assets/images/home/Extraordinary.png";
import peace from "../../Assets/images/home/peace-of-mind.png";


const ServiceSection = () => {
    return (
        <>
            <section className="rcs_service_section">
                <Container className="rcs_custom_home_container">
                    <Row>

                        <Col lg={3} md={6} xs={6}>
                            <div className="rcs_service_section_box">
                                <div className="rcs_service_section_box_img">
                                    <img src={amazing} alt="amazing" title="amazing"/>
                                </div>
                                <div className="rcs_service_section_box_text">
                                    <h2> Amazing Value </h2>
                                    <p>
                                        The highest quality design at an attainable price
                                    </p>
                                </div>


                            </div>
                        </Col>

                        <Col lg={3} md={6} xs={6}>
                            <div className="rcs_service_section_box">
                                <div className="rcs_service_section_box_img">
                                    <img src={peace} alt="Peace of Mind" title="Peace of Mind"/>
                                </div>
                                <div className="rcs_service_section_box_text">
                                    <h2> Peace of Mind </h2>
                                    <p>
                                        30-day returns, diamond certifications,
                                        appraisals, and more
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col lg={3} md={6} xs={6}>
                            <div className="rcs_service_section_box">
                                <div className="rcs_service_section_box_img">
                                    <img src={expert} alt="Expert Guidance" title="Expert Guidance"/>
                                </div>
                                <div className="rcs_service_section_box_text">
                                    <h2> Expert Guidance </h2>
                                    <p>
                                        Specializing in color diamonds
                                        since 1984
                                    </p>
                                </div>


                            </div>
                        </Col>

                        <Col lg={3} md={6} xs={6}>
                            <div className="rcs_service_section_box">
                                <div className="rcs_service_section_box_img">
                                    <img src={Eordinary} alt="Extraordinary" title="Extraordinary"/>
                                </div>
                                <div className="rcs_service_section_box_text">
                                    <h2> Extraordinary Assortment </h2>
                                    <p>
                                        The perfect pieces with some of the rarest
                                        diamonds for every occasion
                                    </p>
                                </div>


                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

        </>
    );
}

export default ServiceSection;
