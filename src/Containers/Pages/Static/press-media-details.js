import React, { useState,useEffect } from 'react';
import "../../../Assets/css/mjstatic.css";
import "../../../Assets/css/home.css";
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { base_url, postHeader } from '../../../Helpers/request';
import { toast } from 'react-toastify';

const PressMediaDetails = (props) => {
    const [pressmedia, setPressmedia] = useState([]);
    useEffect(() => {
        var data ={
            press_id: props.match.params.id
        }
        axios.post(base_url + '/common/pressMediaDetail',data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setPressmedia(res.data.data)
                } else {
                    toast.error(res.data.data.message, { autoClose: 3000 });
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
                            <Col xs={12}>
                                <div className="rcs_media_details">
                                   {pressmedia?.press_images?.map(val =>
                                    <Image src={ val.image} alt="Press Media"></Image>
                                   )}
                                    <NavLink to="/press-media">CLICK HERE TO RETURN TO PREVIOUS PAGE</NavLink>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default PressMediaDetails;