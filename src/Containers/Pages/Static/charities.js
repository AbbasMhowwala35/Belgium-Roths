import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import "../../../Assets/css/mjstatic.css"
import CharitiesImage1 from "../../../Assets/images/static/charities/American_Heart_Association.jpg";
import CharitiesImage2 from "../../../Assets/images/static/charities/Central_Church_of_God.jpg";
import CharitiesImage3 from "../../../Assets/images/static/charities/Charlotte_catholic_high.jpg";
import CharitiesImage4 from "../../../Assets/images/static/charities/ChildrensCharity.png";
import CharitiesImage5 from "../../../Assets/images/static/charities/Hadassah_charlotte.jpg";
import CharitiesImage6 from "../../../Assets/images/static/charities/Harpers_Hope.jpg";
import CharitiesImage7 from "../../../Assets/images/static/charities/Jewelers_for_Veterans_Foundation.jpg";
import CharitiesImage8 from "../../../Assets/images/static/charities/Red_view_elementary.jpg";
import CharitiesImage9 from "../../../Assets/images/static/charities/St_gabriel_catholicchurch.jpg";
import CharitiesImage10 from "../../../Assets/images/static/charities/St_Jude_Children_s.jpg";
import CharitiesImage11 from "../../../Assets/images/static/charities/St_Matthew.jpg";
import CharitiesImage12 from "../../../Assets/images/static/charities/st_nektarios_greek_orthodox_church.jpg";
import CharitiesImage13 from "../../../Assets/images/static/charities/SusanG_Komen.jpg";
import CharitiesImage14 from "../../../Assets/images/static/charities/Temple_Bethel.jpg";
import CharitiesImage15 from "../../../Assets/images/static/charities/Toysfortots.jpg";
import CharitiesImage16 from "../../../Assets/images/static/charities/Shalom_Symbol1.png";
import CharitiesImage17 from "../../../Assets/images/static/charities/RonaldMcDonaldAlternate.png";
import { Helmet } from 'react-helmet';

const Charities = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Charities</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_charities_banner">
            </div>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="rcs_charities_content mt-5 mb-5">
                            <h1>WE BELIEVE IN GIVING BACK </h1>
                            <p>In addition to helping couples find the perfect engagement rings and wedding bands, Belgium Webnet donates time and money to support local charities. It is our responsibility and privilege to give back to the community that has given so much to us.</p>
                            <p>Not only does a percentage of every diamond we purchase go towards a program that feeds, houses, and educates people of all ages and backgrounds in and outside of the U.S., but we seek to support local non-profit charities in our community within Charlotte, NC.</p>
                            <p>The organizations we are committed to include the Susan G. Komen Foundation, St. Jude's Children's Research Hospital, the American Heart Association, Jewelers for Veterans Foundation, and many more.</p>
                        </div>
                        <ul className="rcs_charities_list">
                            <li onClick={() => window.open("https://www.heart.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.heart.org/","_blank")}><Image src={CharitiesImage1} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("/","_blank")}><NavLink to="#" onClick={() => window.open("/","_blank")}><Image src={CharitiesImage2} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.charlottecatholic.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.charlottecatholic.org/","_blank")}><Image src={CharitiesImage3} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://jewelersforchildren.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://jewelersforchildren.org/","_blank")}><Image src={CharitiesImage4} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.hadassah.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.hadassah.org/","_blank")}><Image src={CharitiesImage5} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://hope41.com/","_blank")}><NavLink to="#" onClick={() => window.open("https://hope41.com/","_blank")}><Image src={CharitiesImage6} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.facebook.com/JewelersForVeterans/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.facebook.com/JewelersForVeterans/","_blank")}><Image src={CharitiesImage7} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.ucps.k12.nc.us/reaview","_blank")}><NavLink to="#" onClick={() => window.open("https://www.ucps.k12.nc.us/reaview","_blank")}><Image src={CharitiesImage8} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("/","_blank")}><NavLink to="#"><Image src={CharitiesImage9} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.stjude.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.stjude.org/","_blank")}><Image src={CharitiesImage10} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://stmatthewcatholic.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://stmatthewcatholic.org/","_blank")}><Image src={CharitiesImage11} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.stnektarios.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.stnektarios.org/","_blank")}><Image src={CharitiesImage12} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.komen.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.komen.org/","_blank")}><Image src={CharitiesImage13} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://templebethel.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://templebethel.org/","_blank")}><Image src={CharitiesImage14} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.toysfortots.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.toysfortots.org/","_blank")}><Image src={CharitiesImage15} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://shalomcharlotte.com/","_blank")}><NavLink to="#" onClick={() => window.open("https://shalomcharlotte.com/","_blank")}><Image src={CharitiesImage16} alt=""></Image></NavLink></li>
                            <li onClick={() => window.open("https://www.rmhofcharlotte.org/","_blank")}><NavLink to="#" onClick={() => window.open("https://www.rmhofcharlotte.org/","_blank")}><Image src={CharitiesImage17} alt=""></Image></NavLink></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Charities;