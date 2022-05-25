import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Form, Dropdown, Modal } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../../Assets/css/header.css';
import logoImage from '../../Assets/images/logo.png';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Login from '../../Components/Login';
import { useHistory } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import menuImages from "../../Assets/images/menu.png";
import { base_url, currency, isLogin } from '../../Helpers/request';
import { isMobileOnly, isTablet } from 'react-device-detect';
import { SlideDown } from 'react-slidedown';
import "../../../node_modules/react-slidedown/lib/slidedown.css";
import axios from 'axios';
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiHeart } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import Heart1 from "../../Assets/images/heart1.png";
import Heart2 from "../../Assets/images/heart2.gif";
import Cart1 from "../../Assets/images/bag1.png";
import Cart2 from "../../Assets/images/bag2.gif";
import Magnify0 from "../../Assets/images/search1.png";
import Magnify1 from "../../Assets/images/magnify2.gif";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Header = ({ menudata, currencydata }) => {
    const history = useHistory();
    const [isScrollValueMoreThanHeaderHeight, setIsScrollValueMoreThanHeaderHeight] = useState(false);
    const [dropdown, setDropdown] = useState({
        img: localStorage.getItem("bw-currency_img"),
        icon: localStorage.getItem("bw-currencyicon"),
        code: localStorage.getItem("bw-currency")
    });
    const [topHeader, setTopHeader] = useState(true);
    const [left, setLeft] = useState(false);
    const [hover, setHover] = useState(false);
    const [hoverindex, setHoverindex] = useState(false);
    const [cartlength, setCartlength] = useState(localStorage.getItem("bw-addtocartlength") ? localStorage.getItem("bw-addtocartlength") : 0);
    const [wishlistlength, setWishlistlength] = useState(localStorage.getItem("bw-wishlistlength") ? localStorage.getItem("bw-wishlistlength") : 0);
    const [search_text, setSearch_text] = useState('');
    const [search_show, setSearch_show] = useState(false);
    const [wishover, setWishover] = useState(false);
    const [carthover, setCarthover] = useState(false);
    const [searchhover, setSearchhover] = useState(false);
    const toggleDrawer = (open) => {
        setLeft(open);
    };
    const classes = useStyles();
    useEffect(() => {
        setInterval(() => { setCartlength(localStorage.getItem("bw-addtocartlength") ? localStorage.getItem("bw-addtocartlength") : 0); setWishlistlength(localStorage.getItem("bw-wishlistlength") ? localStorage.getItem("bw-wishlistlength") : 0) }, 1000);
        const handleScroll = () => {
            setIsScrollValueMoreThanHeaderHeight(window.scrollY > 15);
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    //----------------------------------Currency Api

    const currencyHandle = async (code, img, icon) => {
        var session_id = localStorage.getItem('bw-session-id') ? localStorage.getItem('bw-session-id') : ""
        setDropdown({ img: img, icon: icon, code: code });
        localStorage.removeItem('bw-fancycolordata');
        localStorage.removeItem('bw-gemstonedata');
        localStorage.removeItem('bw-diamonddata');
        localStorage.removeItem('bw-settingdata');
        sessionStorage.clear();
        localStorage.setItem("bw-currency", code);
        localStorage.setItem("bw-currency_img", img);
        localStorage.setItem("bw-currencyicon", icon);
        if (window.location.pathname == "/complete-diamond-ring") {
            history.push("/diamonds")
        } else if (window.location.pathname == "/complete-gemstone-ring") {
            history.push("/gemstones")
        } else if (window.location.pathname == "/complete-fancycolor-ring") {
            history.push("/fancy-color-diamond")
        }
        window.location.reload();
    }
    return (
        <>
            <div className="rcs_header_seaction" id="rcs_header_seaction">
                {/* <div className="rcs_header_seaction" id="rcs_header_seaction"> */}
                {/* Top Header Section */}
                {topHeader ?
                    <div className="rcs_top_header">
                        <Container className='rcs_custom_home_container'>
                            <div className="rcs_top_head_content">
                                <Row className="w-100 m-auto">
                                    <Col xs={12} md={3} lg={4} className='p-0'>
                                        <div className='rcs_top_head_content_left'>
                                            <ul>
                                                {isTablet ? <li onClick={(e) => { window.location.href = `tel:+16469929024` }}><span><BsTelephone /></span> +1 (646) 992-9024  </li> : ''}
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} lg={4} className='p-0'>
                                        <p>This is a Demo website for showcase purpose only!</p>
                                    </Col>
                                    <Col xs={12} md={3} lg={4} className='p-0'>
                                        <div className='rcs_top_head_content_right'>
                                            <ul>
                                                {isTablet ? '' : <li onClick={(e) => { window.location.href = `tel:+16469929024` }}><span><BsTelephone /></span> +1 (646) 992-9024  </li>}
                                                <li onClick={(e) => { window.location.href = `mailto:info@belgiumwebnet.com` }}><span><BsEnvelope /></span> info@belgiumwebnet.com  </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </div> : ""}
                {/* Top Header Section */}
                <div className={isScrollValueMoreThanHeaderHeight ? "rcs_logo_head rcs_sticky-top sticky-top" : "rcs_logo_head"}>
                    {/* Header Section */}
                    <div className="rcs_header">
                        <Container className="rcs_custom_home_container p-0">
                            <Row className="w-100 m-auto">
                                <Col sm={12} md={12} lg={2} xl={2} xs={12} className="rcs_large_Tab">
                                    <Nav className="m-auto rcs_mobile_header_menu">
                                        <Image onClick={() => toggleDrawer(true)} src={menuImages} alt="menu icon" width="30px"></Image>
                                    </Nav>
                                    <div className="rcs_logo_section">
                                        {/* <NavLink to="/"> */}
                                        <Image onClick={() => history.push('/')} src={logoImage} alt="Belgium Webnet"></Image>
                                        {/* </NavLink> */}
                                    </div>
                                    <div className="rcs_right_side rcs_right_side_mobile1 d-lg-none">
                                        <ul>
                                            <li className='rcs_currency'>
                                                <Dropdown className="d-inline rcs_dropdown_lang">
                                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                                        <Image src={dropdown?.img} alt={dropdown?.code} style={{ width: "25px" }}></Image> <span>{dropdown?.code}</span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {currencydata.map(val =>
                                                            <Dropdown.Item onClick={() => { currencyHandle(val.currency_code, val.country_flag, val.currency_icon) }} href="#"><Image src={val.country_flag} alt={val.currency_code}></Image><span>  {val.currency_code}</span></Dropdown.Item>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </li>
                                            <li><BiSearch onClick={() => setSearch_show(!search_show)} />

                                            </li>
                                            <li><Login /></li>
                                            <li onClick={() => isLogin ? history.push('/account/wishlist') : history.push('/wishlist')}><BiHeart className='rcs_cart_mobile_icon1' />   {wishlistlength && wishlistlength != '0' ? <span className="rcs_wish_badge">{wishlistlength}</span> : ''} </li>
                                            <li onClick={() => { history.push('/cart'); }}><MdOutlineShoppingBag className='rcs_cart_mobile_icon' /> {cartlength && cartlength != '0' ? <span className="rcs_cart_badge">{cartlength}</span> : ''} </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col sm={12} md={12} lg={8} xs={12} className="rcs_large_Tab1">
                                    {/* Menu Section */}
                                    <div className="rcs_menu">
                                        <Container className='rcs_custome_container1'>
                                            <Row>
                                                <nav id="rcs_menu_header_top">
                                                    <ul className="rcs_header_menu">
                                                        {menudata?.map((value, index) =>
                                                            <li className='rcs_top_header_menu' onMouseOver={() => { setHover(true); setHoverindex(index) }} onMouseLeave={() => setHover(false)} >
                                                                <h6 ><NavLink to={'/' + value?.slug}>{value?.name} <br /><span>{value?.name}</span></NavLink></h6>
                                                                {/* {value?.submenu?.length && !value?.name?.includes("About") ?
                                                                    <ul className='rsc_mega_menu_ul rsc_mega_menu_ul1'>
                                                                        <li className='rsc_mega_menu_li'>
                                                                            <div className="rcs_dropdown_menu">
                                                                                <Container fluid className="p-0">
                                                                                    <Row className="m-0 w-100">
                                                                                        <div className="rcs_dropdown_cotnent">
                                                                                            <Container className="rcs_customer_container1 rcs_dropdown_inner_cotnainer">
                                                                                                <Row className="m-0 w-100">
                                                                                                    {value?.submenu?.map(val =>
                                                                                                        <Col md={3}>
                                                                                                            <div className="rcs_inner_dropdown_menu">
                                                                                                                <Image src={val.img_url} alt={val.alt_tag}></Image>
                                                                                                                <h2>{val.name}</h2>
                                                                                                                <SlideDown className={'my-dropdown-slidedown'}>
                                                                                                                    <ul>
                                                                                                                        {val?.submenu?.map(val1 =>
                                                                                                                            <li><span><NavLink to={'/' + val1?.slug}>{val1.name}</NavLink></span></li>
                                                                                                                        )}
                                                                                                                    </ul>
                                                                                                                </SlideDown>
                                                                                                            </div>
                                                                                                        </Col>
                                                                                                    )}
                                                                                                </Row>
                                                                                            </Container>
                                                                                        </div>
                                                                                    </Row>
                                                                                </Container>
                                                                            </div>
                                                                        </li>
                                                                    </ul> : */}

                                                                {/* {value?.submenu?.length && hover ? <div className='mask-overly' ></div> : ""}                             */}
                                                                <ul className='rcs_top_header_menu_dropdown' onMouseOver={() => { setHover(true); setHoverindex(index) }} onMouseLeave={() => setHover(false)} >
                                                                    {value?.submenu?.map(val =>
                                                                        <li className="dir rcs_top_header_menu1"><span><NavLink to={'/' + val?.slug}>{val.name}</NavLink></span></li>
                                                                    )}
                                                                </ul>
                                                                {/* } */}
                                                            </li>
                                                        )}
                                                    </ul>
                                                </nav>
                                            </Row>
                                        </Container>
                                    </div>
                                    {/* menu Section */}
                                </Col>
                                <Col sm={12} md={12} lg={2} xs={12} className="rcs_large_Tab1">
                                    <div className="rcs_right_side rcs_right_side_mobile d-none d-lg-block">
                                        <ul>
                                            <li className="d-none d-lg-block" onClickAway={() => setSearch_show(false)}>
                                                <img onClick={() => setSearch_show(!search_show)} onMouseOver={() => setSearchhover(true)} onMouseLeave={() => setSearchhover(false)} className='rcs_wishlist_icon' src={searchhover ? Magnify1 : Magnify0} />
                                                <Modal className={isScrollValueMoreThanHeaderHeight ? "rcs_search_modal12" : "rcs_search_modal"} show={search_show} onHide={() => setSearch_show(false)}>
                                                    <div className="rcs_search_bar">
                                                        <Form onSubmit={(e) => { e.preventDefault(); history.push('/search/' + search_text); window.scrollTo(0, 0); setSearch_text(""); setSearch_show(false); }}>
                                                            <SearchIcon onClick={(e) => { history.push('/search/' + search_text); setSearch_text(""); setSearch_show(false); }} />
                                                            <Form.Control type="text"
                                                                placeholder="Search for.."
                                                                value={search_text}
                                                                onChange={(e) => setSearch_text(e.target.value)}
                                                            />
                                                            <AiOutlineClose onClick={() => setSearch_show(!search_show)} />

                                                        </Form>
                                                    </div>
                                                </Modal>
                                            </li>
                                            <li className="d-none d-lg-block" ><Login /></li>
                                            <li className="d-none d-lg-block" onClick={() => isLogin ? history.push('/account/wishlist') : history.push('/wishlist')}> <img onMouseOver={() => setWishover(true)} onMouseLeave={() => setWishover(false)} className='rcs_wishlist_icon' src={wishover ? Heart2 : Heart1} /> {wishlistlength && wishlistlength != '0' ? <span className="rcs_wish_badge">{wishlistlength}</span> : ''} </li>
                                            <li className="d-none d-lg-block" onClick={() => { history.push('/cart'); }}><img onMouseOver={() => setCarthover(true)} onMouseLeave={() => setCarthover(false)} className='rcs_wishlist_icon' src={carthover ? Cart2 : Cart1} />  {cartlength && cartlength != '0' ? <span className="rcs_cart_badge">{cartlength}</span> : ''} </li>
                                            <li className="d-none d-lg-block" >
                                                <Dropdown className="d-inline rcs_dropdown_lang">
                                                    <Dropdown.Toggle id="dropdown-autoclose-true">
                                                        <Image src={dropdown?.img} style={{ width: "25px" }}></Image> <span>{dropdown?.code}</span>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        {currencydata.map(val =>
                                                            <Dropdown.Item onClick={() => { currencyHandle(val.currency_code, val.country_flag, val.currency_icon) }} href="#"><Image src={val.country_flag} alt={val.currency_code}></Image><span>  {val.currency_code}</span></Dropdown.Item>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* Header Section */}


                </div>
                {/* Mobile Menu Section */}
                <div className="rcs_menu_mobile d-none">
                    <Container>
                        <Row>
                            <Drawer anchor="left" open={left} onClose={() => toggleDrawer(false)}>
                                <div
                                    role="presentation"
                                    onKeyDown={() => toggleDrawer(false)}
                                >
                                    <div className="rcs_mobile_menu ">
                                        <div className='rcs_mobile_currency'>
                                            <Dropdown className="d-inline rcs_dropdown_lang">
                                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                                    <Image src={dropdown?.img} style={{ width: "25px" }}></Image> <span>{dropdown?.code}</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {currencydata.map(val =>
                                                        <Dropdown.Item onClick={() => { currencyHandle(val.currency_code, val.country_flag, val.currency_icon) }} href="#"><Image src={val.country_flag} alt={val.currency_code}></Image><span>  {val.currency_code}</span></Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <div className={classes.root}>
                                            {menudata?.map(value =>
                                                <Accordion>
                                                    {value?.submenu?.length > 0 ?
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography className={classes.heading} onClick={() => { toggleDrawer(false); history.push('/' + value?.slug) }}>{value?.name}</Typography>
                                                        </AccordionSummary> :
                                                        <AccordionDetails className="rcs_mobile_inner_menu2">
                                                            <Typography onClick={() => { toggleDrawer(false); history.push('/' + value?.slug) }}>
                                                                {value.name}
                                                            </Typography>
                                                        </AccordionDetails>}
                                                    {value?.submenu?.length > 0 ?
                                                        value?.submenu?.map(val =>
                                                            <AccordionDetails className={val?.submenu?.length ? "rcs_mobile_inner_menu" : "rcs_mobile_inner_menu1"}>
                                                                {val?.submenu?.length == 0 ?
                                                                    <Typography onClick={() => { toggleDrawer(false); history.push('/' + val?.slug) }}>{val.name}</Typography> :
                                                                    <Accordion >
                                                                        <AccordionSummary
                                                                            expandIcon={<ExpandMoreIcon />}
                                                                            aria-controls="panel1a-content"
                                                                            id="panel1a-header"
                                                                        >
                                                                            <Typography onClick={() => { toggleDrawer(false); history.push('/' + val?.slug) }} className={classes.heading}>{val.name}</Typography>
                                                                        </AccordionSummary>
                                                                        {val?.submenu?.map(val1 =>
                                                                            <AccordionDetails className="rcs_mobile_inner_menu1">
                                                                                <Typography onClick={() => { toggleDrawer(false); history.push('/' + val1?.slug) }}>
                                                                                    {val1.name}
                                                                                </Typography>
                                                                            </AccordionDetails>)}
                                                                    </Accordion>
                                                                }
                                                            </AccordionDetails>
                                                        ) : ""}
                                                </Accordion>
                                            )}
                                            {isMobileOnly ?
                                                <>
                                                    <div className="rcs_extra_link">
                                                        <NavLink to={isLogin ? "/account/wishlist" : "/wishlist"}><span onClick={() => { setLeft(false) }}>Wish List</span></NavLink>
                                                    </div>
                                                    <div className="rcs_extra_link text-center contact-section mobile_contact">
                                                        <p> Contact us </p>
                                                        <ul>
                                                            <li class="rcs_circle">
                                                                <NavLink to="#" onClick={() => { window.open('https://wa.me/+16469929024', '_blank') }} >
                                                                    <i class="fa fa-comment"></i>
                                                                    <p>Chat</p>
                                                                </NavLink>
                                                            </li>
                                                            <li class="rcs_circle">
                                                                <NavLink to="#" onClick={(e) => { window.location.href = `tel:+16469929024` }}>
                                                                    <i class="fa fa-phone"></i>
                                                                    <p>Call</p>
                                                                </NavLink></li>
                                                            <li class="rcs_circle">
                                                                <NavLink to="#" onClick={(e) => { window.location.href = `mailto:info@belgiumwebnet.net` }}>
                                                                    <i class="fa fa-envelope"></i>
                                                                    <p>Email</p>
                                                                </NavLink></li>
                                                            <li class="rcs_circle">
                                                                <NavLink to="/contact" onClick={() => toggleDrawer(false)}><i class="fa fa-address-book"></i>
                                                                    <p>Contact</p>
                                                                </NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </Drawer>
                        </Row>
                    </Container>
                </div>
                {/* Mobile Menu Section */}
            </div>
        </>
    )
}
export default Header;