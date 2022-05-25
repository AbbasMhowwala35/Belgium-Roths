import React from 'react';
import { Container, Row, Col, NavLink } from 'react-bootstrap';
import "../../Assets/css/home.css";
import feat1 from "../../Assets/images/home/engagement.png";
import feat2 from "../../Assets/images/home/widget-forevermark-optimized.webp";
import feat3 from "../../Assets/images/home/custom-design.png";
import feat4 from "../../Assets/images/home/widget-financing-optimized.webp";
import { useHistory } from 'react-router-dom';

const Featured = () => {
    const history = useHistory();
    return (
        <>
            <Container className="rcs_nopd mt-5" fluid>
                <Row className="m-0 w-100">
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="rcs_featured_list">
                            <NavLink onClick={() => history.push("/ringsettings")} className="d-block widget-inner">
                                <img src={feat1} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="rcs_featured_list">
                            <NavLink to="#" className="d-block widget-inner">
                                <img src={feat2} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="rcs_featured_list">
                            <NavLink onClick={() => history.push("/custom-design")} className="d-block widget-inner">
                                <img src={feat3} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={3}>
                        <div className="rcs_featured_list">
                            <NavLink onClick={() => history.push("/financing")} className="d-block widget-inner">
                                <img src={feat4} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                            <span className="content-block">
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Featured;