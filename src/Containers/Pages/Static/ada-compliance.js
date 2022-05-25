import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/mjstatic.css"

const AdaCompliance = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ADA Accessibility</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_mission_vision_content mt-5 mb-5">
                            <h1>ada-compliance</h1>
                            <p className="text-center">Belgium Webnet is committed to making our website accessible to all users, including those with disabilities. Our goal is to provide an accessible website that conforms to World Wide Web Consortium’s Accessibility Guidelines (WCAG) 2.0 Levels A and AA. We continue to make every effort to test the website and to remove barriers that prevent persons with disabilities from interacting with or accessing information made available on our website. If we become aware of content that does not conform to the WCAG 2.0 Levels A and AA standards, we will make reasonable good faith efforts to make the content is revised to conform to the standards.</p>
                            <h2>PORTABLE DOCUMENT FORMAT (PDF) FILES</h2>
                            <p className="text-center">Adobe Acrobat is required to view and print PDF documents that appear on this website. <NavLink onClick={() => window.open("https://get.adobe.com/reader/", "_blank")} to="#"> Download the latest free version of Adobe Reader </NavLink> in order to improve the viewing of these files. We are currently working on our processes to ensure all PDFs are accessible.</p>
                            <h2>THIRD-PARTY CONTENT</h2>
                            <p className="text-center">While we strive to adhere to the accepted guidelines and standards for accessibility and usability, it is not always possible to do so in all areas of the website, particularly as it relates to content by third parties. Belgium Webnet is not responsible for ensuring that third-party content or plug-ins, which are not owned by Belgium Webnet, but are otherwise located on or linked to the store’s Website and conform to WCAG 2.0 Level AA, and shall not be liable if third-party content or plug-ins are inaccessible to individuals with disabilities.</p>
                            <h2>SCREEN READERS</h2>
                            <p className="text-center">To assist our visitors who are visually impaired or blind, our Website is compatible with screen reading software.</p>
                            <h2>INFORMATION, GOODS AND SERVICES</h2>
                            <p className="text-center">Please be patient as these changes take effect. If, at any time, you have specific questions or concerns about the accessibility of any particular page, or if you are unable to access any information, goods or services found on our website, please email us <NavLink to="/contact">here</NavLink> or call us at +1(704) 341-1188 to request the information in another format. We will make reasonable accommodations for people with disabilities in accordance with the Americans with Disabilities Act.</p>
                            <p className="text-center">We welcome all feedback on improving our site's accessibility for all of our users in order to make our website fully accessible to everyone.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdaCompliance;