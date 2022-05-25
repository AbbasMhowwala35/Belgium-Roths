import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import "../../../Assets/css/mjstatic.css"

const ResponsibleSourcing = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Responsible Sourcing</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_free_diamond_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_free_diamond_content mt-5 mb-5">
                            <h1>RESPONSIBLY SOURCED DIAMONDS</h1>
                            <p className="mt-5 mb-3">Belgium Webnet is dedicated to meeting and exceeding industry standards by offering responsibly sourced and conflict free diamonds that have been selected based on their ethical and environmentally responsible sourcing.</p>
                            <h2>OUR COMMITMENT</h2>
                            <span className="d-block">Not only do we sell the finest diamonds on the market, we are committed to the betterment and protection of employees by ensuring that working conditions are safe, pay is fair, and the mining process is ethically responsible.</span>
                            <h2>ETHICS</h2>
                            <span className="d-block">When you buy a diamond at Belgium Webnet, you do so with the guarantee that it meets our standards of excellence and ethics. We value integrity in business as much as the integrity of diamonds and work to ensure that all employees and communities from areas that produce diamonds benefit from safe, legal, and responsible sourcing and business practices.</span>
                            <h2>CONFLICT-FREE DIAMONDS </h2>
                            <span className="d-block">At Belgium Webnet, we strive to promote higher standards for diamond and gemstone sourcing by purchasing only diamonds and gems that meet our standards of excellence and ethics by improving working conditions and encouraging responsible practices. Ethical sourcing is at the heart of Belgium Webnet, and we examine the human rights and socio-political climate of each community where our diamonds are sourced.</span>
                            <h2>PROTECTION OF WOMEN</h2>
                            <span className="d-block">Like diamonds, every woman is unique and precious. That is why we encourage and support women in various industry professions, including miners, geologists, engineers, trainers, expert craftspeople, managers, and other staff positions. We are proud to help the women who help provide us with precious stones and other essential services, and continue to provide opportunities for them to shine. </span>
                            <h2>PROTECTING THE ENVIRONMENT</h2>
                            <span className="d-block">The beauty of a diamond reflects the environment in which it is produced. We strive to protect the landscapes and ecosystems throughout diamond-producing regions in Southern Africa. Our efforts include purchasing our diamonds from partners involved with wildlife conservation and environmental protection programs dedicated to preserving the beauty of the Earth.</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResponsibleSourcing;