import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '../src/Assets/css/custome.css';
import '../src/Assets/css/color.css';
import home from './Containers/Front/Home';
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/footer';
import Productlist from './Containers/Shopping/productlist';
import { base_url, getData, isLogin, postHeader, ProtectedRoutes, user } from './Helpers/request';
import { useLayoutEffect, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Myaccount from './Containers/Pages/Myaccount';
import Register from './Containers/Pages/Register';
import Productdetails from './Containers/Shopping/productDetails';
import Invoice from './Containers/Pages/invoice';
import Cart from './Containers/Pages/cart';
import Services from './Containers/Pages/Static/Services';
import Checkout from './Containers/Pages/checkout';
import customDesigns from './Containers/Pages/Static/customDesigns';
import Financing from './Containers/Pages/Static/financing';
import Education from './Containers/Pages/Static/education';
import EducationGoldBuying from './Containers/Pages/Static/education-gold-buying';
import EducationDiamondBuying from './Containers/Pages/Static/education-diamond-buying';
import EducationJewelryCare from './Containers/Pages/Static/education-jewelry-care';
import EducationMetals from './Containers/Pages/Static/education-metals';
import EducationGemstones from './Containers/Pages/Static/education-gemstones';
import EducationSettings from './Containers/Pages/Static/education-settings';
import EducationDiamonds from './Containers/Pages/Static/education-diamonds';
import MakeAnAppointment from './Containers/Pages/make-an-appointment';
import PressMedia from './Containers/Pages/Static/press-media';
import Charities from './Containers/Pages/Static/charities';
import Testimonials from './Containers/Pages/Static/testimonials';
import Contact from './Containers/Pages/Static/contact';
import ResponsibleSourcing from './Containers/Pages/Static/responsible-sourcing';
import WarrantyGuarantees from './Containers/Pages/Static/warranty-and-guarantees';
import MilitaryDiscount from './Containers/Pages/Static/military-discount';
import Careers from './Containers/Pages/Static/careers';
import ReturnsExchanges from './Containers/Pages/Static/returns-and-exchanges';
import PrivacyPolicy from './Containers/Pages/Static/privacy-policy';
import TermsConditions from './Containers/Pages/Static/terms-and-conditions';
import MissionVision from './Containers/Pages/Static/mission-and-vision';
import AdaCompliance from './Containers/Pages/Static/ada-compliance';
import SellYourJewelry from './Containers/Pages/Static/sell-your-jewelry';
import Insurance from './Containers/Pages/Static/insurance';
import GiftGuide from './Containers/Pages/Static/gift-guide';
import OurStory from './Containers/Pages/Static/our-story';
import IndianJewelry from './Containers/Pages/Static/indian-jewelry';
import Blog from './Containers/Pages/Static/blog';
import { CircularProgress } from '@mui/material';
import { ordersuccess } from './Containers/Pages/Static/ordersuccess';
import { Navigate, Router } from 'react-router';
import NoPage from "./Containers/Pages/Static/NoPage"
import GotoTop from './Containers/Pages/Static/GotoTop';
import Wishlist from './Containers/Pages/wishlist';
import blogDetails from './Containers/Pages/Static/blogDetails';
import PressMediaDetails from './Containers/Pages/Static/press-media-details';
import RingSettings from './Containers/Shopping/ringsettings';
import RingSettingsDiamonds from './Containers/Shopping/ringsettings-diamonds';
import RingSettingsDiamondsDetails from './Containers/Shopping/ringsettings-diamonds-details';
import Gemstones from './Containers/Shopping/gemstone';
import CompleteRing from './Containers/Shopping/complete-ring';
import GemstonesDetails from './Containers/Shopping/gemstone-details';
import EducationalBlog from './Containers/Pages/Static/EducationalBlog';
import FancyColorDiamond from './Containers/Shopping/FancyColorDiamond';
import Fancycolordetail from './Containers/Shopping/fancy-detail';
import FAQ from './Containers/Pages/Static/faq';
const App = () => {
  const routePath = useHistory();
  const [dropdown, setDropdown] = useState();    
  const [currencydata, setCurrencydata] = useState([]);
  const [menudata, setMenudata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingbanner, setLoadingbanner] = useState(true);

  useLayoutEffect(() => {
    if (localStorage.getItem("bw-session-id")?.length || isLogin) {
      console.log("session exist!")
    } else {
      axios.get(base_url + '/home/getsessionid')
        .then(res => {
          if (res.data.status == 1) {
            localStorage.setItem("bw-session-id", res.data.data?.session_id)
          } else {
            // toast.error(res.message,{autoClose: 3000});
            console.log("sessionid not generated")
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    //-----------------------------------menu
    axios.get(base_url + '/home/menu', {
      headers: postHeader
    })
      .then(response => {
        if (response.data.status == 1) {
          setMenudata(response.data.data);
          setLoading(false);
        } else {
          toast.error(response.message, { autoClose: 3000 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //-----------------------------------Banner
    axios.get(base_url + `/home/slider`, {
      headers: postHeader
    })
      .then(response => {
        if (response.data.status == 1) {
          localStorage.setItem("bw-bannerdata", JSON.stringify(response.data.data));
          setLoadingbanner(false);
        } else {
          toast.error(response.message, { autoClose: 3000 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      // currency api
      axios.get(base_url + '/common/currency')
        .then(res => {
            if (res.data.status == 1) {
                setCurrencydata(res.data.data);
                localStorage.getItem("bw-currency") ? localStorage.getItem("bw-currency") : localStorage.setItem("bw-currency", res.data.data[0]?.currency_code);
                localStorage.getItem("bw-currency_img") ? localStorage.getItem("bw-currency_img") : localStorage.setItem("bw-currency_img", res.data.data[0]?.country_flag);
                localStorage.getItem("bw-currencyicon") ? localStorage.getItem("bw-currencyicon") : localStorage.setItem("bw-currencyicon", res.data.data[0]?.currency_icon);
                setDropdown({
                    img: localStorage.getItem("bw-currency_img"),
                    icon: localStorage.getItem("bw-currencyicon"),
                    code: localStorage.getItem("bw-currency")
                })
            } else {
                console.log(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
  }, []);  
  
  if (loading || loadingbanner) {
    return <div className="gs_loader1">
      <CircularProgress />
    </div>
  }
  if (isLogin) {
    return (
      <>
        <BrowserRouter>
          <Header menudata={menudata} currencydata={currencydata} />
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/account/:value" component={Myaccount} />
            <Route path="/invoice/:order_id" component={Invoice} />
            <Route path="/jewelry/:listcategory" component={Productlist} />
            <Route path="/ringsettings" component={RingSettings} />
            <Route path="/ringsettings/:stone" component={RingSettings} />
            <Route path="/ringsettingdetail/:id/:slug" component={Productdetails} />
            <Route path="/gemstones" component={Gemstones} />
            <Route path="/fancy-color-diamond" component={FancyColorDiamond} />
            <Route path="/fancy-color-diamond-detail/:stock_no" component={Fancycolordetail} />
            <Route path="/diamonds" component={RingSettingsDiamonds} />
            <Route path="/diamonds/lab" component={RingSettingsDiamonds} />
            <Route path="/diamonds-details/:stock_no" component={RingSettingsDiamondsDetails} />
            <Route path="/gemstone-details/:stock_no" component={GemstonesDetails} />
            <Route path="/complete-diamond-ring" component={CompleteRing} />
            <Route path="/complete-gemstone-ring" component={CompleteRing} />
            <Route path="/complete-fancycolor-ring" component={CompleteRing} />
            <Route path="/search/:search_text" component={Productlist} />
            <Route path="/services" component={Services} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout-shipping" component={Checkout} />
            <Route path="/custom-design" component={customDesigns} />
            <Route path="/financing" component={Financing} />
            <Route path="/education" component={Education} />
            <Route path="/education-gold-buying" component={EducationGoldBuying} />
            <Route path="/education-diamond-buying" component={EducationDiamondBuying} />
            <Route path="/education-jewelry-care" component={EducationJewelryCare} />
            <Route path="/education-metals" component={EducationMetals} />
            <Route path="/education-gemstones" component={EducationGemstones} />
            <Route path="/education-settings" component={EducationSettings} />
            <Route path="/education-diamonds" component={EducationDiamonds} />
            <Route path="/make-an-appointment" component={MakeAnAppointment} />
            <Route path="/press-media" component={PressMedia} />
            <Route path="/press-media-details/:id" component={PressMediaDetails} />
            <Route path="/charities" component={Charities} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/contact" component={Contact} />
            <Route path="/responsible-sourcing" component={ResponsibleSourcing} />
            <Route path="/warranty-and-guarantees" component={WarrantyGuarantees} />
            <Route path="/military-discount" component={MilitaryDiscount} />
            <Route path="/careers" component={Careers} />
            <Route path="/returns-and-exchanges" component={ReturnsExchanges} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsConditions} />
            <Route path="/mission-and-vision" component={MissionVision} />
            <Route path="/ada-compliance" component={AdaCompliance} />
            <Route path="/sell-your-jewelry" component={SellYourJewelry} />
            <Route path="/insurance" component={Insurance} />
            <Route path="/2021-gift-guide" component={GiftGuide} />
            <Route path="/our-story" component={OurStory} />
            <Route path="/indian-jewelry" component={IndianJewelry} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/blog-details/:url" component={blogDetails} />
            <Route path="/educational-blog" component={EducationalBlog} />
            <Route path="/wishlist" render={() =>
            (
              <Redirect to="/account/wishlist" />
            )
            } />
            <Route path="/productdetail/:slug" component={Productdetails} />
            <Route path="/ordersuccess/:order_id/:order_no/:txn_id" component={ordersuccess} />
            <Route path='*' exact={true} component={NoPage} />
          </Switch>
          <Footer currencydata={currencydata}/>
          <GotoTop />
        </BrowserRouter>
      </>
    )
  } else {
    return (
      <>
        <BrowserRouter>
          <Header menudata={menudata} currencydata={currencydata} />
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/account/:value" component={home} />
            <Route path="/invoice/:order_id" component={home} />
            <Route path="/jewelry/:listcategory" component={Productlist} />
            <Route path="/ringsettings" component={RingSettings} />
            <Route path="/ringsettings/:stone" component={RingSettings} />
            <Route path="/ringsettingdetail/:id/:slug" component={Productdetails} />
            <Route path="/gemstones" component={Gemstones} />
            <Route path="/fancy-color-diamond" component={FancyColorDiamond} />
            <Route path="/fancy-color-diamond-detail/:stock_no" component={Fancycolordetail} />
            <Route path="/diamonds" component={RingSettingsDiamonds} />
            <Route path="/diamonds/lab" component={RingSettingsDiamonds} />
            <Route path="/diamonds-details/:stock_no" component={RingSettingsDiamondsDetails} />
            <Route path="/gemstone-details/:stock_no" component={GemstonesDetails} />
            <Route path="/complete-diamond-ring" component={CompleteRing} />
            <Route path="/complete-gemstone-ring" component={CompleteRing} />
            <Route path="/complete-fancycolor-ring" component={CompleteRing} />
            <Route path="/search/:search_text" component={Productlist} />
            <Route path="/services" component={Services} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout-shipping" component={Checkout} />
            <Route path="/custom-design" component={customDesigns} />
            <Route path="/financing" component={Financing} />
            <Route path="/education" component={Education} />
            <Route path="/education-gold-buying" component={EducationGoldBuying} />
            <Route path="/education-diamond-buying" component={EducationDiamondBuying} />
            <Route path="/education-jewelry-care" component={EducationJewelryCare} />
            <Route path="/education-metals" component={EducationMetals} />
            <Route path="/education-gemstones" component={EducationGemstones} />
            <Route path="/education-settings" component={EducationSettings} />
            <Route path="/education-diamonds" component={EducationDiamonds} />
            <Route path="/make-an-appointment" component={MakeAnAppointment} />
            <Route path="/press-media" component={PressMedia} />
            <Route path="/press-media-details/:id" component={PressMediaDetails} />
            <Route path="/charities" component={Charities} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/contact" component={Contact} />
            <Route path="/responsible-sourcing" component={ResponsibleSourcing} />
            <Route path="/warranty-and-guarantees" component={WarrantyGuarantees} />
            <Route path="/military-discount" component={MilitaryDiscount} />
            <Route path="/careers" component={Careers} />
            <Route path="/returns-and-exchanges" component={ReturnsExchanges} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsConditions} />
            <Route path="/mission-and-vision" component={MissionVision} />
            <Route path="/ada-compliance" component={AdaCompliance} />
            <Route path="/sell-your-jewelry" component={SellYourJewelry} />
            <Route path="/insurance" component={Insurance} />
            <Route path="/2021-gift-guide" component={GiftGuide} />
            <Route path="/our-story" component={OurStory} />
            <Route path="/indian-jewelry" component={IndianJewelry} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/blog-details/:url" component={blogDetails} />
            <Route path="/educational-blog" component={EducationalBlog} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/productdetail/:slug" component={Productdetails} />
            <Route path="/ordersuccess/:order_id/:order_no/:txn_id" component={ordersuccess} />
            <Route path='*' exact={true} component={NoPage} />
          </Switch>
          <Footer currencydata={currencydata}/>
          <GotoTop />
        </BrowserRouter>
      </>
    )
  }
}

export default App;