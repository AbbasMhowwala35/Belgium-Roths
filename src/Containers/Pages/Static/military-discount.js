import React from 'react'
import { Container, Col, Row, Form, Image } from 'react-bootstrap';
import "../../../Assets/css/mjstatic.css"
import military1 from '../../../Assets/images/static/resized-50.jpg';
import military2 from '../../../Assets/images/static/resized-100.jpg';
import military3 from '../../../Assets/images/static/resized-250.jpg';
import military4 from '../../../Assets/images/static/resized-500.jpg';
import { Helmet } from 'react-helmet';

const MilitaryDiscount = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Military Discount</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_military_discount_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_military_discount_content mt-5 mb-5">
                            <h1 className="text-center">HONORING THOSE WHO SERVE</h1>
                            <p className="text-center d-block">At Belgium Webnet, we like to show our appreciation and support for the brave soldiers who commit their lives to protecting our country, as well as their families. Belgium Webnet is honored to give back and celebrate the military community by offering the following gift certificates:</p>
                            <ul>
                                <li><Image src={military1} alt="gift images"></Image></li>
                                <li><Image src={military2} alt="gift images"></Image></li>
                                <li><Image src={military3} alt="gift images"></Image></li>
                                <li><Image src={military4} alt="gift images"></Image></li>
                            </ul>
                            <p className="text-center d-block" style={{ fontStyle: "italic" }}>Please note that these discounts cannot be combined. Present gift card at checkout. </p>
                            <h2 className="text-center">HOW TO PROVE STATUS </h2>
                            <p className="text-center d-block">Active and retired military personnel will need to present a form of military identification to qualify for this discount. This includes at least one of the following: (1) a military identification card, (2) a veteran identification card, or (3) a driver's license with the veteran's designation</p>
                            <h2 className="text-center">WHY BELGIUM WEBNET?</h2>
                            <p className="text-center d-block mb-5">When you shop at Belgium Webnet, you come in as a customer, but leave as a friend. We will make sure that you leave our store with the jewelry piece of your dreams, and if you cannot find it, we will work with you to custom design it. Furthermore, Belgium Webnet offers one of the best discounts for active and veteran service members in the Carolinas.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MilitaryDiscount;