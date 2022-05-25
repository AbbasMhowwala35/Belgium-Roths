import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet';
import { NavLink,useHistory } from 'react-router-dom';

const EducationJewelryCare = () => {
    const history = useHistory();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Jewelry Care | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
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
                                <NavLink underline="hover" color="inherit" to="/education">
                                    Education
                                </NavLink>
                                <Typography color="text.primary">Jewelry Care</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Caring for Fine Jewelry</h1>
                                <p className="mt-3">While our jewelry was created to last a lifetime, there are some factors that can contribute to the everyday wear and tear of your fine jewelry.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2>STORING YOUR JEWELRY</h2>
                            <p>Because of the high value and rarity of certain jewelry, some people like to store their jewelry in a safe when not in use. If you have individual gemstones, a soft pouch is good for keeping them from coming in contact with other hard surfaces. Store silver jewelry in a cool, dry place, preferably in a soft piece of felt or cloth. Ask one of our sales representatives about getting a jewelry box for all your valued treasures. If you would like to have your jewelry professionally cleaned, bring it in to Belgium Webnet and we will have your jewelry looking shiny and new!</p>
                            <h2>CLEANING YOUR JEWELRY</h2>
                            <p>Be careful using ultrasonic cleaners, as only certain gemstones can handle the ultrasonic vibrations. Diamond cleaners usually contain ammonia and water. Using a soft brush you can remove dust or dirt from under the setting. Silver jewelry can be cleaned with a silver polishing cloth, with or without special silver cleaning solution.</p>
                            <h2>DIAMOND & COLORED STONES</h2>
                            <ul>
                                <li>Learn about the <NavLink to="/education-diamonds"> 4Cs of Diamonds </NavLink></li>
                                <li>Learn how to <NavLink to="/education-diamond-care"> Care for Diamond Jewelry </NavLink></li>
                                <li>Learn how to <NavLink to="/education-gemstone-care"> Care for Gemstone Jewelry </NavLink></li>
                            </ul>
                            <Button onClick={() => history.push('/diamonds')} variant="contained" className="rcs_education_button">Search Diamonds</Button>
                        </Col>
                    </Row>
                </Container> 
            </div>           
        </>
    )
}

export default EducationJewelryCare;