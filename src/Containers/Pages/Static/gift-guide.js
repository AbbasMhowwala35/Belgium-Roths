import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/productlist.css";
import "../../../Assets/css/gift_guide.css"
import cart from "../../../Assets/images/cart.png";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../../Helpers/request';
import { toast } from 'react-toastify';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const GiftGuide = () => {
    const history = useHistory();
    const [productdata, setProductdata] = useState([]);
    useEffect(() => {
        GiftGuide();
    }, [])
    const addtocart = (product_id) => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id,
            quantity: "1",
            ring_size: "",
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
                    localStorage.setItem("bw-addtocartlength", res.data.data.total_count);
                    history.push("/cart")
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
    const GiftGuide = () => {
        const data = { currency_code : currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: user.token ? user.token : "",
        }
        axios.post(base_url + `/product/giftGuide`, data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setProductdata(response.data.data)
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const addtowishlist = (product_id) => {

        const data = { currency_code : currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id,
            type: 'JEWELRY',
            token: user?.token ? user?.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    GiftGuide();
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
                <title>2021 Valentine's Day Jewelry Gift Guide | Belgium Webnet</title>
                <meta name="description" content="Check out Belgium Webnet' 2021 Gift Guide. Whether you are celebrating Valentine's Day, an anniversary, or a birthday, we have jewelry that she will love."></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_gift_guide_banner">
            </div>
            <div className="rcs_gift_guide_content mt-5">
                <Container>
                    <Row className="m-auto w-100">
                        <Col className="p-md-0">
                            <h1> Follow our 2021 Gift Guide for the perfect gift...</h1>
                            <Button onClick={() => window.open("https://online.flippingbook.com/view/307722663/6/", "_blank")} className="rcs_how_btn"> 2021 Gift Guide Flipbook </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_product_grid rcs_gift_guide_section1 mt-5 mb-5">
                <Container>
                    <Row>
                        <Col><h6>Under {currency}500</h6></Col>
                    </Row>
                    <Row>
                        {productdata?.under500?.map((val, index) =>
                            <Col className="mg_nopadd" md={3} sm={6} xs={6}>
                                <div className="rcs_product_item">
                                    <div class="d-flex hover-buttons justify-content-between">
                                        <span onClick={() => addtocart(val.product_id, index)}> <Image src={cart} />  </span>
                                    </div>
                                    <NavLink to={"/productdetail/" + val.slug}>
                                        <div class="color-overlay"></div>
                                        <Image src={val.image}></Image>
                                    </NavLink>
                                    <div className="rcs_prod_info">
                                        <div className="d-flex align-items-start pt-10">
                                            <h2 onClick={() => { history.push("/productdetail/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{val.name}</h2>
                                            {/* <button class="rcs_wish_btn"><i class="far fa-heart"></i></button> */}
                                            <button class="rcs_wish_btn">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val.product_id, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val.product_id, index)} className="animate__animated animate__heartBeat" />}</button>
                                        </div>
                                        <p className="rcs_main_price">{currency}{val.sale_price} </p>
                                    </div>
                                </div>
                            </Col>
                        )}

                    </Row>
                </Container>
            </div>
            <div className="rcs_product_grid rcs_gift_guide_section1 mb-5">
                <Container>
                    <Row>
                        <Col><h6>Under {currency}250</h6></Col>
                    </Row>
                    <Row>
                        {productdata?.under250?.map((val, index) =>
                            <Col className="mg_nopadd" md={3} sm={6} xs={6}>
                                <div className="rcs_product_item">
                                    <div class="d-flex hover-buttons justify-content-between">
                                        <span onClick={() => addtocart(val.product_id, index)}> <Image src={cart} />  </span>
                                    </div>
                                    <NavLink to={"/productdetail/" + val.slug}>
                                        <div class="color-overlay"></div>
                                        <Image src={val.image}></Image>
                                    </NavLink>
                                    <div className="rcs_prod_info">
                                        <div className="d-flex align-items-start pt-10">
                                            <h2 onClick={() => { history.push("/productdetail/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title"> {val.name} </h2>
                                            {/* <button class="rcs_wish_btn"><i class="far fa-heart"></i></button> */}
                                            <button class="rcs_wish_btn">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val.product_id, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val.product_id, index)} className="animate__animated animate__heartBeat" />}</button>
                                        </div>
                                        <p className="rcs_main_price">{currency}{val.sale_price} </p>
                                    </div>
                                </div>
                            </Col>
                        )}

                    </Row>
                </Container>
            </div>
        </>
    )
}

export default GiftGuide;