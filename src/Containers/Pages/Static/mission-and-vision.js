import React from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const MissionVision = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Mission And Vision</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_mission_vision_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_mission_vision_content mt-5 mb-5">
                            <h1>OUR MISSION</h1>
                            <p className="text-center">Our mission is to inspire loyalty in our customers and the local community and earn their trust by providing superior service and quality and giving back to the community in turn.</p>
                            <h2>OUR VISION</h2>
                            <p className="text-center">Our vision is to enhance the value of the Malak brand by ensuring that Malak is the most trusted jeweler in the community due to our engagement, expertise, exemplary customer service and top-quality products. </p>
                            <h2>OUR VALUES</h2>
                            <p className="text-center">Our core values, or what we stand for and believe in, include:</p>
                            <h2>Relationships</h2>
                            <p className="text-center">We maintain strong ties to our customers and regularly engage with and give back to the community. At Belgium Webnet, we believe in the golden rule (and gold in general!), and we seek to employ individuals who share our values and commitment to service.</p>
                            <h2>Entrepreneurship</h2>
                            <p className="text-center">Belgium Webnet employs skilled individuals who bring passion and positivity to the workplace and treat their work here as they would their own business by taking initiative and going above and beyond what is expected of them.</p>
                            <h2>Expertise</h2>
                            <p className="text-center">Malak emphasizes the education of every member of our team, and seeks to employ those with a thirst for knowledge. Career development and personal growth are priorities for us, and each team member is a specialist in at least one area of our business. Authoritative knowledge and accurate representation of products is essential to enhancing customer confidence and the reputation of Belgium Webnet.</p>
                            <h2>Value</h2>
                            <p className="text-center">Belgium Webnet sells the top quality bridal, fine, and fashion jewelry on the market. Our products are responsibly sourced, meticulously evaluated, beautifully designed, and handled with utmost care by our professional and personable staff.</p>
                            <h2>Service and Hospitality</h2>
                            <p className="text-center">The Malak team is acknowledged for their ability to provide a memorable, personalized experience to every customer that walks through our doors. Our motto is come in a client, but leave as a friend, and we strive to hold true to that each and every day.</p>                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MissionVision;