import React from 'react';
import { Container, Row, Col, NavLink, Button } from 'react-bootstrap';
import google from "../../Assets/images/home/google-img.png";
import userImg from "../../Assets/images/home/slide-user-img.png";
import googleReview from "../../Assets/images/home/google-review-1.png";
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';


const Customer = () => {
    var settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <section className="rcs_customer_say_section">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col lg="12" col="12">
                            <div className="rcs_customer_say_title">
                                <h2> What our customers say </h2>
                            </div>
                        </Col>
                        <Col lg={6} xs={12} sm={6}>
                            <div className="rcs_customer_google_rating" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>
                                <div className="rcs_customer_google_rating_img">
                                    <img src={google} alt="Google Image" />
                                </div>
                                <div className="rcs_customer_google_rating_star">
                                    <h4>4.7 </h4>
                                    <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="large" readOnly />
                                    </Stack>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} xs={12} sm={6}>
                            <div className="rcs_customer_review_btn">
                                <Button className="rcs_fill_button rcs_btn_rd-0" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}> Write a Review </Button>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="rcs_customer_review_slider">
                                <Slider className="rcs_customer_say_inner" {...settings2}>
                                    <div className="rcs_customer_review_slide_item">
                                        <div className="rcs_customer_slide_title_img">
                                            <div className="rcs_customer_review_slide_img">
                                                <img src={userImg} alt="Review User Image" />
                                            </div>
                                            <div className="rcs_customer_review_slide_title">
                                                <h3>Monika Maslana</h3>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="medium" readOnly />
                                            </div>
                                        </div>
                                        <div className="rcs_customer_slide_text_content">
                                            <p>
                                                I've been a customer of Belgium Webnet
                                                for many years and I've been
                                                very happy with them.
                                            </p>
                                            <Link to="#" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>  Read More </Link>
                                            <img src={googleReview} alt="Google Review img" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")} />
                                        </div>
                                    </div>
                                    <div className="rcs_customer_review_slide_item">
                                        <div className="rcs_customer_slide_title_img">
                                            <div className="rcs_customer_review_slide_img">
                                                <img src={userImg} alt="Review User Image" />
                                            </div>
                                            <div className="rcs_customer_review_slide_title">
                                                <h3>Monika Maslana</h3>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="medium" readOnly />
                                            </div>
                                        </div>
                                        <div className="rcs_customer_slide_text_content">
                                            <p>
                                                I've been a customer of Belgium Webnet
                                                for many years and I've been
                                                very happy with them.
                                            </p>
                                            <Link to="#" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>  Read More </Link>
                                            <img src={googleReview} alt="Google Review img" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")} />
                                        </div>
                                    </div>
                                    <div className="rcs_customer_review_slide_item">
                                        <div className="rcs_customer_slide_title_img">
                                            <div className="rcs_customer_review_slide_img">
                                                <img src={userImg} alt="Review User Image" />
                                            </div>
                                            <div className="rcs_customer_review_slide_title">
                                                <h3>Monika Maslana</h3>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="medium" readOnly />
                                            </div>
                                        </div>
                                        <div className="rcs_customer_slide_text_content">
                                            <p>
                                                I've been a customer of Belgium Webnet
                                                for many years and I've been
                                                very happy with them.
                                            </p>
                                            <Link to="#" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>  Read More </Link>
                                            <img src={googleReview} alt="Google Review img" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")} />
                                        </div>
                                    </div>
                                    <div className="rcs_customer_review_slide_item">
                                        <div className="rcs_customer_slide_title_img">
                                            <div className="rcs_customer_review_slide_img">
                                                <img src={userImg} alt="Review User Image" />
                                            </div>
                                            <div className="rcs_customer_review_slide_title">
                                                <h3>Monika Maslana</h3>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="medium" readOnly />
                                            </div>
                                        </div>
                                        <div className="rcs_customer_slide_text_content">
                                            <p>
                                                I've been a customer of Belgium Webnet
                                                for many years and I've been
                                                very happy with them.
                                            </p>
                                            <Link to="#" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>  Read More </Link>
                                            <img src={googleReview} alt="Google Review img" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")} />
                                        </div>
                                    </div>
                                    <div className="rcs_customer_review_slide_item">
                                        <div className="rcs_customer_slide_title_img">
                                            <div className="rcs_customer_review_slide_img">
                                                <img src={userImg} alt="Review User Image" />
                                            </div>
                                            <div className="rcs_customer_review_slide_title">
                                                <h3>Monika Maslana</h3>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={4.5} size="medium" readOnly />
                                            </div>
                                        </div>
                                        <div className="rcs_customer_slide_text_content">
                                            <p>
                                                I've been a customer of Belgium Webnet
                                                for many years and I've been
                                                very happy with them.
                                            </p>
                                            <Link to="#" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")}>  Read More </Link>
                                            <img src={googleReview} alt="Google Review img" onClick={() => window.open("https://www.google.com/search?q=belgium+webnet+google+reviews&oq=belgium+webnet+google+revierw&aqs=chrome.4.69i57j33i160l3j33i21.9630j0j7&sourceid=chrome&ie=UTF-8#lrd=0x89c2590a50b3a235:0x8af09874060f51fc,1,,,", "_blank")} />
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Customer;
