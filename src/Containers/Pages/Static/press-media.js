import React, { useState, useEffect } from 'react';
import "../../../Assets/css/mjstatic.css";
import "../../../Assets/css/home.css";
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { base_url, postHeader } from '../../../Helpers/request';
import { toast } from 'react-toastify';

const PressMedia = () => {
    const [pressmedia, setPressmedia] = useState([]);
    useEffect(() => {
        axios.get(base_url + '/common/pressMedia', {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setPressmedia(res.data.data?.press_data)
                } else {
                    toast.error(res.data.data?.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Press & Media</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_myaccount_section">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Press & Media</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Press & Media</h1>
                            </din>
                        </Col>
                    </Row>
                </Container>
                <div className="rcs_media_section mt-5">
                    <Container>
                        <Row className="w-100 m-auto">
                            {pressmedia?.map(val =>
                                <Col xs={12} sm={6} md={3}>
                                    <div className="rcs_card_container">
                                        <NavLink to={"/press-media-details/" + val.press_id}>
                                            { val?.images && val.images?.map((item, index) =>
                                                <div className={index == 0 ? "rcs_front_media_section" : "rcs_back_media_section"}>
                                                    <Image src={item} alt="Press Media"></Image>
                                                </div>
                                            )}
                                        </NavLink>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default PressMedia;