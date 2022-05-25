import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Solitaire from '../../Assets/images/engagement/solitaire_ring.png';
import Pave from '../../Assets/images/engagement/pave_ring.png';
import Halo from '../../Assets/images/engagement/halo_ring.png';
import Vintage from '../../Assets/images/engagement/vintage_ring.png';
import ThreeStone from '../../Assets/images/engagement/three_stone_ring.png';
import ChannelSet from '../../Assets/images/engagement/single_row_ring.png';
import Multirow from '../../Assets/images/engagement/multirow_ring.png';
import Bypass from '../../Assets/images/engagement/bypass_ring.png';
import SideStone from '../../Assets/images/engagement/side_stone_ring.png';
import other from '../../Assets/images/engagement/trellis_ring.png';
import { useHistory } from 'react-router-dom';

const RingStyle = () => {
    var history = useHistory();

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
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
    const shopbystyle = (value) =>{
        var data1 = {
            style: value,
        }
        sessionStorage.setItem("rcs_s_filter", JSON.stringify(data1));
        history.push('/ringsettings/diamonds');
        }
    return (
        <>
            <Container className='rcs_custom_home_container mt-3' >
                <div className='rcs_ringstyle'>
                    <Slider {...settings}>
                        <div className='rcs_ringstyle_content'>
                            <Image src={Solitaire} alt='Solitaire' onClick={()=> shopbystyle('Solitaire')}></Image>
                            <h2  onClick={()=> shopbystyle('Solitaire')}>Solitaire</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Pave')} src={Pave} alt='Pave'></Image>
                            <h2 onClick={()=> shopbystyle('Pave')}>Pave</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Halo')} src={Halo} alt='Halo'></Image>
                            <h2 onClick={()=> shopbystyle('Halo')}>Halo</h2>
                        </div>
                        {/* <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Vintage')} src={Vintage} alt='Vintage'></Image>
                            <h2 onClick={()=> shopbystyle('Vintage')}>Vintage</h2>
                        </div> */}
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Three stone')} src={ThreeStone} alt='Three Stone'></Image>
                            <h2 onClick={()=> shopbystyle('Three stone')}>Three Stone</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Channel Set')} src={ChannelSet} alt='Channel Set'></Image>
                            <h2 onClick={()=> shopbystyle('Channel Set')}>Channel Set</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Multirow')} src={Multirow} alt='Multirow'></Image>
                            <h2 onClick={()=> shopbystyle('Multirow')}>Multirow</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Bypass')} src={Bypass} alt='Bypass'></Image>
                            <h2 onClick={()=> shopbystyle('Bypass')}>Bypass</h2>
                        </div>
                        <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Side stone')} src={SideStone} alt='Side-stone'></Image>
                            <h2 onClick={()=> shopbystyle('Side stone')}>Side Stone</h2>
                        </div>
                        {/* <div className='rcs_ringstyle_content' >
                            <Image onClick={()=> shopbystyle('Other')} src={other} alt='other'></Image>
                            <h2 onClick={()=> shopbystyle('Other')}>Other</h2>
                        </div> */}
                    </Slider>
                </div>
            </Container>
        </>
    );
}

export default RingStyle;