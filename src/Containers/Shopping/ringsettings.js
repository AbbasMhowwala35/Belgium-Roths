import React, { useState } from 'react'
import '../../Assets/css/ringsettings.css';
import '../../Assets/css/education.css';
import { Col, Container, Row, Form, Modal, Image, InputGroup, FormControl } from 'react-bootstrap';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Pagination from '@mui/material/Pagination';
import Slider from "react-slick";
import eye from "../../Assets/images/eye.svg";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import cart from "../../Assets/images/cart.png";
import inquir from "../../Assets/images/inquir.svg";
import { TextField, makeStyles, Divider, CircularProgress } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url, currency, currencycode, isLogin, postHeader, setSteps, user } from '../../Helpers/request';
import { Helmet } from 'react-helmet';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import Slider1 from 'rc-slider';
import '../../../node_modules/rc-slider/assets/index.css';
// import Slider1 from '@material-ui/core/Slider';
import 'rc-tooltip/assets/bootstrap.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Ringbildermenu from '../../Components/ringbildermenu';
import { isMobileOnly, isTablet } from 'react-device-detect';
import ReplayIcon from '@mui/icons-material/Replay';
import { Skeleton } from '@mui/material';

const { createSliderWithTooltip } = Slider1;
const Range = createSliderWithTooltip(Slider1.Range);

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function valuetext(value) {
    return `${value}`;
}

const RingSettings = (props) => {
    const history = useHistory()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [view, setView] = useState(1);
    const [inquiry, setInquiry] = useState(false);
    const [quickView, setQuickView] = useState(false);
    const [listdata, setListdata] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sortby, setSortby] = useState('featured');
    const [filterdata, setFilterdata] = useState([]);
    const handleCloseInquiry = () => setInquiry(false);
    const handleShowInquiry = () => setInquiry(true);
    const handleCloseQuickView = () => setQuickView(false);
    const [quickdata, setQuickdata] = React.useState([]);
    const [expanded, setExpanded] = React.useState([]);
    const [paramid, setParamid] = useState(props.match.params.listcategory ? props.match.params.listcategory : props.match.params.search_text);
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [productid, setProductid] = useState("");
    const [loader, setLoader] = useState(true);
    const [filtersuccess, setFiltersuccess] = useState(false);
    const [showFilter, setShowFilter] = useState(true);
    const [shape, setShape] = useState(JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.shape ? JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.shape : '');
    const [metals, setMetals] = useState(JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.metals ? JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.metals : '');
    const [price, setPrice] = useState(JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.price ? JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.price : []);
    const [style, setStyle] = useState(JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.style ? JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.style : '');
    const [inputchange, setInputchange] = useState(false);
    const [proIndex, setProIndex] = useState('');
    const [clearFdata, setClearFdata] = useState(false);

    const clearFilter = () => {
        sessionStorage.removeItem("rcs_s_filter");
        setShape("")
        setStyle("")
        setPrice([filterdata?.normal_filters?.price?.min, filterdata?.normal_filters?.price?.max])
        setMetals('')
        setSortby("featured")
        setClearFdata(!clearFdata)
    }
    const submitForm = () => {
        var data = {
            product_id: productid,
            first_name,
            last_name,
            email,
            mobile: phone,
            message: comment
        }
        axios.post(base_url + '/product/enquiry', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setFirst_name("");
                    setLast_name("");
                    setEmail("");
                    setComment("");
                    setPhone("");
                    toast.success(response.data.message, { autoClose: 3000 });
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (props.location.pathname == "/ringsettings/diamonds") {
            setSteps(3);
        } else if (props.location.pathname == "/ringsettings/gemstones") {
            setSteps(4);
        } else if (props.location.pathname == "/ringsettings/fancycolor") {
            setSteps(5)
        } else {
            setSteps(3);
        }
    }, [props.location.pathname])

    useEffect(() => {
        setFiltersuccess(false)
        const data = {
            currency_code: currencycode,
            diamond_id: JSON.parse(localStorage.getItem('bw-diamonddata'))?.product_id ? JSON.parse(localStorage.getItem('bw-diamonddata'))?.product_id : JSON.parse(localStorage.getItem('bw-gemstonedata'))?.product_id ? JSON.parse(localStorage.getItem('bw-gemstonedata'))?.product_id : ''
        }
        axios.post(base_url + '/engagement_ring/engagement_ring_filter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setFilterdata(res.data.data)
                    if (!JSON.parse(sessionStorage.getItem("rcs_s_filter"))?.price?.length) {
                        setPrice([res.data.data?.normal_filters?.price?.min, res.data.data?.normal_filters?.price?.max])
                    }
                    res.data.data?.normal_filters?.shape?.map(val =>
                        (val.selected == 1) ? setShape(val.name) : ""
                    )
                    setFiltersuccess(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        if (filtersuccess) {
            productlist();
            setParamid(props.match.params.listcategory ? props.match.params.listcategory : props.match.params.search_text)
        }
    }, [page])

    useEffect(() => {
        if (filtersuccess) {
            onchangesdata();
        }
    }, [shape, style, metals, inputchange, clearFdata])

    useEffect(() => {
        if (filtersuccess) {
            productlist();
            setPage(1);
            setParamid(props.match.params.listcategory ? props.match.params.listcategory : props.match.params.search_text)
        }
    }, [props.match.params.listcategory, props.match.params.search_text, filtersuccess, sortby])

    const productlist = () => {
        setLoader(true);
        const data = {
            currency_code: currencycode,
            sort_by: sortby,
            style,
            matal_color: metals,
            shape,
            pricemin: price[0],
            pricemax: price[1],
            limit: 24,
            offset: (page - 1) * 24,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
        }
        axios.post(base_url + '/engagement_ring/settinglist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setLoader(false)
                    setListdata(res.data.data?.result)
                    setProductCount(res.data.data?.count)
                    var count = (res.data.data?.count / 24).toFixed();
                    if ((count * 24) >= res.data.data?.count) {
                        setPageCount(count)
                    } else {
                        setPageCount(Number(count) + 1)
                    }
                    if (res.data.data?.count == 0) {
                        setShowFilter(false)
                    } else {
                        setShowFilter(true)
                    }
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    setListdata([]);
                    setProductCount(0);
                    setPageCount(0);
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const addtowishlist = (val, wishindex) => {
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: val.product_id,
            type: 'JEWELRY',
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    localStorage.setItem("bw-wishlistlength", res.data.data.count)
                    const productlist = listdata.map(
                        (obj, index) => (index == wishindex ? Object.assign(obj, { is_wishlist: res.data.data.wishlist_id }) : obj)
                    )
                    setListdata(productlist)
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
    const addtocart = (product_id) => {
        const data = {
            currency_code: currencycode,
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
                    localStorage.setItem("bw-addtocartlength", res.data.data.total_count)
                    history.push("/cart")
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
    const handlePageChange = (e, value) => {
        setPage(value)
        window.scrollTo(0, 0)
    }

    const quickopen = (data) => {
        setQuickdata(data);
        setQuickView(true);
    }
    const classes = useStyles();

    const sliderhandleChange = (value) => {
        setPrice(value);
    };
    const handlepriceinput = (i) => {
        var data = [];
        if (i == 0) {
            if (price[0] < filterdata?.normal_filters?.price?.min) {
                data = [filterdata?.normal_filters?.price?.min, price[1]]
            } else if (price[0] > filterdata?.normal_filters?.price?.max) {
                data = [filterdata?.normal_filters?.price?.max, price[1]]
            } else {
                data = [price[0], price[1]]
            }
        } else if (i == 1) {
            if (price[1] > filterdata?.normal_filters?.price?.max) {
                data = [price[0], filterdata?.normal_filters?.price?.max]
            } else if (price[1] < filterdata?.normal_filters?.price?.min) {
                data = [price[0], filterdata?.normal_filters?.price?.min]
            } else {
                data = [price[0], price[1]]
            }
        }
        console.log(data)
        if (data[0] < data[1]) {
            var data1 = [data[0], data[1]]
        } else {
            var data1 = [data[1], data[0]]
        }
        setPrice(data1);
        setInputchange(!inputchange);
    }

    const onchangesdata = () => {
        setPage(1)
        var data = {
            style,
            shape,
            price,
            metals
        }
        sessionStorage.setItem("rcs_s_filter", JSON.stringify(data));
        productlist();
    }
    // const [expanded, setExpanded] = React.useState(false);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const prev = () => {
        if (Number(page) > 1) {
            setPage(Number(page) - 1);
            window.scrollTo(0, 0);
        }
    }
    const next = () => {
        if (Number(page) < pageCount) {
            setPage(Number(page) + 1);
            window.scrollTo(0, 0);
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Engagement Rings | Belgium WebNet</title>
                <meta name="description" content="Build your engagement ring using the diamond shape you like and combine it with your preferred metal such as white gold, rose gold, yellow gold and platinum."></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_ringsetting_section mt-3">
                <Container className="rcs_shap-wizard_container">
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Ring Settings</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Ringbildermenu location="setting" />
                    <Row className='w-100 m-auto'>
                        <div className='rcs_filter_accordion_sec mt-3 mb-3'>
                            <div id="setting-styles" className="big-ring-settings-wrap w-100 collapse show d-none d-md-block">
                                <ul className="grid-topbar-elem-list big-ring-settings">
                                    {!filtersuccess ? <>
                                        {[...Array(8)]?.map(val => isTablet ? <Skeleton variant="text" animation="wave" width={90} height={92} /> : <Skeleton variant="text" animation="wave" width={140} height={92} />)}
                                    </>
                                        :
                                        filterdata?.normal_filters?.ring_style?.map(val =>
                                            <li><div onClick={() => style == val.value ? setStyle('') : setStyle(val.value)} className={val.value == style ? 'rcs_ring_setting_style rcs_ring_setting_style_mobile rcs_ring_setting_style_active' : "rcs_ring_setting_style rcs_ring_setting_style_mobile"}><img style={{ width: "85px", margin: "0 auto" }} src={val.icon}></img><span data-value="20">{val.name}</span></div></li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div id="setting-metal-type" className="collapse show big-metal-types-wrap w-100 d-none d-md-block">
                                <Row className="w-100 m-auto">
                                    <Col md={7} xs={12} className="py-md-3 p-0 d-flex align-items-center flex-column justify-content-center">
                                        <ul className="grid-topbar-elem-list big-metal-types rcs_metal_shape">
                                            {!filtersuccess ? <>
                                                {[...Array(4)]?.map(val => isTablet ? <Skeleton variant="text" animation="wave" width={105} height={92} /> : <Skeleton variant="text" animation="wave" width={140} height={92} />)}
                                            </> :
                                                filterdata?.normal_filters?.metal_color?.map(val =>
                                                    <li className=""><div onClick={() => metals == val.value ? setMetals('') : setMetals(val.value)} className={val.value == metals ? 'rcs_ring_setting_style  rcs_ring_setting_style_active' : "rcs_ring_setting_style"}><span className="metal-type-circles all-types"><img src={val.icon}></img></span><span>{val.name}</span></div></li>
                                                )
                                            }
                                        </ul>
                                    </Col>
                                    <Col md={5} xs={12} className='padding_for_desktop'>
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" animation="wave" className='mt-3' width={290} height={92} /> : <Skeleton variant="text" animation="wave" className='mt-3' width={435} height={92} />}
                                        </> :
                                            <>
                                                <div className={classes.root}>
                                                    <Typography id="range-slider" gutterBottom>
                                                        <h6 className='mt-3'>Price</h6>
                                                    </Typography>
                                                </div>

                                                <Range onAfterChange={() => onchangesdata()} allowCross={false} min={filterdata?.normal_filters?.price?.min} max={filterdata?.normal_filters?.price?.max} onChange={sliderhandleChange} value={price} tipFormatter={value => `${value}`} />
                                                <Row className='mt-3'>
                                                    <ul className='rcs_price_range_input'>
                                                        <li className='rcs_price_range_input1'>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>{currency}</InputGroup.Text>
                                                                <FormControl aria-label="Amount (to the nearest dollar)"
                                                                    type="int"
                                                                    name="min"
                                                                    value={price[0]}
                                                                    onChange={(e) => setPrice([Number(e.target.value), Number(price[1])])}
                                                                    onBlurCapture={() => handlepriceinput(0)}
                                                                />
                                                            </InputGroup>
                                                        </li>
                                                        <li className='rcs_price_range_input1'>
                                                            <InputGroup className="mb-3">
                                                                <InputGroup.Text>{currency}</InputGroup.Text>
                                                                <FormControl aria-label="Amount (to the nearest dollar)"
                                                                    type="int"
                                                                    name='max'
                                                                    value={price[1]}
                                                                    onChange={(e) => setPrice(([Number(price[0]), Number(e.target.value)]))}
                                                                    onBlurCapture={() => handlepriceinput(1)} />
                                                            </InputGroup>
                                                        </li>
                                                    </ul>
                                                </Row></>
                                        }
                                    </Col>
                                </Row>
                            </div>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} className='d-md-none d-sm-block mt-2'>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><strong>Ring Style</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography>
                                        <div id="setting-styles" className="big-ring-settings-wrap w-100 collapse show">
                                            <ul className="grid-topbar-elem-list big-ring-settings">
                                                {filterdata?.normal_filters?.ring_style?.map(val =>
                                                    <li><div onClick={() => style == val.value ? setStyle("") : setStyle(val.value)} className={val.value == style ? 'rcs_ring_setting_style rcs_ring_setting_style_mobile rcs_ring_setting_style_active' : "rcs_ring_setting_style rcs_ring_setting_style_mobile"}><img style={{ width: "85px", margin: "0 auto" }} src={val.icon}></img><span data-value="20">{val.name}</span></div></li>
                                                )}

                                            </ul>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')} className='d-md-none d-sm-block'>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography><strong>Metal</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography>
                                        <div id="setting-metal-type" className="collapse show big-metal-types-wrap w-100">
                                            <Row className="w-100 m-auto">
                                                <Col md={7} xs={12} className="py-md-3 p-0 d-flex align-items-center flex-column justify-content-center">
                                                    <ul className="grid-topbar-elem-list big-metal-types">
                                                        {filterdata?.normal_filters?.metal_color?.map(val =>
                                                            <li className=""><div onClick={() => metals == val.value ? setMetals('') : setMetals(val.value)} className={val.value == metals ? 'rcs_ring_setting_style rcs_ring_setting_style_active' : "rcs_ring_setting_style"}><span className="metal-type-circles all-types"><img src={val.icon}></img></span><span>{val.name}</span></div></li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')} className='d-md-none d-sm-block'>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography><strong>Price</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography>
                                        <div id="setting-metal-type" className="collapse show big-metal-types-wrap w-100">
                                            <Row className="w-100 m-auto">
                                                <Col xs={12} className='padding_for_desktop'>
                                                    <div className={classes.root}>
                                                        <Typography id="range-slider" gutterBottom>
                                                            <h6 className='mt-3'>Price</h6>
                                                        </Typography>
                                                    </div>
                                                    <Range min={filterdata?.normal_filters?.price?.min} allowCross={false} max={filterdata?.normal_filters?.price?.max} onChange={sliderhandleChange} value={price} tipFormatter={value => `${value}`} />
                                                    <Row className='mt-3'>
                                                        <ul className='rcs_price_range_input'>
                                                            <li className='rcs_price_range_input1'>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Text>{currency}</InputGroup.Text>
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="int"
                                                                        name="min"
                                                                        value={price[0]}
                                                                        onChange={(e) => setPrice([Number(e.target.value), Number(price[1])])}
                                                                        onBlurCapture={() => handlepriceinput(0)}

                                                                    />
                                                                </InputGroup>
                                                            </li>
                                                            <li className='rcs_price_range_input1'>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Text>{currency}</InputGroup.Text>
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="int"
                                                                        name='max'
                                                                        value={price[1]}
                                                                        onChange={(e) => setPrice([Number(price[0]), Number(e.target.value)])}
                                                                        onBlurCapture={() => handlepriceinput(1)} />
                                                                </InputGroup>
                                                            </li>
                                                        </ul>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4a-content"
                                    id="panel4a-header"
                                >
                                    <Typography><strong>Can be set with</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography>
                                        <div id="setting-styles" className="big-ring-settings-wrap big-ring-settings-wrap1 w-100 collapse show setting-shapes">
                                            <ul className="grid-topbar-elem-list big-ring-settings rcs_diamond_fitler">
                                                {filterdata?.normal_filters?.shape?.map(val =>
                                                    <li>
                                                        <div onClick={() => shape == val.value ? setShape('') : setShape(val.value)} className={val.value == shape ? 'rcs_ring_setting_style rcs_ring_setting_style_active' : "rcs_ring_setting_style"}> <span className=" selectionIcon icon--qAfox"><img style={{ width: "35px" }} src={val.icon}></img></span>{val.name}</div>
                                                    </li>
                                                )}

                                            </ul>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Row>
                    <Row className='w-100 m-auto'>
                        <Col xs={12} className='p-0 mb-3'>
                            <Button variant="outlined" onClick={clearFilter} className='rcs_clear_filter'><ReplayIcon /> Clear Filter</Button>
                        </Col>
                    </Row>
                    <Row className='w-100 d-block m-auto'>
                        <Col xs={12} className=' mt-4 mb-5'>
                            <div className='rcs_diamond_content'>
                                <h1>ENGAGEMENT RINGS</h1>
                                <Col xs={12} sm={12} md={{ span: 8, offset: 2 }}>
                                    <p>Engagement rings are the ultimate expression of love, which is why their design requires a personal touch. It’s easy to design the engagement ring of your dreams, down to the last detail. Choose lovingly handcrafted engagement rings in a range of popular styles. Browse loose diamonds for the perfect center stone to complete your engagement setting. Then, sit back and admire your beautiful creation!</p>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                    <Row className='w-100 m-auto'>
                        <Col xs={12} className={view == 1 ? '' : 'mb-5'}>
                            <div className="rcs_product_list_wrapper p-0 w-100">
                                <div className="rcs_view p-0">
                                    <Row className='w-100 m-auto'>
                                        <Col xs={6} className='p-0'>
                                            <div className='rcs_mob_filter1 rcs_ring_setting_filter'>
                                                {loader ? <>
                                                    {isMobileOnly ? <Skeleton variant="text" animation="wave" className='m-auto' width={100} height={20} /> : <Skeleton variant="text" animation="wave" className='m-auto' width={150} height={20} />}
                                                </> :
                                                    <span>{productCount} product(s) found </span>
                                                }
                                            </div>
                                        </Col>
                                        <Col xs={6} className='p-0'>
                                            <div className='rcs_mob_filter1 rcs_ring_setting_filter1'>
                                                <span> View</span>
                                                <AppsIcon className={view == 1 ? "active_grid ml-2" : "ml-2"} onClick={() => setView(1)} />
                                                <span style={{ borderRight: '1px solid #ccc' }}></span>
                                                <ListIcon className={view == 2 ? "active_grid ml-2" : "ml-2"} onClick={() => setView(2)} />
                                                {/* <ul>                                                
                                                <li><AppsIcon className={view == 1 ? "active_grid" : ""} onClick={() => setView(1)} /></li>
                                                <li><span></span></li>
                                                <li><ListIcon className={view == 2 ? "active_grid" : ""} onClick={() => setView(2)} /></li>
                                            </ul> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="rcs_sorting mt-md-5 mt-4">
                                    <Row>
                                        <Col xs={2} className='pr-0'> <div className="rcs_sorting_title text-left"><span onClick={() => prev()} className="prev" style={{ opacity: page > 1 ? '1' : '0.2' }}><ArrowBackIosIcon /> Previous </span></div></Col>
                                        <Col xs={8} className='p-0'>
                                            <div className="rcs_sort_filter p-0">
                                                <label> <span>Sort by: </span> </label>
                                                <Form.Select onChange={(e) => { setSortby(e.target.value); window.scrollTo(0, 0) }} value={sortby} aria-label="Default select example">
                                                    {filterdata?.sort_by?.map(val =>
                                                        <option value={val.value}>{val.name}</option>
                                                    )}
                                                </Form.Select>
                                            </div>
                                        </Col>
                                        <Col xs={2} className='pl-0'><div className="rcs_sorting_title text-right"> <span onClick={() => next()} className="prev" style={{ opacity: page < pageCount ? '1' : '0.2' }}>Next <ArrowForwardIosIcon /></span> </div></Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {isMobileOnly ? <Container>
                    <Row className='w-100 m-auto'>
                        <Col xs={12}>
                            <div className="rcs_product_list_wrapper p-0 w-100">
                                {view == 1 ?
                                    <div className="rcs_product_grid">
                                        <Row>
                                            {listdata?.map((val, index) =>
                                                <Col xs={6} sm={6} md={4} lg={4} xl={3}>
                                                    <div className="rcs_product_item position-relative">
                                                        {loader ?
                                                            <div className="rcs_filter_prod_wrapper" >
                                                                <CircularProgress className="rcs_filter_prod_loader" />
                                                            </div> : ""}
                                                        <div class="d-flex  hover-buttons justify-content-between">
                                                            {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} />  </span>}
                                                            {/* {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </span>} */}
                                                            <span onClick={() => quickopen(val)}> <Image src={eye} />  </span>
                                                        </div>
                                                        <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                            {/* <div class="d-flex  hover-buttons justify-content-between">
                                                                {val.enable_ecommerce == "1" ? <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button> : <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button>}
                                                                <Button> <img src={eye} />  </Button>
                                                            </div> */}
                                                            <div class="color-overlay"></div>
                                                            {val.product_image?.length > 1 ?
                                                                <>
                                                                    <div >
                                                                        {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                            <img src={val.product_image[0].url} />
                                                                        }
                                                                    </div>
                                                                </>
                                                                :
                                                                <img src={val.product_image[0].url}></img>
                                                            }
                                                        </NavLink>
                                                        <div className="rcs_prod_info">
                                                            <div className="d-flex align-items-start pt-10">
                                                                <h2 onClick={() => { history.push("/ringsettingdetail/setting/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{val.name}</h2>
                                                                <button class="rcs_wish_btn rcs_wish_btn_desktop">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                            </div>
                                                            <p className="rcs_emailprice">{val.is_price ? val.currency_icon + val.sale_price : 'Email us for Price'}</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                    :
                                    listdata?.map((val, index) =>
                                        <div className="rcs_prodlist_item">
                                            <Row>
                                                <Col className="mg_nopad" xs={5} sm={5} md={4}>
                                                    <div className="rcs_product_item rcs_list_img">
                                                        <button class="rcs_wish_btn">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                        <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                            <div class="color-overlay"></div>
                                                            {val.product_image?.length > 1 ?
                                                                <>
                                                                    <div >
                                                                        {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                            <img src={val.product_image[0].url} />
                                                                        }
                                                                    </div>
                                                                </>
                                                                :
                                                                <img src={val.product_image[0].url}></img>
                                                            }
                                                        </NavLink>
                                                    </div>
                                                </Col>
                                                <Col className="mg_nopad" xs={7} sm={7} md={8}>
                                                    <div className="rcs_prod_list_info">
                                                        <div className="d-flex align-items-start pt-10">
                                                            <h2 className="rcs_list_title">{val.name}</h2>
                                                        </div>
                                                        {val.is_price ?
                                                            <p className="rcs_main_price">{val.currency_icon}{val.sale_price}</p> :
                                                            <p className="rcs_list_email">Email us for Price </p>}
                                                        <div className="rcs_dblock">
                                                            {val.enable_ecommerce == "1" ? <Button onClick={() => addtocart(val.product_id)} > <img src={cart} /> ADD TO CART </Button> : <Button onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} /> INQUIRE  </Button>}
                                                            <Button onClick={() => quickopen(val)}> <img src={eye} /> QUICK VIEW </Button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                }
                                {/* product list pagination */}
                                {pageCount > 1 ?
                                    <Row className="mt-5 mb-3">
                                        <Col xs={2} className='pr-0'> <div className="rcs_sorting_title"><span onClick={() => prev()} className="prev" style={{ opacity: page > 1 ? '1' : '0.2' }}><ArrowBackIosIcon /> Previous </span></div></Col>
                                        <Col xs={8} className='p-0'> <div className="rcs_pagination"> <Pagination count={pageCount} page={page} onChange={handlePageChange} /> </div></Col>
                                        <Col xs={2} className='pl-0'><div className="rcs_sorting_title text-right"> <span onClick={() => next()} className="prev" style={{ opacity: page < pageCount ? '1' : '0.2' }}>Next <ArrowForwardIosIcon /></span> </div></Col>
                                    </Row> : null}
                            </div>
                        </Col>
                    </Row>
                </Container> :
                    isTablet ? <Container>
                        <Row className='w-100 m-auto'>
                            <Col xs={12}>
                                <div className="rcs_product_list_wrapper p-0 w-100">
                                    {view == 1 ?
                                        <div className="rcs_product_grid">
                                            <Row>
                                                {listdata?.map((val, index) =>
                                                    <Col xs={6} sm={6} md={4} lg={4} xl={3}>
                                                        <div className="rcs_product_item position-relative">
                                                            {loader ?
                                                                <div className="rcs_filter_prod_wrapper" >
                                                                    <CircularProgress className="rcs_filter_prod_loader" />
                                                                </div> : ""}
                                                            <div class="d-flex  hover-buttons justify-content-between">
                                                                {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} />  </span>}
                                                                {/* {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </span>} */}
                                                                <span onClick={() => quickopen(val)}> <Image src={eye} />  </span>
                                                            </div>
                                                            <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                                {/* <div class="d-flex  hover-buttons justify-content-between">
                                                                {val.enable_ecommerce == "1" ? <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button> : <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button>}
                                                                <Button> <img src={eye} />  </Button>
                                                            </div> */}
                                                                <div class="color-overlay"></div>
                                                                {val.product_image?.length > 1 ?
                                                                    <>
                                                                        <div >
                                                                            {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                                <img src={val.product_image[0].url} />
                                                                            }
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <img src={val.product_image[0].url}></img>
                                                                }
                                                            </NavLink>
                                                            <div className="rcs_prod_info">
                                                                <div className="d-flex align-items-start pt-10">
                                                                    <h2 onClick={() => { history.push("/ringsettingdetail/setting/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{val.name}</h2>
                                                                    <button class="rcs_wish_btn rcs_wish_btn_desktop">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                                </div>
                                                                <p className="rcs_emailprice">{val.is_price ? val.currency_icon + val.sale_price : 'Email us for Price'}</p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )}
                                            </Row>
                                        </div>
                                        :
                                        listdata?.map((val, index) =>
                                            <div className="rcs_prodlist_item">
                                                <Row>
                                                    <Col className="mg_nopad" xs={5} sm={5} md={4}>
                                                        <div className="rcs_product_item rcs_list_img">
                                                            <button class="rcs_wish_btn">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                            <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                                <div class="color-overlay"></div>
                                                                {val.product_image?.length > 1 ?
                                                                    <>
                                                                        <div >
                                                                            {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                                <img src={val.product_image[0].url} />
                                                                            }
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <img src={val.product_image[0].url}></img>
                                                                }
                                                            </NavLink>
                                                        </div>
                                                    </Col>
                                                    <Col className="mg_nopad" xs={7} sm={7} md={8}>
                                                        <div className="rcs_prod_list_info">
                                                            <div className="d-flex align-items-start pt-10">
                                                                <h2 className="rcs_list_title">{val.name}</h2>
                                                            </div>
                                                            {val.is_price ?
                                                                <p className="rcs_main_price">{val.currency_icon}{val.sale_price}</p> :
                                                                <p className="rcs_list_email">Email us for Price </p>}
                                                            <div className="rcs_dblock">
                                                                {val.enable_ecommerce == "1" ? <Button onClick={() => addtocart(val.product_id)} > <img src={cart} /> ADD TO CART </Button> : <Button onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} /> INQUIRE  </Button>}
                                                                <Button onClick={() => quickopen(val)}> <img src={eye} /> QUICK VIEW </Button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    }
                                    {/* product list pagination */}
                                    {pageCount > 1 ?
                                        <Row className="mt-5 mb-3">
                                            <Col xs={2} className='pr-0'> <div className="rcs_sorting_title"><span onClick={() => prev()} className="prev" style={{ opacity: page > 1 ? '1' : '0.2' }}><ArrowBackIosIcon /> Previous </span></div></Col>
                                            <Col xs={8} className='p-0'> <div className="rcs_pagination"> <Pagination count={pageCount} page={page} onChange={handlePageChange} /> </div></Col>
                                            <Col xs={2} className='pl-0'><div className="rcs_sorting_title text-right"> <span onClick={() => next()} className="prev" style={{ opacity: page < pageCount ? '1' : '0.2' }}>Next <ArrowForwardIosIcon /></span> </div></Col>
                                        </Row> : null}
                                </div>
                            </Col>
                        </Row>
                    </Container> :
                        <Container className="rcs_shap-wizard_container">
                            <Row className='w-100 m-auto'>
                                <Col xs={12}>
                                    <div className="rcs_product_list_wrapper p-0 w-100">
                                        {view == 1 ?
                                            <div className="rcs_product_grid">
                                                <Row>
                                                    {listdata?.map((val, index) =>
                                                        <Col xs={6} sm={6} md={4} lg={4} xl={3}>
                                                            <div className="rcs_product_item position-relative">
                                                                {loader ?
                                                                    <div className="rcs_filter_prod_wrapper" >
                                                                        <CircularProgress className="rcs_filter_prod_loader" />
                                                                    </div> : ""}
                                                                <div class="d-flex  hover-buttons justify-content-between">
                                                                    {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} />  </span>}
                                                                    {/* {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </span>} */}
                                                                    <span onClick={() => quickopen(val)}> <Image src={eye} />  </span>
                                                                </div>
                                                                <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                                    {/* <div class="d-flex  hover-buttons justify-content-between">
                                                                {val.enable_ecommerce == "1" ? <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button> : <Button onClick={() => handleShowInquiry(true)}> <img src={inquir} />  </Button>}
                                                                <Button> <img src={eye} />  </Button>
                                                            </div> */}
                                                                    <div class="color-overlay"></div>
                                                                    {val.product_image?.length > 1 ?
                                                                        <>
                                                                            <div >
                                                                                {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                                    <img src={val.product_image[0].url} />
                                                                                }
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <img src={val.product_image[0].url}></img>
                                                                    }
                                                                </NavLink>
                                                                <div className="rcs_prod_info">
                                                                    <div className="d-flex align-items-start pt-10">
                                                                        <h2 onClick={() => { history.push("/ringsettingdetail/setting/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{val.name}</h2>
                                                                        <button class="rcs_wish_btn rcs_wish_btn_desktop">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                                    </div>
                                                                    <p className="rcs_emailprice">{val.is_price ? val.currency_icon + val.sale_price : 'Email us for Price'}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </div>
                                            :
                                            listdata?.map((val, index) =>
                                                <div className="rcs_prodlist_item">
                                                    <Row>
                                                        <Col className="mg_nopad" xs={5} sm={5} md={4}>
                                                            <div className="rcs_product_item rcs_list_img">
                                                                <button class="rcs_wish_btn">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button>
                                                                <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/ringsettingdetail/setting/" + val.slug}>
                                                                    <div class="color-overlay"></div>
                                                                    {val.product_image?.length > 1 ?
                                                                        <>
                                                                            <div >
                                                                                {proIndex == index + 1 ? <img src={val.product_image[1].url} /> :
                                                                                    <img src={val.product_image[0].url} />
                                                                                }
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <img src={val.product_image[0].url}></img>
                                                                    }
                                                                </NavLink>
                                                            </div>
                                                        </Col>
                                                        <Col className="mg_nopad" xs={7} sm={7} md={8}>
                                                            <div className="rcs_prod_list_info">
                                                                <div className="d-flex align-items-start pt-10">
                                                                    <h2 className="rcs_list_title">{val.name}</h2>
                                                                </div>
                                                                {val.is_price ?
                                                                    <p className="rcs_main_price">{val.currency_icon}{val.sale_price}</p> :
                                                                    <p className="rcs_list_email">Email us for Price </p>}
                                                                <div className="rcs_dblock">
                                                                    {val.enable_ecommerce == "1" ? <Button onClick={() => addtocart(val.product_id)} > <img src={cart} /> ADD TO CART </Button> : <Button onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} /> INQUIRE  </Button>}
                                                                    <Button onClick={() => quickopen(val)}> <img src={eye} /> QUICK VIEW </Button>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        }
                                        {/* product list pagination */}
                                        {pageCount > 1 ?
                                            <Row className="mt-5 mb-5">
                                                <Col xs={2} className='pr-0'> <div className="rcs_sorting_title"><span onClick={() => prev()} className="prev" style={{ opacity: page > 1 ? '1' : '0.2' }}><ArrowBackIosIcon /> Previous </span></div></Col>
                                                <Col xs={8} className='p-0'> <div className="rcs_pagination"> <Pagination count={pageCount} page={page} onChange={handlePageChange} /> </div></Col>
                                                <Col xs={2} className='pl-0'><div className="rcs_sorting_title text-right"> <span onClick={() => next()} className="prev" style={{ opacity: page < pageCount ? '1' : '0.2' }}>Next <ArrowForwardIosIcon /></span> </div></Col>
                                            </Row> : null}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                }
            </div>
            {/*Inquiry Modal*/}
            <Modal show={inquiry} onHide={handleCloseInquiry}>
                <Modal.Header>
                    <Modal.Title>PRODUCT INQUIRY</Modal.Title>
                    <button type="button" onClick={handleCloseInquiry} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="rcs_add_address">
                        <Row>
                            <Col>
                                <p>Our friendly staff will be happy to help you with whatever questions you may have about this item.</p>
                            </Col>
                        </Row>
                        <Form>
                            <Row>
                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
                                        required
                                    />
                                </Col>
                                <Col xs={12} sm={6} className="rcs_custom_padding">
                                    <TextField
                                        id="outlined-basic"
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        value={last_name}
                                        onChange={(e) => setLast_name(e.target.value)}
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
                                        label="Phone Number"
                                        type="number"
                                        variant="outlined"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="rcs_custom_padding">
                                    <TextField
                                        id="outlined-basic"
                                        multiline
                                        rows={4}
                                        label="Your Message"
                                        type="text"
                                        variant="outlined"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="rcs_cancel_button mr-2" onClick={handleCloseInquiry}>
                        Close
                    </Button>
                    <Button variant="primary" className="rcs_save_button" onClick={submitForm}>
                        Submit Inquiry
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*Inquiry Modal*/}
            {/*QuickView Modal*/}
            {quickdata?.name?.length ?
                <Modal show={quickView} className="rcs_quick_modal" aria-labelledby="contained-modal-title-vcenter"
                    centered onHide={handleCloseQuickView}>

                    <Modal.Header>
                        <button type="button" onClick={handleCloseQuickView} class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="rcs_quick_view">

                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={6}>
                                    <img src={quickdata?.product_image[0]?.url}></img>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <div className="rcs_prod_info">
                                        <div className="d-flex align-items-start pt-10">
                                            <h2 className="rcs_list_title">{quickdata?.name}</h2>

                                            {/* <button class="rcs_wish_btn rcs_wish_btn_desktop">{quickdata?.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(quickdata[0])} /> : <FavoriteIcon onClick={() => addtowishlist(quickdata[0])} />}</button> */}
                                        </div>
                                        <Divider />
                                        <p className="rcs_emailprice"><strong>SKU :</strong>{quickdata?.sku}</p>
                                        <Divider />
                                        <p className="rcs_emailprice">{quickdata?.is_price ? quickdata?.currency_icon + quickdata?.sale_price : 'Email us for Price'}</p>
                                        <Divider />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" className="rcs_cancel_button mr-2">
                            <MailOutlineIcon className='mr-2' /> Email
                        </Button> */}
                        <Button variant="secondary" className="rcs_cancel_button mr-2" onClick={() => { addtocart(quickdata?.product_id); window.scrollTo(0, 0) }}>
                            <Image src={cart} className='mr-2' style={{ width: '20px' }} /> Add to Cart
                        </Button>
                        <Button variant="secondary" className="rcs_cancel_button" onClick={() => { history.push("/ringsettingdetail/setting/" + quickdata?.slug); window.scrollTo(0, 0) }}>
                            <ListIcon className='mr-2' /> Details
                        </Button>
                    </Modal.Footer>
                </Modal> : ""}
            {/*QuickView Modal*/}
        </>
    )
}

export default RingSettings;