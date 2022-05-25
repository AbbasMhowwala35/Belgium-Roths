import React from 'react';
import { Container, Row, Col, NavLink } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import collection_img1 from "../../Assets/images/home/wed.png";
import collection_img2 from "../../Assets/images/home/ear.png";
import collection_img3 from "../../Assets/images/home/fine.png";
import { useHistory } from 'react-router-dom';

const Collection1 = () => {
  const history = useHistory();
  return (
    <>
      <Container className="rcs_newcontainer mt-5" fluid>
        <Row className="m-0 w-100">
          <Col xs={12} sm={6} md={6} lg={4}>
            <div className="rcs_collection">
              <NavLink onClick={() => history.push("/jewelry/wedding-bands")} className="d-block widget-inner">
                <img src={collection_img1} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
              </NavLink>
              <span onClick={() => history.push("/jewelry/wedding-bands")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                Wedding Band Collection
              </span>
              {/* <span className="content-block">
                <span className="d-flex flex-column align-self-center w-100">
                  <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                    <span className="w-auto d-inline-flex">
                      <h3 className="w-100 d-block text-center">Wedding <br /> Bands</h3>
                    </span>
                  </span>
                </span>
              </span> */}
            </div>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <div className="rcs_collection">
              <NavLink onClick={() => history.push("/jewelry/diamond-earrings")} className="d-block widget-inner">
                <img src={collection_img2} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
              </NavLink>
              <span onClick={() => history.push("/jewelry/diamond-earrings")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                Diamond Earring Collection
              </span>
              {/* <span className="content-block">
                <span className="d-flex flex-column align-self-center w-100">
                  <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                    <span className="w-auto d-inline-flex">
                      <h3 className="w-100 d-block text-center">Diamond  <br /> Earrings</h3>
                    </span>
                  </span>
                </span>
              </span> */}
            </div>
          </Col>
          <Col xs={12} sm={6} md={6} lg={4}>
            <div className="rcs_collection">
              <NavLink onClick={() => history.push("/jewelry/fine-jewelry")} className="d-block widget-inner">
                <img src={collection_img3} className="mx-auto" alt="Engagement Rings from Belgium Webnet in Charlotte, NC" />
              </NavLink>
              <span onClick={() => history.push("/jewelry/fine-jewelry")} className="d-inline-block btn-dark btn btn-md rcs_main_btn2">
                Fine Jewelry Collection
              </span>
              {/* <span className="content-block">
                <span className="d-flex flex-column align-self-center w-100">
                  <span className="w-100 d-block py-10 text-center mt-3 mb-3">
                    <span className="w-auto d-inline-flex">
                      <h3 className="w-100 d-block text-center">Fine  <br /> Jewelry</h3>
                    </span>
                  </span>
                </span>
              </span> */}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Collection1;