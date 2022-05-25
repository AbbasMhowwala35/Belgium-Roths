import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "../../../Assets/css/educationalblog.css";
import { Helmet } from "react-helmet";
import { Button } from "@mui/material";

const EducationalBlog = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Educational educationalblog</title>
                <meta name="description" content="Stay up to date on the latest jewelry industry news with the Belgium Webnet blog. We also post about the latest going on with our Charlotte store." />
                <meta name="keywords" content="blog, Belgium Webnet, news, jewelry store"></meta>
            </Helmet>
            <div className="rcs_education_blog_banner">
                <Container className="rcs_custom_home_container">
                    <Row className="w-100 m-auto d-block">
                        <div className="rcs_education_blog_banner_content">
                            <Col sm={12} md={6}></Col>
                            <Col sm={12} md={6}>
                                <div className="rcs_blog_banner_content">
                                    <h2>ALL THINGS JEWELRY</h2>
                                    <h1>BLING BLOG</h1>
                                    <p>From discovering must-have fine jewelry to <br />finding your dream engagement ring.</p>
                                </div>
                            </Col>
                        </div>
                    </Row>
                </Container>
            </div>
            <section>
                <Container className="rcs_custom_home_container">
                    <Row className="m-auto w-100">
                        <Col xs={12} md={4}>
                            <div className="rcs_educational_contant rcs_educational_contant0">
                                <h2>The 101 on Diamond Shapes</h2>
                                <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="rcs_educational_contant rcs_educational_contant1">
                                <h2>The Best Everyday Jewelry</h2>
                                <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="rcs_educational_contant rcs_educational_contant2">
                                <h2>How to Stack With Your Engagement Ring</h2>
                                <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row className="m-auto w-100">
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_educational_categories">
                                <Image src='https://i.shgcdn.com/0282ccf8-536e-44a1-9446-5feb60078e83/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Diamond Education'></Image>
                                <h2>DIAMOND<br />EDUCATION</h2>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_educational_categories">
                                <Image src='https://i.shgcdn.com/194c6098-64fe-4779-984c-efd777eb8bf6/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Bespoke Bridal'></Image>
                                <h2>BESPOKE<br />BRIDAL</h2>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_educational_categories">
                                <Image src='https://i.shgcdn.com/a68c9bf4-9952-41a2-94b2-799bd87e2e7d/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Fine Jewelry'></Image>
                                <h2>FINE<br />JEWELRY</h2>
                            </div>
                        </Col>
                        {/* <Col xs={12} sm={6} md={3}>
                            <div className="rcs_educational_categories">
                                <Image src='https://i.shgcdn.com/90775b47-dc09-48a6-ab30-1b581962062e/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Vow by Rc'></Image>
                                <h2>VOW<br />BY RC</h2>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </section>
            <section className="mt-5">
                <Container className="rcs_custom_home_container">
                    <Row className="m-auto w-100">
                        <Col sm={12} md={4}></Col>
                        <Col sm={12} md={8}>
                            <div className="rcs_diamond_top_content">
                                <h2>DIAMOND EDUCATION</h2>
                                <hr />
                                <p><i>We take the guesswork out of designing your dream engagement ring.</i></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-auto w-100">
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_diamond_education">
                                <Image src='https://i.shgcdn.com/0282ccf8-536e-44a1-9446-5feb60078e83/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Diamond Education' style={{ padding: '0 40px' }}></Image>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={8} className="p-0">
                            <Row className="w-100 m-auto">
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/0a3b4364-1eb2-4a14-9c8f-97305e7a7915/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='7 Engagement Ring Diamond Shapes to Know'></Image>
                                        <h2>7 Engagement Ring Diamond Shapes to Know</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/d16d04a3-42e8-4ae1-a5d7-4e6eb36db61d/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='A Visual Guide to Diamond Carat Sizes'></Image>
                                        <h2>A Visual Guide to Diamond Carat Sizes</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/01f9c6c3-a072-46c8-80ad-c3a6d528d552/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='Antique vs. Modern Diamonds'></Image>
                                        <h2>Antique vs. Modern Diamonds</h2>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className="rcs_diamond_education">
                                        <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="mt-5">
                <Container className="rcs_custom_home_container">
                    <Row className="m-auto w-100">                        
                        <Col sm={12} md={8}>
                            <div className="rcs_diamond_top_content">
                                <h2>BESPOKE BRIDAL</h2>
                                <hr />
                                <p><i>All your engagement ring and bridal jewelry questions, answered.</i></p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}></Col>
                    </Row>
                    <Row className="m-auto w-100">                        
                        <Col xs={12} sm={6} md={8} className="p-0">
                            <Row className="w-100 m-auto">
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/addb96a2-7a35-48e0-a81e-f8bf2964d50c/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='How Much Should You Spend on an Engagement Ring?'></Image>
                                        <h2>How Much Should You Spend on an Engagement Ring?</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/e814bdb9-6a15-4d16-a9a7-6a955d187157/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='How to Choose the Perfect Wedding Band'></Image>
                                        <h2>How to Choose the Perfect Wedding Band</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/45c4e614-813f-4f91-9435-8afd707f4fef/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='How to Get Your Partner Ring Size (Without Asking)'></Image>
                                        <h2>How to Get Your Partner's Ring Size (Without Asking)</h2>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className="rcs_diamond_education">
                                        <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_diamond_education">
                                <Image src='https://i.shgcdn.com/194c6098-64fe-4779-984c-efd777eb8bf6/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='BESPOKE BRIDAL' style={{ padding: '0 40px' }}></Image>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="mt-5">
                <Container className="rcs_custom_home_container">
                    <Row className="m-auto w-100">
                        <Col sm={12} md={4}></Col>
                        <Col sm={12} md={8}>
                            <div className="rcs_diamond_top_content">
                                <h2>FINE JEWELRY</h2>
                                <hr />
                                <p><i>We've curated a covetable collection of trend-forward jewelry pieces that will never go out of style.</i></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-auto w-100">
                        <Col xs={12} sm={6} md={4}>
                            <div className="rcs_diamond_education">
                                <Image src='https://i.shgcdn.com/a68c9bf4-9952-41a2-94b2-799bd87e2e7d/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='FINE JEWELRY' style={{ padding: '0 40px' }}></Image>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={8} className="p-0">
                            <Row className="w-100 m-auto">
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/666daa11-52b4-4ab8-9ba7-b51e9781c744/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='8 Everyday Jewelry Trends Well Be Seeing Everywhere in 2021'></Image>
                                        <h2>8 Everyday Jewelry Trends We'll Be Seeing Everywhere in 2021</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/2ad5c5f5-bf77-4fe5-9858-19f64f82da1d/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='The Best Stackable Rings to Achieve That Layered Look'></Image>
                                        <h2>The Best Stackable Rings to Achieve That Layered Look</h2>
                                    </div>
                                </Col>
                                <Col xs={12} sm={4} md={4}>
                                    <div className="rcs_diamond_education">
                                        <Image src='https://i.shgcdn.com/2a541e65-000d-4485-8597-f6288f7f1d48/-/format/auto/-/preview/3000x3000/-/quality/lighter/' alt='36 Chunky Gold Jewelry Pieces'></Image>
                                        <h2>36 Chunky Gold Jewelry Pieces</h2>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className="rcs_diamond_education">
                                        <Button className="rcs_fill_button  rd-3" variant="outline-dark"> READ MORE </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}
export default EducationalBlog;