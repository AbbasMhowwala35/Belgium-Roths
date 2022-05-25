import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import DColor from '../../../Assets/images/education/diamond/D.png';
import LColor from '../../../Assets/images/education/diamond/L.png';
import KColor from '../../../Assets/images/education/diamond/K.png';
import JColor from '../../../Assets/images/education/diamond/J.png';
import IColor from '../../../Assets/images/education/diamond/I.png';
import HColor from '../../../Assets/images/education/diamond/H.png';
import GColor from '../../../Assets/images/education/diamond/G.png';
import FColor from '../../../Assets/images/education/diamond/F.png';
import EColor from '../../../Assets/images/education/diamond/E.png';
import Dime from '../../../Assets/images/education/diamond/dime.png';
import DiamondCutAndLight from '../../../Assets/images/education/diamond/diamond-cut-and-light.png';
import DiamondAnimation from '../../../Assets/images/education/diamond/diamond_education_color_animation.gif';
import DiamondClarityImage from '../../../Assets/images/education/diamond/diamond-clarity-image.png';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

const EducationDiamonds = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [cut, setCut] = React.useState(0);
    const [clarity, setClarity] = React.useState(0);
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>The Four C's of Diamonds Explained | Belgium Webnet</title>
		        <meta name="description" content="Be educated before purchasing a diamond. Belgium Webnet explains the four C's of diamonds to help you find the right cut, clarity, color and carat."></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_cart_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <NavLink underline="hover" color="inherit" to="/education">
                                    Education
                                </NavLink>
                                <Typography color="text.primary">Diamonds</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Learn About Diamonds</h1>
                                <h4 className="mt-4">THE FOUR CS OF DIAMONDS</h4>
                                <p className="mt-3">Our Four C's of Diamonds guide can help you decide on the most important factors when shopping for a diamond.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_diamond">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Carat" value="1" />
                                        <Tab label="Cut" value="2" />
                                        <Tab label="Color" value="3" />
                                        <Tab label="Clarity" value="4" />
                                    </TabList>
                                </Box>
                                {/*Carat*/}
                                <TabPanel value="1">
                                    <div className="rcs_education_diamond_carat">
                                        <p><strong>The Carat Weight</strong></p>
                                        <p>The word carat derives from the word carob, a Mediterranean seed, which has an extremely consistent weight for measuring. The greater the carat weight, the rarer, and more valuable the diamond becomes. Five metric carats weighs exactly 1 gram.</p>
                                        <p className="mb-5">Some people want the largest diamond possible. If size is a priority, we at Belgium Webnet can help you classify the proper cut, color and clarity to fit your budget economically, and fit your jewelry beautifully. Many of our engagement rings can fit diamonds up to 5.00 carats, but each ring has different size constraints based on its size and the type of setting. Prong settings can be manipulated to fit virtually any size diamond, but tension-set diamonds and bezel set diamonds have more limitations on size.</p>
                                        <div className="d-block d-sm-none">
                                            <div className="row text-center brackets">
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                            </div>
                                            <div className="row pb-3">
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '25.5%' }} src={DColor}></Image>
                                                        <label>.25 <small>CT</small><br /><span>(4.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '29%' }} src={DColor}></Image>
                                                        <label>.5 <small>CT</small><br /><span>(5.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '32%' }} src={DColor}></Image>
                                                        <label>.75 <small>CT</small><br /><span>(5.8 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '35.75%' }} src={DColor}></Image>
                                                        <label>1 <small>CT</small><br /><span>(6.4 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center brackets">
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                            </div>
                                            <div className="row pb-3">
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '38%' }} src={DColor}></Image>
                                                        <label>1.25 <small>CT</small><br /><span>(6.9 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '40%' }} src={DColor}></Image>
                                                        <label>1.5 <small>CT</small><br /><span>(7.4 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '42%' }} src={DColor}></Image>
                                                        <label>1.75 <small>CT</small><br /><span>(7.8 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '44%' }} src={DColor}></Image>
                                                        <label>2 <small>CT</small> +<br /><span>(8.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center brackets justify-content-center">
                                                <div className="col-3"><div className="bracket"></div></div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '85%' }} src={Dime}></Image>
                                                        <label>17.9 <small>MM</small></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-none d-sm-block">
                                            <div className="row text-center brackets">
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                                <div className="col"><div className="bracket"></div></div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '15.5%' }} src={DColor}></Image>
                                                        <label>.25 <small>CT</small><br /><span>(4.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '19%' }} src={DColor}></Image>
                                                        <label>.5 <small>CT</small><br /><span>(5.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '22%' }} src={DColor}></Image>
                                                        <label>.75 <small>CT</small><br /><span>(5.8 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '25.75%' }} src={DColor}></Image>
                                                        <label>1 <small>CT</small><br /><span>(6.4 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '28%' }} src={DColor}></Image>
                                                        <label>1.25 <small>CT</small><br /><span>(6.9 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '30%' }} src={DColor}></Image>
                                                        <label>1.5 <small>CT</small><br /><span>(7.4 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '32%' }} src={DColor}></Image>
                                                        <label>1.75 <small>CT</small><br /><span>(7.8 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '34%' }} src={DColor}></Image>
                                                        <label>2 <small>CT</small> +<br /><span>(8.1 <small>MM</small>)</span></label>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="ct-img">
                                                        <Image className="" style={{ maxWidth: '75%' }} src={Dime}></Image>
                                                        <label>17.9 <small>MM</small></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                {/*Carat*/}
                                {/*Cut*/}
                                <TabPanel value="2">
                                    <div className="rcs_education_diamond_cut">
                                        <p><strong>The Cut</strong></p>
                                        <p>The true definition of cut is the quality of the proportions and symmetry of the diamond. Your diamond's proportions make a vast difference on how brightly your diamond shines. An 'ideal cut' diamond is one that allows the maximum amount of light to return through the top of the diamond, which takes into consideration the depth, table size, crown height and angle, girdle thickness and more. Our diamond professionals will be happy to assist you in selecting the best diamond cut.</p>
                                        <p className="mb-5">After a rough diamond is mined, it is evaluated to determine its best possible cut, in order to maintain the maximum clarity, color, and carat weight. The term 'cut' is often confused with diamond 'shape', such as round brilliant or princess cut.</p>
                                        <Row className="pt-3">
                                            <Col xs={12} md={5}>
                                                <Image className="diamond-cut-image" src={DiamondCutAndLight}></Image>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div id="edu-diamonds-tab-content">
                                                    <div className={cut == 0 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamonds-excellent">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Excellent</h4>
                                                            <p className="text-light">This is the rarest cut grade and reflects the most light.</p>
                                                        </div>
                                                    </div>
                                                    <div className={cut == 1 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamonds-verygood">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Very Good</h4>
                                                            <p className="text-light">This cut grade reflects nearly as much light as an Excellent cut grade, but for a lower price.</p>
                                                        </div>
                                                    </div>
                                                    <div className={cut == 2 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamonds-good">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Good</h4>
                                                            <p className="text-light">This cut grade reflects most of the light that enters the diamond, but not as much as a Very Good cut grade.</p>
                                                        </div>
                                                    </div>
                                                    <div className={cut == 3 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamonds-fair">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Fair</h4>
                                                            <p className="text-light">This cut grade may appear dull or even glassy, and is very inexpensive.</p>
                                                        </div>
                                                    </div>

                                                    <div className={cut == 4 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamonds-poor">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Poor</h4>
                                                            <p className="text-light">This cut grade is not carried by Belgium Webnet and is typically not recommended.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <table className="table table-bordered table-condensed text-center text-md-left" id="edu-diamonds-tab">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ height: "40px" }}>
                                                                <div className="rcs_table_text" onClick={() => setCut(0)}><span className={cut == 0 ? "active" : ""}></span>Excellent</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ height: "50px" }}>
                                                                <div className="rcs_table_text" onClick={() => setCut(1)}><span className={cut == 1 ? "active" : ""}></span>Very Good</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ height: "75px" }}>
                                                                <div className="rcs_table_text" onClick={() => setCut(2)}><span className={cut == 2 ? "active" : ""}></span>Good</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ height: "90px" }}>
                                                                <div className="rcs_table_text" onClick={() => setCut(3)}><span className={cut == 3 ? "active" : ""}></span>Fair</div>
                                                            </td>
                                                        </tr>
                                                        <tr className="disabled">
                                                            <td style={{ height: "120px" }}>
                                                                <div className="rcs_table_text" onClick={() => setCut(4)}><span className={cut == 4 ? "active" : ""}></span>Poor<br />Not carried by Belgium Webnet</div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {/* <p className="text-center pt-0 d-block d-md-none" style="margin-top:-0.75rem;"><a href="/diamonds" class="small text-default" style="font-size: 12px; font-weight: 600;">MORE DIAMONDS</a></p> */}

                                            </Col>
                                        </Row>
                                    </div>
                                </TabPanel>
                                {/*Cut*/}
                                {/*Color*/}
                                <TabPanel value="3">
                                    <div className="rcs_education_diamond_color">
                                        <p><strong>The Color</strong></p>
                                        <p className="mb-5">Color is one of the more noticeable attributes of a diamond and has a heavy impact on the price of the stone. Diamonds range from colorless to yellow or light brown, and are sometimes found in a spectrum of fancy colors, including yellow, blue, and even red diamonds. The less color, the rarer the diamond. After 'Z' on the color scale, diamonds become fancy yellow, which cost more because of their rarity.</p>
                                        <div className="d-block d-sm-none">
                                            <div className="row text-center justify-content-center">
                                                <div className="col-3"><h5>Z-N</h5></div>
                                                <div className="col-3"><h5>M-K</h5></div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={LColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={KColor}></Image>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center justify-content-center">
                                                <div className="col-6" style={{ maxWidth: '100%' }}><div className="bracket"></div><h5>Noticeable Color</h5></div>
                                            </div>
                                            <div className="row text-center justify-content-center pt-3">
                                                <div className="col-3"><h5 className="active">J</h5></div>
                                                <div className="col-3"><h5>I</h5></div>
                                                <div className="col-3"><h5>H</h5></div>
                                                <div className="col-3"><h5>G</h5></div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <div className="color-img active">
                                                        <Image className="" src={JColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={IColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={HColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={GColor}></Image>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center justify-content-center">
                                                <div className="col-12" style={{ maxWidth: '100%' }}><div className="bracket"></div><h5>Near Colorless</h5></div>
                                            </div>
                                            <div className="row text-center justify-content-center pt-3">
                                                <div className="col-3"><h5>F</h5></div>
                                                <div className="col-3"><h5>E</h5></div>
                                                <div className="col-3"><h5>D</h5></div>
                                            </div>
                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={FColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={EColor}></Image>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="color-img">
                                                        <Image className="" src={DColor}></Image>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center justify-content-center">
                                                <div className="col-9" style={{ maxWidth: '100%' }}><div className="bracket"></div><h5>Colorless</h5></div>
                                            </div>
                                            <Image src={DiamondAnimation} className="rcs_gif_image"></Image>
                                        </div>
                                        <div className="d-none d-sm-block">
                                            <Row className="text-center">
                                                <div className="col"><h5>Z-N</h5></div>
                                                <div className="col"><h5>M-K</h5></div>
                                                <div className="col"><h5>J</h5></div>
                                                <div className="col"><h5>I</h5></div>
                                                <div className="col"><h5>H</h5></div>
                                                <div className="col"><h5>G</h5></div>
                                                <div className="col"><h5>F</h5></div>
                                                <div className="col"><h5>E</h5></div>
                                                <div className="col"><h5>D</h5></div>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={LColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={KColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={JColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={IColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={HColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={GColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={FColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={EColor}></Image>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="color-img">
                                                        <Image className="" src={DColor}></Image>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="row text-center">
                                                <Col style={{ maxWidth: '22.2222%' }}><div className="bracket"></div><h5>Noticeable Color</h5></Col>
                                                <Col style={{ maxWidth: '44.4444%' }}><div className="bracket"></div><h5>Near Colorless</h5></Col>
                                                <Col style={{ maxWidth: '33.3334%' }}><div className="bracket"></div><h5>Colorless</h5></Col>
                                            </div>
                                            <Image src={DiamondAnimation} className="rcs_gif_image"></Image>
                                        </div>
                                    </div>
                                </TabPanel>
                                {/*Color*/}
                                {/*Clarity*/}
                                <TabPanel value="4">
                                    <div className="rcs_education_diamond_clarity">
                                        <p><strong>The Clarity</strong></p>
                                        <p className="mb-5">Diamonds are composed of mostly carbon.During the heating process, other elements become trapped inside, giving each diamond its own unique fingerprint.These inclusions help identify the clarity of your diamond.All diamonds are viewed through a 10x magnification lens by diamond graders.</p>
                                        <Row className="pt-3">
                                            <Col xs={12} md={5}>
                                                <Image className="force-middle" src={DiamondClarityImage}></Image>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div id="edu-diamond-clarity-tab-content">
                                                    <div className={clarity == 0 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-f">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Flawless</h4>
                                                            <p className="text-light">No inclusions or blemishes are visible to a skilled grader.</p>
                                                        </div>
                                                    </div>
                                                    <div className={clarity == 1 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-if">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Internally Flawless</h4>
                                                            <p className="text-light">No inclusions and only blemishes are visible to a skilled grader.</p>
                                                        </div>
                                                    </div>
                                                    <div className={clarity == 2 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-vvs">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Very Very Slightly Included</h4>
                                                            <p className="text-light">Inclusions are difficult for a skilled grader to see.</p>
                                                        </div>
                                                    </div>
                                                    <div className={clarity == 3 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-vs">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Very Slightly Included</h4>
                                                            <p className="text-light">Inclusions are clearly visible but can be characterized as minor.</p>
                                                        </div>
                                                    </div>
                                                    <div className={clarity == 4 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-si">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Slightly Included</h4>
                                                            <p className="text-light">Inclusions are noticeable to a skilled grader.</p>
                                                        </div>
                                                    </div>
                                                    <div className={clarity == 5 ? "edu-tab-content" : "edu-tab-content hide"} id="edu-diamond-clarity-i">
                                                        <div className="list-group-box">
                                                            <h4 className="text-light">Included</h4>
                                                            <p className="text-light">Inclusions are obvious and may affect transparency and brilliance.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={3}>
                                                <table className="table table-bordered table-condensed text-center text-md-left" id="edu-diamond-clarity-tab">
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(0)}><span className={clarity == 0 ? "active" : ""}></span>F</div>
                                                            </td>
                                                            <td>Flawless</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(1)}><span className={clarity == 1 ? "active" : ""}></span>IF</div>
                                                            </td>
                                                            <td>Internally Flawless</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(2)}><span className={clarity == 2 ? "active" : ""}></span>VVS1<br />VVS2</div>
                                                            </td>
                                                            <td>Very Very Slightly Included</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(3)}><span className={clarity == 3 ? "active" : ""}></span>VS1<br />VS2</div>
                                                            </td>
                                                            <td>Very Slightly Included</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(4)}><span className={clarity == 4 ? "active" : ""}></span>SI1<br />SI2</div>
                                                            </td>
                                                            <td>Slightly Included</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-center">
                                                                <div className="rcs_table_text" onClick={() => setClarity(5)}><span className={clarity == 5 ? "active" : ""}></span>I1<br />I2<br />I3</div>
                                                            </td>
                                                            <td>Included<br /></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {/* <p className ="text-center pt-0 d-block d-md-none" style="margin-top:-0.75rem;"><a href="/diamonds" className ="small text-default" style="font-size: 12px; font-weight: 600;">MORE DIAMONDS</a></p> */}
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPanel>
                                {/*Clarity*/}
                            </TabContext>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EducationDiamonds;