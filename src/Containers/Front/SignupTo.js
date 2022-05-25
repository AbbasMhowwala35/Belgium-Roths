import React, { useState } from 'react';
import { Button, Col, Container, FormControl, Image, InputGroup, Row, Form } from 'react-bootstrap';
import signupTo from "../../Assets/images/home/signup-to.jpg";
import { base_url, currency, currencycode, helmet_url, postHeader } from '../../Helpers/request';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function SignupTo() {
    const history = useHistory();
    const [newsletteremail, setNewsletteremail] = useState("")
    const newsletter = (e) => {
        e.preventDefault();
        const data = {
            currency_code: currencycode,
            email: newsletteremail
        }
        axios.post(base_url + '/common/subscribe_newsletter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setNewsletteremail('');
                    return swal(res.data.message, "", "success");
                } else {
                    return swal(res.data.message, "", "error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <section className="rcs_signup_to_section mt-5">
                <Container fluid>
                    <Row>
                        <Col lg={5} xs={12}>
                            <div className="rcs_signup_to_left_main">
                                <div className="rcs_signup_to_title">
                                    <h2> sign up to be a <br /> belgium webnet insider </h2>
                                    <p>Become a preferred subscriber and get a special offer on your purchase.</p>
                                </div>
                                <div className="rcs_signup_to_input_field">
                                    <Form className="gs_news_form w-100" onSubmit={newsletter}>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Email Address..."
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                type="email"
                                                value={newsletteremail}
                                                required
                                                onChange={(e) => setNewsletteremail(e.target.value)}
                                            />
                                            <Button variant="outline-secondary" type="submit" id="button-addon2">
                                                Join
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                    <p>By signing up you confirm that you have read the <a href="/privacy-policy">Privacy Policy</a> and agree that your email
                                        will be collected and used for the purposes of sending news, promotions and updates via email. You can withdraw your consent at any time by unsubscribing.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} xs={12} className="ml-auto pr-0 p-0">
                            <div className="  rcs_signup_to_right_img">
                                <Image src={signupTo} alt="signup" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}


export default SignupTo;
