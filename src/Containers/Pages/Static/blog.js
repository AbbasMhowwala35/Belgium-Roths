import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../Assets/css/mjstatic.css";
import Gallery from 'react-photo-gallery';
import axios from "axios";
import { base_url, postHeader } from "../../../Helpers/request";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';

const Blog = () => {
    const [bloglist, setBloglist] = useState([]);
    const [blogcategory, setBlogCategory] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [category, setCategory] = useState('');
    const history = useHistory();
    useEffect(() => {
        list();
        axios.get(base_url + '/common/blog_category', {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setBlogCategory(res.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        list();
    }, [category])
    const list = () => {
        axios.post(base_url + '/common/blog_list', { category_id: category }, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    var list = [];
                    setBloglist(res.data.data)
                    res.data.data?.map(val => {
                        list.push({ id: val.blog_url, src: val.blog_image, height: val.height, width: val.width })
                    })
                    setPhotos(list);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [value, setValue] = React.useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fine Jewelry Blog | Jewelry Industry News | Belgium Webnet</title>
                <meta name="description" content="Stay up to date on the latest jewelry industry news with the Belgium Webnet blog. We also post about the latest going on with our Charlotte store." />
                <meta name="keywords" content="blog, Belgium Webnet, news, jewelry store"></meta>
            </Helmet>
            <div className="rcs_cart_section mt-3">
                <Container>
                    <Row>
                        <Col className="rcs_breadcrumb mb-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <NavLink underline="hover" color="inherit" to="/">
                                    Home
                                </NavLink>
                                <Typography color="text.primary">Blog</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <din className="rcs_top_heading">
                                <h1>Our Blog</h1>
                            </din>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rcs_education_cotnent_pages rcs_education_cotnent_pages_blog">
                <Container>
                    <Row className="w-100 m-auto">
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="All" value="" onClick={() => setCategory('')} />
                                        {blogcategory?.map(val =>
                                            <Tab label={val.name} value={val.category_id} onClick={() => setCategory(val.category_id)} />
                                        )}
                                    </TabList>
                                </Box>
                                <TabPanel value={category}>
                                    <Row className="w-100 m-auto">
                                        <Col className="p-0">
                                            <Gallery photos={photos} onClick={(e) => history.push('/blog-details/' + e.target.id)} />
                                        </Col>
                                    </Row>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Row>
                </Container>
            </div>
        </>
    );
}
export default Blog;