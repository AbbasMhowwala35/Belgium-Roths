import { Breadcrumbs, Divider, Link, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../Assets/css/mjstatic.css";
import { base_url, currency, currencycode, postHeader } from "../../../Helpers/request";

const BlogDetails = (props) => {
    const [blogdetaildata, setBlogdetaildata] = useState([]);
    useEffect(() => {
        const data = { currency_code : currencycode,
            "blog_url": props.match.params.url
        }
        axios.post(base_url + '/common/blog_detail', data, {
            headers: postHeader
        })
            .then(res => {
                if (res.data.status == 1) {
                    setBlogdetaildata(res.data.data)
                    toast.success(res.data.message, { autoClose: 3000 });
                } else {
                    toast.error(res.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{blogdetaildata.blog_name}</title>
                <meta name="description" content={blogdetaildata.blog_desc} />
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
                                <NavLink underline="hover" color="inherit" to="/blog">
                                    Blog
                                </NavLink>
                                <Typography color="text.primary">{blogdetaildata.blog_url}</Typography>
                            </Breadcrumbs>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="">
                <Container>
                    <Row className="w-100 m-auto">
                        <Col className="p-0">
                            <div className="rcs_blog_details_content text-center">
                                <Image src={blogdetaildata?.blog_image} className="w-100 mb-3"></Image>
                                <h2>{blogdetaildata?.blog_name}</h2>
                                <p>{blogdetaildata?.created_at ? moment(new Date(blogdetaildata?.created_at)).format("YYYY-MM-DD") :""}</p>
                                <Divider />
                                <p dangerouslySetInnerHTML={{ __html: blogdetaildata?.blog_desc }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
export default BlogDetails;