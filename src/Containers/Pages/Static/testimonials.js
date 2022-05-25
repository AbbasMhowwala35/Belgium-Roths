import React, { useEffect, useState } from 'react';
import "../../../Assets/css/mjstatic.css";
import "../../../Assets/css/home.css";
import { Breadcrumbs, Divider, Link, Typography } from '@material-ui/core';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
 import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { base_url, isLogin, postHeader, user } from '../../../Helpers/request';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Rating } from '@mui/material';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const Testimonials = () => {
    const [comment, setComment] = React.useState('');
    const [reviewData, setReviewData] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ratings = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
    ];
    const [rating, setRating] = React.useState('1');

    const handleChange = (event) => {
        setRating(event.target.value);
    };
    useEffect(() => {
        getReview();
    }, [])
    const getReview = () =>{
        axios.get(base_url + '/common/reviews_list', {
            headers: postHeader
          })
            .then(response => {
              if (response.data.status == 1) {
                setReviewData(response.data.data)
              } else {
                toast.error(response.message, { autoClose: 3000 });
              }
            })
            .catch((error) => {
              console.log(error);
            });
    }
    const submitReview = () =>{
        const data={
            user_id: user?.user_id,
            token: user?.token,
            rating,
            review:comment
        }
        axios.post(base_url + '/common/add_review', data,{
            headers: postHeader
          })
            .then(response => {
              if (response.data.status == 1) {
                getReview();
                setShow(false)
                setComment("")
                setRating('')
              } else {
                toast.error(response.message, { autoClose: 3000 });
              }
            })
            .catch((error) => {
              console.log(error);
            });

    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Testimonials | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Reviews</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Reviews</h1>
                            </din>
                        </Col>
                    </Row>
                </Container>
                <div className="rcs_testimonial_section mt-3">
                    <Container>
                        {reviewData.average_rating ?
                        <Row className="w-100 m-auto">
                            <Col xs={12} sm={9} className="p-md-0 mb-2">
                                <h1>CURRENT RATING:</h1>
                            </Col>
                            <Col xs={12} sm={3} className="p-md-0">
                                <h6>{(reviewData?.average_rating)?.toFixed(1)} OF 5</h6>
                            </Col>
                        </Row>:""}
                        {reviewData?.review_data?.map(val=>
                        <Row className="m-auto w-100">
                            <Col className="p-md-0">
                                <div className="rcs_testimonial_content">
                                    <div className="media">
                                        <div className="rcs_test_cotnent">
                                            {/* <Image src="https://lh3.googleusercontent.com/a/AATXAJydJMaj6WnAoZBIzAt8qeai6gcdqKdV9lFBWCWw=s128-c0x00000000-cc-rp-mo"></Image> */}
                                            <span className='rcs_user_name'>{val.first_name[0]}</span>
                                            <Rating name="read-only" value={val.rating} readOnly />
                                        </div>
                                        <div className="media-body">
                                            <p className="pt-2 pr-md-30 mb-0 small">{val.review}</p>
                                            <label className="mb-0">{val.first_name} {val.last_name}</label>
                                            <small>Posted on {moment(new Date(val.created_at)).format("YYYY-MM-DD")}</small>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        )}
                        
                        <Divider></Divider>
                        <Row className="m-auto w-100 justify-content-center">
                            <h2>DID YOU HAVE A GOOD EXPERIENCE WITH US?</h2>
                            <Button variant="contained" type="submit" onClick={()=> isLogin ? handleShow() : document.getElementById("loginbutton")?.click() } className="rcs_acc_button mt-2 mb-5"> Write a Review </Button>
                        </Row>
                    </Container>
                </div>
            </div>
            {/*Review Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>WRITE A REVIEW</Modal.Title>
                    <button type="button" onClick={handleClose} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="rcs_add_address">
                        <Row>
                            <Col>
                                <p>Enter your information below and tell us about your experience.</p>
                            </Col>
                        </Row>
                        <Form>
                           
                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Rating"
                                        value={rating}
                                        onChange={handleChange}
                                    >
                                        {ratings.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        id="outlined-basic"
                                        multiline
                                        rows={4}
                                        label="Testimonial"
                                        type="text"
                                        variant="outlined"
                                        value={comment}
                                        onChange={(e)=> setComment(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="rcs_cancel_button mr-2" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className="rcs_save_button" onClick={submitReview}>
                        Submit Testimonial
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Review Modal*/}
        </>
    )
}

export default Testimonials;