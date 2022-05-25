import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import aboutImg from "../../Assets/images/home/about-us.png";

const AboutSection = () => {
    return (
        <>
            <section className="rcs_about_section">
                <Container >
                    <Row className='align-items-center'>
                        <Col md={7} xs={12} >
                            <div className="rcs_about_img">
                                <img src={aboutImg} alt="about-img" title="about-img"/>
                            </div>
                        </Col>
                        <Col md={5} xs={12}>
                            <div className="rcs_about_text" >
                                <h1> About Us  </h1>
                                <p> Belgium Webnet was founded by Joe Namdar. With over a decade year of
                                    experience in fancy color diamond trading, it is time to open the direct
                                    door of color diamonds to jewelry lovers such as yourself.
                                    Joe Namdar is one of the few experts in color diamonds, with a vast
                                    family history and education in all fancy colors.
                                    Offering uncompromising quality and unshakeable integrity for our
                                    elite global clientele. </p>
                                <Button className="rcs_fill_button  rd-3"  variant="outline-dark"> READ MORE </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default AboutSection;
