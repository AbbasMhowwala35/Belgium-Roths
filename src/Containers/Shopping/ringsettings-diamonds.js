import React, { useEffect, useState } from 'react'
import '../../Assets/css/ringsettings.css';
import '../../Assets/css/education.css';
import { Col, Container, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Ringbildermenu from '../../Components/ringbildermenu';
import { toast } from 'react-toastify';
import ReplayIcon from '@mui/icons-material/Replay';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { Skeleton } from '@mui/material';

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

const RingSettingsDiamonds = (props) => {
    const history = useHistory();
    const [productCount, setProductCount] = useState(0);
    const [page, setPage] = useState(1);
    const [diamondList, setDiamondList] = useState([]);
    const [shape, setShape] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.shape ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.shape : '');
    const [carat, setCarat] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.carat ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.carat : []);
    const [price, setPrice] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.price ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.price : []);
    const [leavemouse, setLeavemouse] = useState(false);
    const [cut, setCut] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.cut ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.cut : [0, 100]);
    const [cutdata, setCutdata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.cutdata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.cutdata : []);
    const [color, setColor] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.color ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.color : [0, 100]);
    const [colordata, setColordata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.colordata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.colordata : []);
    const [clarity, setClarity] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.clarity ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.clarity : [0, 100]);
    const [claritydata, setClaritydata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.claritydata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.claritydata : []);
    const [fluorescence, setFluorescence] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.fluorescence ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.fluorescence : [0, 100]);
    const [fluorescencedata, setFluorescencedata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.fluorescencedata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.fluorescencedata : []);
    const [polish, setPolish] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.polish ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.polish : [0, 100]);
    const [polishdata, setPolishdata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.polishdata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.polishdata : []);
    const [symmetry, setSymmetry] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.symmetry ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.symmetry : [0, 100]);
    const [symmetrydata, setSymmetrydata] = useState(JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.symmetrydata ? JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.symmetrydata : []);
    const [filter, setFilter] = useState([]);
    const [filtersuccess, setFiltersuccess] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [loader, setLoader] = useState(true);
    const [sortby, setSortby] = useState('featured');
    const [inputchange, setInputchange] = useState(false);
    const [diamond_type, setDiamond_type] = useState(1);
    const [clearFdata, setClearFdata] = useState(false);


    const clearFilter = () => {
        sessionStorage.removeItem("rcs_d_filter");
        setShape('');
        setCarat([filter?.normal_filters?.carat?.min, filter?.normal_filters?.carat?.max]);
        setPrice([filter?.normal_filters?.price?.min, filter?.normal_filters?.price?.max]);
        setCut([0, 100]);
        setCutdata([]);
        setColor([0, 100]);
        setColordata([]);
        setClarity([0, 100]);
        setClaritydata([]);
        setFluorescence([0, 100]);
        setFluorescencedata([]);
        setPolish([0, 100]);
        setPolishdata([]);
        setSymmetry([0, 100]);
        setSymmetrydata([]);
        setSortby("featured");
        setClearFdata(!clearFdata)
    }
    useEffect(() => {
        setSteps(1);
        setFiltersuccess(false)
        const data = {
            currency_code: currencycode,
            setting_id: JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata'))?.product_id : '',
            diamond_type: diamond_type
        }
        axios.post(base_url + '/diamond/diamond_filter', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setFilter(res.data.data)
                    if (!JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.price.length) {
                        setPrice([res.data.data?.normal_filters?.price?.min, res.data.data?.normal_filters?.price?.max])
                    }
                    if (!JSON.parse(sessionStorage.getItem("rcs_d_filter"))?.carat.length) {
                        setCarat([res.data.data?.normal_filters?.carat?.min, res.data.data?.normal_filters?.carat?.max])
                    }
                    res.data.data?.normal_filters?.shape?.map(val =>
                        (val.selected == 1) ? setShape(val.name) : ""
                    )
                    setFiltersuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [diamond_type])
    useEffect(() => {
        if (window.location.pathname == "/diamonds/lab") {
            setDiamond_type(2);
        } else {
            setDiamond_type(1);
        }
    }, [window.location.pathname])
    useEffect(() => {
        onchangesdata();
    }, [shape, sortby, inputchange, clearFdata]);

    useEffect(() => {
        if (filtersuccess) {
            diamondlistdata();
        }
    }, [page, filtersuccess, diamond_type]);

    const onchangesdata = () => {
        setPage(1)
        var data1 = {
            shape, carat, price, cutdata, colordata, claritydata, fluorescencedata, polishdata, symmetrydata, cut, color, clarity, fluorescence, polish, symmetry, sortby
        }
        sessionStorage.setItem("rcs_d_filter", JSON.stringify(data1));
        // setInterval(async () => {diamondlistdata(); }, 3000);
        // setTimeout(diamondlistdata, 2000);
        if (filtersuccess) {
            diamondlistdata();
        }
    }

    const diamondlistdata = () => {
        setLoader(true);
        var data = {
            currency_code: currencycode,
            start: (page - 1) * 15,
            length: 15,
            cut: cutdata,
            color: colordata,
            clarity: claritydata,
            flourescence: fluorescencedata,
            polish: polishdata,
            symmetry: symmetrydata,
            shape,
            price_to: price[1],
            price_from: price[0],
            carat_from: carat[0],
            carat_to: carat[1],
            sort_by: sortby,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
            diamond_type: diamond_type
        }
        axios.post(base_url + '/diamond/diamond_list', data, {
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
                    setDiamondList(res.data.data?.result)
                    setLoader(false)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const datasort = (obj, min, max) => {
        var data = Object.keys(obj)?.map((key) => [Number(key), obj[key]]);
        var result = []
        var data1 = data.filter(val => val[0] > min && val[0] <= max)?.map(val => result.push(val[1]))
        return result;
    }
    const handlecut = (value) => {
        if (value[0] != value[1]) {
            setCut(value);
            var obj = filter?.normal_filters?.cut
            var data = datasort(obj, value[0], value[1]);
            setCutdata(data)
        }
    }
    const handlecolor = (value) => {
        if (value[0] != value[1]) {
            setColor(value);
            var obj = filter?.normal_filters?.color
            var data = datasort(obj, value[0], value[1]);
            setColordata(data)
        }
    }
    const handleclarity = (value) => {
        if (value[0] != value[1]) {
            setClarity(value);
            var obj = filter?.normal_filters?.clarity
            var data = datasort(obj, value[0], value[1]);
            setClaritydata(data)
        }
    }
    const handlefluorescence = (value) => {
        if (value[0] != value[1]) {
            setFluorescence(value);
            var obj = filter?.advance_filters?.fluorescence
            var data = datasort(obj, value[0], value[1]);
            setFluorescencedata(data)
        }
    }
    const handlePolish = (value) => {
        if (value[0] != value[1]) {
            setPolish(value);
            var obj = filter?.advance_filters?.polish
            var data = datasort(obj, value[0], value[1]);
            setPolishdata(data)
        }
    }
    const handleSymmetry = (value) => {
        if (value[0] != value[1]) {
            setSymmetry(value);
            var obj = filter?.advance_filters?.symmetry
            var data = datasort(obj, value[0], value[1]);
            setSymmetrydata(data)
        }
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
            type: 'diamond',
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/add_to_wishlist', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    const productlist = diamondList?.map(
                        (obj, index) => (index == wishindex ? Object.assign(obj, { is_wishlist: res.data.data?.wishlist_id }) : obj)
                    )
                    setDiamondList(productlist);
                    localStorage.setItem("bw-wishlistlength", res.data.data?.count)
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
    const [expanded, setExpanded] = React.useState(false);
    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{diamond_type == 1 ? 'Natural' : 'Lab'} Diamonds | Belgium WebNet</title>
                <meta name="description" content={diamond_type == 1 ? "Buy natural diamonds at fair prices from us. We are leading sellers of diamonds across the country. Natural Diamonds" : "Lab-grown diamonds are the perfect choice for engagement rings, wedding bands and rings, and fine jewelry. They provide excellent sparkle at a competitive price. | Belgium WebNet"}></meta>
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
                                <Typography color="text.primary">Diamonds</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>

                    <Ringbildermenu location="diamond" />
                    <Row className='w-100 m-auto justify-content-center align-item-center'>
                        <div className='rcs_diamonds_page_top_btn'>
                            <ul className='d-flex justify-content-center align-item-center'>
                                <li><Button variant="outlined" onClick={() => { history.push("/diamonds"); clearFilter(); setDiamond_type(1); }} className={diamond_type == 1 ? 'active' : ''}>Earth-Mined</Button></li>
                                <li><Button variant="outlined" onClick={() => { history.push("/diamonds/lab"); clearFilter(); setDiamond_type(2); }} className={diamond_type == 2 ? 'active' : ''}>Lab-Grown</Button></li>
                            </ul>
                        </div>
                    </Row>
                    <Row className='w-100 m-auto rcs_diamond_filter_section rcs_diamond_filter_section_desktop pr-3'>
                        <Col sm={12} md={6} className='pl-md-0 mt-lg-5 mt-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Shape'>Shape</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <ul className="action-area--soLSw table-align_filter--GVxiB">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            filter?.normal_filters?.shape?.map(val =>
                                                <li data-qa="ShapeFilter-Round" onClick={() => shape == val.name ? setShape('') : setShape(val.name)} className={val.status ? shape == val.name ? "longFilter--VqAB5 item--YBPgi selected--Qs8si" : "longFilter--VqAB5 item--YBPgi" : "longFilter--VqAB5 item--YBPgi diamond-filter-dis"}>
                                                    <span className="single-item-container--Xo5ic">
                                                        <span className="title--jqbwB">{val.name}</span>
                                                        <div className="filtered--yd5Rg"></div>
                                                        <img src={val.icon}></img>
                                                        {/* <span className="icon-round  selectionIcon icon--qAfox"></span> */}
                                                    </span>
                                                </li>
                                            )
                                        }

                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pr-md-0 mt-lg-5 mb-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Cut'>Cut</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <div className='rcs_cut_slider'>
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            <Slider.Range onAfterChange={() => onchangesdata()} min={0} allowCross={false} marks={filter?.normal_filters?.cut} step={null} onChange={handlecut} value={cut} />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pl-md-0 mb-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Color'>Color</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <div className='rcs_color_slider'>
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.normal_filters?.color} step={null} onChange={handlecolor} value={color} />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pr-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Carat'>Carat</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                        <>
                                            <div className='rcs_catat_slider'>
                                                <Range onAfterChange={() => onchangesdata()} min={filter?.normal_filters?.carat?.min} max={filter?.normal_filters?.carat?.max} value={carat} allowCross={false} onChange={handlecarat} step={0.01} tipFormatter={value => `${value}`} />
                                            </div>
                                            <Row className='mt-2'>
                                                <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                    <li>
                                                        <InputGroup>
                                                            {/* <InputGroup.Text>{currency}</InputGroup.Text> */}
                                                            <FormControl aria-label="Amount (to the nearest dollar)"
                                                                type="number"
                                                                step={0.01}
                                                                name="min"
                                                                min={0}
                                                                value={carat[0]}
                                                                onChange={(e) => setCarat([Number(e.target.value), Number(carat[1])])}
                                                                onBlurCapture={() => handlecaratinput(0)}
                                                            />
                                                        </InputGroup>
                                                    </li>
                                                    <li>
                                                        <InputGroup>
                                                            {/* <InputGroup.Text>{currency}</InputGroup.Text> */}
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
                        <Col sm={12} md={6} className='pl-md-0 mb-md-0 mb-5'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Clarity'>Clarity</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    <div className='rcs_color_slider'>
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                            <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.normal_filters?.clarity} step={null} onChange={handleclarity} value={clarity} />
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} className='pr-md-0 mb-4'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={2} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={50} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                        <h2 title='Diamond Price'>Price</h2>
                                    }
                                </Col>
                                <Col xs={12} sm={10} className="p-0">
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={300} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={518} height={42} />} </> :
                                        <>
                                            <div className='rcs_catat_slider'>
                                                <Range onAfterChange={() => onchangesdata()} min={filter?.normal_filters?.price?.min} max={filter?.normal_filters?.price?.max} onChange={handleprice} value={price} tipFormatter={value => `${value}`} allowCross={false} />
                                                {/* <Range allowCross={false} min={0} max={500000} defaultValue={[0, 500000]} /> */}
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
                    <Row className='w-100 m-auto pt-3 rcs_diamond_filter_section d-block d-md-none'>
                        <Col xs={12} className='p-0 rcs_filter_accordion_sec rcs_filter_accordion_sec_diamond'>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><strong>Diamonds Filter</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-5 mt-3'>
                                        <Col sm={12} md={6} className='p-0 mt-3 mb-4'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Shape'>Shape</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-0 mt-2">
                                                    <ul className="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_color_shape">
                                                        {filter?.normal_filters?.shape?.map(val =>
                                                            <li data-qa="ShapeFilter-Round" onClick={() => shape == val.name ? setShape("") : setShape(val.name)} className={val.status ? shape == val.name ? "longFilter--VqAB5 item--YBPgi selected--Qs8si" : "longFilter--VqAB5 item--YBPgi" : "longFilter--VqAB5 item--YBPgi diamond-filter-dis"}>
                                                                <span className="single-item-container--Xo5ic">
                                                                    <span className="title--jqbwB">{val.name}</span>
                                                                    <div className="filtered--yd5Rg"></div>
                                                                    <img src={val.icon}></img>
                                                                    {/* <span className="icon-round  selectionIcon icon--qAfox"></span> */}
                                                                </span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pr-md-0 p-0 mb-md-0 mb-5'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Cut'>Cut</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_cut_slider'>
                                                        <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.normal_filters?.cut} step={null} onChange={handlecut} value={cut} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pl-md-0 p-0 mb-md-0 mb-5'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Color'>Color</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_color_slider'>
                                                        <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.normal_filters?.color} step={null} onChange={handlecolor} value={color} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pr-md-0 p-0 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Carat'>Carat</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_catat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} min={filter?.normal_filters?.carat?.min} max={filter?.normal_filters?.carat?.max} allowCross={false} value={carat} onChange={handlecarat} step={0.01} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <Row className='mt-2'>
                                                        <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                            <li>
                                                                <InputGroup>
                                                                    {/* <InputGroup.Text>{currency}</InputGroup.Text> */}
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
                                                                    {/* <InputGroup.Text>{currency}</InputGroup.Text> */}
                                                                    <FormControl aria-label="Amount (to the nearest dollar)"
                                                                        type="number"
                                                                        step={0.01}
                                                                        name='max'
                                                                        min={0}
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
                                        <Col sm={12} md={6} className='pl-md-0 p-0 mb-md-0 mb-5'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Clarity'>Clarity</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_color_slider'>
                                                        <Slider.Range onAfterChange={() => onchangesdata()} min={0} allowCross={false} marks={filter?.normal_filters?.clarity} step={null} onChange={handleclarity} value={clarity} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm={12} md={6} className='pr-md-0 p-0 mb-3'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={2} className="p-0">
                                                    <h2 title='Diamond Price'>Price</h2>
                                                </Col>
                                                <Col xs={12} sm={10} className="p-md-0 pl-2 pr-2">
                                                    <div className='rcs_catat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} min={filter?.normal_filters?.price?.min} max={filter?.normal_filters?.price?.max} allowCross={false} onChange={handleprice} value={price} tipFormatter={value => `${value}`} />
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
                    <Row className='w-100 m-auto rcs_diamond_filter_section'>
                        <Col xs={12} className='p-0 mb-3 rcs_filter_accordion_sec rcs_filter_accordion_sec_diamond'>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography><strong>Advance Filter</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-5 mt-4'>
                                        <Row className='m-auto w-100 pr-3 mobile_device_pad_none'>
                                            <Col xs={12} sm={12} md={6} lg={12} xl={6} className='mb-5 pl-lg-0 pl-lg-2 pr-sm-2 pl-sm-2'>
                                                <Row className='w-100 m-auto'>
                                                    <Col sm={2} md={12} lg={2} className='p-0 mb-md-3'>
                                                        <h2 title='Diamond Fluorescence'>Fluor</h2>
                                                    </Col>
                                                    <Col sm={10} md={12} lg={10} className='p-md-2 p-0 p-sm-0 p-lg-0'>
                                                        <div className='rcs_fluorescence_slider'>
                                                            <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.advance_filters?.fluorescence} step={null} onChange={handlefluorescence} value={fluorescence} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {/* <Col xs={12} sm={12} md={6} lg={12} xl={6} className='p-lg-0 pr-xl-0 mb-5 pr-sm-2 pl-sm-2'> */}
                                            <Col xs={12} sm={12} md={6} lg={12} xl={6} className='pr-lg-0 pr-xl-0 mb-5 pr-sm-2'>
                                                <Row className='w-100 m-auto'>
                                                    <Col sm={2} md={12} lg={2} className='p-0 mb-md-3'>
                                                        <h2 title='Diamond Polish'>Polish</h2>
                                                    </Col>
                                                    <Col sm={10} md={12} lg={10} className='p-md-2 p-lg-0 p-0'>
                                                        <div className='rcs_cut_slider'>
                                                            <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.advance_filters?.polish} step={null} onChange={handlePolish} value={polish} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} sm={12} md={6} lg={12} xl={6} className='pl-lg-0 pr-sm-2 pl-sm-2'>
                                                <Row className='w-100 m-auto'>
                                                    <Col sm={2} md={12} lg={2} className='p-0 mb-md-3'>
                                                        <h2 title='Diamond Symmetry'>Symmetry</h2>
                                                    </Col>
                                                    <Col sm={10} md={12} lg={10} className='p-md-2 p-0 p-sm-0 p-lg-0'>
                                                        <div className='rcs_cut_slider'>
                                                            <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.advance_filters?.symmetry} step={null} onChange={handleSymmetry} value={symmetry} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Col>
                        <Col xs={12} className='p-0 mb-3'>
                            <Button variant="outlined" onClick={clearFilter} className='rcs_clear_filter'><ReplayIcon /> Clear Filter</Button>
                        </Col>
                    </Row>
                    <Row className='w-100 d-block m-auto'>
                        <Col xs={12} className='p-0'>
                            <div className='rcs_diamond_content'>
                                <h1>Find Diamonds Easily</h1>
                                {diamond_type == 1 ?
                                    <>
                                        <p>The Diamond Search Feature helps you deploy various filters to help you find exactly what you're looking for.</p>
                                        <p>All diamonds are ethically mined and certified.</p>
                                    </> :
                                    <p>The Diamond Search Feature helps you deploy various filters to help you find exactly what you're looking for.</p>
                                }
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
                                <Table aria-label="customized table" className='m-0'>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Shape</StyledTableCell>
                                            <StyledTableCell align="center">Carat</StyledTableCell>
                                            <StyledTableCell align="center">Color</StyledTableCell>
                                            <StyledTableCell align="center">Clarity</StyledTableCell>
                                            <StyledTableCell align="center">Cut</StyledTableCell>
                                            <StyledTableCell align="center">Lab</StyledTableCell>
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
                                            diamondList?.map((row, index) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="center" component="th" scope="row">{row.shape}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.weight}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.color}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.clarity}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.cut_grade}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.lab}</StyledTableCell>
                                                    <StyledTableCell align="center" style={{ fontSize: '15px', fontWeight: '600' }}>{currency}{row.sale_price}</StyledTableCell>
                                                    <StyledTableCell align="center" title="Add to Wishlist" style={{ cursor: 'pointer' }}>{row.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(row, index)} /> : <FavoriteIcon onClick={() => addtowishlist(row, index)} className="animate__animated animate__heartBeat" />}</StyledTableCell>
                                                    <StyledTableCell align="center"><Button onClick={() => history.push("/diamonds-details/" + row.stock_no)} variant="contained">Details</Button></StyledTableCell>
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

export default RingSettingsDiamonds;