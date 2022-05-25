import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { base_url, postHeader } from '../Helpers/request';
import swal from 'sweetalert';
import {  Divider } from '@material-ui/core';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Col, Row, Modal, Form } from 'react-bootstrap';
import { TextField, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ProductAppoitnment = ({ type, id, handleClose }) => {

    const [open, setOpen] = useState(true);
    const [date, setDate] = useState(
        moment(new Date()).add(1, 'days').format("YYYY-MM-DD")
    );
    const [time, setTime] = useState('10:00 AM');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    function disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6 || moment(date).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD");
    }
    const submitForm = (e) => {
        e.preventDefault();
        var data = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            phone: phone,
            date: date,
            time: time,
            comment: comment,
            type: type,
            product_id: id
        }
        axios.post(base_url + '/common/makeappointment', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setFirstname("");
                    setLastname("");
                    setEmail("");
                    setComment("");
                    setPhone("");
                    setTime("");
                    setDate("");
                    handleClose();
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
        <Modal show={open} onHide={() => handleClose()}>
            <Form onSubmit={submitForm}>
                <Modal.Header>
                    <Modal.Title>Make An Appointment</Modal.Title>
                    <button type="button" onClick={() => handleClose()} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="rcs_shipping_content mt-2 mb-5">
                        <Row>
                            <Col sm={12}>
                                <din className="rcs_top_heading">
                                    <p className="mt-3 mb-3">Please enter your name, email address, and the day & time you’d like to meet and someone will respond as soon as possible.</p>
                                </din>
                            </Col>
                        </Row>
                        <div className="rcs_appointment mt-5">
                            <Row className="w-100 m-auto">
                                <Col sm={12} className="p-md-0">
                                    <Row>
                                        <Col xs={12} sm={6} className='rcs_appointment_label'>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Desired Date"
                                                value={date}
                                                disablePast
                                                shouldDisableDate={disableWeekends}
                                                onChange={(newValue) => {
                                                    setDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        </Col>
                                        <Col xs={12} sm={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="mj_time_dropdown">Desired Time</InputLabel>
                                                <Select
                                                    labelId="mj_time_dropdown"
                                                    id="mj_time_dropdown"
                                                    value={time}
                                                    label="Desired Time"
                                                    required
                                                    onChange={(e) => setTime(e.target.value)}
                                                >
                                                    <MenuItem value='10:00 AM'>10:00 AM</MenuItem>
                                                    <MenuItem value='10:30 AM'>10:30 AM</MenuItem>
                                                    <MenuItem value='11:00 AM'>11:00 AM</MenuItem>
                                                    <MenuItem value='11:30 AM'>11:30 AM</MenuItem>
                                                    <MenuItem value='12:00 PM'>12:00 PM</MenuItem>
                                                    <MenuItem value='12:30 PM'>12:30 PM</MenuItem>
                                                    <MenuItem value='01:00 PM'>01:00 PM</MenuItem>
                                                    <MenuItem value='01:30 PM'>01:30 PM</MenuItem>
                                                    <MenuItem value='02:00 PM'>02:00 PM</MenuItem>
                                                    <MenuItem value='02:30 PM'>02:30 PM</MenuItem>
                                                    <MenuItem value='03:00 PM'>03:00 PM</MenuItem>
                                                    <MenuItem value='03:30 PM'>03:30 PM</MenuItem>
                                                    <MenuItem value='04:00 PM'>04:00 PM</MenuItem>
                                                    <MenuItem value='04:30 PM'>04:30 PM</MenuItem>
                                                    <MenuItem value='05:00 PM'>05:00 PM</MenuItem>
                                                    <MenuItem value='05:30 PM'>05:30 PM</MenuItem>
                                                    <MenuItem value='06:00 PM'>06:00 PM</MenuItem>
                                                    <MenuItem value='06:30 PM'>06:30 PM</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6} className='rcs_appointment_label'>
                                            <TextField
                                                id="outlined-basic"
                                                label="First Name"
                                                type="text"
                                                variant="outlined"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                required />
                                        </Col>
                                        <Col xs={12} sm={6} className='rcs_appointment_label'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Last Name"
                                                type="text"
                                                variant="outlined"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                required />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6} className='rcs_appointment_label'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email Address"
                                                type="Email"
                                                variant="outlined"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                        </Col>
                                        <Col xs={12} sm={6} className='rcs_appointment_label'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Phone"
                                                type="number"
                                                variant="outlined"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                InputProps={{ inputProps: { min: 0 } }}
                                                required />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <TextField
                                                id="filled-multiline-static"
                                                label="Items I'm Interested In"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" className="rcs_cancel_button mr-2" onClick={() => handleClose()}>
                        Close
                    </Button> */}
                    <Button variant="primary" type="submit" className="rcs_save_button" >
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

const ShippingModal = ({shippingterm,handleCloseShipping}) => {
  
    return (
        <Modal show={true} onHide={()=>handleCloseShipping()}>
            <Modal.Header>
                <Modal.Title>SHIPPING INFORMATION</Modal.Title>
                <button type="button" onClick={()=>handleCloseShipping()} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            </Modal.Header>
            <Modal.Body>
                <div className="rcs_shipping_content mt-2 mb-5">
                    <h2>SHIPPING METHODS</h2>
                    <ul>
                        {shippingterm?.map(val =>
                            <li>{val.shipping_name}</li>
                        )}
                    </ul>

                </div>
            </Modal.Body>
        </Modal>
    )
}

const ReturnModal = ({handleCloseReturn}) => {
    return (
        <Modal show={true} onHide={handleCloseReturn} className="rcs_return_modal">
            <Modal.Header>
                <Modal.Title>RETURN POLICIES</Modal.Title>
                <button type="button" onClick={handleCloseReturn} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            </Modal.Header>
            <Modal.Body>
                <div className="rcs_shipping_content mt-2 mb-5">
                    <p>At Belgium Webnet we want you to be satisfied with your purchase. If for any reason you are not satisfied, you may be able to return your items for refund or in-store credit. Please read through the following information carefully before attempting to return or exchange your product. If you do not comply with store policies, we may not be able to process your return or exchange.</p>
                    <Divider />
                    <h2>RETURNING YOUR PURCHASE</h2>
                    <span>You can return the product to us in-store or return to us by mail at your own expense.</span>
                    <span>We request that you send us the merchandise by registered post and that you purchase insurance with your carrier for the value of the merchandise. If you elect not to purchase insurance, you are liable for any and all damages. We are not responsible for returns that do not have tracking/delivery confirmation showing that the package was received in our store. Please pack returns in original outer box or another sturdy shipping box with appropriate packing materials to ensure the product arrives to our store in good condition.</span>
                    <span>Please send all returns to: Belgium Webnet</span>
                    <p>8042 Providence Rd Ste 1000<br />Charlotte, NC 28277-9737</p>
                    <Divider />
                    <h2>RETURN CONDITIONS</h2>
                    <span>You have 15 days to return an item once it has been received. Items must be returned unused, in their original packaging, and in a saleable state to be accepted for return. Personalized or custom pieces are not eligible for returns.</span>
                    <Divider />
                    <h2>RECEIVING A REFUND</h2>
                    <span>A refund will be submitted in the method originally used for purchase for all items eligible for return. Recipients may elect to receive in-store credit instead of a cash reimbursement upon request. Gift recipients will receive a nonrefundable in-store credit in an amount equal to the cost of the item. Cash refunds are not available at any in-person locations. Please allow 7-10 business days for a return to be posted.</span>
                    <Divider />
                    <h2>EXCHANGES</h2>
                    <span>All of our items are carefully hand-inspected by our team to ensure they are free of defects; however, in the unlikely event that we have missed something, you will be able to exchange your defective product within 30 days of receipt. Since many of our pieces are one-of-a-kind and may be difficult to replace with an exact match, you may elect to receive in-store credit in an equal amount to your original purchase to spend at our store. Custom jewelry and personalized items are not included in our exchange policy. Gemstones, including diamonds, are not covered by this policy and are sold as-is. Any damages not due to manufacturing defects are not eligible for return or exchange.</span>
                    <Divider />
                    <h2>GIFT RETURNS</h2>
                    <span>Gift returns without a receipt are eligible for exchanges and in-store credit only. Please return items in original packaging. Any gift that shows signs of use or wear will not be accepted for exchange.</span>
                    <Divider />
                    <h2>ORDER CANCELLATIONS AND AMENDMENTS</h2>
                    <p>We make an effort to process and ship your orders within 24-48 hours; therefore, we do not accept any modifications to an order once it has been placed. If you need to return an order for any reason, please return it to us within 15 days following our return policy protocol, and we will refund your purchase. If you have made a mistake on a personalized or custom piece, please contact us as soon as possible.</p>
                    <Divider />
                    <h2>PERSONALIZED ITEMS</h2>
                    <span>Personlized items and custom jewelry are not eligible for returns at this time. If you are unsatisfied with your purchase, please contact us at:</span>
                    <p>Belgium Webnet</p>
                    <p>8042 Providence Rd Ste 1000<br />Charlotte, NC 28277-9737</p>
                    <Divider />
                    <h2>CUSTOM AND SPECIAL ORDER ITEMS</h2>
                    <span>Due to the special nature of custom and special order items, these products are not eligible for returns or refunds. Any product that has been built or altered at your request (including ring re-sizing and diamond upgrades) falls under this category and as such is not eligible for exchange.</span>
                    <Divider />
                    <span>If you have questions , please don't hesitate to contact us at:</span>
                    <p>Belgium Webnet</p>
                    <p>8042 Providence Rd Ste 1000<br />Charlotte, NC 28277-9737</p>
                    <span>Belgium Webnet wants to ensure you are happy with your purchase, and we would be happy to work with you to address any concerns you may have or provide more information about our policies should questions arise.</span>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export { ShippingModal, ProductAppoitnment, ReturnModal };
