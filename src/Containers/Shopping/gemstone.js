import React, { useEffect, useState } from 'react'
import '../../Assets/css/ringsettings.css';
import '../../Assets/css/education.css';
import { Col, Container, Row, Form, Modal, Image, InputGroup, FormControl } from 'react-bootstrap';
import { Breadcrumbs, Button, Link, TableCell, TableContainer, TableRow, Table, Typography, TableHead, TableBody, Paper } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Helmet } from 'react-helmet';
import Slider from 'rc-slider';
import '../../../node_modules/rc-slider/assets/index.css';
import '../../../node_modules/rc-tooltip/assets/bootstrap.css';
import { NavLink, useHistory } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from 'axios';
import { base_url, currency, currencycode, isLogin, postHeader, setSteps, user } from '../../Helpers/request';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Ringbildermenu from '../../Components/ringbildermenu';
import ReplayIcon from '@mui/icons-material/Replay';
import { Skeleton } from '@mui/material';
import { isMobileOnly, isTablet } from 'react-device-detect';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Gemstone = (props) => {
    const history = useHistory();
    const [productCount, setProductCount] = useState(0);
    const [page, setPage] = useState(1);
    const [gemstoneList, setGemstoneList] = useState([]);
    const [stone, setStone] = useState(JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.stone ? JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.stone : '');
    const [color, setColor] = useState(JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.color ? JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.color : '');
    const [shape, setShape] = useState(JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.shape ? JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.shape : '');
    const [carat, setCarat] = useState(JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.carat ? JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.carat : []);
    const [price, setPrice] = useState(JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.price ? JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.price : []);
    const [leavemouse, setLeavemouse] = useState(false);
    const [filter, setFilter] = useState([]);
    const [filtersuccess, setFiltersuccess] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [loader, setLoader] = useState(true);
    const [sortby, setSortby] = useState('featured');
    const [inputchange, setInputchange] = useState(false);
    const [clearFdata, setClearFdata] = useState(false);

    const clearFilter = () => {
        sessionStorage.removeItem("rcs_g_filter");
        setShape('');
        setCarat([filter?.normal_filters?.carat?.min, filter?.normal_filters?.carat?.max]);
        setPrice([filter?.normal_filters?.price?.min, filter?.normal_filters?.price?.max]);
        setColor('');
        setStone("");
        setSortby("featured");
        setClearFdata(!clearFdata)
    }

    useEffect(() => {
        setSteps(2);
        setFiltersuccess(false);
        const data = {
            currency_code: currencycode,
            setting_id: JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata'))?.product_id : ''
        }
        axios.post(base_url + '/diamond/gemstone_filter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setFilter(res.data.data)
                    if (!JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.price.length) {
                        setPrice([res.data.data?.normal_filters?.price?.min, res.data.data?.normal_filters?.price?.max])
                    }
                    if (!JSON.parse(sessionStorage.getItem("rcs_g_filter"))?.carat.length) {
                        setCarat([res.data.data?.normal_filters?.carat?.min, res.data.data?.normal_filters?.carat?.max])
                    }
                    res.data.data?.normal_filters?.color?.map(val =>
                        (val.selected == 1) ? setColor(val.name) : ""
                    )
                    res.data.data?.normal_filters?.stone_type?.map(val =>
                        (val.selected == 1) ? setStone(val.name) : ""
                    )
                    res.data.data?.normal_filters?.shape?.map(val =>
                        (val.selected == 1) ? setShape(val.name) : ""
                    )
                    setFiltersuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        onchangesdata();
    }, [shape, color, stone, sortby, inputchange, clearFdata]);

    useEffect(() => {
        if (filtersuccess) {
            gemstonelistdata();
        }
    }, [page, filtersuccess]);

    const onchangesdata = () => {
        setPage(1)
        var data1 = {
            shape, carat, price, color, stone, sortby
        }
        sessionStorage.setItem("rcs_g_filter", JSON.stringify(data1));
        if (filtersuccess) {
            gemstonelistdata();
        }
    }

    const gemstonelistdata = () => {
        setLoader(true);
        var data = {
            currency_code: currencycode,
            start: (page - 1) * 15,
            length: 15,
            color: color,
            shape,
            stone_type: stone,
            price_to: price[1],
            price_from: price[0],
            carat_from: carat[0],
            carat_to: carat[1],
            sort_by: sortby,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
            diamond_type: 3
        }
        axios.post(base_url + '/diamond/gemstone_list', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setTotalCount(res.data.data?.count);
                    var count = (res.data.data?.count / 15).toFixed();
                    if ((count * 15) >= res.data.data?.count) {
                        setProductCount(count);
                    } else {
                        setProductCount(Number(count) + 1);
                    }
                    setGemstoneList(res.data.data?.result)
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleprice = (value) => {
        setPrice(value);
    }
    const handlepriceinput = (i) => {
        var data = [];
        if (i == 0) {
            if (price[0] < filter?.normal_filters?.price?.min) {
                data = [filter?.normal_filters?.price?.min, price[1]]
            } else if (price[0] > filter?.normal_filters?.price?.max) {
                data = [filter?.normal_filters?.price?.max, price[1]]
            } else {
                data = [price[0], price[1]]
            }
        } else if (i == 1) {
            if (price[1] > filter?.normal_filters?.price?.max) {
                data = [price[0], filter?.normal_filters?.price?.max]
            } else if (price[1] < filter?.normal_filters?.price?.min) {
                data = [price[0], filter?.normal_filters?.price?.min]
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
    const handlecarat = (value) => {
        setCarat(value);
    }
    const handlecaratinput = (i) => {
        var data = [];
        if (i == 0) {
            if (carat[0] < filter?.normal_filters?.carat?.min) {
                data = [filter?.normal_filters?.carat?.min, carat[1]]
            } else if (carat[0] > filter?.normal_filters?.carat?.max) {
                data = [filter?.normal_filters?.carat?.max, carat[1]]
            } else {
                data = [carat[0], carat[1]]
            }
        } else if (i == 1) {
            if (carat[1] > filter?.normal_filters?.carat?.max) {
                data = [carat[0], filter?.normal_filters?.carat?.max]
            } else if (carat[1] < filter?.normal_filters?.carat?.min) {
                data = [carat[0], filter?.normal_filters?.carat?.min]
            } else {
                data = [carat[0], carat[1]]
            }
        }
        if (data[0] < data[1]) {
            var data1 = [Number(data[0])?.toFixed(2), Number(data[1])?.toFixed(2)]
        } else {
            var data1 = [Number(data[1])?.toFixed(2), Number(data[0])?.toFixed(2)]
        }
        setCarat(data1);
        setInputchange(!inputchange);
    }
    const handlePageChange = (e, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    $(document).ready(function () {
        $('#ringsettingtable').DataTable();
    });
    const addtowishlist = (product_id, wishindex) => {
        const data = {
            currency_code: currencycode,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            product_id: product_id?.stock_no,
            type: 'gemstone',
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    const productlist = gemstoneList?.map(
                        (obj, index) => (index == wishindex ? Object.assign(obj, { is_wishlist: res.data.data?.wishlist_id }) : obj)
                    )
                    setGemstoneList(productlist);
                    localStorage.setItem("bw-wishlistlength", res.data.data?.count)
                } else if (res.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    console.log(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [expanded, setExpanded] = React.useState(false);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gemstones | Belgium WebNet</title>
                <meta name="description" content="Choose from our stunning and vibrant gemstones to design your fine jewelry or engagement ring. We sell certified gemstones only that are 100% natural."></meta>
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
                                <Typography color="text.primary">Gemstone</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Ringbildermenu location="gemstone" />
                    <Row className='w-100 m-auto rcs_diamond_filter_section rcs_diamond_filter_section_desktop pr-3 pl-3'>
                        <Col sm={12} className='p-0 mt-3 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} className="p-0">
                                    <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_shape1">
                                        {!filtersuccess ? <>
                                            {[...Array(10)]?.map(val => isTablet ? <Skeleton variant="text" style={{ transform: 'unset', margin: '0 10px' }} animation="wave" width={80} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset', margin: '0 10px' }} animation="wave" width={129} height={92} />)}
                                        </> :
                                            <>
                                                {filter?.normal_filters?.stone_type?.map(val =>
                                                    <li data-qa="TypeFilter-BlueSapphire" onClick={() => stone == val.name ? setStone("") : setStone(val.name)} className={val.status ? stone == val.name ? "item--YBPgi selected--Qs8si" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                        <span class="single-item-container--Xo5ic">
                                                            <img style={{ width: "55px", margin: "0 auto 10px" }} src={val.icon} alt={val.name}></img>
                                                            <span data-value="20">{val.name}</span>
                                                        </span>
                                                    </li>
                                                )}
                                            </>
                                        }
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pl-md-0 mt-5 mt-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Gemstone Color'>Color</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_color">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            filter?.normal_filters?.color?.map(val =>
                                                <li data-qa="TypeFilter-BlueSapphire" onClick={() => color == val.name ? setColor("") : setColor(val.name)} className={val.status ? color == val.name ? "item--YBPgi selected--Qs8si" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                    <span class="single-item-container--Xo5ic">
                                                        <span class="title--jqbwB">{val.name}</span>
                                                        <div class="filtered--yd5Rg"></div>
                                                        <Image src={val.icon} alt={val.name}></Image>
                                                    </span>
                                                </li>
                                            )}
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pr-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Gemstone Carat'>Carat</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                        <>
                                            <div className='rcs_catat_slider'>
                                                <Range onAfterChange={() => onchangesdata()} step={0.01} allowCross={false} min={filter?.normal_filters?.carat?.min} max={filter?.normal_filters?.carat?.max} value={carat} onChange={handlecarat} tipFormatter={value => `${value}`} />
                                            </div>
                                            <Row className='mt-2'>
                                                <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                    <li>
                                                        <InputGroup>
                                                            <FormControl aria-label="Amount (to the nearest dollar)"
                                                                type="number"
                                                                step={0.01}
                                                                min={0}
                                                                name="min"
                                                                value={carat[0]}
                                                                onChange={(e) => setCarat([Number(e.target.value), Number(carat[1])])}
                                                                onBlurCapture={() => handlecaratinput(0)}
                                                            />
                                                        </InputGroup>
                                                    </li>
                                                    <li>
                                                        <InputGroup>
                                                            <FormControl aria-label="Amount (to the nearest dollar)"
                                                                type="number"
                                                                step={0.01}
                                                                min={0}
                                                                name='max'
                                                                value={carat[1]}
                                                                onChange={(e) => setCarat([Number(carat[0]), Number(e.target.value)])}
                                                                onBlurCapture={() => handlecaratinput(1)}
                                                            />
                                                        </InputGroup>
                                                    </li>
                                                </ul>
                                            </Row>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pl-md-0 mt-5 mt-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Gemstone Shape'>Shape</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <ul className="action-area--soLSw table-align_filter--GVxiB">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            filter?.normal_filters?.shape?.map(val =>
                                                <li data-qa="ShapeFilter-Round" onClick={() => shape == val.name ? setShape("") : setShape(val.name)} className={val.status ? shape == val.name ? "longFilter--VqAB5 item--YBPgi selected--Qs8si" : "longFilter--VqAB5 item--YBPgi" : "longFilter--VqAB5 item--YBPgi diamond-filter-dis"}>
                                                    <span className="single-item-container--Xo5ic">
                                                        <span className="title--jqbwB">{val.name}</span>
                                                        <div className="filtered--yd5Rg"></div>
                                                        <img src={val.icon}></img>
                                                    </span>
                                                </li>
                                            )}

                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pr-md-0 mb-4'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Gemstone Price'>Price</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                        <>
                                            <div className='rcs_catat_slider'>
                                                <Range onAfterChange={() => onchangesdata()} allowCross={false} step={1} min={filter?.normal_filters?.price?.min} max={filter?.normal_filters?.price?.max} onChange={handleprice} value={price} tipFormatter={value => `${value}`} />
                                            </div>
                                            <Row className='mt-2'>
                                                <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                    <li className='rcs_price_range_input1'>
                                                        <InputGroup>
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
                                                        <InputGroup>
                                                            <InputGroup.Text>{currency}</InputGroup.Text>
                                                            <FormControl aria-label="Amount (to the nearest dollar)"
                                                                type="int"
                                                                name='max'
                                                                value={price[1]}
                                                                onChange={(e) => setPrice(([Number(price[0]), Number(e.target.value)]))}
                                                                onBlurCapture={() => handlepriceinput(1)}
                                                            />
                                                        </InputGroup>
                                                    </li>
                                                </ul>
                                            </Row>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='w-100 m-auto pt-4 rcs_diamond_filter_section d-block d-md-none'>
                        <Col xs={12} className='p-0 rcs_filter_accordion_sec rcs_filter_accordion_sec_diamond'>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><strong>Gemstones Type</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-3 mt-1'>
                                        <Col sm={12} md={6} className='p-0'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={12} className="p-0">
                                                    <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_shape1">
                                                        {filter?.normal_filters?.stone_type?.map(val =>
                                                            <li data-qa="TypeFilter-BlueSapphire" onClick={() => stone == val.name ? setStone("") : setStone(val.name)} className={val.status ? stone == val.name ? "item--YBPgi selected--Qs8si" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                                <span class="single-item-container--Xo5ic">
                                                                    <img style={{ width: "55px", margin: "0 auto 10px" }} src={val.icon} alt={val.name}></img>
                                                                    <span data-value="20">{val.name}</span>
                                                                </span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Col>
                        <Col xs={12} className='p-0 rcs_filter_accordion_sec rcs_filter_accordion_sec_diamond'>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography><strong>Gemstones Filter</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-5 mt-3'>
                                        <Col sm={12} md={6} className='p-0 mt-3 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Gemstone Color'>Color</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-0 mt-2 mb-3">
                                                    <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_color_mob">
                                                        {filter?.normal_filters?.color?.map(val =>
                                                            <li data-qa="TypeFilter-BlueSapphire" onClick={() => color == val.name ? setColor("") : setColor(val.name)} className={val.status ? color == val.name ? "item--YBPgi selected--Qs8si" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                                <span class="single-item-container--Xo5ic">
                                                                    <span class="title--jqbwB">{val.name}</span>
                                                                    <div class="filtered--yd5Rg"></div>
                                                                    <Image src={val.icon} alt={val.name}></Image>
                                                                </span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='p-0 mt-3 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Gemstone Shape'>Shape</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-0 mt-2 mb-3">
                                                    <ul className="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_color_shape">
                                                        {filter?.normal_filters?.shape?.map(val =>
                                                            <li data-qa="ShapeFilter-Round" onClick={() => shape == val.name ? setShape("") : setShape(val.name)} className={val.status ? shape == val.name ? "longFilter--VqAB5 item--YBPgi selected--Qs8si" : "longFilter--VqAB5 item--YBPgi" : "longFilter--VqAB5 item--YBPgi diamond-filter-dis"}>
                                                                <span className="single-item-container--Xo5ic">
                                                                    <span className="title--jqbwB">{val.name}</span>
                                                                    <div className="filtered--yd5Rg"></div>
                                                                    <img src={val.icon}></img>
                                                                </span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pr-md-0 p-0 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Gemstone Carat'>Carat</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_catat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} allowCross={false} step={0.01} min={filter?.normal_filters?.carat?.min} max={filter?.normal_filters?.carat?.max} value={carat} onChange={handlecarat} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <Row className='mt-2'>
                                                        <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                            <li>
                                                                <InputGroup>
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="number"
                                                                        step={0.01}
                                                                        min={0}
                                                                        name="min"
                                                                        value={carat[0]}
                                                                        onChange={(e) => setCarat([Number(e.target.value), Number(carat[1])])}
                                                                        onBlurCapture={() => handlecaratinput(0)}
                                                                    />
                                                                </InputGroup>
                                                            </li>
                                                            <li>
                                                                <InputGroup>
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="number"
                                                                        step={0.01}
                                                                        min={0}
                                                                        name='max'
                                                                        value={carat[1]}
                                                                        onChange={(e) => setCarat([Number(carat[0]), Number(e.target.value)])}
                                                                        onBlurCapture={() => handlecaratinput(1)}
                                                                    />
                                                                </InputGroup>
                                                            </li>
                                                        </ul>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pr-md-0 p-0 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Gemstone Price'>Price</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_catat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} allowCross={false} min={filter?.normal_filters?.price?.min} max={filter?.normal_filters?.price?.max} onChange={handleprice} value={price} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <Row className='mt-2'>
                                                        <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                            <li className='rcs_price_range_input1'>
                                                                <InputGroup>
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
                                                                <InputGroup>
                                                                    <InputGroup.Text>{currency}</InputGroup.Text>
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="int"
                                                                        name='max'
                                                                        value={price[1]}
                                                                        onChange={(e) => setPrice(([Number(price[0]), Number(e.target.value)]))}
                                                                        onBlurCapture={() => handlepriceinput(1)}
                                                                    />
                                                                </InputGroup>
                                                            </li>
                                                        </ul>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Col>
                    </Row>
                    <Row className='w-100 m-0'>
                        <Col xs={12} className='p-0 mb-3 mt-3'>
                            <Button variant="outlined" onClick={clearFilter} className='rcs_clear_filter'><ReplayIcon /> Clear Filter</Button>
                        </Col>
                    </Row>
                    <Row className='w-100 d-block m-auto'>
                        <Col xs={12} className='p-0'>
                            <div className='rcs_diamond_content'>
                                <h1>Find A Gemstone Easily</h1>
                                <p>The Stone Search Feature helps you deploy various filters to help you find exactly what you're looking for.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='w-100 m-auto'>
                        <Col xs={12} sm={6} className='mt-3 rcs_diamond_table p-2 mb-md-3 mb-0'>
                            {loader ? <>
                                {isMobileOnly ? <Skeleton variant="text" style={{ margin: '0 auto' }} animation="wave" width={150} height={28} /> : <Skeleton variant="text" animation="wave" width={150} height={28} />}
                            </> :
                                <p className='text-left m-0'><strong style={{ fontWeight: '400', fontSize: '16px' }}>Showing {totalCount} Results</strong> </p>
                            }
                        </Col>
                        <Col xs={12} sm={6} className='mt-3 rcs_diamond_table p-2 mb-md-3 mb-0'>
                            <div className={isMobileOnly ? "rcs_sort_filter text-left p-0" : "rcs_sort_filter float-right p-0"}>
                                <label> <span>Sort by: </span> </label>
                                <Form.Select onChange={(e) => { setSortby(e.target.value); window.scrollTo(0, 0) }} value={sortby} aria-label="Default select example">
                                    {filter?.sort_by?.map(val =>
                                        <option value={val.value}>{val.name}</option>
                                    )}
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <Row className='w-100 d-block m-auto'>
                        <Col xs={12} className='rcs_diamond_table p-0'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table" className='m-0'>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Stone Type</StyledTableCell>
                                            <StyledTableCell align="center">Shape</StyledTableCell>
                                            <StyledTableCell align="center">Carat</StyledTableCell>
                                            <StyledTableCell align="center">Color</StyledTableCell>
                                            <StyledTableCell align="center">Clarity</StyledTableCell>
                                            <StyledTableCell align="center">Cut</StyledTableCell>
                                            <StyledTableCell align="center">Price</StyledTableCell>
                                            <StyledTableCell align="center">Wishlist</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loader ? <>
                                            {[...Array(15)]?.map(val =>
                                                <StyledTableRow>
                                                    <StyledTableCell align="center" component="th" scope="row"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                    <StyledTableCell align="center"><Skeleton variant="text" style={{ transform: 'unset', margin: '0 auto' }} animation="wave" width={110} height={30} /></StyledTableCell>
                                                </StyledTableRow>
                                            )}
                                        </>
                                            :
                                            gemstoneList?.map((row, index) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="center">{row.stone_type}</StyledTableCell>
                                                    <StyledTableCell align="center" component="th" scope="row">{row.shape}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.weight}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.color}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.clarity}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.cut_grade}</StyledTableCell>
                                                    <StyledTableCell align="center" style={{ fontSize: '15px', fontWeight: '600' }}>{currency}{row.sale_price}</StyledTableCell>
                                                    <StyledTableCell align="center" title="Add to Wishlist" style={{ cursor: 'pointer' }}>{row.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(row, index)} /> : <FavoriteIcon onClick={() => addtowishlist(row, index)} className="animate__animated animate__heartBeat" />}</StyledTableCell>
                                                    {/* <StyledTableCell align="center"><button class="rcs_wish_btn rcs_wish_btn_desktop">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button></StyledTableCell> */}
                                                    <StyledTableCell align="center"><Button onClick={() => history.push("/gemstone-details/" + row.stock_no)} variant="contained">Details</Button></StyledTableCell>
                                                </StyledTableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Stack spacing={2} className='mt-3 mb-3 rcs_diamond_pagination'>
                                <Pagination count={productCount} page={page} onChange={handlePageChange} shape="rounded" />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Gemstone;