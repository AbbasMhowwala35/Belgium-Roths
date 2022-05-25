import { Navigate, Outlet } from "react-router";
//-------------------------------------------------url
export const base_url = "https://showcase.belgiumwebnet.com/webapi/api";
export const img_url = "https://showcase.belgiumwebnet.com";
export const helmet_url = "https://showcase.belgiumwebnet.com";

export const user = JSON.parse(localStorage.getItem("bw-user")) ? JSON.parse(localStorage.getItem("bw-user")) : [];

export const isLogin = JSON.parse(localStorage.getItem("bw-user")) ? JSON.parse(localStorage.getItem("bw-user")).isLogin : false;
export const session_id = localStorage.getItem("bw-session-id") ? localStorage.getItem("bw-session-id") : "";
export const currencycode = localStorage.getItem("bw-currency") ? localStorage.getItem("bw-currency") : 'USD';
export const currency = localStorage.getItem("bw-currencyicon") ? localStorage.getItem("bw-currencyicon") : '$';
//--------------------------------------------------Api header data
export const postHeader = {
  // 'authorization':`Token e222085edc871220cae528152b73c1317ba2addf`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const onTop = () => {
  window.scrollTo(0, 0);
}

export const ProtectedRoutes = () => {
  return isLogin ? <Outlet /> : <Navigate to="/" />
}
//---------------------------------------------------Ring builder
export const setSteps = (check) => {
  const diamonddata = JSON.parse(localStorage.getItem('bw-diamonddata')) ? JSON.parse(localStorage.getItem('bw-diamonddata')) : null;
  const settingdata = JSON.parse(localStorage.getItem('bw-settingdata')) ? JSON.parse(localStorage.getItem('bw-settingdata')) : null;
  const gemstonedata = JSON.parse(localStorage.getItem('bw-gemstonedata')) ? JSON.parse(localStorage.getItem('bw-gemstonedata')) : null;
  const fancycolordata = JSON.parse(localStorage.getItem('bw-fancycolordata')) ? JSON.parse(localStorage.getItem('bw-fancycolordata')) : null;
  var arr;
   if (check == 0) {
    if (settingdata == null) {
       arr = [0, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (settingdata != null) {
       arr = [3, 0];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  }else if (check == 1) {
    if (settingdata == null) {
       arr = [1, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (settingdata != null) {
       arr = [3, 1];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  } else if (check == 2) {
    if (settingdata == null) {
       arr = [2, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (settingdata != null) {
       arr = [3, 2];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  } else if (check == 3) {
    if (diamonddata == null) {
       arr = [3, 1];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (diamonddata != null) {
       arr = [1, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  } else if (check == 4) {
    if (gemstonedata == null) {
       arr = [3, 2];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (gemstonedata != null) {
       arr = [2, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  } else if (check == 5) {
    if (fancycolordata == null) {
       arr = [3, 0];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    } else if (fancycolordata != null) {
       arr = [0, 3];
      sessionStorage.setItem("bw-step", JSON.stringify(arr))
    }
  } 
}
