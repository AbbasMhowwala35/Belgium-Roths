import React from 'react';
import { Form } from 'react-bootstrap';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { base_url } from '../../Helpers/request';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const history = useHistory()
    const [value, setValue] = React.useState('1');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [postalcode, setPostalcode] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [city, setCity] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const submitRegister = (e) =>{
        e.preventDefault();
        const data ={
            username:'',
            first_name:firstname,
            last_name:lastname,
            email,
            phone,
            company,
            address1,
            address2,
            zip:postalcode,
            state,
            country,
            city,
            password
        }
        axios.post(base_url + '/user/register', data, {
            headers: {
                // 'authorization':`Token e222085edc871220cae528152b73c1317ba2addf`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.status == 1) {  
                    var user = {
                        token: response.data.data.token,
                        user_id: response.data.data.user_id,
                        email: response.data.data.email,
                        first_name: response.data.data.first_name,
                        last_name: response.data.data.last_name,
                        isLogin: true
                    }
                    localStorage.setItem("bw-user", JSON.stringify(user));
                  history.push('/');
                  window.location.reload(true); 
                } else {
                    return swal(response.data.message,"", "error");
                }
            })
            .catch((error) => {
                console.log(error);
            });    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Register</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Register an Account</h1>
                            </din>
                        </Col>
                    </Row>
                    <Row className="rcs_tab_section m-auto w-100">
                        <Col className="p-0">
                            <div className="rcs_register_content mt-2 pt-2">
                                <Row className="m-auto w-100">
                                    <Col xs={12} sm={8} md={4}>
                                        <div class="alert alert-info text-left d-flex"> <InfoOutlinedIcon /> <span>Enter your information to register an account.</span></div>
                                    </Col>
                                    <Col xs={12} sm={12} md={8} className="p-0">
                                        <div className="rcs_account_content_left">
                                            <Form onSubmit={submitRegister}>
                                                <Row>
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="First Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={firstname}
                                                            onChange={(e) => setFirstname(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Last Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={lastname}
                                                            onChange={(e) => setLastname(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
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
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Phone"
                                                            type="number"
                                                            variant="outlined"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            InputProps={{ inputProps: { min: 0 } }}
                                                            required
                                                        />
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Company"
                                                            type="text"
                                                            variant="outlined"
                                                            value={company}
                                                            onChange={(e) => setCompany(e.target.value)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Address Line 1"
                                                            type="text"
                                                            variant="outlined"
                                                            value={address1}
                                                            onChange={(e) => setAddress1(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Address Line 2"
                                                            type="text"
                                                            variant="outlined"
                                                            value={address2}
                                                            onChange={(e) => setAddress2(e.target.value)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Country"
                                                            type="text"
                                                            variant="outlined"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="City"
                                                            type="text"
                                                            variant="outlined"
                                                            value={city}
                                                            onChange={(e) => setCity(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Select State/Province"
                                                            type="text"
                                                            variant="outlined"
                                                            value={state}
                                                            onChange={(e) => setState(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xs={12} sm={6} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Postal Code"
                                                            type="number"
                                                            variant="outlined"
                                                            value={postalcode}
                                                            onChange={(e) => setPostalcode(e.target.value)}
                                                            required
                                                            InputProps={{ inputProps: { min: 0 } }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} className="rcs_custom_padding">
                                                        <TextField
                                                            id="outlined-basic"
                                                            label="Desired Password"
                                                            type="password"
                                                            variant="outlined"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="rcs_custom_padding" sm={{span: "4", offset:"4"}}>
                                                        <Button variant="contained" type="submit" className="rcs_acc_button" style={{margin: '0 auto',display: 'block'}}>Register</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Register;