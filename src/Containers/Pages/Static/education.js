import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Education = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Learn Everything You Need to Know About Jewelry</title>
                <meta name="description" content="There is so much to learn about diamonds, gemstone, and more! Let Belgium Webnet teach you what makes diamonds so iconic and tips on buying the right stone."></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_cart_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Education</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Education</h1>
                                <p>There is so much to learn about diamonds, gemstones and more! We’re here to help you along your way!</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent">
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={6} lg={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-diamonds">
                                    <div className="border img-circle">
                                        <i className="edu-cats-diamonds"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Diamonds</h2>
                                    <p>Learn about what makes the diamond so iconic!</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-settings">
                                    <div className="border img-circle">
                                        <i className="edu-cats-settings"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Settings</h2>
                                    <p>Explore your range of options, from Pave to Halo.</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-gemstones">
                                    <div className="border img-circle">
                                        <i className="edu-cats-gemstones"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Gemstones</h2>
                                    <p>Read interesting facts about your month’s birthstone.</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-metals">
                                    <div className="border img-circle">
                                        <i className="edu-cats-metals"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Metals</h2>
                                    <p>The durability and history of Gold, Silver, and beyond!</p>
                                </NavLink>
                            </div>
                        </Col>
                        {/* <Col xs={12} sm={6} md={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/2021-gift-guide">
                                    <div className="border img-circle">
                                        <i className="icon-gift"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Gift Guide</h2>
                                    <p>What's right for your anniversary for this year and next?</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-jewelry-care">
                                    <div className="border img-circle">
                                        <i className="icon-medkit"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Jewelry Care</h2>
                                    <p>How to keep your heirlooms in pristine condition.</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-diamond-buying">
                                    <div className="border img-circle">
                                        <i className="icon-graduation-cap"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Buying Stones</h2>
                                    <p>Tips and tricks for making the correct purchase.</p>
                                </NavLink>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <div className="rcs_education_cotnent_inner">
                                <NavLink to="/education-gold-buying">
                                    <div className="border img-circle">
                                        <i className="icon-dollar"></i>
                                    </div>
                                    <h2 className="pt-3 mb-2">Buying Gold</h2>
                                    <p>The price of gold, updated by the minute.</p>
                                </NavLink>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Education;