import React from 'react';
import { Container, Row, Col, NavLink } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import estate_jewelry from "../../Assets/images/home/estate-jewelry.jpg";
import estate_jewelry_mob from "../../Assets/images/home/estate-jewelry_mob.jpg";
import { useHistory } from 'react-router-dom';
import { isMobileOnly, isTablet } from 'react-device-detect';

const StateJewelry = () => {
    const history = useHistory();
    return (
        <>
            {/* estate jewelry or indian jewelry */}
            <div className="rcs_estate_indian mb-5">
                <Container fluid className='p-0'>
                    <Row className='w-100 m-auto'>
                        <Col sm="12 p-0">
                            <div className="rcs_estate_jewelry">
                                <NavLink onClick={() => history.push("/jewelry/estate-jewelry")} className='p-0'>
                                    {isMobileOnly ? <img src={estate_jewelry_mob} /> : isTablet ? <img src={estate_jewelry} /> :
                                        <img src={estate_jewelry} />
                                    }
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default StateJewelry;