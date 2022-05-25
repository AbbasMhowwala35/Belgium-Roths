import React, { useState } from 'react';
import { Col, Row, Button, Modal, Form, Image } from 'react-bootstrap';
import '../Assets/css/header.css';
import { useHistory, NavLink } from 'react-router-dom';
import { base_url } from '../Helpers/request';
import { user } from '../Helpers/request';
import 'react-toastify/dist/ReactToastify.css';
import { isMobileOnly, isTablet } from "react-device-detect";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { CircularProgress, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import swal from 'sweetalert';
import login_img from '../Assets/images/icon/user.png';
import { BiUser } from "react-icons/bi";
import User1 from "../../src/Assets/images/user1.png";
import User2 from "../../src/Assets/images/user2.gif";

const Login = (props) => {
    const history = useHistory();
    const [login, setLogin] = useState(false);
    const [errmsg, setErrmsg] = useState(false);
    const [errmsg2, setErrmsg2] = useState(false);
    const [msg, setMsg] = useState('');
    const [userhover, setUserhover] = useState(false);

    /*search code*/
    const [forgotpassword, setForgotpassword] = useState(false);
    //login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //forgotpass
    const [f_email, setF_email] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const signin = () => {
        setLogin(true);
        setForgotpassword(false);
    }
    const handleClicktop = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosetop = () => {
        setAnchorEl(null);
    };
    const handlelogout = () => {
        localStorage.removeItem('bw-user');
        localStorage.removeItem('bw-wishlistlength');
        localStorage.removeItem('bw-addtocartlength');
        localStorage.removeItem("bw-session-id")
        setAnchorEl(null)
        history.push("/")
        window.location.reload(true);
    }
    const handlesubmitlogin = (e) => {
        setErrmsg(false);
        e.preventDefault();
        setButtonLoading(true);
        axios.post(base_url + '/user/login', { email, password, session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "" }, {
            headers: {
                // 'authorization':`Token e222085edc871220cae528152b73c1317ba2addf`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.status == 1) {
                    window.location.reload(true);
                    var user = {
                        token: response.data.data.token,
                        user_id: response.data.data.user_id,
                        email: response.data.data.email,
                        first_name: response.data.data.first_name,
                        last_name: response.data.data.last_name,
                        isLogin: true
                    }
                    localStorage.setItem("bw-addtocartlength", response.data.data.total_cart_count)
                    localStorage.setItem("bw-wishlistlength", response.data.data.total_wish_count)
                    localStorage.setItem("bw-user", JSON.stringify(user));
                    localStorage.removeItem("bw-session-id")
                    setEmail("");
                    setPassword("");
                    setButtonLoading(false);
                    setLogin(false);
                } else {
                    setButtonLoading(false);
                    setErrmsg(true)
                    setMsg(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleforgotpassword = (e) => {
        setButtonLoading(true);
        e.preventDefault();
        var data = {
            email: f_email
        }
        axios.post(base_url + '/user/forget_password', data, {
            headers: {
                // 'authorization':`Token e222085edc871220cae528152b73c1317ba2addf`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.status == 1) {
                    setButtonLoading(false);
                    setF_email("");
                    signin();
                    return swal(response.data.message, "", "success");
                } else {
                    setButtonLoading(false);
                    setErrmsg2(true)
                    setMsg(response.data.message)
                }
            })
            .catch((error) => {
                console.log(error);

            });

    }
    const [buttonLoading, setButtonLoading] = useState(false)
    const isLogin = JSON.parse(localStorage.getItem("bw-user")) ? JSON.parse(localStorage.getItem("bw-user")).isLogin : false;
    return (<>
        {isLogin ?
            <>
                <Button className="rcs_blank_button rcs_after_login_button" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClicktop}>{isMobileOnly ? <span className="rcs_mobile">{user.first_name[0]}</span> : isTablet ? <span className="rcs_mobile">{user.first_name[0]}</span> : <span className="rcs_mobile">{user.first_name[0]} <KeyboardArrowDownIcon /></span>}</Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    className="rcs_menu_list_item"
                    open={Boolean(anchorEl)}
                    onClick={handleClosetop}
                >
                    <MenuItem disabled><BiUser /> {user.first_name}</MenuItem>
                    <MenuItem onClick={() => history.push("/account/myaccount")}>My Account</MenuItem>
                    <MenuItem onClick={handlelogout}>Logout</MenuItem>
                </Menu>
            </> :
            isMobileOnly ? <Button variant="link" className="rcs_before_login" id="loginbutton" onClick={signin}> <BiUser /> </Button> :
                <span id="loginbutton" onClick={signin}><img onMouseOver={()=>setUserhover(true) } onMouseLeave={()=>setUserhover(false) } className='rcs_wishlist_icon' src={userhover ? User2 : User1} /></span>
        }
        <Modal className="rcs_login_modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={login} onHide={() => setLogin(false)}>
            <Modal.Header>
                <button type="button" onClick={() => setLogin(false)} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            </Modal.Header>
            <Modal.Body>
                {forgotpassword ?
                    <div className="rcs_appointment_input rcs_login rcs_forgot">
                        <Modal.Title id="contained-modal-title-vcenter">Forgot Password</Modal.Title>
                        <div className="rcs_forgot_msg"><span>To reset your password, please enter your email address</span></div>
                        <Form onSubmit={handleforgotpassword}>
                            <Row>
                                <Col>
                                    <TextField
                                        id="outlined-basic"
                                        label="Email Address"
                                        type="Email"
                                        variant="outlined"
                                        value={f_email}
                                        onChange={(e) => setF_email(e.target.value)}
                                        required />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="rcs_fill_button" type="submit" disabled={buttonLoading}>
                                        Continue {buttonLoading ? <CircularProgress className="rcs_loader" /> : ""}
                                    </Button>
                                </Col>
                            </Row>
                            {errmsg2 ?
                                <Row>
                                    <Col>
                                        <div className="rcs_signup_link rcs_signup_link_error">
                                            <p style={{ color: "red" }}>{msg}</p>
                                        </div>
                                    </Col>
                                </Row> : ""}
                            <Row>
                                <Col>
                                    <div className="rcs_signup_link">
                                        <p>Remember your password ? <NavLink to="#" onClick={() => setForgotpassword(false)}>Login</NavLink></p>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div> :
                    <div className="rcs_appointment_input rcs_login">
                        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
                        <Form onSubmit={handlesubmitlogin}>
                            <Row>
                                <Col>
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <NavLink className="rcs_login_forgot" to="#" onClick={() => setForgotpassword(true)}>Forgot Password ?</NavLink>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="rcs_fill_button" type="submit" disabled={buttonLoading}>
                                        Sign In {buttonLoading ? <CircularProgress className="rcs_loader" /> : ""}
                                    </Button>
                                </Col>
                            </Row>
                            {errmsg ?
                                <Row>
                                    <Col>
                                        <div className="rcs_signup_link rcs_signup_link_error">
                                            <p>{msg}</p>
                                        </div>
                                    </Col>
                                </Row> : ""}
                            <Row>
                                <Col>
                                    <div className="rcs_signup_link">
                                        <p>Don't have an account ? <NavLink to="/register" onClick={() => setLogin(false)} >Sign Up</NavLink></p>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>}
            </Modal.Body>
        </Modal>
    </>
    );
};

export default Login;