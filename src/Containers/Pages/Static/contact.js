import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import '../../../Assets/css/myaccount.css'
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Social1 from '../../../Assets/images/static/Social/1.png';
import Social2 from '../../../Assets/images/static/Social/2.png';
import Social3 from '../../../Assets/images/static/Social/3.png';
import Social4 from '../../../Assets/images/static/Social/4.png';
import Social5 from '../../../Assets/images/static/Social/5.png';
import Social6 from '../../../Assets/images/static/Social/6.png';
import Social7 from '../../../Assets/images/static/Social/7.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { base_url, postHeader } from '../../../Helpers/request';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';

const Contact = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');

    const formsubmit = (e) => {
        e.preventDefault();
        var data = {
            first_name,
            last_name,
            email,
            phone,
            comment
        }
        axios.post(base_url + '/user/contact', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setFirst_name("");
                    setLast_name("");
                    setEmail("");
                    setComment("");
                    setPhone("");
                    return swal(response.data.message, "", "success");
                } else {
                    return swal(response.data.message, "", "error");
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
                <title>Contact Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Contact Us</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                </Container>
                <div className="rcs_appointment mt-5">
                    <Container>
                        <Row className="w-100 m-auto">
                            <Col className="p-md-0 mb-5">
                                <iframe src="https://www.google.com/maps/embed?pb=!4v1646209341525!6m8!1m7!1sYTHlp87DEA6iOPPnYy8Zhw!2m2!1d40.75713341019492!2d-73.97968993909187!3f211.59283!4f0!5f0.7820865974627469" width="100%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                            </Col>
                        </Row>
                        <Row className="w-100 m-auto">
                            <Col sm={12} md={6} className="p-md-0">
                                <Form onSubmit={formsubmit}>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <TextField
                                                id="outlined-basic"
                                                label="First Name"
                                                type="text"
                                                variant="outlined"
                                                value={first_name}
                                                onChange={(e) => setFirst_name(e.target.value)}
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Last Name"
                                                type="text"
                                                variant="outlined"
                                                value={last_name}
                                                onChange={(e) => setLast_name(e.target.value)}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email Address"
                                                type="Email"
                                                variant="outlined"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Phone"
                                                type="number"
                                                variant="outlined"
                                                InputProps={{ inputProps: { min: 0 } }}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <TextField
                                                id="filled-multiline-static"
                                                label="Your Message"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button variant="contained" type="submit" className="rcs_acc_button"> <MailOutlineIcon className="mr-2" /> Send Message </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                            <Col sm={12} md={6}>
                                <div className="rcs_contact_content">
                                    <h1>Contact Us</h1>
                                    <p>Please send us a message, and our staff will be happy to help you with any questions you have.</p>
                                    <ul className="rcs_content_address">
                                        <li>
                                            <h5>STORE ADDRESS</h5>
                                            <address class="mb-0">
                                                <a target="_blank " href="https://www.google.com/maps/dir/Sector+A,+Sheetal+Nagar,+Indore,+Madhya+Pradesh+452010/20+W+47th+St,+New+York,+NY+10036,+USA/@26.3603487,-36.1143625,3z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x39631d555ca55dc3:0x5af9624c3cc07388!2m2!1d75.9005934!2d22.7513527!1m5!1m1!1s0x89c258fe551dddd5:0xfd37c59c866f0bf0!2m2!1d-73.9798128!2d40.7569538">20 W 47th St, Suite 601<br />New York, NY 10036</a>
                                            </address>
                                        </li>
                                        <li>
                                            <h5>STORE HOURS</h5>
                                            <strong>Monday - Saturday:</strong> 10:00 am - 6:00 pm<br /><strong>Sunday:</strong> Closed<br />
                                        </li>
                                    </ul>
                                    <h4>FOLLOW US</h4>
                                    <ul className="rcs_content_social">
                                        <li><NavLink onClick={() => window.open("https://www.facebook.com/belgiumwebnet/", "_blank")} to="#"><Image src={Social1} alt="Facebook"></Image></NavLink></li>
                                        <li><NavLink onClick={() => window.open("https://twitter.com/BelgiumWebnet", "_blank")} to="#"><Image src={Social7} alt="twitter"></Image></NavLink></li>
                                        <li><NavLink onClick={() => window.open("https://www.instagram.com/belgium_webnet/", "_blank")} to="#"><Image src={Social2} alt="Instagram"></Image></NavLink></li>
                                        <li><NavLink onClick={() => window.open("https://www.linkedin.com/company/belgium-webnet/", "_blank")} to="#"><Image src={Social3} alt="Linkdin"></Image></NavLink></li>                                        
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Contact;