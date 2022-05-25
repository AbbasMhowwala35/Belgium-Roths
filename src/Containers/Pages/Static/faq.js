import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink, useHistory } from 'react-router-dom';
import "../../../Assets/css/mjstatic.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { base_url } from '../../../Helpers/request';

const FAQ = () => {
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(true);
    const [faqdata, setFaqdata] = React.useState([]);
    useEffect(()=>{
        axios.get(base_url + '/common/faq')
            .then(res => {
                if (res.data.status == 1) {
                    setFaqdata(res.data.data);
                } else if (res.data.status == 2) {
                    localStorage.removeItem('rcs-user');
                    localStorage.removeItem('rcs-wishlistlength');
                    localStorage.removeItem('rcs-addtocartlength');
                    localStorage.removeItem("rcs-session-id");
                    history.push("/")
                    window.location.reload(true);
                } else {
                    console.log(res.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },[])
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>FAQ's</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_ringsetting_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-3">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">FAQ's</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div className="rcs_privacy_content rcs_mobile_menu mt-3 mb-5 w-100">
                                <h1>frequently asked question</h1>
                                <div className='rcs_faq_accordion mt-5 mb-5'>
                                {faqdata?.map((val,index) =>
                                   index == 0 ?
                                   <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}> 
                                       <AccordionSummary
                                           expandIcon={<ExpandMoreIcon />}
                                           aria-controls="panel1a-content"
                                           id="panel1a-header"
                                       >
                                           <Typography className='m-0'>{val.title}</Typography>
                                       </AccordionSummary>
                                       <AccordionDetails>
                                           <Typography className='m-0'>
                                               {val.value}
                                           </Typography>
                                       </AccordionDetails>
                                   </Accordion>
                                   :
                                   <Accordion>
                                   <AccordionSummary
                                       expandIcon={<ExpandMoreIcon />}
                                       aria-controls={"panel1a-content" + index}
                                       id={"panel1a-header" + index}
                                   >
                                       <Typography className='m-0'>{val.title}</Typography>
                                   </AccordionSummary>
                                   <AccordionDetails>
                                       <Typography className='m-0'>
                                           {val.value}
                                       </Typography>
                                   </AccordionDetails>
                               </Accordion>
                                   )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default FAQ;