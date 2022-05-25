import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Helmet } from 'react-helmet';

const EducationMetals = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Metal Education | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
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
                                <Typography color="text.primary">Metals</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Learn About Metals</h1>
                                <p className="mt-3">There are many different metal types that are used to make jewelry, and we've listed some popular metal types below.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_metal">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_yellow" />} label="Yellow Gold" value="1" />
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_white" />} label="White Gold" value="2" />
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_rose" />} label="Rose Gold" value="3" />
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Platinum" value="4" />
                                        {/* <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Palladium" value="5" /> */}
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Silver" value="6" />
                                        {/* <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Cobalt" value="7" />
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Tungsten" value="8" />
                                        <Tab icon={<CircleOutlinedIcon className="rcs_color_other" />} label="Titanium" value="9" /> */}
                                    </TabList>
                                </Box>
                                {/*Yellow Gold*/}
                                <TabPanel value="1">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Yellow Gold</strong></NavLink> is an alloy made of a mixture of pure gold and either zinc and copper. The higher the karat amount, the more pure the gold.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Has that classic “Gold” look</li>
                                                <li>Pairs great with Garnets and Diamonds</li>
                                                <li>Can be softer or easier to break depending on purity</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>18k 2.8 hardness level</li>
                                                <li>14k 3.5 to 4 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Yellow Gold*/}
                                {/*White Gold*/}
                                <TabPanel value="2">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>White Gold</strong></NavLink> is a form of gold with a distinct pale white or cream color; its an alloy of gold and at least one white metal; either nickel, manganese, or palladium, which typically makes up apprx 10% of the alloy.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Goes great with Diamonds</li>
                                                <li>Cheaper alternative to Platinum</li>
                                                <li>Commonly 9-1 gold to nickel</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>18k 2.8 hardness level</li>
                                                <li>14k 3.5 to 4 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Yellow Gold*/}
                                {/*Rose Gold*/}
                                <TabPanel value="3">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Rose Gold</strong></NavLink> has a “rose” tint from the gold-copper alloy that composes it. It is also known as “pink gold” and “red gold”, and historically was very popular in Russia, which has also earned it the name “Russian Gold”, though it is far and away most well known as Rose Gold.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Highest Karat version is known as “Crown Gold”</li>
                                                <li>Pairs great with colored stones</li>
                                                <li>Currently trending</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>18k 2.75 hardness level</li>
                                                <li>14k 3 to 4 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Rose Gold*/}
                                {/*Platinum*/}
                                <TabPanel value="4">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Platinum</strong></NavLink> is a metal that is incredibly resistant to corrosion, even at high temperatures. Apart from jewelry, Platinum is used in the treatment of cancer. Because of its white color, it will not cast any tinting on any stones that are used.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>An alternative to Silver, White Gold or Palladium</li>
                                                <li>One of the least reactive metals</li>
                                                <li>Heaviest of the precious metals</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>4 to 4.5 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Platinum*/}
                                {/*Palladium*/}
                                {/* <TabPanel value="5">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Palladium</strong></NavLink> is a beautiful silvery-white metal that resembles Platinum. This metal has become much more valued in recent years and is used in a pure form in jewelry, and for combining with gold to form white-gold alloys. Because of its near white coloring, it will not cast any tinting on any stones it is used with.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>An alternative to Platinum or Silver</li>
                                                <li>Does not tarnish under normal conditions</li>
                                                <li>Used as an early treatment for tuberculosis</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>4.75 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel> */}
                                {/*Palladium*/}
                                {/*Silver*/}
                                <TabPanel value="6">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Silver</strong></NavLink> is one of the cornerstone precious metals, silver has long been used in jewelry, currency, and investment bullion. It is extremely malleable and pairs beautifully with most stones.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Silver has been used as early as 3000 BCE</li>
                                                <li>Very affordable</li>
                                                <li>Associated with the ability to stop paranormal creatures such as vampires or werewolves</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>2.5 to 3 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Silver*/}
                                {/*Cobalt*/}
                                {/* <TabPanel value="7">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Cobalt </strong></NavLink> is a silver-grey highly magnetic metal, cobalt is used primarily in alloy compounds used in wear-resistant men’s wedding bands. Cobalt can appear blue-hued in the correct light.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Cobalt pigments, specifically the blue, have been used for thousands of years</li>
                                                <li>The Democratic Republic of Congo currently extracts about 40% of the world's cobalt supply each year</li>
                                                <li>The name Cobalt comes from the German word kobold, meaning “goblin ore”</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>5 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel> */}
                                {/*Cobalt*/}
                                {/*Tungsten*/}
                                {/* <TabPanel value="8">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Tungsten </strong></NavLink> has the highest boiling point and strongest tensile strength, which means it is nearly impossible to scratch, though under extreme force it will shatter. It is naturally steel grey and has a subdued look.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Production of tungsten is difficult due to its high melting point</li>
                                                <li>Because of its conductive and anti-corrosion properties, tungsten is often used to make electrical wiring</li>
                                                <li>Tungsten is the heaviest of all elements known to play a biological role</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>Tungsten: 7.5 hardness level</li>
                                                <li>Tungsten carbide: 8.5 to 9 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel> */}
                                {/*Tungsten*/}
                                {/*Titanium*/}
                                {/* <TabPanel value="9">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Titanium </strong></NavLink> is an extremely versatile metal that is resistant to most types of corrosion. It’s value stems from its strength-to-density ratio, the highest amongst any metallic elements.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Extremely valuable in machinery</li>
                                                <li>Very difficult to bend</li>
                                                <li>Titanium is used in a variety of surgical implants and tools, as it is not likely for the body to reject it</li>
                                            </ul>
                                            <h2>MOHS SCALE:</h2>
                                            <ul>
                                                <li>6 hardness level</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPanel> */}
                                {/*Titanium*/}
                            </TabContext>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EducationMetals;