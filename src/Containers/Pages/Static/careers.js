import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/mjstatic.css"
import careersSearch from '../../../Assets/images/static/JobeSearch.jpg';

const Careers = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Careers</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_careers_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_military_discount_content mt-5 mb-5">
                            <h1 className="text-center">Career Opportunities</h1>                            
                            <p className="text-center d-block">We are hiring! At Belgium Webnet, we are consultants rather than sales people, and we are dedicated to helping each and every customer find the jewelry piece of their dreams.</p>
                            <p className="text-center d-block">We are seeking self-motivated individuals to join our team who are committed to driving results, providing a unique, customized client experience, and being part of a passionate, multi-faceted team.</p>
                            <p className="text-center d-block">If you are an outgoing, friendly individual and team player who is passionate about jewelry, we encourage you to apply!</p>
                            <p className="text-center d-block">After you submit your application, it will be carefully reviewed by our management team. Interviews will then be conducted for those in consideration. If you are selected for an opportunity, you will continue into the pre-employment process.   </p>
                            <NavLink onClick={() => window.open("https://www.indeed.com/q-malak-jewelers-l-Charlotte,-NC-jobs.html", "_blank")} to="#"><Image src={careersSearch} className="careers_search_img" alt="search image"></Image></NavLink>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Careers;