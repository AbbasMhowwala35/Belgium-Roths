import React from 'react';
import { Container, Row, Col, NavLink } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import indian_jewelry from "../../Assets/images/home/indian-jewelry_banner.jpg";
import indian_jewelry_mob from "../../Assets/images/home/indian-jewelry_banner_mob.jpg";
import { useHistory } from 'react-router-dom';
import { isMobileOnly, isTablet } from 'react-device-detect';

const IndianJewelry = () => {
  const history = useHistory();
  return (
    <>
      <div className="rcs_estate_indian">
        <Container fluid className='p-0'>
          <Row className='w-100 m-auto'>
            <Col sm="12 p-0">
              <div className="rcs_estate_jewelry">
                <NavLink onClick={() => history.push("/jewelry/indian-jewelry")} className='p-0'>
                  {isMobileOnly ? <img src={indian_jewelry_mob} /> : isTablet ? <img src={indian_jewelry} /> :
                    <img src={indian_jewelry} />
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

export default IndianJewelry;