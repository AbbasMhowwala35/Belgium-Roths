import React, { useState } from 'react'
import { Container, Col, Row, Form, Modal, Image } from 'react-bootstrap';
import "../../Assets/css/productlist.css";
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppsIcon from '@mui/icons-material/Apps';
import ListIcon from '@mui/icons-material/List';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Slider from "react-slick";
import eye from "../../Assets/images/eye.svg";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import cart from "../../Assets/images/cart.png";
import heart from "../../Assets/images/heart.svg";
import inquir from "../../Assets/images/inquir.svg";
import { Drawer, TextField, makeStyles, Divider, CircularProgress } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import CloseIcon from '@material-ui/icons/Close';
import { Helmet } from 'react-helmet';
import { Skeleton } from '@mui/material';
import { isMobileOnly } from 'react-device-detect';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
const Productlist = (props) => {
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
    const [categoryrun, setCategoryrun] = useState(false);
    const [listdata, setListdata] = useState([]);
    const [bannerdata, setBannerdata] = useState('');
    const [catediscription, setCatediscription] = useState('');
    const [productCount, setProductCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sortby, setSortby] = useState('featured');
    const [filterdata, setFilterdata] = useState([]);
    const [demofilterlist, setDemofilterlist] = useState([]);
    const [addedfilter, setAddedfilter] = useState(JSON.parse(sessionStorage.getItem('bw-listfilter')) ? JSON.parse(sessionStorage.getItem('bw-listfilter')) : []);
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
    const [showFilter, setShowFilter] = useState(true);
    const [filtercount, setFiltercount] = useState(0);
    const [proIndex, setProIndex] = useState('');


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
    const handleChange = (panel) => (event, newExpanded) => {
        setShowFilter(true)
        if (expanded.includes(panel)) {
            var data = expanded?.filter(function (person) {
                return person !== panel
            })
            setExpanded(data)
        } else {
            setExpanded([...expanded, newExpanded ? false : panel]);
        }
    };
    useEffect(() => {
        filterApi();
    }, [props.match.params.listcategory, props.match.params.search_text])
    useEffect(() => {
        if (categoryrun) {
            productlist();
            setParamid(props.match.params.listcategory ? props.match.params.listcategory : props.match.params.search_text)
        }
    }, [page])
    useEffect(() => {
        if (categoryrun) {
            productlist();
            setPage(1);
            setParamid(props.match.params.listcategory ? props.match.params.listcategory : props.match.params.search_text);
            var count = 0;
            addedfilter?.map(val => {
                if (val?.name.length) {
                    count++;
                }
            })
            count > 0 ? setFiltercount(1) : setFiltercount(0);
        }
    }, [addedfilter, props.match.params.listcategory, props.match.params.search_text, sortby])
    const filterApi = () => {
        setCategoryrun(true)
        const data = {
            currency_code: currencycode,
            category: props.match.params.listcategory ? props.match.params.listcategory : "",
            search_text: props.match.params.search_text ? props.match.params.search_text : "",
        }
        axios.post(base_url + '/product/productfilter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setFilterdata(res.data.data)
                    if (data.category == sessionStorage.getItem('bw-list-category')) {
                        setAddedfilter(JSON.parse(sessionStorage.getItem('bw-listfilter')))
                    } else {
                        var list = [];
                        res.data.data?.normal_filters?.map(val => {
                            list.push({ title: val.title, filter: [], name: [] })
                        })
                        setAddedfilter(list)
                        setDemofilterlist(list)
                        sessionStorage.setItem('bw-list-category', data.category)
                        sessionStorage.setItem("bw-listfilter", JSON.stringify(list))
                    }
                } else {
                    toast.error(res.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const productlist = () => {
        setLoader(true);
        const data = {
            currency_code: currencycode,
            sort_by: sortby,
            category: props.match.params.listcategory ? props.match.params.listcategory : "",
            search_text: props.match.params.search_text ? props.match.params.search_text : "",
            filterdata: addedfilter,
            limit: 18,
            offset: (page - 1) * 18,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : ""
        }
        axios.post(base_url + '/product/productlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setLoader(false)
                    setListdata(res.data.data?.result)
                    setBannerdata(res.data.data?.image)
                    setCatediscription(res.data.data?.description)
                    setProductCount(res.data.data?.count)
                    var count = (res.data.data?.count / 18).toFixed();
                    if ((count * 18) >= res.data.data?.count) {
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
    const handlecheckChange = (e, title, value, name) => {
        var changedata = [...addedfilter];
        addedfilter?.map(val => {
            var filterdata = [...val.filter];
            var fname = [...val.name];
            if (val.title == title) {
                if (val.filter?.includes(value)) {
                    filterdata = val.filter?.filter(data => data !== value)
                    fname = val.name?.filter(data => data !== name)
                } else {
                    filterdata.push(value)
                    fname.push(name)
                }
                changedata = changedata.map(
                    obj => (obj.title == title ? Object.assign(obj, { filter: filterdata, name: fname }) : obj)
                )
                setAddedfilter(changedata);
                sessionStorage.setItem("bw-listfilter", JSON.stringify(changedata))
            }
        })
    }
    const checkboxcheck = (title, value, i) => {
        var data = false;
        if (addedfilter[i]?.title == title) {
            if (addedfilter[i]?.filter?.includes(`${value}`)) {
                data = true;

            }
        }
        return data;
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
    const [left, setLeft] = useState(false);

    const quickopen = (data) => {
        setQuickdata(data);
        setQuickView(true);
    }
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
                <title>{(paramid)?.charAt(0).toUpperCase() + (paramid).slice(1).replace('-', " ")} | Belgium Webnet | Charlotte, NC </title>
                <meta name="description" content={catediscription}></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_product_list_main">
                {/* <div className="rcs_prodlist_banner mb-3">                   
                    {loader ? <Skeleton variant="text" animation="wave" style={{ transform: 'unset' }} width={'100%'} height={380} /> : isMobileOnly ? '' : <img src={bannerdata} />}
                </div> */}
                <Container className="rcs_customer_container rcs_large_container mt-3">
                    <Row>
                        <Col sm={12} className="p-md-0">
                            <div className="rcs_bread_crumb">
                                {/* breadcrumb start here */}
                                <div role="presentation" onClick={handleClick}>
                                    <Col className="rcs_breadcrumb mb-2 p-0">
                                        <Breadcrumbs aria-label="breadcrumb">
                                            <NavLink underline="hover" color="inherit" to="/">
                                                Home
                                            </NavLink>
                                            <Typography color="text.primary">{(paramid)?.charAt(0).toUpperCase() + (paramid).slice(1).replace('-', " ")}</Typography>
                                        </Breadcrumbs>
                                    </Col>
                                </div>
                                <div className="rcs_category_title">
                                    {/* <div class="d-flex align-items-start pt-10">
                                        <div class="grid-item-title text-dark w-100">Cushion Shaped Halo Diamond Ring in 18kt White and Rose Gold</div>
                                    </div> */}
                                    <h1>{(paramid)?.charAt(0).toUpperCase() + (paramid).slice(1).replace('-', " ")}</h1>
                                    {loader ? <Skeleton variant="text" animation="wave" className='mb-4' width={'100%'} height={24} /> :
                                        <p>{catediscription}</p>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {/* mj left filter bar  */}
                        <Col xl={2} lg={2} md={2} sm={2} className="rcs_list_filter rcs_list_filter_tablet d-none d-xl-block">
                            <div className="rcs_accordion_sec" sticky="top" >
                                <div className="rcs_accordion">
                                    {/* filter tags */}
                                    <div className="rcs_filter_tags">
                                        {!filtercount ? "" :
                                            <div className="rcs_filter_list" >
                                                <h5>
                                                    <span>Filtering by:</span>
                                                    <a href="javascript:void(0)" onClick={() => { setAddedfilter(demofilterlist); setSortby('featured'); sessionStorage.removeItem("bw-listfilter"); sessionStorage.removeItem('bw-list-category'); filterApi() }} className="clear-all-filters">
                                                        CLEAR ALL
                                                    </a>
                                                </h5>
                                                <div className="filter_tgs_list">
                                                    {addedfilter?.map(val =>
                                                        val.name?.map((items, index) =>
                                                            <>
                                                                <Button className="gs_filter_btn">{items}<CloseIcon onClick={(e) => handlecheckChange(e, val.title, val.filter[index], items)} className="gs_tags_svg" /></Button>
                                                            </>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {filterdata?.normal_filters?.map((val, index) =>
                                        <Accordion expanded={showFilter ? expanded?.includes('panel' + index) ? false : true : false} onChange={handleChange('panel' + index)} className="rcs_accordion_item">
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel2a-content"
                                                id="panel2a-header"
                                            >
                                                <Typography>{val.title}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="rcs_price_filter">
                                                    <FormGroup>
                                                        {val.data?.map((items) => <>
                                                            <FormControlLabel control={<Checkbox checked={checkboxcheck(val.title, items.value, index)} onChange={(e) => handlecheckChange(e, val.title, items.value, items.name)} />} label={items.name} />
                                                        </>)}
                                                    </FormGroup>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                </div>
                            </div>
                        </Col>
                        {/* mj left filter bar end */}
                        <div className='rcs_mobile_filter_section'>
                            <Drawer anchor="left" open={left} onClose={() => setLeft(false)}>
                                <div
                                    role="presentation"
                                    onKeyDown={() => setLeft(false)}
                                >
                                    <div className="rcs_accordion_sec" sticky="top" >
                                        <div className="rcs_accordion">
                                            {/* filter tags */}
                                            <div className="rcs_filter_tags">
                                                {!filtercount ? "" :
                                                    <div className="rcs_filter_list" >
                                                        <h5>
                                                            <span>Filtering by:</span>
                                                            <a href="javascript:void(0)" onClick={() => { setAddedfilter(demofilterlist); setSortby('featured'); sessionStorage.removeItem("bw-listfilter"); sessionStorage.removeItem('bw-list-category'); filterApi() }} className="clear-all-filters">
                                                                CLEAR ALL
                                                            </a>
                                                        </h5>
                                                        <div className="filter_tgs_list">
                                                            {addedfilter?.map(val =>
                                                                val.name?.map((items, index) =>
                                                                    <>
                                                                        <Button className="gs_filter_btn">{items}<CloseIcon onClick={(e) => handlecheckChange(e, val.title, val.filter[index], items)} className="gs_tags_svg" /></Button>
                                                                    </>
                                                                )
                                                            )}
                                                        </div>

                                                    </div>}
                                            </div>
                                            {filterdata?.normal_filters?.map((val, index) =>
                                                <Accordion expanded={expanded?.includes('panel' + index) ? false : true} onChange={handleChange('panel' + index)} className="rcs_accordion_item">
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>{val.title}</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className="rcs_price_filter">
                                                            <FormGroup>
                                                                {val.data?.map((items) => <>
                                                                    <FormControlLabel control={<Checkbox checked={checkboxcheck(val.title, items.value, index)} onChange={(e) => handlecheckChange(e, val.title, items.value, items.name)} />} label={items.name} />
                                                                </>)}
                                                            </FormGroup>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Drawer>
                        </div>
                        {/* mj product list */}
                        <Col xl={10} lg={12} md={12} sm={12} className='rcs_list_tablet p-lg-0'>
                            <div className="rcs_product_list_wrapper">
                                <div className="rcs_view">
                                    <div>
                                        <div className='rcs_mob_filter'>
                                            <span onClick={() => setLeft(true)}>Filter</span>
                                        </div>
                                        <div className='rcs_mob_filter1'>
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
                                    </div>
                                </div>
                                <div className="rcs_sorting">
                                    <div className="rcs_sort_filter mb-3">
                                        <label> <span>Sort by: </span> </label>
                                        <Form.Select onChange={(e) => { setSortby(e.target.value); window.scrollTo(0, 0) }} value={sortby} aria-label="Default select example">
                                            {filterdata?.sort_by?.map(val =>
                                                <option value={val.value}>{val.name}</option>
                                            )}
                                        </Form.Select>
                                    </div>
                                    <Row>
                                        <Col xs={2} className='pr-0'> <div className="rcs_sorting_title text-left"><span onClick={() => prev()} className="prev" style={{ opacity: page > 1 ? '1' : '0.2' }}><ArrowBackIosIcon /> Previous </span></div></Col>
                                        <Col xs={8} className='p-0'> <div className="rcs_sorting_title text-center">{loader ? <Skeleton variant="text" animation="wave" className='m-auto' width={100} height={25} /> : <>{productCount} product(s) found </>}</div></Col>
                                        <Col xs={2} className='pl-0'><div className="rcs_sorting_title text-right"> <span onClick={() => next()} className="prev" style={{ opacity: page < pageCount ? '1' : '0.2' }}>Next <ArrowForwardIosIcon /></span> </div></Col>
                                    </Row>
                                </div>
                                {view == 1 ?
                                    <div className="rcs_product_grid">
                                        <Row>
                                            {listdata?.map((val, index) =>
                                                <Col className="mg_nopadd" xs={6} sm={6} md={4}>
                                                    <div className="rcs_product_item position-relative">
                                                        {loader ?
                                                            <div className="rcs_filter_prod_wrapper" >
                                                                <CircularProgress className="rcs_filter_prod_loader" />
                                                            </div> : ""}
                                                        <div class="d-flex  hover-buttons justify-content-between">
                                                            {val.enable_ecommerce == "1" ? <span onClick={() => addtocart(val.product_id)}> <img src={cart} /> </span> : <span onClick={() => { setProductid(val.product_id); handleShowInquiry(true); }}> <img src={inquir} />  </span>}
                                                            <span onClick={() => quickopen(val)}> <Image src={eye} />  </span>
                                                        </div>
                                                        <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/productdetail/" + val.slug}>
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
                                                                <h2 onClick={() => { history.push("/productdetail/" + val.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{val.name}</h2>
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
                                                        <NavLink onMouseOver={() => { setProIndex(index + 1); console.log(proIndex) }} onMouseLeave={() => setProIndex('')} to={"/productdetail/" + val.slug}>
                                                            <div class="color-overlay"></div>
                                                            {val.product_image?.length > 1 ?
                                                                <>
                                                                    <div>
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
                            {/* </div> */}
                        </Col>
                    </Row>
                    <div className="rcs_bottom_text d-none">
                        <Row>
                            <Col sm={6}>
                                <h5 className="rcs_bottom_title">YOUR DESTINATION FOR ENGAGEMENT RINGS IN CHARLOTTE, NC</h5>
                                <p>
                                    <small>
                                        You’ve found the perfect person, now it’s time to find the perfect ring!
                                        With so many choices – from style to cut to design – we understand that
                                        the possibilities might be overwhelming. At Belgium Webnet, we are here
                                        to help you navigate through this exciting decision. We are proud to
                                        call ourselves advisors and consultants, not salespeople. &nbsp;
                                    </small>
                                </p>
                            </Col>
                            <Col sm={6}>
                                <h5 className="rcs_bottom_title">THE DIAMOND SPECIALISTS</h5>
                                <p>
                                    <small>
                                        Belgium Webnet has been family owned and operated for 40 years. We are a
                                        direct diamond importer, meaning that we import diamonds, precious gems,
                                        bridal and fine jewelry directly to our showroom from Tel Aviv, Israel,
                                        Antwerp, Belgium, and many other locations around the world. This allows
                                        us to cut out the middleman and pass the savings along to you. All of
                                        our diamonds are natural, not lab grown or synthetic, and come with an
                                        appraisal for authenticity. &nbsp;
                                    </small>
                                </p>
                            </Col>
                        </Row>
                        <Row>

                            <Col sm={6}>
                                <h5 className="rcs_bottom_title">DESIGN HER DREAM ENGAGEMENT RING</h5>
                                <p>
                                    <small>
                                        Having trouble finding ‘THE’ ring? We’re here to help! We can work with
                                        you one-on-one to design a custom engagement ring she is guaranteed to
                                        love. If you can dream it, we can make it! Schedule an{" "}
                                        <NavLink to="/make-an-appointment" className="rcs_list_appointment">appointment</NavLink> today and make your
                                        dream ring a reality.{" "}
                                    </small>
                                </p>
                            </Col>
                            <Col sm={6}>
                                <h5 className="rcs_bottom_title">WE’VE GOT YOUR BACK&nbsp;</h5>
                                <p>
                                    <small>
                                        With your purchase of a Belgium Webnet engagement ring, you receive a
                                        certificate of insurance appraisal, complimentary sizing and inspection,
                                        as well as complimentary cleaning as an ongoing service. With our
                                        100-Day Price Protection guarantee, if within 100 days of your purchase
                                        you find a diamond advertised anywhere in the United States with the
                                        exact same specifications, we will not just match the price and we will
                                        not only match the difference, we will give you 15% of the difference.
                                        &nbsp;
                                    </small>
                                </p>

                            </Col>
                        </Row>
                    </div>
                </Container>
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
                                            {/* <h2 onClick={() => { history.push("/productdetail/" + quickdata?.slug); window.scrollTo(0, 0) }} className="rcs_list_title">{quickdata?.name}</h2> */}
                                            {/* <button class="rcs_wish_btn rcs_wish_btn_desktop">{quickdata?.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(quickdata[0])} /> : <FavoriteIcon onClick={() => addtowishlist(quickdata[0])} />}</button> */}
                                        </div>
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
                        <Button variant="secondary" className="rcs_cancel_button" onClick={() => { history.push("/productdetail/" + quickdata?.slug); window.scrollTo(0, 0) }}>
                            <ListIcon className='mr-2' /> Details
                        </Button>
                    </Modal.Footer>
                </Modal> : ""}
            {/*QuickView Modal*/}

        </>
    )
}
export default Productlist;