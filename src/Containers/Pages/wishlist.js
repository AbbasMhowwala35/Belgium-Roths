import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import '../../Assets/css/myaccount.css'
import { Breadcrumbs, IconButton, Link, Typography } from '@material-ui/core';
import { Col, Container, Row } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { base_url, currency, currencycode, postHeader, user } from '../../Helpers/request';
import { toast } from 'react-toastify';
import { NavLink, useHistory } from 'react-router-dom';
import { Alert, Skeleton } from '@mui/material';
import { Helmet } from 'react-helmet';

const Wishlist = (props) => {
    const history = useHistory();
    const [wishlistdata, setWishlistdata] = useState([]);

    useEffect(() => {
        wishlist();
    }, [])
    const wishlist = () => {
        const data = {
            currency_code: currencycode,
            user_id: "",
            token: "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
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

    const removewishlist = (product_id, type) => {

        const data = {
            currency_code: currencycode,
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
                } else {
                    toast.error(res.message, { autoClose: 3000 });
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
                <title>Wish List | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_myaccount_section p-0 mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Wishlist</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1 className='mb-4'>Wishlist</h1>
                            </din>
                        </Col>
                    </Row>
                    {wishlistdata?.jewelry_data?.length || wishlistdata?.diamond_data?.length || wishlistdata?.gemstone_data?.length ?
                        <Row className="rcs_tab_section m-auto w-100">
                            <Col className="p-0">
                                <div className="rcs_wishlist_section">
                                    <Row className="w-100 m-auto">
                                        {wishlistdata?.jewelry_data?.map(val =>
                                            <Col xs={12} sm={6} md={6} lg={3} className="rcs_custom_padding">
                                                <div className="rcs_wislist_content">
                                                    <IconButton aria-label="Example">
                                                        <DeleteIcon onClick={() => removewishlist(val.product_id, val.product_type)} />
                                                    </IconButton>
                                                    <div onClick={() => history.push('/productdetail/' + val.slug)}>
                                                        <Image src={val.url}></Image>
                                                        <h2 className='mt-3'>{val.name}</h2>
                                                        <p class="rcs_sku">SKU: {val.sku}</p>
                                                        <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                    </div>
                                                </div>
                                            </Col>)}
                                        {wishlistdata?.diamond_data?.map(val =>
                                            <Col xs={12} sm={6} md={6} lg={3} className="rcs_custom_padding">
                                                <div className="rcs_wislist_content">
                                                    <IconButton aria-label="Example">
                                                        <DeleteIcon onClick={() => removewishlist(val.product_id, val.product_type)} />
                                                    </IconButton>
                                                    <div onClick={() => val.type == '4' ? history.push('/fancy-color-diamond-detail/' + val.stock_no) : history.push('/diamonds-details/' + val.stock_no)}>
                                                        <Image src={val.imagelink}></Image>
                                                        <h2 className='mt-3'>{val?.weight} Carat {val?.shape} {val?.type == "1" ? 'Cut Natural Diamond' : val.type == "2" ? 'Cut Lab Diamond' : val.type == '4' ? "Fancy Diamond" : "Diamond"}</h2>
                                                        <p class="rcs_sku">STOCK NO. : {val.stock_no}</p>
                                                        <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                    </div>
                                                </div>
                                            </Col>)}
                                        {wishlistdata?.gemstone_data?.map(val =>
                                            <Col xs={12} sm={6} md={6} lg={3} className="rcs_custom_padding">
                                                <div className="rcs_wislist_content">
                                                    <IconButton aria-label="Example">
                                                        <DeleteIcon onClick={() => removewishlist(val.product_id, val.product_type)} />
                                                    </IconButton>
                                                    <div onClick={() => history.push('/gemstone-details/' + val.stock_no)}>
                                                        <Image src={val.imagelink}></Image>
                                                        <h2 className='mt-3'>{val?.weight} Carat {val?.shape} {val?.color} Gemstone</h2>
                                                        <p class="rcs_sku">STOCK NO. : {val.stock_no}</p>
                                                        <p class="rcs_wish_price">{currency}{val.sale_price}</p>
                                                    </div>
                                                </div>
                                            </Col>)}

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        :
                        localStorage.getItem("bw-wishlistlength") > 0 ?
                            <Row className="rcs_tab_section m-auto w-100">
                                <Col className="p-0">
                                    <div className="rcs_wishlist_section">
                                        <Row className="w-100 m-auto">
                                            {[...Array(Number(localStorage.getItem("bw-wishlistlength")))]?.map(val =>
                                                <Col xs={12} sm={6} md={6} lg={3} className="rcs_custom_padding">
                                                    <div className="rcs_wislist_content">
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
                                </Col>
                            </Row> :
                            <>
                                <Row className="m-auto w-100">
                                    <Col className="p-0 mt-3 mb-3">
                                        {/* { ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} /> : */}
                                        <Alert severity="error" className="rcs_alert_danger">You have no items in your wish list. <NavLink to="/jewelry/fashion-rings"> Browse jewelry </NavLink>.</Alert>
                                        {/* }     */}
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
                            </>
                    }
                </Container>
            </div>
        </>
    )
}

export default Wishlist;