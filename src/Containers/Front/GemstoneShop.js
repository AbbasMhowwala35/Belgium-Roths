import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Gemstones() {
    const history = useHistory();
    return (
        <>
            <section className="rcs_gemstone_section" >
                <Container className="rcs_custom_home_container ">
     
                        <Col md={8} lg={7} className="ml-auto">
                            <div className="rcs_gemstone_content">
                                <h2> The World's Most Vivid Gemstones </h2>
                                <Button className="rcs_fill_button rcs_btn_rd-0  btn btn-primary" onClick={() => history.push('gemstones')}> Shop gemstones </Button>
                            </div>
                        </Col>
                   
                </Container>
            </section>
        </>
    );
}

export default Gemstones;