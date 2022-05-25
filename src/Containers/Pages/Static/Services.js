import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const Services = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Jewelry and Ring Appraisal in Charlotte, NC | Belgium Webnet </title>
                <meta name="description" content="Do you need to get your jewelry or your ring appraised? Come to Belgium Webnet for a fast and complete appraisal to help determine your piece's worth."></meta>
                <meta name="keywords" content="jewelry appraisal in Charlotte NC, ring appraisal Charlotte NC"></meta>
            </Helmet>
            <div className="rcs_services_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_services_content">
                            <h1>  Services at Belgium Webnet Include:</h1>
                            <ul>
                                <li> Custom Design   </li>
                                <li> Appraisals  </li>
                                <li> Watch Repair  </li>
                                <li> Watch Battery and Band Replacement  </li>
                                <li> Tip & Prong Repair  </li>
                                <li> Jewelry Cleaning and Inspection  </li>
                                <li> Jewelry Restoration  </li>
                                <li> Ring Resizing </li>
                                <li> Rhodium Plating </li>
                                <li> Pearl and Bead Restringing  </li>
                                <li> Gold and Diamond Buying  </li>
                            </ul>
                            <h2>WHY GET A JEWELRY APPRAISAL? </h2>
                            <p>A jewelry appraisal is critical for insurance purposes. An appraisal is a document that contains information about the jewelry in question, such as its weight, rarity, color, and quality. These descriptions are typically given in specific measurements, and in addition, appraisals include an approximate value for your jewelry. This is the value that your insurance will use as proof of your ownership of this piece,
                                and should your jewelry ever get stolen, lost, or damaged, your insurance will cover the damage based on the value on your appraisal. </p>
                            <p>Every piece of jewelry is uniquely valuable, no matter how new or old. An appraisal will not only help you determine how much your jewelry is worth, but it will grant you peace of mind and protection. Better yet, with the jewelry and ring appraisal Charlotte,
                                NC residents have trusted for decades, Belgium Webnet makes the appraisal process simple and painless. </p>
                            <h2>APPRAISALS </h2>
                            <p> At Belgium Webnet, we make the appraisal process simple and painless for our customers. In just five easy steps, you can have any piece of jewelry appraised by our specialists. Simply bring your jewelry to Belgium Webnet and we will examine your jewelry in front of you while you wait, write detailed notes, and take pictures for appraisal purposes before returning your jewelry to you.
                                After this, we will prepare the proper documentation and notify you. Your appraisal(s) will be ready in 24-72 hours. </p>
                            <h2 className="rcs_ser_title"> JEWELRY APPRAISALS FOR INSURANCE REPLACEMENT</h2>
                            <p>We offer complete appraisal tickets with pictures of the item(s) at no additional charge for any item purchased from us for $500 and above.  Appraisals for jewelry not purchased at Belgium Webnet start at $50.00 and up.
                                The intricacy of the item and work involved will determine the final appraisal price.</p>
                            <h2 className="rcs_ser_title"> APPRAISALS FOR INHERITED ESTATE JEWELRY</h2>
                            <p> Estate jewelry will be appraised for settlement at actual current resale value. </p>
                            <h2>REPAIRS & MAINTENANCE</h2>
                            <p> Diamonds may be forever, but not without a little maintenance. Belgium Webnet is here to help you keep your jewelry sparkling by offering repairs, regular cleaning and maintenance. It doesn’t matter where you purchased your jewelry, our specialists will handle it with care and professionalism. We also offer wristwatch and pocket watch repairs including battery replacements, Rolex overhauls, crystal replacement, water,
                                and pressure testing on dive watches, as well as polishing and refinishing to leave your watch looking shiny and brand new!</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Services;