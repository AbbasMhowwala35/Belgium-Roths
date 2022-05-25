import React from 'react';
import { Container, NavLink } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import google_icon from "../../Assets/images/google_icon.svg";
import rcs_quote_new from "../../Assets/images/home/quote.png";
import yelp_icon from "../../Assets/images/home/yelp.png";
import dummy_user from "../../Assets/images/home/dummy_user.png";
import { useHistory } from 'react-router-dom';

const Testimonial = () => {
    const history = useHistory();
    var settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        accessibility: true,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
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
    return (
        <>
            <div className="rcs_testimonials">
                <Container>
                    <h5 className="text-center"> WHAT OUR CLIENTS SAY </h5>
                    <Slider className="rcs_testimonial_inner" {...settings2}>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img class="google_rev_img" src={google_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>I have been a client of Belgium Webnet for several years and appreciate the exceptional service and value received. Last year,
                                I made my first big purchase, followed by repairing several pieces...
                            </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img className="rcs_usercircle" src="https://lh3.googleusercontent.com/a-/AOh14GhU0LSDscb0v_UfKgVKEsosHZbH3t5CjhYNq-Tc=w60-h60-p-rp-mo-br100" />
                                <div className="rcs_testi_user"> <h4>Reema Hagez</h4> </div> </NavLink>
                        </div>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img class="google_rev_img" src={google_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>My go-to jewelry store in the Charlotte area! Always VERY friendly and helpful.  All price ranges.  Nice estate section.  Perfect repair work, done quickly.  Highly recommend...  </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img className="rcs_usercircle" src={dummy_user} />
                                <div className="rcs_testi_user"> <h4>Stephanie Blaine</h4> </div> </NavLink>
                        </div>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.yelp.com/biz/InnQkf4j02mnQUXJOtqqJw?hrid=_ZaWFPeDH1lUhWrNJZ6zrg&rh_ident=sam&rh_type=phrase/", "_blank")} to='#'>
                            <img class="google_rev_img" src={yelp_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>As a native Charlottean, I've been to many various jewelers thru the years for jewelry repair, watch batteries, ring cleaning, selling gold,
                                and having custom jewelry designed. ...
                            </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.yelp.com/biz/InnQkf4j02mnQUXJOtqqJw?hrid=_ZaWFPeDH1lUhWrNJZ6zrg&rh_ident=sam&rh_type=phrase", "_blank")} to='#'>
                                <img className="rcs_usercircle" src={dummy_user} />
                            </NavLink>
                            <div className="rcs_testi_user"> <h4>Emily H.</h4> </div>
                        </div>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.yelp.com/biz/InnQkf4j02mnQUXJOtqqJw?hrid=u-niHA_hXScxw3NZ1H78iA&rh_type=phrase&rh_ident=asaad", "_blank")} to='#'>
                                <img class="google_rev_img" src={yelp_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>This is my favorite jewelry store in Charlotte! The staff is very friendly and the owner, Asaad, goes above and beyond to help. They have a huge selection of engagement rings...
                            </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.yelp.com/biz/InnQkf4j02mnQUXJOtqqJw?hrid=u-niHA_hXScxw3NZ1H78iA&rh_type=phrase&rh_ident=asaad", "_blank")} to='#'>
                                <img className="rcs_usercircle" src={dummy_user} /> </NavLink>
                            <div className="rcs_testi_user"> <h4>Scarlett S.</h4> </div>
                        </div>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img class="google_rev_img" src={google_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>My experience with Belgium Webnet was great from start to finish. Sam was very patient and helped me find just what
                                I was looking for. Mr. Malak was a joy to work with as well...  </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img className="rcs_usercircle" src="https://lh3.googleusercontent.com/a-/AOh14GivdOLKCsSZHKqKdvW-aLbGR8OceN63WIZdDvikSQ=w60-h60-p-rp-mo-br100" />
                                <div className="rcs_testi_user"> <h4>Anna Fenno</h4> </div> </NavLink>
                        </div>
                        <div className="rcs_testi_item">
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img class="google_rev_img" src={google_icon} /> </NavLink>
                            <img className="rcs_quote" src={rcs_quote_new} />
                            <p>I have had two occasions to use Belgium Webnet for custom work. Their desire to provide 100% satisfaction and attention to detail is outstanding....  </p>
                            <div className="rcs_test_star">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <NavLink onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")} to='#'>
                                <img className="rcs_usercircle" src="https://lh3.googleusercontent.com/a-/AOh14GhOUPYNqDPaHmjVtmwwvPvNiMYo2cBKV_2HQj_R=w60-h60-p-rp-mo-br100" /> </NavLink>
                            <div className="rcs_testi_user"> <h4>Anna Fenno</h4> </div>
                        </div>
                    </Slider>
                    <div className="rcs_google_review"> <div className="text-center" onClick={() => window.open("https://www.google.com/search?q=malak+jewelers&oq=malak+jewelers&aqs=chrome..69i57j46i175i199i512j0i22i30j69i60l3.1976j0j7&sourceid=chrome&ie=UTF-8#lrd=0x88542710fc7ccdd7:0x70a87d37ffa60fdd,1,,,", "_blank")}> <span className="nowrap"><strong>Google</strong>  rating score: </span><span className="nowrap"><strong>5.0</strong> of 5, </span><span className="nowrap">based on <strong>965 reviews</strong>.</span> </div> </div>
                </Container>
            </div>
        </>
    )
}

export default Testimonial;