import React from 'react';
import { Container, Row, Col, NavLink } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import collection_img4 from "../../Assets/images/home/pendant.png";
import collection_img5 from "../../Assets/images/home/bracelet.png";
import collection_img6 from "../../Assets/images/home/gemstone.png";
import { useHistory } from 'react-router-dom';

const Collection2 = () => {
    const history = useHistory();
    return (
        <>
            <Container className="rcs_newcontainer" fluid>
                <Row className="m-0 w-100">
                    <Col xs={12} sm={6} md={6} lg={4}>
                        <div className="rcs_collection">
                            <NavLink onClick={() => history.push("/jewelry/pendants")} className="d-block widget-inner">
                                <img src={collection_img4} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                            <span onClick={() => history.push("/jewelry/pendants")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                                Pendant Collection
                            </span>
                            {/* <span className="content-block">
                                <span className="d-flex flex-column align-self-center w-100">
                                    <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                                        <span className="w-auto d-inline-flex">
                                            <h3 className="w-100 d-block text-center">Pendants</h3>
                                        </span>
                                    </span>
                                </span>
                            </span> */}
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4}>
                        <div className="rcs_collection">
                            <NavLink onClick={() => history.push("/jewelry/bracelets")} className="d-block widget-inner">
                                <img src={collection_img5} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                            <span onClick={() => history.push("/jewelry/bracelets")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                                Bracelet Collection
                            </span>
                            {/* <span className="content-block">
                                <span className="d-flex flex-column align-self-center w-100">
                                    <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                                        <span className="w-auto d-inline-flex">
                                            <h3 className="w-100 d-block text-center">Bracelets</h3>
                                        </span>
                                    </span>
                                </span>
                            </span> */}
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={4}>
                        <div className="rcs_collection">
                            <NavLink onClick={() => history.push("/gemstones")} className="d-block widget-inner">
                                <img src={collection_img6} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
                            </NavLink>
                            <span onClick={() => history.push("/gemstones")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                                Gemstone Collection
                            </span>
                            {/* <span className="content-block">
                                <span className="d-flex flex-column align-self-center w-100">
                                    <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                                        <span className="w-auto d-inline-flex">
                                            <h3 className="w-100 d-block text-center">Gemstones</h3>
                                        </span>
                                    </span>
                                </span>
                            </span> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Collection2;