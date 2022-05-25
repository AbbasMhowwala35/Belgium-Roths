import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import ConsultImg from "../../Assets/images/home/consult-2.jpg";
import calendarIcn from "../../Assets/images/home/calender-icn.png";
import { useHistory } from 'react-router-dom';

const Virtualappointment = () => {
    const history = useHistory();
    return (
        <>
             <section className="rcs_color_virtual_section1">
                <Container className="rcs_custom_home_container pr-0">
                    <Row className="rcs_virtual_appointment_row">                        
                        <Col lg="6" col="12" className="rcs_order_cs">
                            <div className="rcs_virtual_appointment_text">
                               <h2> Consult with a Jewelry Specialist </h2>
                               <p>
                               See the collections in person at either of our <br/>showrooms located in NYC
                               </p>
                                <Button className="rcs_fill_button rcs_btn_rd-0 rcs_new_bg" onClick={() => {history.push('make-an-appointment');window.scrollTo(0,0)}}> 
                                  <img src={calendarIcn} /> Schedule an Appointment
                                </Button>

                            </div>
                        </Col>
                        <Col lg="6" col="12" className="p-0">
                            <div className="rcs_virtual_appointment_img">
                              <img src={ConsultImg} alt="Jewelry-Specialist" title="Jewelry-Specialist"/>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>

        </>
    );
}

export default Virtualappointment;
