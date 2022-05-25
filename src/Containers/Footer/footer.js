import React, { useState } from 'react';
import { Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import '../../Assets/css/footer.css';
import BwLogo from '../../Assets/images/home/bw-logo-footer.png';
import { Link, NavLink } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaFacebookSquare } from "react-icons/fa";
import { FaPinterestSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { RiFacebookBoxFill, RiTwitterFill, RiInstagramLine, RiLinkedinBoxFill } from "react-icons/ri";
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Iframe from 'react-iframe'
import rapnet from '../../Assets/images/home/rapnet.png';
import overnight from '../../Assets/images/home/overnight-logo.png';
import vdb from '../../Assets/images/home/vdb.png';
import ivouch from '../../Assets/images/home/ivouch.png';
import yelp from '../../Assets/images/home/yelp-logo.png';
import google from '../../Assets/images/home/google.png';
import paypal from '../../Assets/images/home/paypal.png';
import whatsapp from '../../Assets/images/static/Social/8.png'

const Footer = ({ currencydata }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [age, setAge] = React.useState('');
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const [dropdown, setDropdown] = useState({
    img: localStorage.getItem("bw-currency_img"),
    icon: localStorage.getItem("bw-currencyicon"),
    code: localStorage.getItem("bw-currency")
  });
  const currencyHandle = (code, img, icon) => {
    setDropdown({ img: img, icon: icon, code: code });
    localStorage.setItem("bw-currency", code);
    localStorage.setItem("bw-currency_img", img);
    localStorage.setItem("bw-currencyicon", icon);
    window.location.reload();
  }

  return (
    <>
      <div className="rcs_footer" id="rcs_footer">
        <Container className="rcs_custom_home_container">
          <div className='d-none d-lg-block'>
            <Row className='justify-content-center'>
              <Col xs={12} sm={6} md={12} lg={3}>
                <div className='rcs_footer_content_one '>
                  <div className="logo">
                    <NavLink to="/"><Image src={BwLogo} alt="Belgium Webnet" /></NavLink>
                  </div>
                  <p> Belgium WebNet in the field of the Diamond industry with an experience of over 25 years. We revolutionized the industry with a disruptive online business model. <NavLink to="/our-story">Read More</NavLink></p>
                </div>
                <div className="rcs_footer_content_one_social_icn">
                  <ul>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/" onClick={() => window.open("https://www.facebook.com/belgiumwebnet/", "_blank")}>  <RiFacebookBoxFill /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/" onClick={() => window.open("https://twitter.com/belgiumwebnet", "_blank")}>   <RiTwitterFill /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/" onClick={() => window.open("https://www.instagram.com/belgium_webnet/", "_blank")}>    <RiInstagramLine /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/" onClick={() => window.open("https://www.linkedin.com/company/belgium-webnet/", "_blank")}>  <RiLinkedinBoxFill /> </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={2}>
                <div className='rcs_footer_content rcs_info'>
                  <h2 className='mb-3'>Information</h2>
                  <ul className='rcs_footer_list'>
                    <li><NavLink to="/our-story">About Us</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/education">Education</NavLink></li>
                    <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                    <li><NavLink to="/terms-and-conditions">Terms & Condition</NavLink></li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={2}>
                <div className='rcs_footer_content rcs_info'>
                  <h2 className='mb-3'>Collection</h2>
                  <ul className='rcs_footer_list'>
                    <li><NavLink to="/jewelry/fashion-rings">Rings</NavLink></li>
                    <li><NavLink to="/jewelry/necklaces">Necklaces</NavLink></li>
                    <li><NavLink to="/jewelry/earrings">Earrings</NavLink></li>
                    <li><NavLink to="/jewelry/pendants">Pendants</NavLink></li>
                    <li><NavLink to="/jewelry/bracelets">Bracelets</NavLink></li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={2}>
                <div className='rcs_footer_content'>
                  <h2 className='mb-3'>Get in Touch</h2>
                  <ul className='rcs_footer_list'>
                    <p>Address: </p>
                    <li onClick={() => { window.open('https://www.google.com/maps/dir//20+W+47th+St+%23601,+New+York,+NY+10036,+USA/@40.7570155,-74.0148537,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c258fe544d7d25:0xeb7d6ed406a3793e!2m2!1d-73.9798343!2d40.7569558', '_blank') }}>20 W 47th St, Suite 601
                      <br /> New York, NY 10036</li>
                    <p>Phone: </p>
                    <li onClick={(e) => { window.location.href = `tel:+16469929024` }}>+1 (646) 992-9024</li>
                    <p>Email: </p>
                    <li className="pb-1" onClick={(e) => { window.location.href = `mailto:info@belgiumwebnet.net` }}>info@belgiumwebnet.com</li>
                    <li onClick={(e) => { window.location.href = `mailto:sales@belgiumwebnet.net` }}>sales@belgiumwebnet.com</li>
                  </ul>
                </div>
              </Col>

              <Col xs={12} sm={6} md={6} lg={2}>
                <div className='rcs_footer_content'>
                  <h2 className='mb-3'>Help</h2>
                  <ul className='rcs_footer_list'>
                    <li><NavLink to="/faq">FAQ’s</NavLink></li>
                    <li><NavLink to="/contact">Contact Us</NavLink></li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Container className="rcs_custom_home_container">
              <Row>
                <Col xs={12} lg={12} className="m-auto">
                  <div className="rcs_footer_logo_main">
                    <ul>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.rapnet.com/", "_blank")}> <Image src={rapnet} alt="Rapnet" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.overnightmountings.com/", "_blank")}> <Image src={overnight} alt="Overnight" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.vdbapp.com/", "_blank")}> <Image src={vdb} alt="VDB" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.ivouch.com/", "_blank")}> <Image src={ivouch} alt="IVach" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.yelp.com/", "_blank")}> <Image src={yelp} alt="Yelp" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.google.com/", "_blank")}> <Image src={google} alt="Google" /></Link>
                        </div>
                      </li>
                      <li>
                        <div className="rcs_footer_logo_img_div">
                          <Link to="#" onClick={() => window.open("https://www.paypal.com/in/webapps/mpp/home?gclsrc=aw.ds&gclid=EAIaIQobChMI7sKht7nn5gIVGAkrCh2VHgXsEAAYASAAEgJAX_D_BwE&gclsrc=aw.ds", "_blank")}> <Image src={paypal} alt="Paypal" /></Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
      <section className="d-lg-none d-md-block rcs_mobile_footer_section">
        <Container>
          <div className="gs_footer_content d-lg-none d-md-block  ">
            <Row className="m-0 w-100">
              <Col xs={12}>
                <div className='rcs_footer_content_one '>
                  <div className="logo">
                    <NavLink to="/"><Image src={BwLogo} alt="Belgium Webnet" /></NavLink>
                  </div>
                  <p> Belgium WebNet in the field of the Diamond industry with an experience of over 25 years. We revolutionized the industry with a disruptive online business model. Read More</p>
                </div>
                <div className="rcs_footer_content_one_social_icn">
                  <ul>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/">  <RiFacebookBoxFill /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/">   <RiTwitterFill /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/">    <RiInstagramLine /> </Link>
                      </div>
                    </li>
                    <li>
                      <div className="rcs_footer_content_one_social_icn_div">
                        <Link to="/">  <RiLinkedinBoxFill /> </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  className="rcs_footer_t_color_white"
                >
                  <Typography>Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="block-footer3">
                      <ul className='rcs_footer_list contact-foter2'>
                        <li><NavLink to="/our-story">About Us</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li><NavLink to="/education">Education</NavLink></li>
                        <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                        <li><NavLink to="/terms-and-conditions">Terms & Condition</NavLink></li>
                      </ul>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3bh-content"
                  id="panel3bh-header"
                  className="rcs_footer_t_color_white"
                >
                  <Typography>Collection</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="block-footer3">
                      <ul className='rcs_footer_list contact-foter2'>
                        <li><NavLink to="/jewelry/fashion-rings">Rings</NavLink></li>
                        <li><NavLink to="/jewelry/necklaces">Necklaces</NavLink></li>
                        <li><NavLink to="/jewelry/earrings">Earrings</NavLink></li>
                        <li><NavLink to="/jewelry/pendants">Pendants</NavLink></li>
                        <li><NavLink to="/jewelry/bracelets">Bracelets</NavLink></li>
                      </ul>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                  className="rcs_footer_t_color_white"
                >
                  <Typography>Get in Touch</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="block-footer3">
                      <ul className="list-none contact-foter2">
                        <p className='mt-0'>Address: </p>
                        <li onClick={() => { window.open('https://www.google.com/maps/dir//20+W+47th+St+%23601,+New+York,+NY+10036,+USA/@40.7570155,-74.0148537,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89c258fe544d7d25:0xeb7d6ed406a3793e!2m2!1d-73.9798343!2d40.7569558', '_blank') }}>20 W 47th St, Suite 601
                          <br /> New York, NY 10036</li>
                        <p className='mt-2'>Phone: </p>
                        <li onClick={(e) => { window.location.href = `tel:+16469929024` }}>+1 (646) 992-9024</li>
                        <p>Email: </p>
                        <li className="pb-1" onClick={(e) => { window.location.href = `mailto:info@belgiumwebnet.net` }}>info@belgiumwebnet.com</li>
                        <li onClick={(e) => { window.location.href = `mailto:sales@belgiumwebnet.net` }}>sales@belgiumwebnet.com</li>
                      </ul>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                  className="rcs_footer_t_color_white"
                >
                  <Typography>Help</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="block-footer3">
                      <ul className='rcs_footer_list contact-foter2'>
                        <li><NavLink to="/faq">FAQ’s</NavLink></li>
                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                      </ul>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Row>
          </div>
        </Container>
      </section>
      <div className='rcs_footer_bottom' id="rcs_footer_bottom">
        <Container className="rcs_custom_home_container">
          <Row className='w-100 m-auto justify-content-center'>
            <Col lg={11} className="m-auto">
              <div className='rcs_footer_bottom_content'>
                <p>Belgium Webnet © 2022 All rights reserved. Designed and Developed by: <NavLink to="#" onClick={() => { window.open("http://belgiumwebnet.com/") }}>Belgium WebNet</NavLink></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Whatsapp Chat */}
      {/* <a href="https://wa.me/+16469929024" class="whatsapp_float" target="_blank" rel="noopener noreferrer">
        <Image src={whatsapp} alt="whatspp chat"></Image>
      </a> */}
      {/* Whatsapp Chat */}
      {/* <div className='rcs_footer_chat'>
        <div className='rcs_diamond_specialist'>

        </div>
        <div className='rcs_diamond_tdo_chat'>

        </div>
      </div> */}
    </>
  )
}
export default Footer;