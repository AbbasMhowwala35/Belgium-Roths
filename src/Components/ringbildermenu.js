import React, { useEffect, useState } from 'react'
import step1 from '../Assets/images/shapes/step-1.png';
import step2 from '../Assets/images/shapes/step-2.png';
import step3 from '../Assets/images/shapes/step-3.png';
import step11 from '../Assets/images/shapes/step-11.png';
import step22 from '../Assets/images/shapes/step-22.png';
import step33 from '../Assets/images/shapes/step-33.png';
import ring_setting from '../Assets/images/shapes/empty-ring.svg';
import diamond_setting from '../Assets/images/shapes/diamond.svg';
import complete_setting from '../Assets/images/shapes/diamond-ring.svg';
import { Col, Row, Image } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@material-ui/core';
import { currency } from '../Helpers/request';

const Diamond = ({ data, location, livestep }) => {
    const history = useHistory()
    return (<>
        <Image src={(window.location.pathname == "/diamonds" || window.location.pathname == "/diamonds/lab" || window.location.pathname?.includes("diamonds-details")) && location == 'diamond' ? livestep == "step1" ? step1 : step2 : livestep == "step1" ? step11 : step22} alt=''></Image>
        <div className="rcs_shape_wizard_content">
            <ul>
                <li className={(window.location.pathname == "/diamonds" || window.location.pathname == "/diamonds/lab" || window.location.pathname?.includes("diamonds-details")) && location == 'diamond' ? "rcs_setting_details active" : "rcs_setting_details"}>
                    <h2 style={{ cursor: 'pointer' }} onClick={() => data == null ? history.push('/diamonds') : history.push("/diamonds-details/" + data?.product_id)}>Choose a diamond</h2>
                    {data == null ? <NavLink to="/diamonds">Search</NavLink> : <>
                        <NavLink to={"/diamonds-details/" + data?.product_id}>View</NavLink> | <NavLink to="/diamonds" onClick={() => localStorage.removeItem('bw-diamonddata')}>Remove</NavLink></>}
                </li>
                <li className={(window.location.pathname == "/diamonds" || window.location.pathname == "/diamonds/lab" || window.location.pathname?.includes("diamonds-details")) && location == 'diamond' ? "rcs_setting_price active" : "rcs_setting_price"}>
                    {data != null ? <p>{currency}{Number(data?.price)}</p> : ""}
                </li>
                <li className="rcs_shape_wizard_img">
                    <Image src={data == null ? diamond_setting : data?.icon} alt="empty diamond setting"></Image>
                </li>
            </ul>
        </div>
    </>
    )
}

const Gemstone = ({ data, location, livestep }) => {
    const history = useHistory()
    return (
        <>
            <Image src={(window.location.pathname == "/gemstones" || window.location.pathname?.includes("gemstone-details")) && location == 'gemstone' ? livestep == "step1" ? step1 : step2 : livestep == "step1" ? step11 : step22} alt=''></Image>
            <div className="rcs_shape_wizard_content">
                <ul>
                    <li className={(window.location.pathname == "/gemstones" || window.location.pathname?.includes("gemstone-details")) && location == 'gemstone' ? "rcs_setting_details active" : "rcs_setting_details"}>
                        <h2 style={{ cursor: 'pointer' }} onClick={() => data == null ? history.push('/gemstones') : history.push("/gemstone-details/" + data?.product_id)}>Choose a gemstone</h2>
                        {data == null ? <NavLink to="/gemstones">Search</NavLink> : <>
                            <NavLink to={"/gemstone-details/" + data?.product_id}>View</NavLink> | <NavLink to="/gemstones" onClick={() => localStorage.removeItem('bw-gemstonedata')}>Remove</NavLink></>}
                    </li>
                    <li className={(window.location.pathname == "/gemstones" || window.location.pathname?.includes("gemstone-details")) && location == 'gemstone' ? "rcs_setting_price active" : "rcs_setting_price"}>
                        {data != null ? <p>{currency}{Number(data?.price)}</p> : ""}
                    </li>
                    <li className="rcs_shape_wizard_img">
                        <Image src={data == null ? diamond_setting : data?.icon} alt="empty diamond setting"></Image>
                    </li>
                </ul>
            </div>
        </>
    )
}

const Fancycolor = ({ data, location, livestep, fancyImg }) => {
    const history = useHistory()
    return (
        <>
            <Image src={(window.location.pathname == "/fancy-color-diamond" || window.location.pathname?.includes("fancy-color-diamond-detail")) && location == 'fancycolor' ? livestep == "step1" ? step1 : step2 : livestep == "step1" ? step11 : step22} alt=''></Image>
            <div className="rcs_shape_wizard_content">
                <ul>
                    <li className={(window.location.pathname == "/fancy-color-diamond" || window.location.pathname?.includes("fancy-color-diamond-detail")) && location == 'fancycolor' ? "rcs_setting_details active" : "rcs_setting_details"}>
                        <h2 style={{ cursor: 'pointer' }} onClick={() => data == null ? history.push('/fancy-color-diamond') : history.push("/fancy-color-diamond-detail/" + data?.product_id)}>Choose a Diamond</h2>
                        {data == null ? <NavLink to="/fancy-color-diamond">Search</NavLink> : <>
                            <NavLink to={"/fancy-color-diamond-detail/" + data?.product_id}>View</NavLink> | <NavLink to="/fancy-color-diamond" onClick={() => localStorage.removeItem('bw-fancycolordata')}>Remove</NavLink></>}
                    </li>
                    <li className={(window.location.pathname == "/fancy-color-diamond" || window.location.pathname?.includes("fancy-color-diamond-detail")) && location == 'fancycolor' ? "rcs_setting_price active" : "rcs_setting_price"}>
                        {data != null ? <p>{currency}{Number(data?.price)}</p> : ""}
                    </li>
                    <li className="rcs_shape_wizard_img">
                        <Image src={data == null ? diamond_setting : fancyImg} alt="empty diamond setting"></Image>
                    </li>
                </ul>
            </div>
        </>
    )
}

const Setting = ({ data, step, location, livestep }) => {
    const history = useHistory()
    return (
        <>
            <Image src={(window.location.pathname?.includes("ringsettings") || window.location.pathname?.includes("ringsettingdetail")) && location == 'setting' ? livestep == "step1" ? step1 : step2 : livestep == "step1" ? step11 : step22} alt=''></Image>
            <div className="rcs_shape_wizard_content">
                <ul>
                    <li className={(window.location.pathname?.includes("ringsettings") || window.location.pathname?.includes("ringsettingdetail")) && location == 'setting' ? "rcs_setting_details active" : "rcs_setting_details"}>
                        <h2 style={{ cursor: 'pointer' }} onClick={() => data == null ? history.push(window.location.pathname?.includes("gemstone-details") || window.location.pathname == "/gemstones" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/ringsettings/gemstones" ? "/ringsettings/gemstones" : window.location.pathname?.includes("fancy-color-diamond-detail") || window.location.pathname == "/fancy-color-diamond" || window.location.pathname == "/complete-fancycolor-ring" || window.location.pathname == "/ringsettings/fancycolor" ? "/ringsettings/fancycolor" : "/ringsettings/diamonds") :  history.push("/ringsettingdetail/setting/" + data?.slug)}>Choose a Setting</h2>
                        {data == null ? <NavLink to={window.location.pathname?.includes("gemstone-details") || window.location.pathname == "/gemstones" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/ringsettings/gemstones" ? "/ringsettings/gemstones" : window.location.pathname?.includes("fancy-color-diamond-detail") || window.location.pathname == "/fancy-color-diamond" || window.location.pathname == "/complete-fancycolor-ring"  || window.location.pathname == "/ringsettings/fancycolor" ? "/ringsettings/fancycolor" : "/ringsettings/diamonds"}>Search</NavLink> : <>
                            <NavLink to={"/ringsettingdetail/setting/" + data?.slug}>View</NavLink> | <NavLink to={JSON.stringify(step) == "[2,3]" || JSON.stringify(step) == "[3,2]" ? "/ringsettings/gemstones" : "/ringsettings"} onClick={() => localStorage.removeItem('bw-settingdata')}>Remove</NavLink></>}
                    </li>
                    <li className={(window.location.pathname?.includes("ringsettings") || window.location.pathname?.includes("ringsettingdetail")) && location == 'setting' ? "rcs_setting_price active" : "rcs_setting_price"}>
                        {data != null ? <p>{currency}{Number(data?.price)}</p> : ""}
                    </li>
                    <li className="rcs_shape_wizard_img">
                        <Image src={data == null ? ring_setting : data?.image} alt="emplty ring setting"></Image>
                    </li>
                </ul>
            </div>
        </>
    )
}
const Completering = ({ diamonddata, gemstonedata, settingdata,fancycolordata, step }) => {
    const history = useHistory();
    return (
        <>
            <Image src={(window.location.pathname == "/complete-diamond-ring" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/complete-fancycolor-ring") ? step3 : step33} alt=''></Image>
            <div className="rcs_shape_wizard_content">
                <ul>
                    <li className={(window.location.pathname == "/complete-diamond-ring" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/complete-fancycolor-ring") ? "rcs_setting_details active" : "rcs_setting_details"}>
                        <h2 onClick={() => (JSON.stringify(step) == "[2,3]" || JSON.stringify(step) == "[3,2]") ? gemstonedata != null && settingdata != null ? history.push('/complete-gemstone-ring') : "" : (JSON.stringify(step) == "[1,3]" || JSON.stringify(step) == "[3,1]") ? diamonddata != null && settingdata != null ? history.push('/complete-diamond-ring') : "" : fancycolordata != null && settingdata != null ? history.push('/complete-fancycolor-ring'):""}>Complete Ring</h2>
                        <NavLink to="#" style={{ textDecoration: 'unset', cursor: 'unset' }}>Review Your Ring</NavLink>
                    </li>
                    <li className="rcs_setting_price">
                        {(window.location.pathname?.includes("gemstone-details") || window.location.pathname == "/gemstones" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/ringsettings/gemstones" ? gemstonedata != null : diamonddata != null) && settingdata != null ? <p>{currency}{(JSON.stringify(step) == "[1,3]" || JSON.stringify(step) == "[3,1]") ? Number(diamonddata?.price) + Number(settingdata?.price) : Number(gemstonedata?.price) + Number(settingdata?.price)}</p> : ""}
                    </li>
                    <li className="rcs_shape_wizard_img">
                        <Image src={complete_setting} alt="emplty ring setting"></Image>
                    </li>
                </ul>
            </div>
        </>
    )
}

const MobileSetting = ({ data, step, location, livestep, showname , showset }) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    return (
        <>
            <div className={(window.location.pathname?.includes("ringsettings") || window.location.pathname?.includes("ringsettingdetail")) && location == 'setting' ? livestep == "step1" ? "steps-1-2-3-block active" : "steps-1-2-3-block active" : livestep == "step1" ? "steps-1-2-3-block " : "steps-1-2-3-block "}>
                <div className="d-flex step">
                    {data != null ? <span className="title" onClick={() => showset()}><strong >Setting <CheckIcon className='rcs_mobile_check' /></strong></span> :
                        <span className="title" onClick={() => (JSON.stringify(step) == "[2,3]" || JSON.stringify(step) == "[3,2]") ? history.push("/ringsettings/gemstones") : (JSON.stringify(step) == "[0,3]" || JSON.stringify(step) == "[3,0]") ? history.push("/ringsettings/fancycolor") : history.push("/ringsettings/diamonds")}> <strong>Setting </strong>
                        </span>}
                    <span className="rhombus"></span>
                    <span className="rhombus-top"></span>
                </div>
                { showname == "setting" ?
                    <div className='rcs_mobile_setting_details'>
                        <ul>
                            <li><Image src={data == null ? ring_setting : data?.image}></Image></li>
                            <li>
                                <div className='rcs_mobile_setting_content'>
                                    <p>{data != null ? <strong> {currency}{Number(data?.price)}</strong> : ""}</p>
                                    <ul>
                                        <li><Button variant="contained" onClick={() => history.push("/ringsettingdetail/setting/" + data?.slug)}>View</Button></li>
                                        <li><Button variant="contained" onClick={() => { localStorage.removeItem('bw-settingdata'); history.push(window.location.pathname?.includes("gemstone-details") || window.location.pathname == "/gemstones" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/ringsettings/gemstones" ? "/ringsettings/gemstones" : window.location.pathname?.includes("fancy-color-diamond-detail") || window.location.pathname == "/fancy-color-diamond" || window.location.pathname == "/complete-fancycolor-ring" || window.location.pathname == "/ringsettings/fancycolor" ? "/ringsettings/fancycolor" : "/ringsettings/diamonds") }}>Remove</Button></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div> : ""}
            </div>
        </>
    )
}

const MobileFancycolor = ({ data, livestep, location, showname , showset,fancyImg }) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    return (
        <>
            <div className={(window.location.pathname == "/fancy-color-diamond" || window.location.pathname?.includes("fancy-color-diamond-detail")) && location == 'fancycolor' ? livestep == "step1" ? "steps-1-2-3-block active" : "steps-1-2-3-block active" : livestep == "step1" ? "steps-1-2-3-block " : "steps-1-2-3-block "}>
                <div className="d-flex step">
                    {data != null ? <span className="title" onClick={() => showset()}><strong>Diamond <CheckIcon className='rcs_mobile_check' /></strong></span> :
                        <span className="title" onClick={() => history.push("/fancy-color-diamond")}><strong>Diamond </strong></span>}

                    <span className="rhombus"></span>
                    <span className="rhombus-top"></span>
                </div>
                { showname == "fancycolor" ? <div className='rcs_mobile_setting_details'>
                    <ul>
                        <li><Image src={data == null ? diamond_setting : fancyImg} ></Image></li>
                        <li>
                            <div className='rcs_mobile_setting_content'>
                                <p>{data != null ? <strong> {currency}{Number(data?.price)}</strong> : ""}</p>
                                <ul>
                                    <li><Button variant="contained" onClick={() => history.push("/fancy-color-diamond-detail/" + data?.product_id)}>View</Button></li>
                                    <li><Button variant="contained" onClick={() => { localStorage.removeItem('bw-fancycolordata'); history.push("/fancy-color-diamond"); }}>Remove</Button></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div> : ""}
            </div>
        </>
    )
}
const MobileDiamond = ({ data, livestep, location, showname , showset }) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    return (
        <>
            <div className={(window.location.pathname == "/diamonds" || window.location.pathname == "/diamonds/lab" || window.location.pathname?.includes("diamonds-details")) && location == 'diamond' ? livestep == "step1" ? "steps-1-2-3-block active" : "steps-1-2-3-block active" : livestep == "step1" ? "steps-1-2-3-block " : "steps-1-2-3-block "}>
                <div className="d-flex step">
                    {data != null ? <span className="title" onClick={() => showset()}><strong>Diamond <CheckIcon className='rcs_mobile_check' /></strong></span> :
                        <span className="title" onClick={() => history.push("/diamonds")}><strong>Diamond </strong></span>}

                    <span className="rhombus"></span>
                    <span className="rhombus-top"></span>
                </div>
                { showname == "diamond" ? <div className='rcs_mobile_setting_details'>
                    <ul>
                        <li><Image src={data == null ? diamond_setting : data?.icon} ></Image></li>
                        <li>
                            <div className='rcs_mobile_setting_content'>
                                <p>{data != null ? <strong> {currency}{Number(data?.price)}</strong> : ""}</p>
                                <ul>
                                    <li><Button variant="contained" onClick={() => history.push("/diamonds-details/" + data?.product_id)}>View</Button></li>
                                    <li><Button variant="contained" onClick={() => { localStorage.removeItem('bw-diamonddata'); history.push("/diamonds"); }}>Remove</Button></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div> : ""}
            </div>
        </>
    )
}
const MobileGemstone = ({ data, livestep, location, showname , showset }) => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    return (
        <>
            <div className={(window.location.pathname == "/gemstones" || window.location.pathname?.includes("gemstone-details")) && location == 'gemstone' ? livestep == "step1" ? "steps-1-2-3-block active" : "steps-1-2-3-block active" : livestep == "step1" ? "steps-1-2-3-block" : "steps-1-2-3-block"}>
                <div className="d-flex step">
                    {/* <span className="step-number"></span> */}
                    {data != null ? <span className="title" onClick={() => showset()}><strong>Gemstone <CheckIcon className='rcs_mobile_check' /></strong></span> :
                        <span className="title" onClick={() => history.push("/gemstones")}><strong>Gemstone </strong></span>}
                    <span className="rhombus"></span>
                    <span className="rhombus-top"></span>
                </div>
                { showname == "gemstone" ? <div className='rcs_mobile_setting_details'>
                    <ul>
                        <li><Image src={data == null ? diamond_setting : data?.icon}></Image></li>
                        <li>
                            <div className='rcs_mobile_setting_content'>
                                <p>{data != null ? <strong> {currency}{Number(data?.price)}</strong> : ""}</p>
                                <ul>
                                    <li><Button variant="contained" onClick={() => history.push("/gemstone-details/" + data?.product_id)}>View</Button></li>
                                    <li><Button variant="contained" onClick={() => { localStorage.removeItem('bw-diamonddata'); history.push("/gemstones"); }}>Remove</Button></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div> : ""}
            </div>
        </>
    )
}
const MobileComplete = ({ diamonddata, gemstonedata, settingdata, fancycolordata, step, showset }) => {
    const history = useHistory();
    return (
        <div onClick={()=> showset()} className={(window.location.pathname == "/complete-diamond-ring" || window.location.pathname == "/complete-gemstone-ring" || window.location.pathname == "/complete-fancycolor-ring") ? "steps-1-2-3-block active" : "steps-1-2-3-block"} style={{ overflow: "hidden" }}>
            <div className="d-flex step">
                <span className="step-number"></span>
                <span className="title" onClick={() => (JSON.stringify(step) == "[2,3]" || JSON.stringify(step) == "[3,2]") ? gemstonedata != null && settingdata != null ? history.push('/complete-gemstone-ring') : "" : JSON.stringify(step) == "[1,3]" || JSON.stringify(step) == "[3,1]" ? diamonddata != null && settingdata != null ? history.push('/complete-diamond-ring') : "": fancycolordata != null && settingdata != null ? history.push('/complete-fancycolor-ring'):"" }>
                    <strong>Complete </strong>
                </span>
                <span className="rhombus hide"></span>
                <span className="rhombus-top hide"></span>
            </div>
        </div>
    )
}
export default function Ringbildermenu(props) {
    const [showname,setShowname] = useState("");
    const [step, setStep] = useState(JSON.parse(sessionStorage.getItem('bw-step')) ? JSON.parse(sessionStorage.getItem('bw-step')) : [1, 3]);
    const [diamonddata, setDiamonddata] = useState(JSON.parse(localStorage.getItem('bw-diamonddata')) ? JSON.parse(localStorage.getItem('bw-diamonddata')) : null);
    const [settingdata, setSettingdata] = useState(JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata')) : null);
    const [gemstonedata, setGemstonedata] = useState(JSON.parse(localStorage.getItem('bw-gemstonedata')) ? JSON.parse(localStorage.getItem('bw-gemstonedata')) : null);
    const [fancycolordata, setFancycolordata] = useState(JSON.parse(localStorage.getItem('bw-fancycolordata')) ? JSON.parse(localStorage.getItem('bw-fancycolordata')) : null);
    const [fancyImg, setFancyImg] = useState(JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.img ? JSON.parse(sessionStorage.getItem("rcs_f_filter"))?.img : "https://showcase.belgiumwebnet.com/webapi/assets/images/fancy_diamond/color/round/yellow.png");

    useEffect(() => {
        setStep(JSON.parse(sessionStorage.getItem('bw-step')) ? JSON.parse(sessionStorage.getItem('bw-step')) : [1, 3])
        setDiamonddata(JSON.parse(localStorage.getItem('bw-diamonddata')) ? JSON.parse(localStorage.getItem('bw-diamonddata')) : null);
        setSettingdata(JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata')) : null);
        setGemstonedata(JSON.parse(localStorage.getItem('bw-gemstonedata')) ? JSON.parse(localStorage.getItem('bw-gemstonedata')) : null);
        setFancycolordata(JSON.parse(localStorage.getItem('bw-fancycolordata')) ? JSON.parse(localStorage.getItem('bw-fancycolordata')) : null);
    }, [sessionStorage.getItem('bw-step'), localStorage.getItem('bw-diamonddata'), localStorage.getItem('bw-settingdata'), localStorage.getItem('bw-gemstonedata'),localStorage.getItem('bw-fancycolordata'), window.location.pathname])
    return (
        <>
            <div className="rcs_shape_wizard mt-3 mb-3 d-md-block d-none">
                <Row>
                    <Col xs={4} className="rcs_shpae_padding">
                        <div className="rcs_shape_wizard_step-2">
                            {step[0] == 1 ? <Diamond data={diamonddata} step={step} livestep={'step1'} location={props.location} /> : step[0] == 2 ? <Gemstone data={gemstonedata} step={step} livestep={'step1'} location={props.location} /> : step[0] == 0 ? <Fancycolor data={fancycolordata} step={step} livestep={'step1'} location={props.location} fancyImg={fancyImg}/> : <Setting data={settingdata} step={step} livestep={'step1'} location={props.location} />}
                        </div>
                    </Col>
                    <Col xs={4} className="rcs_shpae_padding">
                        <div className="rcs_shape_wizard_step-1">
                            {step[1] == 1 ? <Diamond data={diamonddata} step={step} livestep={'step2'} location={props.location} /> : step[1] == 2 ? <Gemstone data={gemstonedata} step={step} livestep={'step2'} location={props.location} /> : step[1] == 0 ? <Fancycolor data={fancycolordata} step={step} livestep={'step2'} location={props.location} fancyImg={fancyImg} /> : <Setting data={settingdata} step={step} livestep={'step2'} location={props.location} />}
                        </div>
                    </Col>
                    <Col xs={4} className="rcs_shpae_padding">
                        <div className="rcs_shape_wizard_step-3">
                            <Completering diamonddata={diamonddata} gemstonedata={gemstonedata} settingdata={settingdata} fancycolordata={fancycolordata} step={step} />
                        </div>
                    </Col>
                </Row>
            </div>
            <Row className='m-auto w-100 d-block d-md-none position-relative'>
                <div className="d-flex widget text-left w-100 mb-20 widget erd-steps">
                    {step[0] == 1 ? <MobileDiamond data={diamonddata} step={step} showname={showname} showset={()=> showname == "diamond"? setShowname("") : setShowname('diamond')} livestep={'step1'} location={props.location} /> : step[0] == 2 ? <MobileGemstone data={gemstonedata} step={step} showname={showname} showset={()=> showname == "gemstone"? setShowname("") : setShowname("gemstone")} livestep={'step1'} location={props.location} /> : step[0] == 0 ? <MobileFancycolor data={fancycolordata} step={step} showname={showname} showset={()=> showname == "fancycolor"? setShowname("") : setShowname('fancycolor')} livestep={'step1'} location={props.location} fancyImg={fancyImg} /> : <MobileSetting data={settingdata} step={step} showname={showname} showset={()=> showname == "setting"? setShowname("") : setShowname("setting")} livestep={'step1'} location={props.location} />}
                    {step[1] == 1 ? <MobileDiamond data={diamonddata} step={step} showname={showname} showset={()=> showname == "diamond"? setShowname("") : setShowname('diamond')} livestep={'step2'} location={props.location} /> : step[1] == 2 ? <MobileGemstone data={gemstonedata} step={step} showname={showname} showset={()=> showname == "gemstone"? setShowname("") : setShowname("gemstone")} livestep={'step2'} location={props.location} /> :step[1] == 0 ? <MobileFancycolor data={fancycolordata} step={step} showname={showname} showset={()=> showname == "fancycolor"? setShowname("") : setShowname('fancycolor')} livestep={'step1'} location={props.location} fancyImg={fancyImg} /> : <MobileSetting data={settingdata} step={step} showname={showname} showset={()=> showname == "setting"? setShowname("") : setShowname("setting")} livestep={'step2'} location={props.location} />}
                    <MobileComplete diamonddata={diamonddata} gemstonedata={gemstonedata} settingdata={settingdata} fancycolordata={fancycolordata} step={step} showset={()=>setShowname("")} />
                </div>
            </Row>
        </>
    )
}
