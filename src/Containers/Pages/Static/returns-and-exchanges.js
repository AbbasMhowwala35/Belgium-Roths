import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const ReturnsExchanges = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Returns and Exchanges</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_returns_exchanges_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_free_diamond_content mt-5 mb-5">
                            <h1>RETURN & EXCHANGE POLICY</h1>
                            <p className="mt-5 text-center">When you purchase a piece of jewelry at Belgium Webnet, you have two weeks to return the item(s) and four weeks to exchange the item(s). You must provide the original receipt and the packaging and the merchandise must be unworn and in pristine condition. We do not offer refunds on special orders or altered, damaged, discounted, financed, and layaway items.</p>
                            <p className="text-center">Cancelled layaway is subject to a 10% restocking fee on full priced items. </p>
                            <p className="text-center"><strong>Please note:</strong> Due to rapid fluctuation in gold pricing, 21k, 22k and 25k gold items are nonrefundable.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ReturnsExchanges;