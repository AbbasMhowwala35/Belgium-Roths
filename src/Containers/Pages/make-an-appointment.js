import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../../Assets/css/myaccount.css'
import TextField from '@mui/material/TextField';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import moment from 'moment';
import axios from 'axios';
import { base_url, postHeader } from '../../Helpers/request';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const MakeAnAppointment = () => {
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
                <title>Make an Appointment | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className='rcs_ringsetting_section mt-3'>
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">
                                    Make An Appointment
                                </Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_myaccount_section rcs_appointment_section text-center">
                <Container>
                    <Row>
                        <Col sm={{ span: 6, offset: 3 }} className="p-md-0">
                            <din className="rcs_top_heading">
                                <h1>Make An Appointment</h1>
                                <p className="mt-3 mb-3">Please enter your name, email address, and the day & time you’d like to meet and someone will respond as soon as possible.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
                <div className="rcs_appointment mt-5">
                    <Row className="w-100 m-auto">
                        <Col sm={12} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }} xl={{ span: 4, offset: 4 }} className="p-md-0">
                            <Form onSubmit={submitForm}>
                                <Row>
                                    <Col xs={12} sm={6}>
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
                                    <Col xs={12} sm={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="First Name"
                                            type="text"
                                            variant="outlined"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            required />
                                    </Col>
                                    <Col xs={12} sm={6}>
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
                                    <Col xs={12} sm={6}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Email Address"
                                            type="Email"
                                            variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </Col>
                                    <Col xs={12} sm={6}>
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
                                <Row>
                                    <Col>
                                        <Button variant="contained" type="submit" className="rcs_acc_button mt-5 mb-5"> <MailOutlineIcon className="mr-2" /> Book My Appointment</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default MakeAnAppointment;