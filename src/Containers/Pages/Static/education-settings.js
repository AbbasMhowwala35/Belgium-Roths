import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import "../../../Assets/css/education.css"
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Helmet } from 'react-helmet';

const EducationSettings = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const history = useHistory();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Ring Setting Education | Belgium Webnet | Charlotte, NC</title>
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
                                <Typography color="text.primary">Setting</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Choosing The Right Setting</h1>
                                <h4 className="mt-4">RING SETTINGS</h4>
                                <p className="mt-3">When shopping for the perfect ring setting, there are many setting styles to choose from.</p>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_metal rcs_education_cotnent_pages_setting">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab icon={<i className="big-setting-solitaire"></i>} label="Solitaire" value="1" />
                                        <Tab icon={<i className="big-setting-sidestone"></i>} label="Side-Stone" value="2" />
                                        <Tab icon={<i className="big-setting-threestone"></i>} label="Three Stone" value="3" />
                                        <Tab icon={<i className="big-setting-halo"></i>} label="Halo" value="4" />
                                        <Tab icon={<i className="big-setting-pave"></i>} label="Pave" value="5" />
                                        {/* <Tab icon={<i className="big-setting-vintage"></i>} label="Antique" value="6" /> */}
                                        <Tab icon={<i className="big-setting-channel-set"></i>} label="Single Row" value="7" />
                                        <Tab icon={<i className="big-setting-splitshank"></i>} label="Multi Row" value="8" />
                                        <Tab icon={<i className="big-setting-bypass"></i>} label="Bypass" value="9" />
                                    </TabList>
                                </Box>
                                {/*Solitaire*/}
                                <TabPanel value="1">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Solitaire</strong></NavLink> settings are great if you have a stunning singular stone that has been passed down through the generations as an heirloom, many choose to display it in a classic Solitaire setting. This setting generally allows for the maximum amount of sparkle by allowing light to pass in through the bottom sections of the ring.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Enhances the overall beauty of the ring’s head</li>
                                                <li>Balances the ring size without having to use a wide metal band</li>
                                                <li>Creates the illusion that the center gemstone is larger in size</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Solitaire*/}
                                {/*Side-Stone*/}
                                <TabPanel value="2">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Side-Stone</strong></NavLink> is similar to the Three Stone. Side Stone settings are made up of a main stone and two alternative cuts with a greater difference in hierarchy. Side Stones offer an elegant transition from stone to band and frame the main stone in lovely way.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Interesting transition between stones and band</li>
                                                <li>Allows for the use of Baguette and Square cut side stones</li>
                                                <li>Creates a stunning frame for the center stone</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Side-Stone*/}
                                {/*Three Stone*/}
                                <TabPanel value="3">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Three Stone</strong></NavLink>  settings have grown in popularity recently and contains a gem on either side of the main stone. A differentiating factor from Side-Stone is that the Three Stone tends to be made up of three similarly cut and sized stones.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Allows for a bouquet of stones of different colors</li>
                                                <li>Values equal size stones with a flat hierarchy between them</li>
                                                <li>Can synergize a small-medium size stone</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Three Stone*/}
                                {/*Halo*/}
                                <TabPanel value="4">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Halo</strong></NavLink> settings are extremely eye catching and fashionable collections of stones surrounding the center stone. The surrounding stones tend to be between .05 and .25ct and is a more affordable way to accomplish that eye catching couture look you’ve always wanted!</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Can cover any imperfections in the center stone</li>
                                                <li>Creates the illusion that the center gemstone is larger in size</li>
                                                <li>Lots of sparkle!</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Halo*/}
                                {/*Pave*/}
                                <TabPanel value="5">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Pave</strong></NavLink> settings are on the rise in popularity. The Pave setting contains inlaid .05 to 0.20ct stones either partially or entirely along the band of the ring itself. Pairing the metal type of your band with a magnificent collection of stones really completes a ring and helps it sparkle from all angles!</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Utilizes smaller, less expensive stones in a great way</li>
                                                <li>Adds interest to the band of the ring</li>
                                                <li>Can help mask imperfections in the center stone</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Pave*/}
                                {/*Antique*/}
                                {/* <TabPanel value="6">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Antique</strong></NavLink> settings are a tribute to the days of yore, when the bands of rings were “antiqued” with small grooves on the side. Traditionally these bands were more utilitarian and really allowed the stone to be the centerpiece, which is why they remain popular even today.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Adds interest to the band of the ring</li>
                                                <li>Great addition to any dressed up outfit</li>
                                                <li>Vintage, classy feel</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel> */}
                                {/*Antique*/}
                                {/*Single Row*/}
                                <TabPanel value="7">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Single Row </strong></NavLink> settings seem similar at first glance, but on closer inspection, a keen eye will notice the bands include stones that are contained inside of the band by a groove that holds them in place. This allows the stones to peak through the band and really transform the feel of the ring.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Adds interest to the band of the ring</li>
                                                <li>Creates an amazing frame for your center stone</li>
                                                <li>Classic look</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Single Row*/}
                                {/*Multi Row*/}
                                <TabPanel value="8">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Multi Row </strong></NavLink> also known as “Split Shank” settings are an innovative and unique band form that takes the traditional ring and turns it on its head by forking off and encapsulating the stone it is accompanied by. These settings can be formed to be less raised than other traditional settings, which can be a huge benefit if you find having a raised stone on a band distracting.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>Allows for a lot of light to penetrate stone</li>
                                                <li>Adds interest beyond just the stone</li>
                                                <li>Creates the illusion that the center gemstone is larger in size</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Multi Row*/}
                                {/*Bypass*/}
                                <TabPanel value="9">
                                    <Row>
                                        <Col xs={12} className="p-md-0">
                                            <p className="pt-3 pb-3"><NavLink to="/"><strong>Bypass </strong></NavLink> also known as “Free Form” is a classification given to settings that do not fall into any other category. These can be one off bespoke settings that wrap around the stone, twist and elevate the stone up, or are a braiding, wrapping, or coiling of one or more metals.</p>
                                            <h2>STYLE INFORMATION:</h2>
                                            <ul>
                                                <li>A more artistic look</li>
                                                <li>Eye catching, head turning</li>
                                                <li>Can utilize smaller or imperfect stones</li>
                                            </ul>
                                            <Button onClick={() => history.push('/ringsettings')} variant="contained" className="rcs_education_button">Shop Rings</Button>
                                        </Col>
                                    </Row>
                                </TabPanel>
                                {/*Bypass*/}
                            </TabContext>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default EducationSettings;