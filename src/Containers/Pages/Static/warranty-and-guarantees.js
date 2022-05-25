import React from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const WarrantyGuarantees = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Warranty and Guarantees</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_warranty_guarantees_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_warranty_guarantees_content mt-5 mb-5">
                            <h1>WARRANTY & GUARANTEES</h1>                            
                            <p className="d-block mb-4">Our mission is to ensure that you are happy with your jewelry from the day you make the purchase and every day after. That is why we offer warranties and guarantees to protect your jewelry.All jewelry sold at Belgium Webnet is warranted against any imperfections in manufacturing, design and workmanship. All jewelry has been carefully chosen to exacting quality standards to ensure that every piece is exceptional.</p>
                            <h2>BRAND WARRANTY </h2>
                            <p className="d-block mb-4">All jewelry and timepieces we sell at Belgium Webnet have been carefully selected to meet our high standards, and we back those brands with warranties and other programs.In regards to watches, warranty information varies between manufacturers. When you purchase a watch at Belgium Webnet, we advise you to carefully read the warranty information and register with the watchmaker if needed. </p>
                            <h2>PRECIOUS METAL CONTENT </h2>
                            <p className="d-block mb-4">All rings sold at Belgium Webnet are guaranteed to contain the specific precious metal content that is hallmarked inside the ring. Each ring also bears the logo of its respective manufacturer, assuring you of its quality and craftsmanship.  For gold jewelry 21 karats or higher, there are absolutely no refunds and only exchanges will be offered within 14 days of the purchase date, and only if the item is unworn and in new condition with the tag(s) in place and untampered with.  The exchange is valid for one-time only.  </p>
                            <h2>DIAMOND GRADING </h2>
                            <p className="d-block mb-4">All diamonds sold at Belgium Webnet have been graded and certified by experts according to the GIA grading system. </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WarrantyGuarantees;