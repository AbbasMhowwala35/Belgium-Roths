import React, { useState, useEffect } from 'react';
import '../../Assets/css/cart.css'
import { Breadcrumbs, Divider, FormControlLabel, Link, Typography } from '@material-ui/core';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Checkbox, Skeleton, TextField } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import Paypal from '../../Components/Paypal';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';
import { isMobileOnly, isTablet } from 'react-device-detect';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Address from '../../Components/address';

const Checkout = () => {
    const history = useHistory();
    const [paypalpopup, setPaypalpopup] = useState(false);
    const [sameasshipping, setSameasshipping] = useState(false);
    const [sfirst_name, setSfirst_name] = useState("");
    const [slast_name, setSlast_name] = useState("");
    const [sadd1, setSadd1] = useState("");
    const [sadd2, setSadd2] = useState("");
    const [scity, setScity] = useState("");
    const [sstate, setSstate] = useState("");
    const [sphone, setSphone] = useState(null);
    const [szip, setSzip] = useState(null);
    const [scountry, setScountry] = useState("");
    const [semail, setSemail] = useState("");
    const [sconfirm_email, setSconfirm_email] = useState("");
    const [bfirst_name, setBfirst_name] = useState("");
    const [blast_name, setBlast_name] = useState("");
    const [badd1, setBadd1] = useState("");
    const [badd2, setBadd2] = useState("");
    const [bcity, setBcity] = useState("");
    const [bstate, setBstate] = useState("");
    const [bphone, setBphone] = useState(null);
    const [bzip, setBzip] = useState(null);
    const [bcountry, setBcountry] = useState("");
    const [shippingaddress, setShippingaddress] = useState(null);
    const [billingaddress, setBillingaddress] = useState(null);
    const [addressdata, setAddressdata] = useState([]);
    const [cartlist, setCartlist] = useState("");
    const [checkoutdata, setCheckoutdata] = useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata')));
    const [tot_sale_price, setTot_sale_price] = React.useState(0);
    const [sub_total, setSub_total] = React.useState(0);
    const [coupondiscount, setCoupondiscount] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const [loader, setLoader] = React.useState(true);
    const [loaderaddress, setLoaderaddress] = React.useState(true);
    const [paypalreq, setPaypalreq] = React.useState([]);
    useEffect(() => {
        addtocartlist();
        getaddress();
    }, [])
    const addtocartlist = () => {
        setLoader(true)
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/cart_list', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setLoader(false)
                    setCartlist(res.data.data)
                    setTot_sale_price(res.data.data?.tot_sale_price)
                    setSub_total(res.data.data?.sub_total)
                    // setCartlist(res.data.data?.tax) 
                    applycoupon();
                    toast.success(res.data.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getaddress = () => {
        setLoaderaddress(true)
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/user/address_list', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setAddressdata(res.data.data.address)
                    setLoaderaddress(false)
                    res.data.data.address.map(val => {
                        if (val.is_shipping_default != "0") {
                            setShippingaddress(val.address_id)
                        }
                        if (val.is_billing_default != "0") {
                            setBillingaddress(val.address_id)
                        }
                    })
                    toast.success(res.data.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const applycoupon = () => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            shipping_option_id: checkoutdata.shippingoptionsid,
            coupan_code: checkoutdata.coupan_code,
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/apply_coupan', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setCoupondiscount(res.data.data.coupan_data?.discount)
                    setTot_sale_price(res.data.data.coupan_data?.final_amount)
                    setSub_total(res.data.data.coupan_data?.total_amount)
                    toast.success(res.data.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const checkoutbutton = (e) => {
        if (!isLogin) {
            e.preventDefault();
            // if (sameasshipping || (bfirst_name?.length && blast_name?.length && bphone?.length && badd1?.length && badd2?.length && bcity?.length && bstate?.length && bcountry?.length && bzip?.length)) {
            checkout();
            // } else {
            //     swal("Please fill billing address & shipping address", "", "error")
            // }
        } else {
            if (billingaddress && shippingaddress) {
                checkout()
            } else {
                if (!billingaddress && !shippingaddress) {
                    swal("Please select billing address & shipping address");
                } else if (!billingaddress) {
                    swal("Please select billing address");
                } else if (!shippingaddress) {
                    swal("Please select shipping address");
                }
            }
        }
    }
    const checkout = () => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            coupan_code: checkoutdata?.coupan_code ? checkoutdata?.coupan_code : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            order_total: cartlist?.tot_sale_price,
            gift_message: checkoutdata?.gift_message ? checkoutdata?.gift_message : '',
            instructions: checkoutdata?.instructions ? checkoutdata?.instructions : '',
            tax_amount: cartlist?.tax,
            s_address_id: shippingaddress,
            b_address_id: billingaddress,
            shipping_cost: checkoutdata?.shipping_cost,
            shipping_option_id: checkoutdata?.shippingoptionsid,
            token: isLogin ? user.token : "",
            password: "",
            email: isLogin ? user?.email : "murli12@gmail.com",
            sfirst_name,
            slast_name,
            sphone,
            saddress1: sadd1,
            saddress2: sadd2,
            scity,
            sstate,
            scountry,
            szip,
            bfirst_name: sameasshipping ? sfirst_name : bfirst_name,
            blast_name: sameasshipping ? slast_name : blast_name,
            bphone: sameasshipping ? sphone : bphone,
            baddress1: sameasshipping ? sadd1 : badd1,
            baddress2: sameasshipping ? sadd2 : badd2,
            bcity: sameasshipping ? scity : bcity,
            bstate: sameasshipping ? sstate : bstate,
            bcountry: sameasshipping ? scountry : bcountry,
            bzip: sameasshipping ? szip : bzip,
        }
        axios.post(base_url + '/order/buy', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setPaypalreq(res.data.data)
                    setPaypalpopup(true)
                    toast.success(res.data.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
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
                <title>Checkout | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_cart_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Checkout</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Shipping Address</h1>
                            </din>
                        </Col>
                    </Row>
                    <Row className="m-auto w-100">
                        <Col xs={12} sm={7} md={12} xl={7}>
                            <div className="rcs_checkout_content mb-5 pt-3">
                                {/* <Row>
                                    <Col>
                                        <p className="mt-2 rcs_custom_padding">Sent via FedEx Ground. Usually arrives in 5-7 business days if placed by 5pm EST.</p>
                                    </Col>
                                </Row> */}
                                {isLogin ?
                                    <Row>
                                        {loaderaddress ?
                                            <>
                                                <Col sm={12} className='p-0'>
                                                    <div className="rcs_add_box">
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : <Skeleton variant="text" animation="wave" width={100} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : <Skeleton variant="text" animation="wave" width={150} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : <Skeleton variant="text" animation="wave" width={100} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={250} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={250} height={30} /> : <Skeleton variant="text" animation="wave" width={300} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={80} height={30} /> : <Skeleton variant="text" animation="wave" width={100} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : <Skeleton variant="text" animation="wave" width={150} height={30} />}
                                                        <Divider />
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : <Skeleton variant="text" animation="wave" style={{ float: 'left', marginRight: '10px' }} width={150} height={30} />}
                                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : <Skeleton variant="text" animation="wave" width={150} height={30} />}
                                                    </div>
                                                </Col>
                                            </>
                                            :
                                            addressdata?.map(val =>
                                                <Col sm={12} className='p-0'>
                                                    <div className="rcs_add_box">
                                                        <address>
                                                            <p><strong>Name: </strong> </p>
                                                            <p><span>{val.first_name} {val.last_name}</span></p>
                                                            <p><strong>Address: </strong> </p>
                                                            <p><span>{val.address1},{val.city}, {val.state}, {val.zip}</span></p>
                                                            <p><strong>Mobile: </strong></p>
                                                            <p><span>{val.phone}</span></p>
                                                            <Divider />
                                                            {/* <Button className="rcs_address_btn">Home</Button> */}
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        name="checkedB"
                                                                        color="primary"
                                                                        checked={shippingaddress == val.address_id ? true : false}
                                                                        onChange={() => setShippingaddress(val.address_id)}
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
                                                                        checked={billingaddress == val.address_id ? true : false}
                                                                        onChange={() => setBillingaddress(val.address_id)}
                                                                    />
                                                                }
                                                                label="Billing Address"
                                                                className="rcs_top_select"
                                                            />
                                                        </address>

                                                    </div>
                                                </Col>
                                            )}
                                        <Row className='m-auto w-100'>
                                            <Col className='p-0 mt-2'>
                                                <div className='paypalbutton'>
                                                    {paypalpopup ? (
                                                        <Paypal id="paypalbutton" data={paypalreq} />
                                                    ) :
                                                    <>
                                                       {addressdata?.length ? <Button variant="contained" onClick={() => checkoutbutton()} className="rcs_acc_button">Continue  <ChevronRightIcon className="ml-5" /> </Button>:""}
                                                        {/* <Button onClick={()=> history.push('/account/address')} className=" rcs_acc_button"> Add New Address <AddCircleIcon className='ml-2' /> </Button> */}
                                                        <Address getadd={()=> getaddress()} />
                                                        </>
                                                   }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Row>
                                    :
                                    <Form onSubmit={checkoutbutton}>
                                        <Row>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="First Name"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={sfirst_name}
                                                    onChange={(e) => setSfirst_name(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Last Name"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={slast_name}
                                                    onChange={(e) => setSlast_name(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Address Line 1"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={sadd1}
                                                    onChange={(e) => setSadd1(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Address Line 2"
                                                    type="text"
                                                    variant="outlined"
                                                    value={sadd2}
                                                    onChange={(e) => setSadd2(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="City"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={scity}
                                                    onChange={(e) => setScity(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="State/Province"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={sstate}
                                                    onChange={(e) => setSstate(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Zip Code"
                                                    type="number"
                                                    variant="outlined"
                                                    required
                                                    value={szip}
                                                    onChange={(e) => setSzip(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Country"
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    value={scountry}
                                                    onChange={(e) => setScountry(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Email Address"
                                                    type="Email"
                                                    variant="outlined"
                                                    required
                                                    value={semail}
                                                    onChange={(e) => setSemail(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                            <Col xs={12} sm={6} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Confirm Email Address"
                                                    type="Email"
                                                    variant="outlined"
                                                    required
                                                    value={sconfirm_email}
                                                    onChange={(e) => setSconfirm_email(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="rcs_custom_padding">
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Telephone"
                                                    type="number"
                                                    variant="outlined"
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    required
                                                    value={sphone}
                                                    onChange={(e) => setSphone(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="rcs_custom_padding rcs_checkout_checkbox">
                                                <FormControlLabel control={<Checkbox />} label="Send me news and special offers" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="rcs_custom_padding">
                                                <din className="rcs_top_heading">
                                                    <h2>Billing Address</h2>
                                                </din>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="rcs_custom_padding rcs_checkout_checkbox">
                                                <FormControlLabel control={<Checkbox checked={sameasshipping} onClick={() => setSameasshipping(!sameasshipping)} />} label="Same as shipping address" />
                                            </Col>
                                        </Row>
                                        <div style={{ display: sameasshipping ? "none" : "" }}>
                                            <Row>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="First Name"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={bfirst_name}
                                                        onChange={(e) => setBfirst_name(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Last Name"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={blast_name}
                                                        onChange={(e) => setBlast_name(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Address Line 1"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={badd1}
                                                        onChange={(e) => setBadd1(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Address Line 2"
                                                        type="text"
                                                        variant="outlined"
                                                        value={badd2}
                                                        onChange={(e) => setBadd2(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="City"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={bcity}
                                                        onChange={(e) => setBcity(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="State/Province"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={bstate}
                                                        onChange={(e) => setBstate(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Zip Code"
                                                        type="number"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={bzip}
                                                        onChange={(e) => setBzip(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Country"
                                                        type="text"
                                                        variant="outlined"
                                                        required={!sameasshipping}
                                                        value={bcountry}
                                                        onChange={(e) => setBcountry(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} className="rcs_custom_padding">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Telephone"
                                                        type="number"
                                                        variant="outlined"
                                                        InputProps={{ inputProps: { min: 0 } }}
                                                        required={!sameasshipping}
                                                        value={bphone}
                                                        onChange={(e) => setBphone(e.target.value)}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }} />
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row>
                                            <Col className="rcs_custom_padding">
                                                {paypalpopup ? (
                                                    <Paypal id="paypalbutton" data={paypalreq} />
                                                ) :
                                                    <Button variant="contained" type="submit" className="rcs_acc_button">Continue  <ChevronRightIcon className="ml-5" /> </Button>
                                                }
                                            </Col>
                                        </Row>
                                    </Form>
                                }
                            </div>
                        </Col>
                        <Col xs={12} sm={5} md={12} xl={5} className='pl-md-0 pr-md-0 pt-3'>
                            <div className="rcs_tab_content_right rcs_tab_content_checkout ml-5 mr-5 ml-md-0 mr-md-0 ml-xl-5 mr-xl-5 position-relative">
                                <h4 id="checkout-order-summary-heading">YOUR ORDER SUMMARY</h4>
                                {loader ?
                                    <>
                                        {[...Array(Number(localStorage.getItem("bw-addtocartlength")))]?.map(val =>
                                            <>
                                                <Row>
                                                    <Col xs={12} sm={4}>
                                                        <Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={100} height={100} />
                                                    </Col>
                                                    <Col xs={12} sm={8}>
                                                        <h2><Skeleton variant="text" style={{ transform: 'unset', marginTop: '10px' }} animation="wave" width={220} height={27} /></h2>
                                                        <span><Skeleton variant="text" style={{ transform: 'unset', marginBottom: '10px' }} animation="wave" width={100} height={15} /></span>
                                                        <p><Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={100} height={15} /></p>
                                                        <strong><Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={100} height={15} /></strong>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </>
                                        )}
                                    </> :
                                    <>
                                        {cartlist?.cart_data_jewelry?.map(val =>
                                            <>
                                                <Row onClick={() => history.push('/productdetail/' + val.slug)}>
                                                    <Col xs={12} sm={4}>
                                                        <Image src={val.url}></Image>
                                                    </Col>
                                                    <Col xs={12} sm={8}>
                                                        <h2>{val.name}</h2>
                                                        <span>ITEM:{val.sku}</span>
                                                        {/* <p>Scott Kay 18K "The Crown" Ladies Diamond Wedding Band with .72ct total weight...</p> */}
                                                        <p>Qty:{val.quantity}</p>
                                                        <strong>{currency}{val.sale_price}</strong>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </>
                                        )}
                                        {cartlist?.cart_data_diamond?.map(val =>
                                            <>
                                                <Row onClick={() => val.type == "4" ? history.push('/fancy-color-diamond-detail/' + val.stock_no): history.push('/diamonds-details/' + val.stock_no)}>
                                                    <Col xs={12} sm={4}>
                                                        <Image src={val.imagelink}></Image>
                                                    </Col>
                                                    <Col xs={12} sm={8}>
                                                        <h2>{val.weight} Carat {val.shape} Cut {val.type == "1" ? 'Natural Diamond' : val.type == "2" ? 'Lab Diamond' : val.type == "3" ? 'Gemstone' : val.type == "4" ? "Fancy Diamond" : "Diamond"}</h2>
                                                        <span>STOCK NO. #: {val.stock_no}</span>
                                                        {/* <p>Scott Kay 18K "The Crown" Ladies Diamond Wedding Band with .72ct total weight...</p> */}
                                                        <p>Qty:{val.quantity}</p>
                                                        <strong>{currency}{val.sale_price}</strong>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </>
                                        )}
                                        {cartlist?.cart_data_combo?.map(val =>
                                            <>
                                                <Row >
                                                    <Col xs={12} sm={4}>
                                                        <Image src={val.combo_diamond?.imagelink}></Image>
                                                    </Col>
                                                    <Col xs={12} sm={8}>
                                                        <h2 onClick={() => val.combo_diamond?.type == 3 ? history.push('/gemstone-details/' + val.combo_diamond?.stock_no) : val.combo_diamond?.type == "4" ? history.push('/fancy-color-diamond-detail/' + val.combo_diamond?.stock_no) : history.push('/diamonds-details/' + val.combo_diamond?.stock_no)}>{val.combo_diamond?.weight} Carat {val.combo_diamond?.shape} Cut {val.combo_diamond?.type == "1" ? 'Natural Diamond' : val.combo_diamond?.type == "2" ? 'Lab Diamond' : val.combo_diamond?.type == "3" ? 'Gemstone' : val.combo_diamond?.type == "4" ? "Fancy Diamond" : "Diamond"}</h2>
                                                        <span>STOCK NO. #: {val.combo_diamond?.stock_no}</span>
                                                        {/* <p>Scott Kay 18K "The Crown" Ladies Diamond Wedding Band with .72ct total weight...</p> */}
                                                        <p>Qty:{val.combo_diamond?.quantity}</p>
                                                        <strong>{currency}{val.combo_diamond?.sale_price}</strong>
                                                    </Col>
                                                    <Divider />
                                                    <Col xs={12} sm={4}>
                                                        <Image src={val.combo_jewelry?.url}></Image>
                                                    </Col>
                                                    <Col xs={12} sm={8}>
                                                        <h2 onClick={() => history.push('/ringsettingdetail/setting/' + val.combo_jewelry?.slug)}>{val.combo_jewelry?.name}</h2>
                                                        <span>ITEM:{val.combo_jewelry?.sku}</span>
                                                        {/* <p>Scott Kay 18K "The Crown" Ladies Diamond Wedding Band with .72ct total weight...</p> */}
                                                        <p>Qty:{val.combo_jewelry?.quantity}</p>
                                                        <strong>{currency}{val.combo_jewelry?.sale_price}</strong>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </>
                                        )}
                                    </>
                                }
                            </div>
                            <div className="rcs_cart_bottom_content rcs_cart_bottom_content2 ml-5 mr-5 ml-md-0 mr-md-0 ml-xl-5 mr-xl-5 mb-5 pt-2">
                                {loader ?
                                    <>
                                        {[...Array(4)]?.map(val =>
                                            <ul>
                                                <li><Skeleton variant="text" style={{ transform: 'unset', marginBottom: '10px' }} animation="wave" width={150} height={15} /></li>
                                                <li><Skeleton variant="text" style={{ transform: 'unset', marginBottom: '10px' }} animation="wave" width={80} height={15} /></li>
                                            </ul>
                                        )}
                                        <Divider />
                                        <ul>
                                            <li><Skeleton variant="text" style={{ transform: 'unset', marginBottom: '10px' }} animation="wave" width={150} height={15} /></li>
                                            <li><Skeleton variant="text" style={{ transform: 'unset', marginBottom: '10px' }} animation="wave" width={80} height={15} /></li>
                                        </ul>
                                    </>
                                    :
                                    <>
                                        <ul>
                                            <li><p>SUBTOTAL</p></li>
                                            <li><span>{currency}{sub_total}</span></li>
                                        </ul>
                                        <ul>
                                            <li><p>SHIPPING CHARGES</p></li>
                                            <li><span>{currency}{checkoutdata?.shipping_cost}</span></li>
                                        </ul>
                                        <ul>
                                            <li><p>Coupon Discount</p></li>
                                            <li><span>{currency}{coupondiscount}</span></li>
                                        </ul>
                                        <ul>
                                            <li><p>SALES TAX ESTIMATE</p></li>
                                            <li><span>{currency}{tax}</span></li>
                                        </ul>
                                        <Divider />
                                        <ul>
                                            <li><h5><strong>Total Amount</strong></h5></li>
                                            <li><span>{currency}{tot_sale_price}</span></li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Checkout;