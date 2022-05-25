import React, { useEffect, useState } from 'react';
import '../../Assets/css/cart.css'
import { Breadcrumbs, Divider, FormControlLabel, Link, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Alert, Checkbox, FormGroup, Radio, RadioGroup, Skeleton, TextField } from '@mui/material';
import { BiFile } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import sslImage from "../../Assets/images/ssl_seal_image.png"
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { isMobileOnly, isTablet } from 'react-device-detect';


const Cart = () => {
    const history = useHistory();
    const CHARACTER_LIMIT = 250;
    const [cartlist, setCartlist] = React.useState([]);
    const [shippingterms, setShippingterms] = React.useState([]);
    const [giftcheck, setGiftcheck] = React.useState(false);
    const [checkoutdisabled, setCheckoutdisabled] = React.useState(false);
    const [giftmsg, setGiftmsg] = React.useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.gift_message);
    const [couponcode, setCouponcode] = React.useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.coupan_code);
    const [couponcodetrue, setCouponcodetrue] = React.useState(false);
    const [isCoupon, setIsCoupon] = React.useState(null);
    const [coupondiscount, setCoupondiscount] = React.useState(0);
    const [instructions, setInstructions] = React.useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.instructions ? JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.instructions : "");
    const [tot_sale_price, setTot_sale_price] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const [shippingtax, setShippingtax] = React.useState(0);
    const [sub_total, setSub_total] = React.useState(0);
    const [shippingoptions, setShippingoptions] = React.useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.shippingoptionsid);
    const [shippingoptionname, setShippingoptionname] = React.useState(JSON.parse(sessionStorage.getItem('bw-checkoutdata'))?.shippingoptionsname);

    useEffect(() => {
        addtocartlist();
        // shippingterm();
    }, [])
    const addtocartlist = () => {
        setCheckoutdisabled(false)
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/cart_list', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setCartlist(res.data.data)
                    setTot_sale_price(res.data.data?.tot_sale_price)
                    setSub_total(res.data.data?.sub_total)
                    setShippingtax(res.data.data?.shipping)
                    // setCartlist(res.data.data?.tax) 
                    setShippingoptions(res.data.data?.shipping_option_id)
                    setShippingoptionname(res.data.data?.shipping_option_name)
                    res.data.data?.cart_data_jewelry?.map((val, index) => {
                        if (val.ring_sizes != null) {
                            if (val.ring_size == '') {
                                setCheckoutdisabled(true)
                            }
                        }
                    })
                    res.data.data?.cart_data_combo?.map((val, index) => {
                        if (val.combo_jewelry?.ring_sizes != null) {
                            if (val.combo_jewelry?.ring_size == '' || val.combo_jewelry?.ring_size == 0) {
                                setCheckoutdisabled(true)
                            }
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

    const onSizeSelect = (cart_id, product_id, ringSize, quantity, engraving, engravingfont) => {
        const data = {
            currency_code: currencycode,
            cart_id: cart_id,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            ring_size: ringSize,
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/update_cart', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    localStorage.setItem("bw-addtocartlength", res.data.data.total_count);
                    addtocartlist();
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
    const removefromcartlist = (cart_id) => {
        const data = {
            currency_code: currencycode,
            cart_id: cart_id,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/remove_cart', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    localStorage.setItem("bw-addtocartlength", res.data.data.total_count);
                    addtocartlist();
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
    const addtowishlist = (cart_id, product_id, ringSize, engraving, engravingfont, type) => {
        const data = {
            currency_code: currencycode,
            cart_id: cart_id,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id,
            type: type,
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    localStorage.setItem("bw-wishlistlength", res.data.data.count)
                    removefromcartlist(cart_id, product_id, ringSize, engraving, engravingfont);
                    addtocartlist();
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
    const checkout = () => {
        if (checkoutdisabled) {
            return swal("Select Ring Size!", "", "error");
        } else {
            const data1 = {
                coupan_code: couponcode ? couponcode : "",
                gift_message: giftmsg ? giftmsg : "",
                instructions: instructions ? instructions : "",
                shippingoptionsid: shippingoptions ? shippingoptions : "",
                shippingoptionsname: shippingoptionname ? shippingoptionname : "",
                shipping_cost: shippingtax ? shippingtax : "",
            }
            sessionStorage.setItem("bw-checkoutdata", JSON.stringify(data1))
            history.push('/checkout-shipping')
        }
    }
    useEffect(() => {
        setIsCoupon(null)
    }, [couponcode])
    const applycoupon = (clear, shippingid) => {
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            shipping_option_id: shippingid ? shippingid : shippingoptions,
            coupan_code: clear ? "" : couponcode ? couponcode : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/apply_coupan', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setCouponcodetrue(true);
                    setIsCoupon(res.data.data.coupan_data?.is_coupan);
                    setCoupondiscount(res.data.data.coupan_data?.discount)
                    setTot_sale_price(res.data.data.coupan_data?.final_amount)
                    setSub_total(res.data.data.coupan_data?.total_amount)
                    setShippingtax(res.data.data.coupan_data?.shipping_tax)
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
    const couponclear = () => {
        setCouponcode("");
        setCouponcodetrue(false);
    }
    // const shippingterm = () => {
    //     axios.get(base_url + '/order/shipping_options', {
    //         headers: postHeader
    //     })
    //         .then(res => {
    //             if (res.data.status == 1) {
    //                 setShippingterms(res.data.data)
    //             } else {
    //                 toast.error(res.data.message, { autoClose: 3000 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Your Cart | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            {cartlist?.cart_data_jewelry?.length || cartlist?.cart_data_diamond?.length || cartlist?.cart_data_combo?.length ?
                <div className="rcs_cart_section mt-3">
                    <Container>
                        <Row>
                            <Col className="rcs_breadcrumb mb-2">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink underline="hover" color="inherit" to="/">
                                        Home
                                    </NavLink>
                                    <Typography color="text.primary">cart</Typography>
                                </Breadcrumbs>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <din className="rcs_top_heading">
                                    <h1>Your Cart</h1>
                                </din>
                            </Col>
                        </Row>
                        {isLogin ? "" :
                            <Row className="w-100 m-auto">
                                <Col className="p-0 rcs_withoutlogin">
                                    Create an account to easily track your order. Already have a Belgium Webnet account? <NavLink to="/register"> Sign in </NavLink>
                                </Col>
                            </Row>
                        }
                        <Row className="w-100 m-auto">
                            {cartlist?.cart_data_jewelry?.length ? cartlist?.cart_data_jewelry?.map(val =>
                                <div className="rcs_cart_main d-flex w-100">
                                    <Col xs={12} sm={3} className="p-0">
                                        <div className="rcs_cart_content" onClick={() => val.category_id == 2 ? history.push('/ringsettingdetail/setting/' + val.slug) : history.push('/productdetail/' + val.slug)}>
                                            <Image src={val.url} alt="cart img"></Image>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={6} className="p-0">
                                        <div className="rcs_cart_content">
                                            <h2 onClick={() => val.category_id == 2 ? history.push('/ringsettingdetail/setting/' + val.slug) : history.push('/productdetail/' + val.slug)}>{val.name}</h2>
                                            <span>SKU #: {val.sku}</span>
                                            <ul className='mt-3'>
                                                <li><span onClick={() => addtowishlist(val.cart_id, val.product_id, val.ring_size, val.engraving_text, val.engraving_font, val.product_type)}><FavoriteBorderIcon /> Move To Wish List</span></li>
                                                <li><span onClick={() => removefromcartlist(val.cart_id)}><ClearIcon /> Remove From Cart</span></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={3} className="p-0">
                                        <Row>
                                            <Col xs={12} sm={6}>
                                                <div className="rcs_cart_content1">
                                                    <p><strong>Quantity: {val.quantity}</strong></p>

                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <div className="rcs_cart_content1">
                                                    <p className='pl-sm-0 ml-sm-0 ml-xs-0 pl-xs-0'><strong>{currency}{val.sale_price}</strong></p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {val.ring_sizes != null ?
                                                <FormControl variant="outlined" className='rcs_cart_height'>
                                                    <InputLabel id="demo-simple-select-outlined-label">Ring Size</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={val.ring_size}
                                                        onChange={(e) => onSizeSelect(val.cart_id, val.product_id, e.target.value, val.quantity, val.engraving_text, val.engraving_font)}
                                                        label="Ring Size"
                                                        className="rcs_cart_height_select"
                                                    >
                                                        {val?.ring_sizes?.split(',')?.map((option) => (
                                                            <MenuItem value={option} className='rcs_cart_height_select1'>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl> : ""}

                                        </Row>
                                    </Col>
                                </div>
                            ) : ""}
                            {cartlist?.cart_data_diamond?.length ? cartlist?.cart_data_diamond?.map(val =>
                                <div className="rcs_cart_main d-flex w-100">
                                    <Col xs={12} sm={3} className="p-0">
                                        <div className="rcs_cart_content" onClick={() => history.push(`${val.type == "3" ? '/gemstone-details/' : val.type == '4' ? '/fancy-color-diamond-detail/' : '/diamonds-details/'}${val.stock_no}`)}>
                                            <Image src={val.imagelink} alt="cart img"></Image>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={6} className="p-0">
                                        <div className="rcs_cart_content">
                                            <h2 onClick={() => history.push(`${val.type == "3" ? '/gemstone-details/' : val.type == '4' ? '/fancy-color-diamond-detail/' : '/diamonds-details/'}${val.stock_no}`)}>{val.weight} Carat {val.shape} Cut {val.type == "1" ? 'Natural Diamond' : val.type == "2" ? 'Lab Diamond' : val.type == "3" ? 'Gemstone' : val.type == '4' ? "Fancy Diamond" : "Diamond"}</h2>
                                            <span>STOCK NO. #: {val.stock_no}</span>
                                            <p><span>{val.color} Color </span>|<span> {val.clarity} Clarity</span></p>
                                            <ul>
                                                <li><span onClick={() => addtowishlist(val.cart_id, val.product_id, val.ring_size, val.engraving_text, val.engraving_font, val.product_type)}><FavoriteBorderIcon /> Move To Wish List</span></li>
                                                <li><span onClick={() => removefromcartlist(val.cart_id)}><ClearIcon /> Remove From Cart</span></li>
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={3} className="p-0">
                                        <Row>
                                            <Col xs={12} sm={6}>
                                                <div className="rcs_cart_content1">
                                                    <p><strong>Quantity: {val.quantity}</strong></p>

                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                <div className="rcs_cart_content1">
                                                    <p className='pl-sm-0 ml-sm-0 ml-xs-0 pl-xs-0'><strong>{currency}{val.sale_price}</strong></p>
                                                </div>
                                            </Col>
                                        </Row>

                                    </Col>
                                </div>
                            ) : ""}
                            {cartlist?.cart_data_combo?.length ? cartlist?.cart_data_combo?.map(val =>
                                <div className='rcs_cart_main w-100'>
                                    <div className="d-flex rcs_mobile_view_cart w-100">
                                        <Col xs={12} sm={3} className="p-0">
                                            <div className="rcs_cart_content" onClick={() => history.push('/ringsettingdetail/setting/' + val.combo_jewelry?.slug)}>
                                                <Image src={val.combo_jewelry?.imagelink} alt="cart img"></Image>
                                            </div>
                                        </Col>

                                        <Col xs={12} sm={6} className="p-0">
                                            <div className="rcs_cart_content">
                                                <h2 onClick={() => history.push('/ringsettingdetail/setting/' + val.combo_jewelry?.slug)}>{val.combo_jewelry?.name}</h2>
                                                <span>SKU #: {val.combo_jewelry?.sku}</span>

                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} className="p-0">
                                            <Row>
                                                <Col xs={12} sm={6}>
                                                    <div className="rcs_cart_content1">
                                                        <p><strong>Quantity: {val.combo_jewelry?.quantity}</strong></p>

                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={6}>
                                                    <div className="rcs_cart_content1">
                                                        <p className='pl-sm-0 ml-sm-0 ml-xs-0 pl-xs-0'><strong>{currency}{val.combo_jewelry?.sale_price}</strong></p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                {val.combo_jewelry?.ring_sizes != null ?
                                                    <FormControl variant="outlined" className='rcs_cart_height'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Ring Size</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={val.combo_jewelry?.ring_size}
                                                            onChange={(e) => onSizeSelect(val.combo_jewelry?.cart_id, val.combo_jewelry?.product_id, e.target.value, val.combo_jewelry?.quantity, val.combo_jewelry?.engraving_text, val.combo_jewelry?.engraving_font)}
                                                            label="Ring Size"
                                                            className="rcs_cart_height_select"
                                                        >
                                                            {val.combo_jewelry?.ring_sizes?.split(',')?.map((option) => (
                                                                <MenuItem value={option} className='rcs_cart_height_select1'>
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl> : ""}
                                            </Row>
                                        </Col>
                                    </div>
                                    <Divider />
                                    <div className="d-flex rcs_mobile_view_cart w-100">
                                        <Col xs={12} sm={3} className="p-0">
                                            <div className="rcs_cart_content" onClick={() => val.combo_diamond?.type == 3 ? history.push('/gemstone-details/' + val.combo_diamond?.stock_no) : val.combo_diamond?.type == "4" ? history.push('/fancy-color-diamond-detail/' + val.combo_diamond?.stock_no) : history.push('/diamonds-details/' + val.combo_diamond?.stock_no)}>
                                                <Image src={val.combo_diamond?.imagelink} alt="cart img"></Image>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6} className="p-0">
                                            <div className="rcs_cart_content">
                                                <h2 onClick={() => val.combo_diamond?.type == 3 ? history.push('/gemstone-details/' + val.combo_diamond?.stock_no) : val.combo_diamond?.type == "4" ? history.push('/fancy-color-diamond-detail/' + val.combo_diamond?.stock_no) : history.push('/diamonds-details/' + val.combo_diamond?.stock_no)}>{val.combo_diamond?.weight} Carat {val.combo_diamond?.shape} Cut {val.combo_diamond?.type == "1" ? 'Natural Diamond' : val.combo_diamond?.type == "2" ? 'Lab Diamond' : val.combo_diamond?.type == "3" ? 'Gemstone' : val.combo_diamond?.type == "4" ? "Fancy Color" : "Diamond"}</h2>
                                                <span>STOCK NO. #: {val.combo_diamond?.stock_no}</span>
                                                {/* <p>{val.slug}</p> */}
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} className="p-0">
                                            <Row>
                                                <Col xs={12} sm={6}>
                                                    <div className="rcs_cart_content1">
                                                        <p><strong>Quantity: {val.combo_diamond?.quantity}</strong></p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={6}>
                                                    <div className="rcs_cart_content1">
                                                        <p className='pl-sm-0 ml-sm-0 ml-xs-0 pl-xs-0'><strong>{currency}{val.combo_diamond?.sale_price}</strong></p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                    <Divider />
                                    <Row>
                                        <Col xs={6} sm={6}>
                                            <ul className='rcs_combo_remove'>
                                                <li><span style={{ cursor: 'pointer' }} onClick={() => removefromcartlist(val.combo_jewelry?.cart_id)}><ClearIcon /> Remove From Cart</span></li>
                                            </ul>
                                        </Col>
                                        <Col xs={6} sm={6}>
                                            <div className="rcs_cart_content1">
                                                <p className='pl-sm-0 ml-sm-0 ml-xs-0 pl-xs-0'><strong>Total Amount: {currency}{val?.combo_tot_price}</strong> </p>
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                            ) : ""}
                        </Row>
                        <Row className="w-100 m-auto">
                            <Col xs={12} md={6} className="p-0 pr-md-3 mb-4">
                                <div className="rcs_cart_bottom_content h-100">
                                    <h2><CardGiftcardIcon />GIFT OPTIONS</h2>
                                    {/* <FormGroup>
                                        <FormControlLabel onClick={() => setGiftcheck(!giftcheck)} control={<Checkbox checked={giftcheck} />} label="Gift Wrapping" />
                                    </FormGroup> */}
                                    <p>Add a personalized gift message:</p>
                                    <TextField value={giftmsg} onChange={(e) => setGiftmsg(e.target.value)} id="filled-basic" label="Your Message" variant="filled" />
                                    <Divider />
                                    <h3>USE A COUPON CODE</h3>
                                    {couponcodetrue ? isCoupon ? <Alert className="mt-2" onClose={async () => { await couponclear(); applycoupon(true); }}>{couponcode}</Alert> : <>
                                        <TextField value={couponcode} onChange={(e) => { setCouponcode(e.target.value); setIsCoupon(null) }} id="filled-basic" label="Enter a coupon code" variant="filled" />

                                        <Button variant="secondary" onClick={() => applycoupon()} className="rcs_cancel_button">
                                            Apply Coupon
                                        </Button>
                                        {couponcode?.length && isCoupon == 0 ? <span className="rcs_inv_msg">Invalid Coupon</span> : ""}

                                    </> : <> <TextField value={couponcode} onChange={(e) => setCouponcode(e.target.value)} id="filled-basic" label="Enter a coupon code" variant="filled" />
                                        <Button variant="secondary" onClick={() => applycoupon()} className="rcs_cancel_button">
                                            Apply Coupon
                                        </Button></>
                                    }
                                    <Divider />
                                    <h3><BiFile />SPECIAL INSTRUCTIONS</h3>
                                    <p>Add a note for Belgium Webnet:</p>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Your Message"
                                        multiline
                                        rows={2}
                                        variant="filled"
                                        inputProps={{
                                            minlength: 0,
                                            maxlength: CHARACTER_LIMIT
                                        }}
                                        value={instructions}
                                        helperText={`${instructions?.length}/${CHARACTER_LIMIT}`}
                                        onChange={(e) => setInstructions(e.target.value)}
                                    />
                                </div>
                            </Col>
                            {/* <Col xs={12} md={4} className="rcs_cart_padding mb-4">
                                <div className="rcs_cart_bottom_content rcs_cart_bottom_content1 h-100">
                                    <h2><LocalShippingOutlinedIcon />SHIPPING OPTIONS</h2>
                                    <span>(Select an option below)</span>
                                    <Divider />
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="SHIPPING OPTIONS"
                                            value={Number(shippingoptions)}
                                            name="radio-buttons-group"
                                            onChange={(e) => { setShippingoptions(e.target.value); applycoupon(false, e.target.value); }}
                                        >
                                            {shippingterms?.map(val =>
                                                <>
                                                    <FormControlLabel value={val.shipping_id} control={<Radio />} label={val.shipping_name} />
                                                    <Divider />
                                                </>
                                            )}
                                        </RadioGroup>
                                    </FormControl>

                                </div>
                            </Col> */}
                            <Col xs={12} md={6} className="p-0 pl-md-3 mb-4">
                                <div className="rcs_cart_bottom_content rcs_cart_bottom_content2 h-100">
                                    <h2>ORDER TOTAL</h2>
                                    <ul className="mt-3">
                                        <li><p>SUBTOTAL</p></li>
                                        <li><span>{currency}{sub_total}</span></li>
                                    </ul>
                                    <ul>
                                        <li><p>SHIPPING CHARGES</p></li>
                                        <li><span>{currency}{shippingtax}</span></li>
                                    </ul>
                                    <ul>
                                        <li><p>Coupon Discount</p></li>
                                        <li><span>{currency}{coupondiscount}</span></li>
                                    </ul>
                                    <ul>
                                        <li><p>SALES TAX ESTIMATE</p></li>
                                        <li><span>{currency}{cartlist?.tax}</span></li>
                                    </ul>
                                    <Divider />
                                    <ul>
                                        <li><p>Total Amount</p></li>
                                        <li><span>{currency}{tot_sale_price}</span></li>
                                    </ul>

                                    <ul>
                                        {isLogin ?
                                            <li className="w-100 mt-3"><Button onClick={() => checkout()} variant="primary" className="rcs_save_button w-100">Checkout</Button></li> :
                                            <>
                                                <li className="w-100 mt-3"><Button onClick={() => document.getElementById("loginbutton")?.click()} variant="primary" className="rcs_save_button rcs_save_button1 w-75 m-auto">Login</Button></li>
                                                <li className="w-100 mt-3"><Button onClick={() => checkout()} variant="primary" className="rcs_save_button rcs_save_button1 w-75 m-auto">Guest Checkout</Button></li>
                                            </>
                                        }
                                    </ul>

                                </div>
                            </Col>
                        </Row>
                        <Row className="w-100 m-auto align-items-center">
                            {/* <Col xs={12} md={4} className="p-0 pr-3">
                                <div className="rcs_cart_bottom_content_last h-100">
                                    <p>(Credit Card, Phone)</p>
                                    <Divider />
                                </div>
                            </Col> */}
                            <Col xs={12} md={6} className="rcs_cart_padding">
                                <div className="rcs_cart_bottom_content_last h-100">
                                    <h2>SECURE CHECKOUT</h2>
                                    <ul>
                                        <li><Image src={sslImage} alt="ssl certificate"></Image></li>
                                        <li>Your transaction is secured with 256-bit encryption.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className="rcs_cart_bottom_content_last h-100">
                                    <h2>NEED ASSISTANCE?</h2>
                                    <ul className="rcs_assistance">
                                        <li><Button variant="secondary" className="rcs_cancel_button" onClick={(e) => { window.location.href = `tel:+16469929024` }}><PhoneIphoneIcon /> Call</Button></li>
                                        <li><Button variant="secondary" className="rcs_cancel_button" onClick={(e) => { window.location.href = `mailto:info@belgiumwebnet.com` }}><MailOutlineIcon /> Email</Button></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                :
                localStorage.getItem("bw-addtocartlength") > 0 ?
                    <div className="rcs_cart_section">
                        <Container>
                            <Row>
                                <Col className="rcs_breadcrumb mb-2">
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <NavLink underline="hover" color="inherit" to="/">
                                            Home
                                        </NavLink>
                                        <Typography color="text.primary">cart</Typography>
                                    </Breadcrumbs>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <div className="rcs_top_heading">
                                        <h1><Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={140} height={35} /></h1>
                                    </div>
                                </Col>
                            </Row>
                            {isLogin ? "" :
                                <Row className="w-100 m-auto">
                                    <Col className="p-0 rcs_withoutlogin">
                                        {isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset' }} width={250} height={21} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset' }} width={250} height={21} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={521} height={21} />}
                                    </Col>
                                </Row>
                            }
                            <Row className="w-100 m-auto">
                                {[...Array(Number(localStorage.getItem("bw-addtocartlength")))]?.map(val =>
                                    <div className="rcs_cart_main d-flex w-100">
                                        <Col xs={12} sm={3} className="p-0">
                                            <div className="rcs_cart_content">
                                                {isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', margin: '0 auto' }} width={160} height={160} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', margin: '0 auto' }} width={140} height={140} /> : <Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={160} height={160} />}
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6} className="p-0">
                                            <div className="rcs_cart_content">
                                                <h2>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={200} height={25} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={300} height={25} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={500} height={30} />}</h2>
                                                <span>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={70} height={16} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={70} height={16} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={70} height={16} />}</span>
                                                <ul className='mt-3'>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={121} height={21} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={121} height={21} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: '20px' }} animation="wave" width={121} height={21} />}</li>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={121} height={21} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={121} height={21} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={121} height={21} />}</li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={3} className="p-0">
                                            <Row>
                                                <Col xs={12} sm={6} className="p-0">
                                                    <div className="rcs_cart_content1">
                                                        <p>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', margin: '10px 0 0 15px ' }} width={71} height={17} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px', float: 'right' }} width={71} height={17} /> : <Skeleton variant="text" style={{ transform: 'unset', float: 'right' }} animation="wave" width={71} height={17} />}</p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} sm={6}>
                                                    <div className="rcs_cart_content1">
                                                        <p className='m-0'>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={71} height={17} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px', float: 'right' }} width={71} height={17} /> : <Skeleton variant="text" style={{ transform: 'unset', float: 'right' }} animation="wave" width={71} height={17} />}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                )}
                            </Row>
                        </Container>
                    </div> :
                    <div className="rcs_empty_cart mt-3 mb-5">
                        <Container>
                            <Row>
                                <Col className="rcs_breadcrumb mb-2">
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <NavLink underline="hover" color="inherit" to="/">
                                            Home
                                        </NavLink>
                                        <Typography color="text.primary">cart</Typography>
                                    </Breadcrumbs>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <din className="rcs_top_heading">
                                        <h2>Your Cart is Empty</h2>
                                    </din>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <ul className="rcs_top_btn">
                                        {/* <li className="w-100"><Button variant="secondary" className="rcs_cancel_button w-100">Keep Shopping</Button></li> */}
                                    </ul>
                                </Col>
                            </Row>
                            <Row className="m-auto w-100">
                                <Col className="p-0 mt-3 mb-3">
                                    <Alert severity="error" className="rcs_alert_danger">You have no items in your cart. <NavLink to="/jewelry/fashion-rings"> Browse jewelry</NavLink>.</Alert>
                                </Col>
                            </Row>
                            <Row className="m-auto w-100">
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1 mt-5">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/diamonds")} className="btn-link d-block h4 mb-0 py-60">Diamonds</span>

                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1 mt-5">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/gemstones")} className="btn-link d-block h4 mb-0 py-60">Gemstones</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1 mt-5 mt-xl-5">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/fancy-color-diamond")} className="btn-link d-block h4 mb-0 py-60">Fancy Diamonds</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1 mt-5 mt-md-0  mt-xl-5">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/ringsettings")} className="btn-link d-block h4 mb-0 py-60">Engagement Rings</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/jewelry/fine-jewelry")} className="btn-link d-block h4 mb-0 py-60">Fine Jewelry</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/jewelry/wedding-rings")} className="btn-link d-block h4 mb-0 py-60">Wedding Rings</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/pages/custom-design")} className="btn-link d-block h4 mb-0 py-60">Custom Design</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={4} xl={3} className="rcs_custom_padding1">
                                    <div className="card h-100 shadow">
                                        <div className="card-body text-center d-flex align-items-center py-0 justify-content-center">
                                            <span onClick={() => history.push("/education")} className="btn-link d-block h4 mb-0 py-60">Education</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
            }
        </>
    )
}

export default Cart;