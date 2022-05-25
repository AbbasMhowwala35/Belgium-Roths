import React, { useEffect, useState } from 'react';
import { Form, Modal, Table, Image } from 'react-bootstrap';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, Divider, IconButton, Link, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { TableCell, TableRow, TableContainer, TableHead, TableBody, withStyles, Paper } from '@material-ui/core';
import { Col, Container, Row } from 'react-bootstrap';
import { Alert, Box, Skeleton, Tab } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { NavLink } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { base_url, currency, currencycode, postHeader, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 700,
    },
}));


const Myaccount = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [orderdata, setOrderdata] = React.useState([]);
    const [value, setValue] = React.useState('');
    const [formheading, setFormheading] = React.useState('');
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [add_firstname, setAdd_firstname] = React.useState('');
    const [add_lastname, setAdd_lastname] = React.useState('');
    const [add_phone, setAdd_phone] = React.useState('');
    const [add_email, setAdd_email] = React.useState('');
    const [add_address1, setAdd_address1] = React.useState('');
    const [add_address2, setAdd_address2] = React.useState('');
    const [add_city, setAdd_city] = React.useState('');
    const [add_state, setAdd_state] = React.useState('');
    const [add_postalcode, setAdd_postalcode] = React.useState('');
    const [add_company, setAdd_company] = React.useState('');
    const [add_country, setAdd_country] = React.useState('');
    const [add_name, setAdd_name] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [newpassword, setNewpassword] = React.useState('');
    const [confirmpassword, setConfirmpassword] = React.useState('');
    const [addressUpdate, setAddressUpdate] = useState(false);
    const [addressshow, setAddressShow] = useState(false);
    const [address_id, setAddress_id] = useState('');
    const [add_ship_default, setAdd_ship_default] = useState(false);
    const [add_bill_default, setAdd_bill_default] = useState(false);
    const [wishlistdata, setWishlistdata] = useState([]);
    const [addresslist, setAddresslist] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: "#f5f8fe",
            color: theme.palette.common.black,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    useEffect(() => {
        wishlist();
        getaddress();
        orderlist();
        userinfo();
    }, [])
    useEffect(() => {
        setValue(props.match.params.value);
    }, [props.match.params.value])
    const userinfo = () => {
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            token: user?.token,
        }
        axios.post(base_url + '/user/GetUserDetail', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setFirstname(response.data.data?.address?.first_name);
                    setLastname(response.data.data?.address?.last_name);
                    setPhone(response.data.data?.address?.phone);
                    setCompany(response.data.data?.address?.company);
                    setEmail(response.data.data?.address?.email);
                    if(response.data.data?.address?.DOB ){
                        setBirthdate(moment(new Date(response.data.data?.address?.DOB)).format("YYYY-MM-DD")) 
                    }
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const submitAccount = (e) => {
        e.preventDefault();
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            first_name: firstname,
            last_name: lastname,
            email,
            phone,
            company,
            DOB: birthdate,
            token: user?.token,
        }
        axios.post(base_url + '/user/update_user', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    var info = JSON.parse(localStorage.getItem("bw-user"));
                    Object.assign(info, { first_name: response.data.data.first_name, last_name: response.data.data.last_name, email:response.data.data.email })
                    localStorage.setItem("bw-user",JSON.stringify(info));
                    return swal(response.data.message, "", "success");
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    return swal(response.data.message, "", "error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const orderlist = () => {
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            token: user?.token,
        }
        axios.post(base_url + '/order/order_list', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setOrderdata(response.data.data?.order_data)
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const changepass = (e) => {
        e.preventDefault();
        if (newpassword == confirmpassword) {
            const data = { currency_code : currencycode,
                user_id: user?.user_id ? user?.user_id : 0,
                password: newpassword,
                old_password: password,
                token: user?.token,
            }
            axios.post(base_url + '/user/password_reset', data, {
                headers: postHeader
            })
                .then(response => {
                    if (response.data.status == 1) {
                        setNewpassword('');
                        setConfirmpassword('');
                        setPassword("");
                        return swal(response.data.message, "", "success");
                    } else if (response.data.status == 2) {
                        localStorage.removeItem('bw-user')
                        localStorage.removeItem('bw-wishlistlength');
                        localStorage.removeItem('bw-addtocartlength');
                        localStorage.removeItem("bw-session-id")
                        history.push("/")
                        window.location.reload(true);
                    } else {
                        return swal(response.data.message, "", "error");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setNewpassword('');
            setConfirmpassword('');
            return swal("Password & confirm password do not match!", "", "error");
        }
    }
    const deleteAdd = (val) => {
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            token: user?.token,
            address_id: val.address_id
        }
        axios.post(base_url + '/user/delete_address', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    getaddress();
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const edittab = (val) => {
        setAddressShow(false);
        resetAddress();
        setAddress_id(val.address_id)
        if(address_id == val.address_id || address_id == ""){
        setAddressUpdate(!addressUpdate)
        }else{
            setAddressUpdate(true)
        }
        setAdd_firstname(val.first_name)
        setAdd_lastname(val.last_name)
        setAdd_phone(val.phone)
        setAdd_email(val.email)
        setAdd_address1(val.address1)
        setAdd_address2(val.address2)
        setAdd_city(val.city)
        setAdd_state(val.state)
        setAdd_postalcode(val.zip)
        setAdd_company(val.company)
        setAdd_country(val.country)
        setAdd_name(val.name)
        setAdd_ship_default(val.is_shipping_default != "0" ? true : false)
        setAdd_bill_default(val.is_billing_default != "0" ? true : false)
    }
    const editaddress = (e, type) => {
        e.preventDefault();
        setAddressUpdate(false);
        const data = { currency_code : currencycode,
            address_id: address_id,
            user_id: user?.user_id ? user?.user_id : 0,
            first_name: add_firstname,
            last_name: add_lastname,
            phone: add_phone,
            email: add_email,
            address1: add_address1,
            address2: add_address2,
            city: add_city,
            state: add_state,
            zip: add_postalcode,
            company: add_company,
            country: add_country,
            name: add_name,
            token: user?.token,
            is_shipping_default: add_ship_default ? 1 : 0,
            is_billing_default: add_bill_default ? 1 : 0
        }
        axios.post(base_url + '/user/update_address', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    getaddress();
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        resetAddress();
    }
    const handleSubmit = (e, type) => {
        e.preventDefault();
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            first_name: add_firstname,
            last_name: add_lastname,
            phone: add_phone,
            email: add_email,
            address1: add_address1,
            address2: add_address2,
            city: add_city,
            state: add_state,
            zip: add_postalcode,
            company: add_company,
            country: add_country,
            name: add_name,
            token: user?.token,
            is_billing_default: add_bill_default ? 1 : 0,
            is_shipping_default: add_ship_default ? 1 : 0,
        }
        axios.post(base_url + '/user/add_user_address', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setAddressShow(false);
                    getaddress()
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        resetAddress();
    }
    const resetAddress = () => {
        setFormheading('');
        setAdd_firstname('');
        setAdd_lastname('');
        setAdd_phone('');
        setAdd_email('');
        setAdd_address1('');
        setAdd_address2('');
        setAdd_city('');
        setAdd_state('');
        setAdd_postalcode('');
        setAdd_company('');
        setAdd_country('');
        setAdd_name('');
        setAdd_ship_default(false);
        setAdd_bill_default(false);
    }


    const wishlist = () => {
        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: user?.token,
        }
        axios.post(base_url + '/order/wish_list', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setWishlistdata(res.data.data);
                    toast.success(res.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removewishlist = (product_id,type) => {

        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id,
            type: type,
            token: user?.token,
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    wishlist();
                    localStorage.setItem("bw-wishlistlength", res.data.data.count)
                    toast.success(res.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getaddress = () => {
        var data = {
            user_id: user?.user_id ? user?.user_id : 0,
            token: user?.token,
        }
        axios.post(base_url + '/user/address_list', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setAddresslist(response.data.data?.address)
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
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
                <title>My Account | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">My Account</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>My Account</h1>
                            </din>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} md={9}>
                            <div className="rcs_my_account_user">
                                <ul>
                                    <li><span>{(user?.first_name[0] + user?.last_name[0])?.toUpperCase()}</span></li>
                                    <li><h2>{(user?.first_name + " " + user?.last_name)?.toUpperCase()}</h2></li>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={6} md={3} className="p-0">
                            <div className="rcs_my_account_email">
                                <ul>
                                    <li><span>My Email:</span></li>
                                    <li><h6>{user?.email}</h6></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row className="rcs_tab_section m-auto w-100">
                        <Col className="p-0">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab label="Account" value="myaccount" />
                                            <Tab label="Change Password" value="change-password" />
                                            <Tab label="Orders" value="orders" />
                                            <Tab label="Wish List" value="wishlist" />
                                            <Tab label="Address" value="address" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="myaccount" className='p-3'>
                                        <div className="rcs_tab_content">
                                            <Row>
                                                <Col xs={12} sm={12} md={8} className="p-0">
                                                    <div className="rcs_tab_content_left">
                                                        <Row>
                                                            <Col>
                                                                <h2 className="rcs_account_heading">ACCOUNT INFORMATION</h2>
                                                            </Col>
                                                        </Row>
                                                        <Form onSubmit={submitAccount}>
                                                            <Row>
                                                                <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="First Name"
                                                                        type="text"
                                                                        variant="outlined"
                                                                        value={firstname}
                                                                        onChange={(e) => setFirstname(e.target.value)}
                                                                        required
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </Col>
                                                                <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Last Name"
                                                                        type="text"
                                                                        variant="outlined"
                                                                        value={lastname}
                                                                        onChange={(e) => setLastname(e.target.value)}
                                                                        required
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Phone"
                                                                        type="number"
                                                                        variant="outlined"
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                        InputProps={{ inputProps: { min: 0 } }}
                                                                        required
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </Col>
                                                                <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Email Address"
                                                                        type="Email"
                                                                        variant="outlined"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        required
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                {/* <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Comapny"
                                                                        type="text"
                                                                        variant="outlined"
                                                                        value={company}
                                                                        onChange={(e) => setCompany(e.target.value)}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />
                                                                </Col> */}
                                                                <Col xs={12} sm={6}>
                                                                    <TextField
                                                                        id="date"
                                                                        label="Date of Birth"
                                                                        type="date"
                                                                        value={birthdate}
                                                                        onChange={(e) => setBirthdate(e.target.value)}
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }}
                                                                        inputProps={{
                                                                            max: moment(new Date()).format("YYYY-MM-DD")
                                                                        }}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            {/* <Row>
                                                                <Col className="rcs_check_section">
                                                                    <FormControlLabel style={{ padding: "10px" }} control={<Checkbox />} label="Receive special offers and discounts" />
                                                                </Col>
                                                            </Row> */}
                                                            <Row>
                                                                <Col sm={{ span: "6" }}>
                                                                    <Button variant="contained" type="submit" className="rcs_acc_button">Save Changes</Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="change-password" className="rcs_pwd_Content1">
                                        <div className="rcs_tab_content">
                                            <Row>
                                                <Col xs={12} sm={6} md={8} className="p-0">
                                                    <div className="rcs_tab_content_left">
                                                        <Row>
                                                            <Col>
                                                                <h2 className="rcs_account_heading">PASSWORD CHANGE</h2>
                                                            </Col>
                                                        </Row>
                                                        <Form onSubmit={changepass}>
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Current Password"
                                                                        type="password"
                                                                        variant="outlined"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        required />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="New Password"
                                                                        type="password"
                                                                        variant="outlined"
                                                                        value={newpassword}
                                                                        onChange={(e) => setNewpassword(e.target.value)}
                                                                        required />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <TextField
                                                                        id="outlined-basic"
                                                                        label="Confirm Password"
                                                                        type="password"
                                                                        variant="outlined"
                                                                        value={confirmpassword}
                                                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                                                        required />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Button variant="contained" type="submit" className="rcs_acc_button">Save Changes</Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="orders" className="rcs_tabel_Content1">
                                        <div className="rcs_tabel_Content">
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} aria-label="customized table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>No.</StyledTableCell>
                                                            <StyledTableCell>Order No</StyledTableCell>
                                                            <StyledTableCell>Price</StyledTableCell>
                                                            <StyledTableCell>Date</StyledTableCell>
                                                            <StyledTableCell>Status</StyledTableCell>
                                                            <StyledTableCell>Action</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {orderdata?.map((val, index) =>
                                                            <StyledTableRow >
                                                                <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                                                <StyledTableCell>{val?.order_no}</StyledTableCell>
                                                                <StyledTableCell>{val?.currency_icon}{val?.grand_total}</StyledTableCell>
                                                                <StyledTableCell>{moment(new Date(val?.created_at)).format("YYYY-MM-DD")}</StyledTableCell>
                                                                <StyledTableCell>{val?.order_status}</StyledTableCell>
                                                                <StyledTableCell><Button className="gs_fill_button" onClick={() => window.open(`/invoice/` + val?.order_id, "_blank")}><VisibilityIcon /></Button> </StyledTableCell>
                                                            </StyledTableRow>
                                                        )}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="wishlist" className="rcs_wislist">

                                        <div className="rcs_wishlist_section">
                                            {wishlistdata?.jewelry_data?.length || wishlistdata?.diamond_data?.length || wishlistdata?.gemstone_data?.length ?
                                                <Row className="w-100 m-auto">
                                                    {wishlistdata?.jewelry_data?.map(val =>
                                                        <Col xs={12} sm={6} md={6} lg={4} className="rcs_custom_padding">
                                                            <div className="rcs_wislist_content">
                                                                <IconButton aria-label="Example">
                                                                    <DeleteIcon onClick={() => removewishlist(val.product_id,val.product_type)} />
                                                                </IconButton>
                                                                <div onClick={() => history.push('/productdetail/' + val.slug)}>
                                                                    <Image src={val.url}></Image>
                                                                    <h2 className='mt-3'>{val.name}</h2>
                                                                    <p class="rcs_sku">SKU : {val.sku}</p>
                                                                    <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                                </div>
                                                            </div>
                                                        </Col>)}
                                                    {wishlistdata?.diamond_data?.map(val =>
                                                        <Col xs={12} sm={6} md={6} lg={4} className="rcs_custom_padding">
                                                            <div className="rcs_wislist_content">
                                                                <IconButton aria-label="Example">
                                                                    <DeleteIcon onClick={() => removewishlist(val.product_id,val.product_type)} />
                                                                </IconButton>
                                                                <div onClick={() => val.type == '4' ?history.push('/fancy-color-diamond-detail/' + val.stock_no) : history.push('/diamonds-details/' + val.stock_no)}>
                                                                    <Image src={val.imagelink}></Image>
                                                                    <h2 className='mt-3'>{val?.weight} Carat {val?.shape} {val?.type == "1" ? 'Cut Natural Diamond' :val.type == "2" ? 'Cut Lab Diamond' : val.type == '4' ? "Fancy Diamond" : "Diamond"}</h2>
                                                                    <p class="rcs_sku">STOCK NO. : {val.stock_no}</p>
                                                                    <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                                </div>
                                                            </div>
                                                        </Col>)}
                                                    {wishlistdata?.gemstone_data?.map(val =>
                                                        <Col xs={12} sm={6} md={6} lg={4} className="rcs_custom_padding">
                                                            <div className="rcs_wislist_content">
                                                                <IconButton aria-label="Example">
                                                                    <DeleteIcon onClick={() => removewishlist(val.product_id,val.product_type)} />
                                                                </IconButton>
                                                                <div onClick={() => history.push('/gemstone-details/' + val.stock_no)}>
                                                                    <Image src={val.imagelink}></Image>
                                                                    <h2 className='mt-3'>{val?.weight} Carat {val?.shape} {val?.color} Gemstone</h2>
                                                                    <p class="rcs_sku">STOCK NO. : {val.stock_no}</p>
                                                                    <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                                </div>
                                                            </div>
                                                        </Col>)}
                                                </Row> :
                                                localStorage.getItem("bw-wishlistlength") > 0 ?
                                                    <div className="rcs_wishlist_section">
                                                        <Row className="w-100 m-auto">
                                                            {[...Array(Number(localStorage.getItem("bw-wishlistlength")))]?.map(val =>
                                                                <Col xs={12} sm={6} md={6} lg={4} className="rcs_custom_padding">
                                                                    <div className="rcs_wislist_content mb-0">
                                                                        <div>
                                                                            <Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={200} height={200} />
                                                                            <h2 className='mt-3'><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={225} height={30} /></h2>
                                                                            <p className='mb-2'><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={225} height={30} /></p>
                                                                            <p class="rcs_wish_price"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={225} height={30} /></p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            )}
                                                        </Row>
                                                    </div>
                                                    :
                                                    <Row className="m-auto w-100">
                                                        <Col className="p-0 mt-3 mb-3">
                                                            <Alert severity="error" className="rcs_alert_danger">You have no items in your wish list. <NavLink to="/jewelry/fashion-rings"> Browse jewelry</NavLink>.</Alert>
                                                        </Col>
                                                    </Row>
                                            }
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="address" className="rcs_address">
                                        <div className="rcs_add_section">
                                            <div className="rcs_tab_content_left">
                                                <Row className="w-100 m-auto">
                                                    <Col sm={12}>
                                                        <h2 class="rcs_account_heading">Your Addresses</h2>
                                                    </Col>
                                                    {addresslist?.map(val =>
                                                        <Col xs={12} sm={12} md={12} lg={6} className="rcs_custom_padding">
                                                            <div className="rcs_add_box">
                                                                <address>
                                                                    <p><strong>Name: </strong> </p>
                                                                    <p><span>{val.first_name} {val.last_name}</span></p>
                                                                    <p><strong>Address: </strong> </p>
                                                                    <p><span>{val.address1}, {val.city}, {val.state}, {val.zip}</span></p>
                                                                    <p><strong>Mobile: </strong></p>
                                                                    <p><span>{val.phone}</span></p>
                                                                    {val.is_billing_default != "0" || val.is_shipping_default != "0" ?
                                                                        <Divider /> : ''}
                                                                    {val.is_billing_default != "0" ?
                                                                        <Button className="rcs_address_btn">Default Shipping</Button> : ""}
                                                                    {val.is_shipping_default != "0" ?
                                                                        <Button className="rcs_address_btn">Default Billing</Button> : ""}
                                                                    {/* <Button className="rcs_address_btn"></Button> */}
                                                                </address>
                                                                <div className='rcs_edit_del'>
                                                                    <IconButton className="myacc_edit" onClick={() => edittab(val)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                    {val.is_billing_default != "0" || val.is_shipping_default != "0" ? "" :
                                                                        <IconButton className="myacc_remove" aria-label="Example" >
                                                                            <DeleteIcon onClick={() => deleteAdd(val)} />
                                                                        </IconButton>}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )}
                                                </Row>
                                                {addressUpdate ? "" :
                                                    <Button className=" rcs_acc_button mb-5" onClick={() => { setAddressShow(!addressshow); setAddressUpdate(false); resetAddress(); }}>
                                                        {addressshow ? <> Add New Address <RemoveCircleIcon className='ml-2' /> </> : <> Add New Address <AddCircleIcon className='ml-2' /></>}
                                                    </Button>}
                                                {addressshow ? <div >
                                                    <form onSubmit={(e) => handleSubmit(e, formheading)}>
                                                        {/* <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_name}
                                                                    onChange={(e) => setAdd_name(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row> */}
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="First Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    required
                                                                    value={add_firstname}
                                                                    onChange={(e) => setAdd_firstname(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Last Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_lastname}
                                                                    onChange={(e) => setAdd_lastname(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Email Address"
                                                                    type="Email"
                                                                    variant="outlined"
                                                                    value={add_email}
                                                                    onChange={(e) => setAdd_email(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Company"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_company}
                                                                    onChange={(e) => setAdd_company(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address1"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_address1}
                                                                    onChange={(e) => setAdd_address1(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address2"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_address2}
                                                                    onChange={(e) => setAdd_address2(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="City"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_city}
                                                                    onChange={(e) => setAdd_city(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="State"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_state}
                                                                    onChange={(e) => setAdd_state(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Country"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_country}
                                                                    onChange={(e) => setAdd_country(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Postal Code"
                                                                    type="number"
                                                                    InputProps={{ inputProps: { min: 0 } }}
                                                                    variant="outlined"
                                                                    value={add_postalcode}
                                                                    onChange={(e) => setAdd_postalcode(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Phone"
                                                                    type="number"
                                                                    InputProps={{ inputProps: { min: 0 } }}
                                                                    variant="outlined"
                                                                    value={add_phone}
                                                                    onChange={(e) => setAdd_phone(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Modal.Footer>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        name="checkedB"
                                                                        color="primary"
                                                                        checked={add_ship_default}
                                                                        onChange={() => setAdd_ship_default(!add_ship_default)}
                                                                    />
                                                                }
                                                                label="Shipping Address"
                                                                className="rcs_top_select"
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        name="checkedB"
                                                                        color="primary"
                                                                        checked={add_bill_default}
                                                                        onChange={() => setAdd_bill_default(!add_bill_default)}

                                                                    />
                                                                }
                                                                label="Billing Address"
                                                                className="rcs_top_select"
                                                            />
                                                            <Button variant="secondary" className="rcs_cancel_button mr-3" onClick={() => setAddressShow(false)}>
                                                                Cancel
                                                            </Button>
                                                            <Button type="Submit" variant="primary" className="rcs_save_button">
                                                                Save
                                                            </Button>
                                                        </Modal.Footer>
                                                    </form>
                                                </div> : ""}
                                                {addressUpdate ? <div >
                                                    <form onSubmit={(e) => editaddress(e, formheading)}>
                                                        {/* <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_name}
                                                                    onChange={(e) => setAdd_name(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row> */}
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="First Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    required
                                                                    value={add_firstname}
                                                                    onChange={(e) => setAdd_firstname(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Last Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_lastname}
                                                                    onChange={(e) => setAdd_lastname(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Email Address"
                                                                    type="Email"
                                                                    variant="outlined"
                                                                    value={add_email}
                                                                    onChange={(e) => setAdd_email(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Company"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_company}
                                                                    onChange={(e) => setAdd_company(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address1"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_address1}
                                                                    onChange={(e) => setAdd_address1(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address2"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_address2}
                                                                    onChange={(e) => setAdd_address2(e.target.value)}
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="City"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_city}
                                                                    onChange={(e) => setAdd_city(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                            <Col xs={12} sm={6}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="State"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_state}
                                                                    onChange={(e) => setAdd_state(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Country"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_country}
                                                                    onChange={(e) => setAdd_country(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Postal Code"
                                                                    type="number"
                                                                    InputProps={{ inputProps: { min: 0 } }}
                                                                    variant="outlined"
                                                                    value={add_postalcode}
                                                                    onChange={(e) => setAdd_postalcode(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Phone"
                                                                    type="number"
                                                                    InputProps={{ inputProps: { min: 0 } }}
                                                                    variant="outlined"
                                                                    value={add_phone}
                                                                    onChange={(e) => setAdd_phone(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                        <Modal.Footer>
                                                            <Row className='w-100 m-auto'>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            name="checkedB"
                                                                            color="primary"
                                                                            checked={add_ship_default}
                                                                            onChange={() => setAdd_ship_default(true)}
                                                                        />
                                                                    }
                                                                    label="Shipping Address"
                                                                    className="rcs_top_select"
                                                                />
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            name="checkedB"
                                                                            color="primary"
                                                                            checked={add_bill_default}
                                                                            onChange={() => setAdd_bill_default(true)}

                                                                        />
                                                                    }
                                                                    label="Billing Address"
                                                                    className="rcs_top_select"
                                                                />
                                                            </Row>
                                                            <Button variant="secondary" className="rcs_cancel_button mr-3" onClick={() => setAddressUpdate(false)}>
                                                                Cancel
                                                            </Button>
                                                            <Button type="Submit" variant="primary" className="rcs_save_button">
                                                                Save
                                                            </Button>
                                                        </Modal.Footer>
                                                    </form>
                                                </div> : ""}
                                            </div>
                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default Myaccount;