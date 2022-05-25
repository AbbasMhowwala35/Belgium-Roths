import React from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const Insurance = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Insurance</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_insurance_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_insurance_content mt-5 mb-5">
                            <h1>LOVE IS PRICELESS, BUT DIAMONDS ARE NOT.</h1>
                            <h2>THAT IS WHY YOU NEED TO PROTECT AND INSURE YOUR JEWELRY. </h2>
                            <h2 className="mb-4">WE WILL WALK YOU THROUGH THE STEPS AND WORK WITH YOU ONE-ON-ONE TO MAKE SURE THAT YOUR JEWELRY IS PROTECTED.</h2>
                            <p>There are several ways to insure your jewelry.  You can choose to purchase jewelry insurance as an extension or “rider” under your renters or homeowners policy.  You can also insure your jewelry through a company that specializes in jewelry insurance, such as Jeweler's Mutual, which may offer more coverage than a your homeowners policy.</p>
                            <p>You’ll also need to provide your receipts and an appraisal in order to insure your jewelry.  We offer complete appraisal tickets with pictures of the item(s) at no additional charge for any item purchased from us for $500 or more.   Appraisals for jewelry not purchased at Belgium Webnet start at $50.00. The intricacy of the item and work involved will determine the final appraisal price.  Please note, the appraisal process may take longer than 24-48 hours if you bring in multiple pieces of jewelry.</p>
                            <p>An insurance replacement appraisal is the most common type of appraisal because it provides specific information about the piece of jewelry for the insurance company’s purposes.  This information is needed to insure jewelry against damage or loss.  Pieces that are deemed irreplaceable will be discussed on an individual basis. </p>                                                       
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Insurance;