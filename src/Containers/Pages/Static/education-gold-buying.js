import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import goldPrice from '../../../Assets/images/education/2a-kgdx-usd.gif'
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet';

const EducationGoldBuying = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gold Buying Guide | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Gold Buying Guide</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Gold Buying Guide</h1>
                                <p className="mt-3">The price of gold is changing every minute, which constantly affects the retail cost of fine jewelry. Bring your unworn jewelry into Belgium Webnet, and we can give you a detailed quote based on today’s gold market.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2>THE CURRENT PRICE OF GOLD</h2>
                            <Image src={goldPrice} alt="THE CURRENT PRICE OF GOLD"></Image>
                            <p>Please refresh the page to update the live price of gold in real time.</p>
                            <h4><strong>Source</strong> <NavLink to="https://www.kitco.com/">www.kitco.com</NavLink> </h4>
                        </Col>
                    </Row>
                </Container> 
            </div>           
        </>
    )
}

export default EducationGoldBuying;