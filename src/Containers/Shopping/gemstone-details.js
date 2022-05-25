import React, { Component } from 'react';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, CircularProgress, Link, Typography } from '@material-ui/core';
import { Col, Container, Row } from 'react-bootstrap';
import { SideBySideMagnifier } from "react-image-magnifiers";
import ImageGallery from "react-image-gallery";
import '../../Assets/css/productDetails.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import { Button, Skeleton } from '@mui/material';
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, setSteps, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import Videoimg from '../../Assets/images/example-360video-thumb.jpg'
import moment from 'moment';
import { FacebookShareButton, EmailShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import { Helmet } from 'react-helmet';
import Ringbildermenu from '../../Components/ringbildermenu';
import { ProductAppoitnment, ReturnModal, ShippingModal } from '../../Components/Modals';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { NavLink } from 'react-router-dom';

class GemstonesDetails extends Component {
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
            appointment: false,
            return: false,
            review: false,
            productdetails: [],
            reviewdata: [],
            stock_no: this.props.match.params.stock_no,
            rating: '',
            comment: "",
            ringSize: 0,
            notify: false,
            ringSizeAvailable: false,
            loader: true,
            date: moment(new Date()).format("YYYY-MM-DD"),
            time: true,
            shippingterm: []
        }

    }
    componentDidMount() {
        setSteps(2)
        this.productdetails();
        // this.shippingterm();
    }
    // shippingterm = () => {
    //     axios.get(base_url + '/order/shipping_options', {
    //         headers: postHeader
    //     })
    //         .then(res => {
    //             if (res.data.status == 1) {
    //                 this.setState({ shippingterm: res.data.data })
    //             } else {
    //                 toast.error(res.data.message, { autoClose: 3000 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    productdetails = () => {
        this.setState({ loader: true })
        const data = {
            currency_code: currencycode,
            stock_no: this.state.stock_no,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
        }
        axios.post(base_url + '/diamond/diamond_detail', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    var arr = [];
                    this.setState({
                        productdetails: res.data.data,
                        currentImageUrl: res.data.data?.imagelink,
                        currentImagetype: 1
                    })
                    var obj = { original: res.data.data?.imagelink, thumbnail: res.data.data?.imagelink, type: 1 }
                    arr.push(obj);
                    if (res.data.data?.videolink != "") {
                        var obj = { original: res.data.data?.videolink, thumbnail: Videoimg, type: 2 }
                        arr.push(obj)
                    }
                    this.setState({ images: arr, loader: false })
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
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id,
            type: 'diamond',
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
        const data = {
            currency_code: currencycode,
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
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            diamond_id: product_id,
            quantity: "1",
            ring_size: this.state.ringSize,
            engraving_text: "",
            engraving_font: "",
            token: isLogin ? user.token : "",
            type: "diamond"
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

    submitReview = () => {
        const data = {
            currency_code: currencycode,
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
    handleShowAppointment = () => this.setState({ appointment: true });
    handleCloseAppointment = () => this.setState({ appointment: false });
    handleCloseReturn = () => this.setState({ return: false });
    handleShowReturn = () => this.setState({ return: true });
    handleCloseReview = () => this.setState({ review: false });
    handleShowReview = () => this.setState({ review: true });


    setView = (event, index) => {
        this.setState({
            currentImageUrl: this.state.images[index].original,
            currentImagetype: this.state.images[index].type
        });
    };
    addGemstone = () => {
        const data = {
            currency_code: currencycode,
            product_id: this.state.productdetails?.stock_no,
            image: this.state.productdetails?.imagelink,
            price: this.state.productdetails?.sale_price,
            name: this.state.productdetails?.weight + ' Carat ' + this.state.productdetails?.shape + " " + this.state.productdetails?.color + ' ' + this.state.productdetails?.stone_type,
            color: this.state.productdetails?.color,
            icon: this.state.productdetails?.icon
        }
        localStorage.setItem("bw-step", (JSON.parse(localStorage.getItem("bw-settingdata")) != null) ? "setting" : "stone");
        localStorage.removeItem("bw-diamonddata")
        localStorage.setItem("bw-gemstonedata", JSON.stringify(data));
        if (JSON.parse(localStorage.getItem("bw-settingdata")) == null) {
            this.props.history.push('/ringsettings/gemstones');
        } else {
            this.props.history.push('/complete-gemstone-ring');
        }
    }
    render() {
        var average = 0;
        const average1 = this.state.reviewdata?.rating_count?.map(val => val.rating == 5 ? average = val.average : "");
        return (
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.productdetails.name}</title>
                    <meta name="description" content={this.state.productdetails?.description}></meta>
                    <meta name="keywords" content=""></meta>
                </Helmet>
                {this.state.loader ?
                    <div className="rcs_filter_wrapper" >
                        <CircularProgress className="rcs_filter_loader" />
                    </div> : ""}
                <div className="rcs_ringsetting_section mt-3">
                    <Container className="rcs_shap-wizard_container">
                        <Row>
                            <Col className="rcs_breadcrumb mb-2">
                                <Breadcrumbs aria-label="breadcrumb">
                                    <NavLink underline="hover" color="inherit" to="/">
                                        Home
                                    </NavLink>
                                    <NavLink underline="hover" color="inherit" to="/gemstones">
                                        Gemstones
                                    </NavLink>
                                    <Typography color="text.primary">
                                        {this.state.productdetails?.weight} Carat {this.state.productdetails?.shape} {this.state.productdetails?.color} {this.state.productdetails?.stone_type}
                                    </Typography>
                                </Breadcrumbs>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="rcs_shap-wizard_container">
                    <Ringbildermenu location="gemstone" />
                </Container>
                <div className="rcs_product_details">
                    <Container>
                        <Row>
                            <Col sm={12} md={12} lg={8} xl={8} className='rcs_large_tablet'>
                                <div className="magnify-Image">
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
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
                                            {isMobileOnly ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={290} height={40} /> : isTablet ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={690} height={40} /> : <Skeleton variant="text" animation="wave" style={{ transform: 'unset', marginTop: '10px' }} width={350} height={50} />}
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
                                                <h1>{this.state.productdetails?.weight} Carat {this.state.productdetails?.shape} {this.state.productdetails?.color} {this.state.productdetails?.stone_type}</h1>
                                            </div>
                                            <div className="rcs_price">
                                                <h4>{currency}{this.state.productdetails?.sale_price}</h4>
                                            </div>
                                            <div className="rcs_price">
                                                <p><span>{this.state.productdetails?.color} Color </span>|<span> {this.state.productdetails?.clarity} Clarity</span></p>
                                            </div>
                                            <div className="rcs_product_btn">
                                                {this.state.productdetails?.is_cart ?
                                                    <Button variant="contained" disabled className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Already in Cart</Button>
                                                    :
                                                    <Button variant="contained" onClick={this.addGemstone} className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Add This Gemstone</Button>

                                                }
                                                {this.state.productdetails?.is_cart || JSON.parse(localStorage.getItem('bw-gemstonedata')) ?
                                                    this.state.productdetails?.is_wishlist == 0 ?
                                                        <Button variant="outlined" onClick={() => this.addtowishlist(this.state.productdetails?.stock_no)} className="rcs_border_btn w-100 mb-3">Add to Wish List</Button> :
                                                        <Button onClick={() => this.addtowishlist(this.state.productdetails?.stock_no)} variant="outlined" className="rcs_border_btn w-100 mb-3">Remove Wish List</Button>
                                                    :
                                                    <ul>
                                                        <li>
                                                            {this.state.productdetails?.is_wishlist == 0 ?
                                                                <Button variant="outlined" onClick={() => this.addtowishlist(this.state.productdetails?.stock_no)} className="rcs_border_btn rcs_border_btn1 mb-3 float-left mr-1">Add to Wish List</Button> :
                                                                <Button onClick={() => this.addtowishlist(this.state.productdetails?.stock_no)} variant="outlined" className="rcs_border_btn rcs_border_btn1 mb-3 float-left mr-1">Remove Wish List</Button>
                                                            }
                                                        </li>
                                                        <li><Button variant="outlined" onClick={() => this.addtocart(this.state.productdetails?.stock_no)} className="rcs_border_btn rcs_border_btn1 mb-3 ml-1">Add to Cart</Button></li>
                                                    </ul>
                                                }
                                                <Button variant="outlined" className="rcs_border_btn w-100 mb-3" onClick={this.handleShowAppointment}>Schedule an Appointment</Button>
                                                {/* <ul>
                                                    <li><Button variant="outlined" className="rcs_border_btn rcs_border_btn1 mb-3 float-left mr-1 rcs_border_btn_border" onClick={this.handleShowShipping}> <i class="fas fa-shipping-fast"></i> Shipping</Button></li>
                                                    <li><Button variant="outlined" className="rcs_border_btn rcs_border_btn1 mb-3 ml-1 rcs_border_btn_border" onClick={this.handleShowReturn}> <i class="fas fa-undo-alt"></i> Returns</Button></li>
                                                </ul> */}
                                            </div>
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
                                        </div>}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="rcs_product_specification">
                    <Container>
                        <Row className="m-auto w-100">
                            <Col className="p-0 mb-5">
                                <h2>PRODUCT DETAILS</h2>
                                <Row>
                                {this.state.productdetails?.stone_type && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Stone Type  : </strong>
                                            <p>{this.state.productdetails?.stone_type}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.shape && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Shape  : </strong>
                                            <p>{this.state.productdetails?.shape}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.cut_grade && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Cut  : </strong>
                                            <p>{this.state.productdetails?.cut_grade}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.color && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Color  : </strong>
                                            <p>{this.state.productdetails?.color}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.clarity && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Clarity  : </strong>
                                            <p>{this.state.productdetails?.clarity}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.weight && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Carat Weight  : </strong>
                                            <p>{this.state.productdetails?.weight}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.measurements && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Measurements  : </strong>
                                            <p>{this.state.productdetails?.measurements}</p>
                                        </div>
                                    </Col>}
                                    {this.state.productdetails?.stock_no && <Col xs={6} sm={3}>
                                        <div className="rcs_product_specification_content">
                                            <strong>Stock No  : </strong>
                                            <p>{this.state.productdetails?.stock_no}</p>
                                        </div>
                                    </Col>}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/*Shipping Modal*/}
                {this.state.shipping ?
                    <ShippingModal shippingterm={this.state.shippingterm} handleCloseShipping={this.handleCloseShipping} /> : ""}
                {/*Shipping Modal*/}
                {/*Appointment Modal*/}
                {this.state.appointment ?
                    <ProductAppoitnment type="gemstone" id={this.state.productdetails?.stock_no} handleClose={() => this.setState({ appointment: false })} /> : ""
                }
                {/*Appointment Modal*/}
                {/*Return Modal*/}
                {this.state.return ?
                    <ReturnModal handleCloseReturn={this.handleCloseReturn} /> : ""}
                {/*Return Modal*/}
            </>
        )
    }
}

export default GemstonesDetails;