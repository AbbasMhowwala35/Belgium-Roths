import React, { Component } from 'react';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, CircularProgress, Dialog, Link, List, Typography } from '@material-ui/core';
import { Col, Container, Row, ProgressBar, Modal, Form } from 'react-bootstrap';
import { SideBySideMagnifier } from "react-image-magnifiers";
import ImageGallery from "react-image-gallery";
import '../../Assets/css/productDetails.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { TextField, Button, Rating, Skeleton } from '@mui/material';
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import Videoimg from '../../Assets/images/example-360video-thumb.jpg';
import moment from 'moment';
import { ProductAppoitnment, ReturnModal, ShippingModal } from '../../Components/Modals';
import { FacebookShareButton, EmailShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import { Helmet } from 'react-helmet';
import Ringbildermenu from '../../Components/ringbildermenu';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { isMobileOnly,  isTablet } from 'react-device-detect';
import { NavLink } from 'react-router-dom';

class Productdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: true,
            images: [],
            currentImageUrl: [],
            currentImagetype: null,
            currencies: [
                {
                    value: 'Round',
                    label: 'Round',
                },
                {
                    value: 'Round Cut',
                    label: 'Round Cut',
                },
                {
                    value: 'Round1',
                    label: 'Round1',
                },
                {
                    value: 'Round2',
                    label: 'Round2',
                },
            ],
            currency: false,
            value: '5',
            shipping: false,
            return: false,
            review: false,
            filterdata: [],
            productdetails: [],
            reviewdata: [],
            slug: this.props.match.params.slug,
            rating: '',
            comment: "",
            ringSize: 0,
            notify: false,
            ringSizeAvailable: false,
            loader: true,
            shippingterm: [],
            openbutton: false,
        }

    }
    componentDidMount() {
        this.productdetails();
        this.filterApi();
        this.shippingterm();
    }
    shippingterm = () => {
        axios.get(base_url + '/order/shipping_options', {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    this.setState({ shippingterm: res.data.data })
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    filterApi = () => {
        const data = { currency_code : currencycode,
            slug: this.state.slug
        }
        axios.post(base_url + '/product/productdetailfilter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    this.setState({ filterdata: res.data.data })
                    res.data.data.map(val => {
                        if (val.title == "Ring Size") {
                            this.setState({ ringSizeAvailable: true })
                        }
                    })
                } else {
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    productdetails = () => {
        this.setState({ loader: true })
        const data = { currency_code : currencycode,
            slug: this.state.slug,
            selecteddata: this.state.filterdata,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
        }
        axios.post(base_url + '/product/productdetail', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    if (this.props.match.params.id == "setting") {
                        this.props.history.push("/ringsettingdetail/setting/" + res.data.data[0].slug)
                    } else {
                        this.props.history.push("/productdetail/" + res.data.data[0].slug)
                    }
                    this.getReview(res.data.data[0]?.product_id);
                    var arr = [];
                    this.setState({ productdetails: res.data.data[0], currentImageUrl: res.data.data[0]?.product_image[0]?.url, currentImagetype: res.data.data[0]?.product_image[0]?.type, slug: res.data.data[0].slug })
                    res.data.data[0]?.product_image?.map(val => {
                        if (val.type == '2') {
                            var obj = { original: val.url, thumbnail: Videoimg, type: val.type }
                            arr.push(obj)
                        } else {
                            var obj = { original: val.url, thumbnail: val.url, type: val.type }
                            arr.push(obj);
                        }
                    })
                    this.setState({ images: arr, loader: false })

                    // this.filterApi();
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    this.props.history.push("/")
                    window.location.reload(true);
                } else {
                    this.props.history.push("/page-not-found");
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addtowishlist = (product_id) => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id,
            type: 'JEWELRY',
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    this.productdetails();
                    localStorage.setItem("bw-wishlistlength", res.data.data.count)
                    toast.success(res.message, { autoClose: 3000 });
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    this.props.history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onchangeselect = (e, title) => {
        var changedata = [...this.state.filterdata];
        changedata = changedata.map(
            obj => (obj.title == title ? Object.assign(obj, { selected: e.target.value }) : obj)
        )
        this.setState({ filterdata: changedata })
        this.productdetails();
    }
    getReview = (product_id) => {
        const data = { currency_code : currencycode,
            product_id: product_id
        }
        axios.post(base_url + '/product/reviews_list', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    this.setState({ reviewdata: response.data.data })
                } else {
                    toast.error(response.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addtocart = (product_id) => {
        if (this.state.ringSize == 0 && this.state.ringSizeAvailable) {
            this.setState({ notify: true })
        } else {
            const data = { currency_code : currencycode,
                user_id: user.user_id ? user.user_id : "",
                session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
                product_id,
                quantity: "1",
                ring_size: this.state.ringSize,
                engraving_text: "",
                engraving_font: "",
                token: isLogin ? user.token : "",
                type: "jewelry"
            }
            axios.post(base_url + '/order/add_to_cart', data, {
                headers: postHeader
            })
                .then(res => {
                    if (res.data.status == 1) {
                        localStorage.setItem("bw-addtocartlength", res.data.data.total_count)
                        this.props.history.push("/cart")
                        toast.success(res.data.message, { autoClose: 3000 });
                    } else if (res.data.status == 2) {
                        localStorage.removeItem('bw-user')
                        localStorage.removeItem('bw-wishlistlength');
                        localStorage.removeItem('bw-addtocartlength');
                        localStorage.removeItem("bw-session-id")
                        this.props.history.push("/")
                        window.location.reload(true);
                    } else {
                        toast.error(res.data.message, { autoClose: 3000 });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    submitReview = () => {
        const data = { currency_code : currencycode,
            user_id: user?.user_id,
            token: user?.token,
            rating: this.state.rating,
            review: this.state.comment,
            product_id: this.state.productdetails?.product_id
        }
        axios.post(base_url + '/product/add_review', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    this.getReview(data.product_id);
                    this.setState({ review: false })
                    this.setState({ comment: "", rating: "" })
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    this.props.history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    handleCloseShipping = () => this.setState({ shipping: false });
    handleShowShipping = () => this.setState({ shipping: true });
    handleCloseReturn = () => this.setState({ return: false });
    handleShowReturn = () => this.setState({ return: true });
    handleShowAppointment = () => this.setState({ appointment: true });
    handleCloseAppointment = () => this.setState({ appointment: false });
    handleCloseReview = () => this.setState({ review: false });
    handleShowReview = () => this.setState({ review: true });
    handleOpenButton = () => {
        if (this.state.ringSize == 0 && this.state.ringSizeAvailable) {
            this.setState({ notify: true })
            // setInterval(() => {  this.setState({ notify: false }) }, 3000);
        } else {
            this.setState({ openbutton: true });
        }
    }
    handleCloseButton = () => this.setState({ openbutton: false });

    setView = (event, index) => {
        this.setState({
            currentImageUrl: this.state.images[index].original,
            currentImagetype: this.state.images[index].type
        });
    };
    selectSetting = () => {
        if (this.state.ringSize == 0 && this.state.ringSizeAvailable) {
            this.setState({ notify: true })
            // setInterval(() => {  this.setState({ notify: false }) }, 3000);
        } else {

            const data = { currency_code : currencycode,
                product_id: this.state.productdetails?.product_id,
                slug: this.state.productdetails?.slug,
                image: this.state.currentImageUrl,
                price: this.state.productdetails?.sale_price,
                ring_size: this.state.ringSize,
                name: this.state.productdetails?.name,
            }
            localStorage.setItem("bw-step", (JSON.parse(localStorage.getItem("bw-gemstonedata") == null) && JSON.parse(localStorage.getItem("bw-diamonddata") == null) && JSON.parse(localStorage.getItem("bw-fancycolordata") == null)) ? "setting" : "stone");
            localStorage.setItem("bw-settingdata", JSON.stringify(data));
            if (JSON.parse(localStorage.getItem("bw-gemstonedata") != null)) {
                this.props.history.push('/complete-gemstone-ring')
            } else if (JSON.parse(localStorage.getItem("bw-diamonddata") != null)) {
                this.props.history.push('/complete-diamond-ring')
            } else if (JSON.parse(localStorage.getItem("bw-fancycolordata") != null)) {
                this.props.history.push('/complete-fancycolor-ring')
            }
        }

    }
    render() {
        var average = 0;
        const average1 = this.state.reviewdata?.rating_count?.map(val => val.rating == 5 ? average = val.average : "");
        const step = JSON.parse(sessionStorage.getItem('bw-step')) ? JSON.parse(sessionStorage.getItem('bw-step')) : [3,1];
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.productdetails?.name}</title>
                    <meta name="description" content={this.state.productdetails?.description}></meta>
                    <meta name="keywords" content=""></meta>
                </Helmet>
                {this.state.loader ?
                    <div className="rcs_filter_wrapper">
                        {this.props.match.params.id == "setting" ? <CircularProgress className="rcs_filter_loader rcs_filter_loader1" /> : <CircularProgress className="rcs_filter_loader" />}
                    </div> : ""}
                <div className="rcs_ringsetting_section mt-3">
                    <Container className={this.props.match.params.id == "setting" ? "rcs_shap-wizard_container" : ""} >
                        <Row>
                            <Col className="rcs_breadcrumb mb-2">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink underline="hover" color="inherit" to="/">
                                        Home
                                    </NavLink>
                                    <NavLink underline="hover" color="inherit" to={this.props.match.params.id == "setting" ? step == JSON.stringify(step) == "[2,3]" || JSON.stringify(step) == "[3,2]" ? "/ringsettings/gemstones" : JSON.stringify(step) == "[0,3]" || JSON.stringify(step) == "[3,0]" ? "/ringsettings/fancycolor" : "/ringsettings/diamonds" : "/jewelry/" + this.state.productdetails.category_name}>
                                        {this.state.productdetails.category_name}
                                    </NavLink>
                                    <Typography color="text.primary">
                                        {this.state.productdetails.name}
                                    </Typography>
                                </Breadcrumbs>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="rcs_shap-wizard_container">
                        {this.props.match.params.id == "setting" ? <Ringbildermenu location="setting" /> : ""}
                    </Container>
                </div>
                <div className="rcs_product_details">
                    <Container>
                        <Row>
                            <Col sm={12} md={12} lg={8} xl={8} className='rcs_large_tablet'>
                                <div className="magnify-Image">
                                    {/* <Row className="align-items-center"> */}
                                    <Row>
                                        <Col sm={2} className="order-last order-sm-first">
                                            <ImageGallery
                                                items={this.state.images}
                                                onThumbnailClick={this.setView}
                                                showFullscreenButton={false}
                                                showPlayButton={false}
                                                showNav={false}
                                            />
                                            {/* {this.state.videos?.map((val,index) => 
                                            <button onClick={(e)=> this.setViewvideo(e,index)} type="button" className= {this.state.currentImagetype == 1 ? "image-gallery-thumbnail " : "image-gallery-thumbnail active"}>
                                                <span class="image-gallery-thumbnail-inner">
                                                    <video class="image-gallery-thumbnail-image" src={Videoimg} />
                                                        </span>
                                                        </button> 
                                            )} */}
                                        </Col>

                                        <Col sm={10} >
                                            {this.state.currentImagetype == 1 ?
                                                <SideBySideMagnifier
                                                    alwaysInPlace={false}
                                                    className="image-to-magnify"
                                                    fillAvailableSpace={false}
                                                    imageSrc={this.state.currentImageUrl}
                                                    largeImageSrc={this.state.currentImageUrl}
                                                /> :
                                                <div className='video-wrapper'>
                                                    <video
                                                        width='540'
                                                        height='540'
                                                        src={this.state.currentImageUrl}
                                                        frameBorder='0'
                                                        allowFullScreen
                                                        autoPlay
                                                        loop
                                                    >
                                                    </video>
                                                </div>}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={4} xl={4} className='rcs_large_tablet'>
                                <div className="ml_product_content d-flex widget flex-column justify-content-center align-items-start text-left pt-3 pt-md-0 w-100 widget h-100">
                                    {this.state.loader ?
                                        <div className="rcs_content_block w-100">
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" width={290} height={45} /> : isTablet ? <Skeleton variant="text" animation="wave" width={500} height={45} /> : <Skeleton variant="text" animation="wave" width={350} height={45} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" width={100} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : <Skeleton variant="text" animation="wave" width={100} height={30} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" width={150} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={210} height={30} /> : <Skeleton variant="text" animation="wave" width={150} height={30} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={290} height={80} /> : isTablet ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={500} height={100} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={130} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave"  style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
                                            {/* <div className="rcs_product_btn">
                                                <ul className='d-flex justify-content-between'>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={135} height={35} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={340} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={165} height={35} />}</li>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={135} height={35} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={340} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px', marginBottom: '5px' }} width={165} height={35} />}</li>
                                                </ul>
                                            </div> */}
                                            <div className="rcs_social">
                                                <ul>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={65} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={170} height={40} /> : <Skeleton variant="text" animation="wave" width={80} height={30} />}</li>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={65} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={170} height={40} /> : <Skeleton variant="text" animation="wave" width={80} height={30} />}</li>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={65} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={170} height={40} /> : <Skeleton variant="text" animation="wave" width={80} height={30} />}</li>
                                                    <li>{isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={65} height={30} /> : isTablet ? <Skeleton variant="text" animation="wave" width={170} height={40} /> : <Skeleton variant="text" animation="wave" width={80} height={30} />}</li>
                                                </ul>
                                            </div>
                                        </div> :
                                        <div className="rcs_content_block w-100">
                                            <div className="rcs_product_heading">
                                                <h1>{this.state.productdetails?.name}</h1>
                                            </div>
                                            <div className="rcs_price">
                                                <p><strong>SKU :</strong> {this.state.productdetails?.sku}</p>
                                            </div>
                                            {this.state.productdetails.is_price == 1 ?
                                                <div className="rcs_price">
                                                    <h4>{this.state.productdetails?.currency_icon}{this.state.productdetails?.sale_price}</h4>
                                                </div> :
                                                <div className="rcs_email">
                                                    <span>Email us for Price</span>
                                                </div>
                                            }
                                            <div className="rcs_content_details">
                                                <p>{this.state.productdetails?.description}</p>
                                            </div>
                                            <div className="rcs_filter rcs_add_address">
                                                {this.state.filterdata?.map(val =>
                                                    <FormControl variant="outlined" >
                                                        <InputLabel className={val?.title == "Ring Size" && this.state.notify ? "rcs_details_ring_size1" : ""} id="demo-simple-select-outlined-label">{val?.title}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={val?.title == "Ring Size" ? this.state.ringSize == '0' ? "" : this.state.ringSize : val?.selected}
                                                            onChange={(e) => { this.setState({ notify: false }); val?.title == "Ring Size" ? this.setState({ ringSize: e.target.value }) : this.onchangeselect(e, val?.title) }}
                                                            label={val?.title}
                                                            className={val?.title == "Ring Size" && this.state.notify ? "rcs_details_ring_size animate__animated animate__shakeX" : "rcs_details_ring_size"}
                                                        >
                                                            {val?.data?.map((option) => (
                                                                <MenuItem value={option.value}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                )}
                                            </div>
                                            <div className="rcs_product_btn">
                                                {this.state.productdetails?.enable_ecommerce ?
                                                    this.props.match.params.id == "setting" ? JSON.parse(localStorage.getItem("bw-gemstonedata") != null) || JSON.parse(localStorage.getItem("bw-diamonddata") != null) || JSON.parse(localStorage.getItem("bw-fancycolordata") != null) ?
                                                        <Button variant="contained" onClick={() => this.selectSetting()} className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Add This Setting</Button> :
                                                        <Button variant="contained" onClick={() => this.handleOpenButton()} className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Add This Setting</Button>
                                                        :
                                                        <Button variant="contained" onClick={() => this.addtocart(this.state.productdetails?.product_id)} className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Add to Cart</Button> :
                                                    <Button variant="contained" className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Inquire</Button>
                                                }
                                                <Dialog onClose={this.handleCloseButton} open={this.state.openbutton} className="rcs_dialog_btn1">
                                                    <List sx={{ pt: 0 }} className="rcs_dialog_btn m-10">
                                                        <Button variant="contained" onClick={() => { this.props.history.push('/diamonds'); this.handleCloseButton(); this.selectSetting(); }} className="rcs_add_setting_btn w-100 mb-3">ADD A DIAMOND</Button>
                                                        <Button variant="contained" onClick={() => { this.props.history.push('/gemstones'); this.handleCloseButton(); this.selectSetting(); }} className="rcs_add_setting_btn1 w-100 mb-3">ADD A GEMSTONE</Button>
                                                        <Button variant="contained" onClick={() => { this.props.history.push('/fancy-color-diamond'); this.handleCloseButton(); this.selectSetting(); }} className="rcs_add_setting_btn2 w-100 mb-3">ADD A FANCY DIAMOND</Button>
                                                        <Button variant="contained" onClick={() => { this.addtocart(this.state.productdetails?.product_id); this.handleCloseButton(); this.selectSetting(); }} className="rcs_add_setting_btn2 w-100 mb-3">ADD TO CART</Button>
                                                    </List>
                                                </Dialog>
                                                {this.state.productdetails?.is_wishlist == 0 ?
                                                    <Button variant="outlined" onClick={() => this.addtowishlist(this.state.productdetails?.product_id)} className="rcs_border_btn w-100 mb-3 rcs_wish_btn_detail">Add to Wish List</Button> :
                                                    <ul>
                                                        <li><Button onClick={() => this.addtowishlist(this.state.productdetails?.product_id)} variant="outlined" className="rcs_border_btn rcs_border_btn2 w-100 mb-3 float-left mr-1 rcs_wish_btn_detail">Remove From Wish List</Button></li>
                                                        {/* <li><Button variant="outlined" onClick={() => isLogin ? this.props.history.push('/account/wishlist') : this.props.history.push('/wishlist')} className="rcs_border_btn rcs_border_btn3 mb-3 ml-1">View Wish List</Button></li> */}
                                                    </ul>
                                                }
                                                <Button variant="outlined" className="rcs_border_btn w-100 mb-3 rcs_appoint_btn_detail" onClick={this.handleShowAppointment}>Schedule an Appointment</Button>
                                                {/* <ul>
                                                    <li><Button variant="outlined" className="rcs_border_btn rcs_border_btn1 mb-3 float-left mr-1 rcs_border_btn_border" onClick={this.handleShowShipping}> <i class="fas fa-shipping-fast"></i> Shipping</Button></li>
                                                    <li><Button variant="outlined" className="rcs_border_btn rcs_border_btn1 mb-3 ml-1 rcs_border_btn_border" onClick={this.handleShowReturn}> <i class="fas fa-undo-alt"></i> Returns</Button></li>
                                                </ul> */}
                                            </div>
                                            {/* <div className="rcs_ring_style_type">
                                            {this.state.productdetails?.attribute?.map(val =>
                                                val.title.includes('Style') ?
                                                    <p><strong>{val.title} : </strong>{val.value}</p> : ""
                                            )}
                                        </div> */}
                                            <div className="rcs_social">
                                                <ul>
                                                    <li>
                                                        <FacebookShareButton
                                                            url={String(window.location)}
                                                            className="Demo__some-network__share-button"
                                                        >
                                                            <i class="fab fa-facebook-f"></i> Facebook
                                                        </FacebookShareButton></li>
                                                    <li>
                                                        <PinterestShareButton
                                                            url={String(window.location)}
                                                            media={String(window.location)}
                                                            windowWidth={1000}
                                                            windowHeight={730}
                                                        >
                                                            <i class="fab fa-pinterest-p"></i> Pinterest
                                                        </PinterestShareButton> </li>
                                                    <li>
                                                        <EmailShareButton subject={'Belgium Webnet'} body={String(window.location)}>
                                                            <i class="fas fa-envelope"></i> Email
                                                        </EmailShareButton> </li>
                                                    <li>
                                                        <TwitterShareButton
                                                            title={"Belgium Webnet"}
                                                            url={String(window.location)}
                                                        >
                                                            <i class="fab fa-twitter"></i> Twitter
                                                        </TwitterShareButton> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="rcs_product_specification">
                    <Container>
                        <Row className="m-auto w-100">
                            <Col className="p-0">
                                <h2>PRODUCT DETAILS</h2>
                                <Row>
                                    {this.state.productdetails?.attribute?.map(val =>
                                        <Col xs={6} sm={3}>
                                            <div className="rcs_product_specification_content">
                                                <strong>{val.title} : </strong>
                                                <p>{val.value}</p>
                                            </div>
                                        </Col>)}
                                        {this.state.productdetails?.category_id == "2" ?
                                        <Col xs={6} sm={3}>
                                            <div className="rcs_product_specification_content">
                                                <strong>Can be set with : </strong>
                                                <p>{this.state.productdetails?.setwithmin + " - " + this.state.productdetails?.setwithmax}</p>
                                            </div>
                                        </Col>:""}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="rcs_product_specification">
                    {this.state.reviewdata?.rating_count?.length ?
                        <div className="rcs_product_specification_top">
                            <Container>
                                <Row className="m-auto w-100">
                                    <Col className="rcs_p0">
                                        <h2>REVIEWS</h2>
                                        <Row>
                                            <Col xs={12} sm={6} md={7} className="rcs_p0 p-0">
                                                <div className="rcs_rating_overall">
                                                    <h2>{this.state.reviewdata?.average_rating}</h2>
                                                    <p className="rcs_out_of">Out of 5</p>
                                                </div>
                                                <div className="rcs_rating_progress">
                                                    <ul>
                                                        {this.state.reviewdata?.rating_count?.map(val =>
                                                            <li><p>{val.rating} Star</p> <ProgressBar className="w-75" now={val.average} /><span>{val.count}</span></li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} md={5} className="p-0">
                                                <div className="rcs_rating_overall_star">
                                                    <h3>Overall Rating</h3>
                                                    <Rating name="read-only" value={Number(this.state.reviewdata?.average_rating)?.toFixed(0)} readOnly />
                                                </div>
                                                <div className="rcs_rating_overall_total">
                                                    <h3>{average}%</h3>
                                                    <p>of recent buyers <br />
                                                        gave Belgium Webnet 5 stars</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div> :
                        ""}
                    <div className="rcs_product_specification_bottom pb-5">
                        <Container className="rcs_p0 mt-4">
                            {this.state.reviewdata?.review_data?.map(val =>
                                <Row className="m-auto w-100">
                                    <Col className="p-0">
                                        <div className="rcs_product_specification_bottom_content">
                                            <div className="media">
                                                <div className="rcs_test_cotnent">
                                                    <span className='rcs_user_name'>{val.first_name[0]}</span>
                                                </div>
                                                <div class="media-body">
                                                    <label class="mb-0">{val.first_name} {val.last_name}</label>
                                                    <p class="colored-stars">
                                                        <Rating name="read-only" value={val.rating} readOnly />
                                                        <small class="float-right">{moment(new Date(val.created_at)).format("YYYY-MM-DD")}</small>
                                                    </p>
                                                    <p class="pt-2 pr-md-30 mb-0 small">{val.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                            <Row className="m-auto w-100 rcs_write_review">
                                <Col className="p-0">
                                    <h2>SUBMIT A PRODUCT REVIEW</h2>
                                    <Button variant="contained" className="rcs_acc_button rcs_review_btn" onClick={() => isLogin ? this.handleShowReview() : document.getElementById("loginbutton")?.click()}>Write a Review</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>

                {/*Shipping Modal*/}
                {this.state.shipping ?
                    <ShippingModal shippingterm={this.state.shippingterm} handleCloseShipping={this.handleCloseShipping} /> : ""}
                {/*Shipping Modal*/}
                {/*Return Modal*/}
                {this.state.return ?
                    <ReturnModal handleCloseReturn={this.handleCloseReturn} /> : ""}
                {/*Return Modal*/}
                {/*Review Modal*/}
                <Modal show={this.state.review} onHide={this.handleCloseReview}>
                    <Modal.Header>
                        <Modal.Title>WRITE A REVIEW</Modal.Title>
                        <button type="button" onClick={this.handleCloseReview} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="rcs_add_address">
                            <Row>
                                <Col>
                                    <p>Enter your information below and tell us about your experience.</p>
                                </Col>
                            </Row>
                            <Form>
                                <Row>
                                    <Col xs={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Rating"
                                            value={this.state.rating}
                                            onChange={(e) => this.setState({ rating: e.target.value })}
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                        </TextField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <TextField
                                            id="outlined-basic"
                                            multiline
                                            rows={4}
                                            label="Testimonial"
                                            type="text"
                                            variant="outlined"
                                            value={this.state.comment}
                                            onChange={(e) => this.setState({ comment: e.target.value })}
                                            required
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="rcs_cancel_button mr-2" onClick={this.handleCloseReview}>
                            Close
                        </Button>
                        <Button variant="primary" className="rcs_save_button" onClick={() => this.submitReview()}>
                            Submit Testimonial
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*Review Modal*/}
                {/*Appointment Modal*/}
                {this.state.appointment ?
                    <ProductAppoitnment type="jewelry" id={this.state.productdetails?.product_id} handleClose={() => this.setState({ appointment: false })} /> : ""
                }
                {/*Appointment Modal*/}
            </>
        )
    }
}

export default Productdetails;