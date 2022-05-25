import React, { Component } from 'react';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, CircularProgress, Divider, Link, Typography } from '@material-ui/core';
import { Col, Container, Row } from 'react-bootstrap';
import { SideBySideMagnifier } from "react-image-magnifiers";
import ImageGallery from "react-image-gallery";
import '../../Assets/css/productDetails.css'
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import {  Button } from '@mui/material';
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FacebookShareButton, EmailShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import { Helmet } from 'react-helmet';
import Ringbildermenu from '../../Components/ringbildermenu';
import { NavLink } from 'react-router-dom';

class CompleteRing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [{
                original: JSON.parse(localStorage.getItem("bw-settingdata"))?.image,
                thumbnail: JSON.parse(localStorage.getItem("bw-settingdata"))?.image,
            },
            {
                original: window.location.pathname == "/complete-gemstone-ring" ? JSON.parse(localStorage.getItem("bw-gemstonedata"))?.image : window.location.pathname == "/complete-fancycolor-ring" ? JSON.parse(localStorage.getItem("bw-fancycolordata"))?.image : JSON.parse(localStorage.getItem("bw-diamonddata"))?.image,
                thumbnail: window.location.pathname == "/complete-gemstone-ring" ? JSON.parse(localStorage.getItem("bw-gemstonedata"))?.image : window.location.pathname == "/complete-fancycolor-ring" ? JSON.parse(localStorage.getItem("bw-fancycolordata"))?.image : JSON.parse(localStorage.getItem("bw-diamonddata"))?.image,
            }],
            currentImageUrl: [JSON.parse(localStorage.getItem("bw-settingdata"))?.image],
            shipping: false,
            return: false,
            stonedata: window.location.pathname == "/complete-gemstone-ring" ? JSON.parse(localStorage.getItem("bw-gemstonedata")) : window.location.pathname == "/complete-fancycolor-ring" ? JSON.parse(localStorage.getItem("bw-fancycolordata")) : JSON.parse(localStorage.getItem("bw-diamonddata")),
            settingdata: JSON.parse(localStorage.getItem("bw-settingdata")),
            stock_no: this.props.match.params.stock_no,
            rating: '',
            comment: "",
            notify: false,
            ringSizeAvailable: false,
            loader: false,
            date: moment(new Date()).format("YYYY-MM-DD"),
            time: true,
            shippingterm: []
        }

    }
    // componentDidMount() {
    //     this.shippingterm();
    // }
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

    addtocart = () => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
            diamond_id: this.state.stonedata?.product_id,
            product_id: this.state.settingdata?.product_id,
            quantity: "1",
            ring_size: this.state.settingdata?.ring_size,
            engraving_text: "",
            engraving_font: "",
            type: "combo"
        }

        axios.post(base_url + '/order/add_to_cart', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    localStorage.setItem("bw-addtocartlength", res.data.data.total_count)
                    this.props.history.push("/cart")
                    localStorage.removeItem('bw-gemstonedata')
                    localStorage.removeItem('bw-diamonddata')
                    localStorage.removeItem('bw-settingdata')
                    localStorage.removeItem('bw-fancycolordata')
                    sessionStorage.removeItem('rcs_d_filter')
                    sessionStorage.removeItem('rcs_s_filter')
                    sessionStorage.removeItem('rcs_g_filter')
                    sessionStorage.removeItem('rcs_f_filter')
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


    handleCloseShipping = () => this.setState({ shipping: false });
    handleShowShipping = () => this.setState({ shipping: true });
    handleCloseReturn = () => this.setState({ return: false });
    handleShowReturn = () => this.setState({ return: true });
    handleCloseReview = () => this.setState({ review: false });
    handleShowReview = () => this.setState({ review: true });

    // componentDidUpdate(prevProps, prevState){
    //     if (prevState.filterdata != this.state.filterdata){
    //         this.productdetails();
    //     }
    // }
    setView = (event, index) => {
        this.setState({
            currentImageUrl: this.state.images[index].original,
        });
    };

    render() {
        return (
            <>
                {/* <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.state.stonedata?.name} - {this.state.settingdata?.name} </title>
                    <meta name="description" content={this.state.stonedata?.name}></meta>
                    <meta name="keywords" content=""></meta>
                </Helmet> */}
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
                                    <NavLink underline="hover" color="inherit" to="#">
                                        Complete Ring
                                    </NavLink>
                                    <Typography color="text.primary">
                                        {this.state.settingdata?.name} with {this.state.stonedata?.name}
                                    </Typography>
                                </Breadcrumbs>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="rcs_shap-wizard_container">
                    <Ringbildermenu location="complete" />
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
                                            <SideBySideMagnifier
                                                alwaysInPlace={false}
                                                className="image-to-magnify"
                                                fillAvailableSpace={false}
                                                imageSrc={this.state.currentImageUrl}
                                                largeImageSrc={this.state.currentImageUrl}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={4} xl={4} className='rcs_large_tablet'>
                                <div className="ml_product_content d-flex widget flex-column justify-content-center align-items-start text-left pt-3 pt-md-0 w-100 widget h-100">
                                    <div className="rcs_content_block w-100">
                                        <div className="rcs_product_heading">
                                            <h1>{this.state.settingdata?.name}</h1>
                                            <h6>{this.state.stonedata?.name}</h6>
                                        </div>
                                        <div className="rcs_price rcs_complete_ring">
                                            <p><svg width="19" height="16" viewBox="0 0 19 16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.006845 1H3.99704796l-2.809882 3.94296814L9.4995791 14.6826798l8.3134652-9.73939652L15.006845 1zM.89108142 5.3584489l-.0174329.02446273c.00603578-.00801296.01184582-.0161711.0174329-.02446273zm9.06197338 9.8555715l.0346833.0406386c-.0111961-.0141558-.0227743-.0277002-.0346833-.0406386zm-.8901473-.0197707c-.0094001.0101524-.0183909.0206683-.0269218.0315393l.0269218-.0315393zm9.0700416-10.62574155l.0173466-.02032183c-.0059449.00657685-.0117261.01335314-.0173422.0203167zm-.0379092.77103661c.0050188.00748722.0102372.0148245.0156567.02200081l-.0156567-.02200081z" stroke="#000" stroke-width="2" fill="none" fill-rule="evenodd"></path>
                                            </svg> &nbsp; <strong>{this.state.stonedata?.name}</strong></p>
                                            <p><span>{this.state.stonedata?.color} Color </span>|<span> {this.state.stonedata?.clarity} Clarity</span></p>
                                            <p>{currency}{this.state.stonedata?.price} | <span onClick={() => { localStorage.removeItem('bw-gemstonedata'); localStorage.removeItem('bw-diamonddata'); window.location.pathname == "/complete-diamond-ring" ? this.props.history.push("/diamonds") : localStorage.removeItem('bw-fancycolordata'); window.location.pathname == "/complete-fancycolor-ring" ?  this.props.history.push("/fancy-color-diamond") : this.props.history.push("/gemstones") }}>Change</span></p>
                                        </div>
                                        <Divider />
                                        <div className="rcs_price rcs_complete_ring">
                                            <p><svg width="16" height="19" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
                                                <g transform="translate(0 1)" fill-rule="nonzero" stroke="#000" stroke-width="2" fill="none">
                                                    <ellipse cx="7.71428571" cy="10.3846154" rx="6.71428571" ry="6.61538462"></ellipse>
                                                    <path d="M3.50649351 0l4.22417897 4.8358436L11.9220779 0"></path>
                                                </g>
                                            </svg> &nbsp; <strong>{this.state.settingdata?.name} </strong></p>
                                            <p><strong>Ring Size : </strong><span>{this.state.settingdata?.ring_size}</span></p>
                                            <p>{currency}{this.state.settingdata?.price} | <span onClick={() => { localStorage.removeItem('bw-settingdata'); window.location.pathname == "/complete-diamond-ring" ? this.props.history.push("/ringsettings") : this.props.history.push("/ringsettings/gemstones") }}>Change</span></p>
                                        </div>
                                        <Divider />
                                        <div className="rcs_price">
                                            <h4>{currency}{(Number(this.state.stonedata?.price) + Number(this.state.settingdata?.price))}</h4>
                                        </div>
                                        <div className="rcs_filter rcs_add_address">

                                        </div>
                                        <div className="rcs_product_btn">
                                            <Button variant="contained" onClick={this.addtocart} className="rcs_acc_button rcs_acc_button1 w-100 mb-3">Add To Cart</Button>
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
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

export default CompleteRing;