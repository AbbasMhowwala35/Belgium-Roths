import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { Helmet } from 'react-helmet';

const EducationDiamondBuying = () => {
    const history = useHistory();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Diamond Buying Tips | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Diamond Buying Tips</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Diamond Buying Tips</h1>
                                <p className="mt-3">Buying a diamond could be one of the most important purchases in one’s life. The following tips may help make it easier to make this important purchase.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2>DIAMOND WEIGHT & SIZE</h2>
                            <p>Some people want to buy the biggest diamond possible. Is this always the right choice? We feel that it's always a matter of preference, but here's something to think about:</p>
                            <p>The larger the diamond, chances are the more inclusions it likely has, and because it's larger, these inclusions are typically even more visible than on a smaller diamond. But most importantly, if the diamond cut isn't proportioned correctly, it won't return the maximum amount of light through the top of the diamond.</p>
                            <p>This illustrates that no matter how large the diamond, its cut and proportions determine how brilliant the diamond really is.</p>
                            <h2>DIAMOND COLOR</h2>
                            <p>Since diamond colors range from colorless to yellowish-brown, sometimes these colors can add warmth or depth to your diamond. Also, by mounting a non-colorless diamond in yellow gold can make the diamond appear colorless in some cases.</p>
                            <p>We are always happy to share our expertise about diamonds. Please let us know how we can help you make a confident decision in your diamond purchase.</p>
                            <h2>MORE DIAMOND EDUCATION</h2>
                            <ul>
                                <li>Learn about the <NavLink to="/education-diamonds"> 4Cs of Diamonds </NavLink></li>
                                <li>Schedule a <NavLink to="/contact"> Diamond Consultation </NavLink> with us</li>
                                <li>Learn how to <NavLink to="/education-diamond-care"> Care for your Diamonds </NavLink></li>
                            </ul>
                            <Button onClick={() => history.push('/diamonds')} variant="contained" className="rcs_education_button">Search Diamonds</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EducationDiamondBuying;