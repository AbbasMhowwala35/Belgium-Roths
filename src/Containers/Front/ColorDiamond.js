import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FancyDiamond from "../../Assets/images/home/fancy-color.png";

const Colordiamond = () => {
    return (
        <>
            <section className="rcs_color_diamond_section1">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg={12}>
                            <div className="rcs_color_diamond_title">
                                <h1> Fancy color diamonds </h1>
                            </div>
                        </Col>
                        <Col lg="6" col="12" className="m-auto">


                            <div className="rcs_fancy_c_diamond_img">
                                <img src={FancyDiamond} alt="fancy-color-diamond" title="fancy-color-diamond"/>
                                {/* <Link to=""> <img src={FancyDiamond} />  </Link> */}
                            </div>

                            <div className="rcs_fancy_c_diamond_btn">
                                <Button className="rcs_fill_button rcs_btn_rd-0 "> Shop Fancy Diamonds </Button>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Colordiamond;
