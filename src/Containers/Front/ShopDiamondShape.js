import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import round from "../../Assets/images/home/diamond-round.png";
import RoundShape from "../../Assets/images/diamond-shape/Diamond_Round.svg";
import princess from "../../Assets/images/diamond-shape/princess.svg";
import cushion from "../../Assets/images/diamond-shape/cushion.svg";
import emerald from "../../Assets/images/diamond-shape/emerald.svg";
import oval from "../../Assets/images/diamond-shape/oval.svg";
import radiant from "../../Assets/images/diamond-shape/radiant.svg";
import asscher from "../../Assets/images/diamond-shape/asscher.svg";
import marquise from "../../Assets/images/diamond-shape/marquise.svg";
import heart from "../../Assets/images/diamond-shape/heart.svg";
import pear from "../../Assets/images/diamond-shape/pear.svg";

import roundImg from "../../Assets/images/home/diamond-shapes-img/Round.png";
import princessImg from "../../Assets/images/home/diamond-shapes-img/Princess.png";
import cushionImg from "../../Assets/images/home/diamond-shapes-img/Cushion.png";
import emeraldImg from "../../Assets/images/home/diamond-shapes-img/Emerald.png";
import ovalImg from "../../Assets/images/home/diamond-shapes-img/Oval.png";
import radiantImg from "../../Assets/images/home/diamond-shapes-img/Radiant.png";
import asscherImg from "../../Assets/images/home/diamond-shapes-img/Asscher.png";
import marquiseImg from "../../Assets/images/home/diamond-shapes-img/Marquise.png";
import heartImg from "../../Assets/images/home/diamond-shapes-img/Heart.png";
import pearImg from "../../Assets/images/home/diamond-shapes-img/Pear.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useHistory } from 'react-router-dom';
function ShopDiamondShape() {
var history = useHistory();
    var settings2 = {
        dots: false,
        infinite: true,
        centerMode: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
   const shopbyshape = (value) =>{
    var data1 = {
        shape: value,
    } 
    sessionStorage.setItem("rcs_d_filter", JSON.stringify(data1));
    history.push('/diamonds');
    window.scrollTo(0, 0);
    }

    return (
        <>
            <section className="rcs_ring_style_section mt-4">
                <Container className="rcs_custom_home_container">
                    <Row>
                        <Col md={12}>
                            <div className="rcs_shop_by_diamond_title">
                                <h2>
                                    shop diamonds by shape
                                </h2>
                            </div>
                        </Col>

                        <Col lg={12} className="p-0">
                            <div className="rcs_customer_review_slider">
                                <Slider className="rcs_customer_say_inner rcs_shop_diamond_slider" {...settings2}>

                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={RoundShape} alt="Round"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={roundImg} alt="Round" />
                                            </div>
                                            <h3> Round </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>Cut with the optimum light
                                                refraction and sparkle.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Round')}>  Shop Round diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={princess} alt="Princess"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={princessImg} alt="Princess"/>
                                            </div>
                                            <h3>  Princess  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>A contemporary cut, with optimal fire and brilliance.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Princess')}>  Shop Princess diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={cushion} alt="Cushion"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={cushionImg} alt="Cushion"/>
                                            </div>
                                            <h3>  Cushion  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p> With soft corners, a beautiful alternative to a round or princess cut.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Cushion')}>  Shop Cushion diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={emerald} alt="Emerald"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={emeraldImg} alt="Emerald"/>
                                            </div>
                                            <h3>  Emerald </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>This stylish cut creates rectangular facets that beautifully accentuate the stone's clarity.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Emerald')}>  Shop Emerald diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={oval} alt="Oval"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={ovalImg} alt="Oval"/>
                                            </div>
                                            <h3> Oval  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>Optimises carat, giving the illusion of a larger stone.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Oval')}>  Shop Oval diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={radiant} alt="Radiant"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={radiantImg} alt="Radiant"/>
                                            </div>
                                            <h3>  Radiant  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>The most brilliant of the rectangular cut diamonds.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Radiant')}>  Shop Radiant diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={asscher} alt="Asscher"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={asscherImg} alt="Asscher"/>
                                            </div>
                                            <h3>   Asscher   </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>This unique shape is a square emerald, with linear facets.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Asscher')}>  Shop Asscher diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={marquise} alt="Marquise"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={marquiseImg} alt="Marquise"/>
                                            </div>
                                            <h3>  Marquise  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>Elongate the finger of the wearer maintaining an appearance of great size and grandeur.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Marquise')}>  Shop Marquise diamonds  </Button>
                                        </div>
                                    </div>
                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={heart} alt="Heart"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={heartImg} alt="Heart"/>
                                            </div>
                                            <h3>  Heart  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>A rare cut that is a true testament of your relationship.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Heart')}>  Shop Heart diamonds  </Button>
                                        </div>
                                    </div>

                                    <div className="rcs_shop_by_diamond_box_main">
                                        <div className="rcs_shop_by_diamond_box_img">
                                            <div className="rcs_shop_by_diamond_box_img_size">
                                                <Image className="rcs_shop_by_diamond_box_img_static" src={pear} alt="Heart"/>
                                                <Image className="rcs_shop_by_diamond_box_img_hover" src={pearImg} alt="Heart"/>
                                            </div>
                                            <h3>  Pear  </h3>
                                        </div>
                                        <div className="rcs_shop_by_diamond_box_text">
                                            <p>Combining the brilliance and design of the Round and Marquise cuts.</p>
                                            <Button className="rcs_p_btn" onClick={()=> shopbyshape('Heart')}>  Shop Pear diamonds  </Button>
                                        </div>
                                    </div>
                                    
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}


export default ShopDiamondShape;
