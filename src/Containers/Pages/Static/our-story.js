import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/mjstatic.css";
import Button from '@mui/material/Button';
import OwnerImage from '../../../Assets/images/static/Malak_0008.webp';
import StoreImage from '../../../Assets/images/static/Rings_0012.webp';
import StoreImage1 from '../../../Assets/images/static/MJ-1.webp';
import { Helmet } from 'react-helmet';
import aboutimg from '../../../Assets/images/static/demo/img-about2.jpg'

const OurStory = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About | Belgium WebNet </title>
                <meta name="description" content="About | Belgium WebNet"></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_ringsetting_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb m-0 mb-md-5">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="/">
                                    Home
                                </Link>
                                <Typography color="text.primary">About Us</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row className='m-auto w-100'>
                        <div className='rcs_story_content'>
                            <h2>About Us</h2>
                            <p>Belgium WebNet in the field of Diamond industry with an experience of over 20 years. We are established firm providing services to our customers.</p>
                            <p>The founders of Belgium WebNet are both graduates of the Gemological Institute of America. They personally oversee every aspect of our daily operations, and source stones from the world's largest diamond and tanzanite mines, allowing us to offer beautiful jewelry—at the best possible value—directly to the public.</p>
                            <p>Throughout our history, we have distinguished ourselves by providing a comfortable shopping atmosphere, and outstanding customer service. Whether enjoying a Caribbean vacation, or shopping at home in the United States, millions of people have looked to us, and our sister stores—Belgium WebNet Watch & Design™, Luxury of Time™, and our online store at Belgium WebNet—to provide them with luxury jewelry, elegant timepieces, and the finest gemstone products at an unsurpassed value. We are proud to serve and satisfy all of our customers.</p>
                        </div>
                    </Row>

                    <div className='rcs_story_content mt-5 mb-5'>
                        <Row className='m-auto w-100'>
                            <Col md={6} xs={12} className="p-0">
                                <h2>WHY CHOOSE US</h2>
                                <p>A diamond engagement ring is the most significant piece of jewelry you will choose. It's a symbol of your love. You want it to be a high-quality ring that will last a lifetime. You want to know that you're getting the best diamond for your budget and that you fully understand what you're purchasing. We've helped thousands of people pick out the perfect engagement ring and we'd love to do the same for you. Our dedicated staff will spend time with you and give you customized shopping experience. Our staff will be glad to answer any questions you may have on color, clarity, cut, carat size, ethical sourcing and more.</p>
                            </Col>
                            <Col md={6} xs={12}>
                                <div className="rcs_our_story_img_main">
                                    <Image src={aboutimg} alt="about us image"></Image>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default OurStory;