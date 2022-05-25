import { Button } from '@mui/material';
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import ringSetting from '../../Assets/images/home/ring-setting.png';
import settingDiamonds from '../../Assets/images/home/setting-diamonds.png';
import finalRing from '../../Assets/images/home/final-ring.png';
import { useHistory } from 'react-router-dom';

const Ringbuilderhome = () => {
    const history = useHistory();
    return (
        <>
            <div className='rcs_ringbuilder_home'>
                <Container className='rcs_custom_home_container mt-3'>
                    <Row className='w-100 m-auto'>
                        <Col>
                            <div className='rcs_ringbuilder_top_head mb-5 mb-md-2'>
                                <h2>Create your own</h2>
                                <p> Diamond ring </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='w-100 m-auto justify-content-center'>
                        {/* <Col xs={12} sm={12} md={1}></Col> */}
                        <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                            <div className='rcs_diamonds_ring'>
                                <Row className='w-100 align-items-center justify-content-center mt-5 mt-md-4 mr-0 ml-0'>                                    
                                    <Col xs={12} sm={12} md={5} className="p-0">
                                        <div className='rcs_diamonds_ring_content text-center'>
                                            <h2>Step 1</h2>
                                            <p>Choose a setting</p>
                                            <Image src={ringSetting} onClick={() => history.push('/ringsettings')} alt="ring setting"></Image>
                                            <Button variant="contained" onClick={() => history.push('/ringsettings')} className='rcs_ringbuilder_button br-0'>start with a setting</Button>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={2}>
                                        <div className='rcs_diamonds_ring_add_content text-center'>
                                            <h3>+</h3>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={5} className="p-0">
                                        <div className='rcs_diamonds_ring_content text-center'>
                                            <h2>Step 2</h2>
                                            <p>choose a diamond</p>
                                            <Image src={settingDiamonds} onClick={() => history.push('/diamonds')} alt='diamond'></Image>
                                            <Button variant="contained" onClick={() => history.push('/diamonds')} className='rcs_ringbuilder_button'>start with a diamond</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12}  lg={2} xl={1}>
                            <div className='rcs_diamonds_ring_equal d-flex align-items-center justify-content-center position-relative h-100'>
                                <h3>=</h3>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                            <div className='rcs_diamonds_ring_final'>
                                {/* <Image src="https://esuqkoiw682.exactdn.com/wp-content/uploads/2021/04/Customize_Your_Ring.gif?strip=all&lossy=1&resize=580%2C584&ssl=1" alt='diamond'></Image> */}
                                <Image src={finalRing} alt='diamond'></Image>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Ringbuilderhome;