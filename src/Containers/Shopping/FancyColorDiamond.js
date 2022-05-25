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

const FancyColorDiamond = (props) => {
    const history = useHistory();
    const [productCount, setProductCount] = useState(0);
    const [page, setPage] = useState(1);
    const [fancycolorlist, setFancyColorList] = useState([]);
    const [stone, setStone] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.stone ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.stone : '');
    const [shape, setShape] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.shape ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.shape : '');
    const [color, setColor] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.color ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.color : '');
    const [fancyImg, setFancyImg] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.img ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.img : "https://showcase.belgiumwebnet.com/webapi/assets/images/fancy_diamond/color/round/yellow.png");
    const [colordata, setColordata] = useState([]);
    const [carat, setCarat] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.carat ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.carat : []);
    const [price, setPrice] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.price ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.price : []);
    const [intensity, setIntensity] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.intensity ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.intensity : [0, 6]);
    const [intensitydata, setIntensitydata] = useState([]);
    const [leavemouse, setLeavemouse] = useState(false);
    const [filter, setFilter] = useState([]);
    const [filtersuccess, setFiltersuccess] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [loader, setLoader] = useState(true);
    const [sortby, setSortby] = useState('featured');
    const [inputchange, setInputchange] = useState(false);
    const [clarity, setClarity] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.clarity ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.clarity : [0, 100]);
    const [claritydata, setClaritydata] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.claritydata ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.claritydata : []);
    const [clearFdata, setClearFdata] = useState(false);

    const clearFilter = () => {
        sessionStorage.removeItem("rcs_f_filter");
        setShape('');
        setCarat([filter?.filters?.carat?.min, filter?.filters?.carat?.max]);
        setPrice([filter?.filters?.price?.min, filter?.filters?.price?.max]);
        setColor('');
        setStone("");
        setSortby("featured");
        setClarity([0, 100]);
        setClaritydata([]);
        setIntensity([0, 6]);
        var newcolor = shape == "" ? filter?.filters?.shape[0]?.subfilter : filter?.filters?.shape?.filter(value => value?.name == 'Round')[0]?.subfilter;
        setColordata(newcolor);
        var newintensity = color == "" ? newcolor[0]?.subfilter : newcolor?.filter(val => val.name == 'Yellow')[0]?.subfilter;
        setIntensitydata(newintensity);
        setClearFdata(!clearFdata);
    }

    useEffect(() => {
        setSteps(0);
        setFiltersuccess(false);
        const data = {
            currency_code: currencycode,
            setting_id: JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata'))?.product_id : ''
        }
        axios.post(base_url + '/diamond/fancy_diamond_filter', data, {
            headers: postHeader
        })
            .then(async res => {
                if (res.data.status == 1) {
                    setFilter(res.data.data)
                    if (!JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.price.length) {
                        setPrice([res.data.data?.filters?.price?.min, res.data.data?.filters?.price?.max])
                    }
                    if (!JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.carat.length) {
                        setCarat([res.data.data?.filters?.carat?.min, res.data.data?.filters?.carat?.max])
                    }

                    res.data.data?.filters?.stone_type?.map(val =>
                        (val.selected == 1) ? setStone(val.name) : ""
                    )
                    var selectedshape = "";
                    var selectedcolor = "";
                    !shape && res.data.data?.filters?.shape?.map(val => {
                        if (val.selected == 1) {
                            selectedshape = val.name;
                            val.subfilter?.map(val2 => {
                                if (val2.selected == 1) {
                                    selectedcolor = val2.name;
                                }
                            }
                            )
                        }
                    }
                    )
                    setShape(selectedshape);
                    setColor(selectedcolor);
                    var newcolor = selectedshape == "" ? res.data.data?.filters?.shape[0]?.subfilter : res.data.data?.filters?.shape?.filter(value => value?.name == selectedshape)[0]?.subfilter;
                    setColordata(newcolor);
                    var newintensity = selectedcolor == "" ? newcolor[0]?.subfilter : newcolor?.filter(val => val.name == selectedcolor)[0]?.subfilter;
                    setIntensitydata(newintensity);
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
            fancylistdata();
        }
    }, [page, filtersuccess]);

    const onchangesdata = () => {
        setPage(1)
        var data1 = {
            shape, carat, price, color, stone, intensity, clarity, sortby, claritydata, img: fancyImg
        }
        sessionStorage.setItem("rcs_f_filter", JSON.stringify(data1));
        if (filtersuccess) {
            fancylistdata();
        }
    }
    const intensitydatasort = (obj, min, max) => {
        var data = Object.keys(obj)?.map((key) => [Number(key), obj[key]]);
        var result = []
        console.log(data)
        var data1 = data.filter(val => val[0] >= min && val[0] < max)?.map(val => result.push(val[1].value))
        return result;
    }
    const fancylistdata = () => {
        setLoader(true);
        var data = {
            currency_code: currencycode,
            start: (page - 1) * 15,
            length: 15,
            fancy_color: color,
            shape,
            clarity: claritydata,
            fancy_intensity: intensitydatasort(intensitydata, intensity[0], intensity[1]),
            price_to: price[1],
            price_from: price[0],
            carat_from: carat[0],
            carat_to: carat[1],
            sort_by: sortby,
            user_id: user.user_id ? user.user_id : "",
            session_id: localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "",
            token: isLogin ? user.token : "",
            diamond_type: 4
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
                    setFancyColorList(res.data.data?.result)
                    setLoader(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleshape = (value) => {
        setShape(value);
        var newcolor = filter?.filters?.shape?.filter(val => val?.name == value)[0]?.subfilter;
        setColordata(newcolor);
        var newintensity = color == "" ? newcolor[0]?.subfilter : newcolor?.filter(val => val.name == color)[0]?.subfilter;
        setIntensitydata(newintensity);
    }
    const handlecolor = (value, img) => {
        setFancyImg(img)
        setColor(value);
        var newintensity = colordata?.filter(val => val.name == value)[0]?.subfilter;
        setIntensitydata(newintensity);
    }
    const handleprice = (value) => {
        setPrice(value);
    }
    const handlepriceinput = (i) => {
        var data = [];
        if (i == 0) {
            if (price[0] < filter?.filters?.price?.min) {
                data = [filter?.filters?.price?.min, price[1]]
            } else if (price[0] > filter?.filters?.price?.max) {
                data = [filter?.filters?.price?.max, price[1]]
            } else {
                data = [price[0], price[1]]
            }
        } else if (i == 1) {
            if (price[1] > filter?.filters?.price?.max) {
                data = [price[0], filter?.filters?.price?.max]
            } else if (price[1] < filter?.filters?.price?.min) {
                data = [price[0], filter?.filters?.price?.min]
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
            if (carat[0] < filter?.filters?.carat?.min) {
                data = [filter?.filters?.carat?.min, carat[1]]
            } else if (carat[0] > filter?.filters?.carat?.max) {
                data = [filter?.filters?.carat?.max, carat[1]]
            } else {
                data = [carat[0], carat[1]]
            }
        } else if (i == 1) {
            if (carat[1] > filter?.filters?.carat?.max) {
                data = [carat[0], filter?.filters?.carat?.max]
            } else if (carat[1] < filter?.filters?.carat?.min) {
                data = [carat[0], filter?.filters?.carat?.min]
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
    const datasort = (obj, min, max) => {
        var data = Object.keys(obj)?.map((key) => [Number(key), obj[key]]);
        var result = []
        var data1 = data.filter(val => val[0] > min && val[0] <= max)?.map(val => result.push(val[1]))
        return result;
    }
    const handleIntensity = (value) => {
        if (value[0] != value[1]) {
            setIntensity(value);
        }
    }
    const handleclarity = (value) => {
        if (value[0] != value[1]) {
            setClarity(value);
            var obj = filter?.filters?.clarity
            var data = datasort(obj, value[0], value[1]);
            setClaritydata(data)
        }
    }
    const handlePageChange = (e, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }
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
                    const productlist = fancycolorlist?.map(
                        (obj, index) => (index == wishindex ? Object.assign(obj, { is_wishlist: res.data.data?.wishlist_id }) : obj)
                    )
                    setFancyColorList(productlist);
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
                <title> Fancy Color Diamonds | Belgium WebNet </title>
                <meta name="description" content="Buy fancy color diamonds at fair prices from us. We are leading sellers of diamonds across the country. Fancy Color Diamonds"></meta>
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
                                <Typography color="text.primary">Fancy Color Diamonds</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Ringbildermenu location="fancycolor" />
                    <Row className='w-100 m-auto rcs_diamond_filter_section rcs_diamond_filter_section_desktop pr-3 pl-3'>
                        <Col sm={12} md={12} lg={6} className='mt-5 mt-md-2 mt-lg-4 mb-1 pr-lg-4 pr-md-0 pl-md-0 mt-xl-1 rcs_fan_color'>
                            <div className="rcs_fancy_color_tite">
                                {!filtersuccess ? <>
                                    {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                    <h2 title='Fancy Color'>Color</h2>
                                }
                            </div>
                            <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_color rcs_fancy_color_ul">
                                {/* {!filtersuccess ? <>
                                    {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </>  */}
                                {!filtersuccess ? <>
                                    {[...Array(10)]?.map(val => isTablet ? <Skeleton variant="text" style={{ transform: 'unset', margin: '0 10px' }} animation="wave" width={80} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset', margin: '0 1px' }} animation="wave" width={90} height={70} />)}
                                </>
                                    :
                                    colordata?.map(val =>
                                        <li data-qa="TypeFilter-BlueSapphire" onClick={() => handlecolor(val.name, val.icon)} className={val.status ? color == val.name ? "item--YBPgi selected--Qs8si2" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                            <div className="rcs_fancy_img">
                                                <img src={val.icon} alt={val.name} class="round_img" />
                                            </div>
                                            <span class="">{val.name}</span>
                                        </li>
                                    )}
                            </ul>
                        </Col>
                        <Col sm={12} md={12} lg={6} className='pl-md-0 pl-lg-4 mt-0 mt-md-2 mt-lg-4 mb-3 pr-md-0 mt-xl-1'>
                            <div className="rcs_fancy_color_tite">
                                {!filtersuccess ? <>
                                    {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                    <h2 title='Fancy Shape'>Shape</h2>
                                }
                            </div>
                            <ul className="action-area--soLSw table-align_filter--GVxiB  rcs_gemstone_color rcs_fancy_color_ul">
                                {!filtersuccess ? <>
                                    {[...Array(10)]?.map(val => isTablet ? <Skeleton variant="text" style={{ transform: 'unset', margin: '0 10px' }} animation="wave" width={80} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset', margin: '0 1px' }} animation="wave" width={90} height={70} />)}
                                </>
                                    :
                                    filter?.filters?.shape?.map(val =>
                                        <li data-qa="ShapeFilter-Round" onClick={() => handleshape(val.name)} className={val.status ? shape == val.name ? "item--YBPgi selected--Qs8si2" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                            <div className="rcs_fancy_img">
                                                <img src={val.icon} alt={val.name} />
                                            </div>
                                            <span class="">{val.name}</span>
                                        </li>
                                    )}
                            </ul>
                        </Col>
                        <Col sm={12} md={6} lg={6} className='mb-3 mb-md-2 pl-0 pr-lg-4 pr-md-0 mt-md-2 mb-xl-1 pr-md-2'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={12} className="pl-0">
                                    <div className="rcs_intensity_tite ">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                            <h2 title='Fancy Intensity'>Intensity</h2>}
                                    </div>
                                    <div className='rcs_intensity_slider'>
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={600} height={25} />} </> :
                                            <Range onAfterChange={() => onchangesdata()} allowCross={false} step={1} min={0} max={6} onChange={handleIntensity} value={intensity} className={color?.length ? (color)?.toLowerCase() : 'yellow'} ></Range>}
                                        <div className="rcs_intensity_slider_img">
                                            <ul>
                                                {!filtersuccess ? <>
                                                    {[...Array(6)]?.map(val => isTablet ? <Skeleton variant="text" style={{ transform: 'unset', margin: '0 10px' }} animation="wave" width={80} height={35} /> : <Skeleton variant="text" style={{ transform: 'unset', margin: '0 1px' }} animation="wave" width={90} height={70} />)}
                                                </>
                                                    :
                                                    intensitydata?.map((val, index) =>
                                                        <li className={index < intensity[0] || (index + 1) > intensity[1] ? 'rcs_intensity_opc_low' : 'rcs_intensity_opc_high'}>
                                                            <div className="rcs_intensity_slider_img_d">
                                                                <img src={val.icon} alt={val.name} />
                                                            </div>
                                                            <div className="rcs_intensity_slider_text">
                                                                <p>{val.name}</p>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} lg={6} className='pr-md-0 mb-lg-4 mb-md-3 p-0 pl-lg-4 pl-md-0 mt-md-2 mb-xl-1 pl-md-2' >
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={12} className="pl-0">
                                    <div className="rcs_fancy_carat_tite ">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                            <h2 title='Fancy Carat'>Carat</h2>
                                        }
                                    </div>
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                        <>
                                            <div className='rcs_carat_slider'>
                                                <Range onAfterChange={() => onchangesdata()} step={0.01} allowCross={false} min={filter?.filters?.carat?.min} max={filter?.filters?.carat?.max} value={carat} onChange={handlecarat} tipFormatter={value => `${value}`} />
                                            </div>
                                            <Row className='mt-2'>
                                                <ul className='rcs_price_range_input rcs_prince_input_diamond rcs_prince_input_diamond1'>
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
                        <Col sm={12} md={6} lg={6} className='mb-3 pl-0 pl-0 mt-lg-3 mt-md-2 mb-lg-3 pr-lg-4 pr-md-0 pr-md-2'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={12} className="pl-0">
                                    <div className="rcs_fancy_carat_tite ">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                            <h2 title='Fancy Clarity'>Clarity </h2>
                                        }
                                    </div>
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                        <>
                                            <div className='rcs_clarity_slider'>
                                                <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.filters?.clarity} step={null} onChange={handleclarity} value={clarity} />                                            </div>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={6} lg={6} className='pr-md-0 pl-lg-4 pl-md-0 mb-3 mt-lg-3 mt-md-2 mt-md-2 pl-md-2'>
                            <Row className='w-100 m-auto'>
                                <Col xs={12} sm={12} className="pl-0">
                                    <div className="rcs_fancy_carat_tite ">
                                        {!filtersuccess ? <>
                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset', marginBottom: "10px", }} animation="wave" width={90} height={42} />} </> :
                                            <h2 title='Fancy Price'>Price</h2>
                                        }
                                    </div>
                                    {!filtersuccess ? <>
                                        {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                        <>
                                            <div className='rcs_price_slider'>
                                                <Range onAfterChange={() => onchangesdata()} allowCross={false} step={1} min={filter?.filters?.price?.min} max={filter?.filters?.price?.max} onChange={handleprice} value={price} tipFormatter={value => `${value}`} />
                                            </div>
                                            <Row className='mt-2'>
                                                <ul className='rcs_price_range_input rcs_prince_input_diamond rcs_prince_input_diamond1'>
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
                                    <Typography><strong>Color and Intensity</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-2 mb-xs-0 mt-1'>
                                        <Col sm={12} md={6} className='p-0'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={12} className="p-0">
                                                    <ul class="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_shape1 rcs_fancy_color_mobile">
                                                        {colordata?.map(val =>
                                                            <li data-qa="TypeFilter-BlueSapphire" onClick={() => handlecolor(val.name, val.icon)} className={val.status ? color == val.name ? "item--YBPgi selected--Qs8si2" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                                <div className="rcs_fancy_img">
                                                                    <img src={val.icon} alt={val.name} class="round_img" />
                                                                </div>
                                                                <span class="">{val.name}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col xs={12} sm={12} className="pl-0 mt-3 mb-4">
                                            <div className="rcs_intensity_tite ">
                                                <h2 title='Fancy Clarity'>Intensity</h2>
                                            </div>
                                            <div className='rcs_intensity_slider'>
                                                <Range onAfterChange={() => onchangesdata()} allowCross={false} step={1} min={0} max={6} onChange={handleIntensity} value={intensity} className={color?.length ? (color)?.toLowerCase() : 'yellow'} ></Range>
                                                <div className="rcs_intensity_slider_img">
                                                    <ul>
                                                        {intensitydata?.map((val, index) =>
                                                            <li className={index < intensity[0] || (index + 1) > intensity[1] ? 'rcs_intensity_opc_low' : 'rcs_intensity_opc_high'}>
                                                                <div className="rcs_intensity_slider_img_d">
                                                                    <img src={val.icon} alt={val.name} />
                                                                </div>
                                                                <div className="rcs_intensity_slider_text">
                                                                    <p>{val.name}</p>
                                                                </div>
                                                            </li>
                                                        )
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
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
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><strong>Can be set with</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-2 mb-xs-0 mt-1'>
                                        <Col sm={12} md={6} className='p-0'>
                                            <Row className='w-100 m-auto'>
                                                <Col xs={12} sm={12} className="p-0">
                                                    {/* <ul className="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_shape1 rcs_fancy_color_shape_mobile">
                                                        {!filtersuccess ? <>
                                                            {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                                            filter?.filters?.shape?.map(val =>
                                                                <li data-qa="ShapeFilter-Round" onClick={() => handleshape(val.name)} className={val.status ? shape == val.name ? "item--YBPgi selected--Qs8si2" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                                    <div className="rcs_fancy_img">

                                                                        <img src={val.icon} alt={val.name} />
                                                                    </div>
                                                                    <span class="">{val.name}</span>
                                                                </li>
                                                            )}
                                                    </ul> */}
                                                    <ul className="action-area--soLSw table-align_filter--GVxiB rcs_gemstone_shape1 rcs_fancy_color_shape_mobile">
                                                        {filter?.filters?.shape?.map(val =>
                                                            <li data-qa="ShapeFilter-Round" onClick={() => handleshape(val.name)} className={val.status ? shape == val.name ? "item--YBPgi selected--Qs8si2" : "item--YBPgi" : "item--YBPgi diamond-filter-dis"}>
                                                                <div className="rcs_fancy_img">
                                                                    <img src={val.icon} alt={val.name} />
                                                                </div>
                                                                <span class="">{val.name}</span>
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
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
                                <AccordionSummary
                                    style={{ width: "100%" }}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography><strong>Advance Filter</strong></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='pt-0 pb-0'>
                                    <Typography className='mb-2 mt-4'>

                                        <Col xs={12} sm={12} className="pl-0 mt-4">
                                            <div className="rcs_fancy_carat_tite ">
                                                {!filtersuccess ? <>
                                                    {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                                    <h2 title='Fancy Carat'>Carat</h2>
                                                }
                                            </div>
                                            {!filtersuccess ? <>
                                                {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                                <>
                                                    {/* <div className='rcs_carat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} step={0.01} allowCross={false} min={filter?.normal_filters?.carat?.min} max={filter?.normal_filters?.carat?.max} value={carat} onChange={handlecarat} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <ul className='rcs_price_range_input rcs_prince_input_diamond'>
                                                        <li>
                                                            <InputGroup>
                                                                <FormControl aria-label="Amount (to the nearest dollar)"
                                                                    type="int"
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
                                                                    type="int"
                                                                    name='max'
                                                                    value={carat[1]}
                                                                    onChange={(e) => setCarat([Number(carat[0]), Number(e.target.value)])}
                                                                    onBlurCapture={() => handlecaratinput(1)}
                                                                />
                                                            </InputGroup>
                                                        </li>
                                                    </ul> */}
                                                    <div className='rcs_carat_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} step={0.01} allowCross={false} min={filter?.filters?.carat?.min} max={filter?.filters?.carat?.max} value={carat} onChange={handlecarat} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <ul className='rcs_price_range_input rcs_prince_input_diamond rcs_prince_input_diamond1'>
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
                                                </>
                                            }
                                        </Col>
                                        <Col xs={12} sm={12} className="pl-0 mt-4">
                                            <div className="rcs_fancy_carat_tite ">
                                                <h2 title='Fancy Clarity'>Clarity </h2>
                                            </div>
                                            <div className='rcs_clarity_slider'>
                                                <Slider.Range onAfterChange={() => onchangesdata()} allowCross={false} min={0} marks={filter?.filters?.clarity} step={null} onChange={handleclarity} value={clarity} />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} className="pl-0 mt-4">
                                            <div className="rcs_fancy_carat_tite ">
                                                {!filtersuccess ? <>
                                                    {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={42} />} </> :
                                                    <h2 title='Fancy Price'>Price</h2>
                                                }
                                            </div>
                                            {!filtersuccess ? <>
                                                {isTablet ? <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={90} height={50} /> : <Skeleton variant="text" style={{ transform: 'unset' }} animation="wave" width={600} height={42} />} </> :
                                                <>
                                                    <div className='rcs_price_slider'>
                                                        <Range onAfterChange={() => onchangesdata()} allowCross={false} step={1} min={filter?.filters?.price?.min} max={filter?.filters?.price?.max} onChange={handleprice} value={price} tipFormatter={value => `${value}`} />
                                                    </div>
                                                    <ul className='rcs_price_range_input rcs_prince_input_diamond rcs_prince_input_diamond1'>
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
                                                </>
                                            }
                                        </Col>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Col>
                    </Row>
                    <Row className='w-100 m-0'>
                        <Col xs={12} className='p-0 mb-3 mt-4'>
                            <Button variant="outlined" onClick={clearFilter} className='rcs_clear_filter'><ReplayIcon /> Clear Filter</Button>
                        </Col>
                    </Row>
                    <Row className='w-100 d-block m-auto'>
                        <Col xs={12} className='p-0'>
                            <div className='rcs_diamond_content'>
                                <h1>Find Diamonds Easily</h1>
                                <p>The Diamond Search Feature helps you deploy various filters to help you find exactly what you're looking for.</p>
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
                                            <StyledTableCell align="center">Shape</StyledTableCell>
                                            <StyledTableCell align="center">Intensity</StyledTableCell>
                                            <StyledTableCell align="center">Carat</StyledTableCell>
                                            <StyledTableCell align="center">Color</StyledTableCell>
                                            <StyledTableCell align="center">Clarity</StyledTableCell>
                                            <StyledTableCell align="center">Price</StyledTableCell>
                                            <StyledTableCell align="center">Wishlist</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loader ? <>
                                            {[...Array(15)]?.map(val =>
                                                <StyledTableRow>
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
                                            fancycolorlist?.map((row, index) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="center" component="th" scope="row">{row.shape}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.fancy_color_intensity}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.weight}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.color}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.clarity}</StyledTableCell>
                                                    <StyledTableCell align="center" style={{ fontSize: '15px', fontWeight: '600' }}>{currency}{row.sale_price}</StyledTableCell>
                                                    <StyledTableCell align="center" title="Add to Wishlist" style={{ cursor: 'pointer' }}>{row.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(row, index)} /> : <FavoriteIcon onClick={() => addtowishlist(row, index)} className="animate__animated animate__heartBeat" />}</StyledTableCell>
                                                    {/* <StyledTableCell align="center"><button class="rcs_wish_btn rcs_wish_btn_desktop">{val.is_wishlist == "0" ? <FavoriteBorderIcon onClick={() => addtowishlist(val, index)} /> : <FavoriteIcon onClick={() => addtowishlist(val, index)} className="animate__animated animate__heartBeat" />}</button></StyledTableCell> */}
                                                    <StyledTableCell align="center"><Button onClick={() => history.push("/fancy-color-diamond-detail/" + row.stock_no)} variant="contained">Details</Button></StyledTableCell>
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

export default FancyColorDiamond;