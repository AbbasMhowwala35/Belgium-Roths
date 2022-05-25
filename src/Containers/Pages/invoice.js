import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import "../../Assets/css/invoice.css";
import logoImage from '../../Assets/images/logo.png';
import { Button, Divider } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { base_url, currency, currencycode, isLogin, postHeader, user } from '../../Helpers/request';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Invoice = (props) => {
    const history = useHistory();
    const [orderdata, setOrderdata] = useState([]);

    useEffect(() => {
        document.getElementById("rcs_header_seaction").style.display = "none";
        document.getElementById("rcs_footer").style.display = "none";
        document.getElementById("rcs_footer_bottom").style.display = "none";
        // document.getElementById("podium-website-widget").style.display = "none";
        // document.getElementById("podium-bubble").style.display = "none";
        orderlist();
    }, [])
    const orderlist = () => {
        const data = { currency_code : currencycode,
            order_id: props.match.params.order_id,
            user_id: user.user_id ? user.user_id : "",
            token: isLogin ? user.token : "",
        }
        axios.post(base_url + '/order/order_detail', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setOrderdata(response.data.data)
                    toast.success(response.data.message, { autoClose: 3000 });
                } else if (response.data.status == 2) {
                    localStorage.removeItem('bw-user')
                    localStorage.removeItem('bw-wishlistlength');
                    localStorage.removeItem('bw-addtocartlength');
                    localStorage.removeItem("bw-session-id")
                    history.push("/")
                    window.location.reload(true);
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="rcs_myaccount">
                <section className="theme-invoice-1 section-b-space">
                    <Container>
                        <Row className="m-auto w-100 justify-content-center">
                            <Col xl={9}>
                                <div className="invoice-wrapper">
                                    <div className="invoice-header">
                                        <div className="upper-icon">
                                            <Image
                                                src="http://themes.pixelstrap.com/multikart/assets/images/invoice/invoice.svg"
                                                alt="Invoice"
                                            />
                                        </div>
                                        <div className="row header-content">
                                            <div className="col-sm-6">
                                                <Image
                                                    src={logoImage}
                                                    alt="Gemstone King"
                                                    style={{ width: "250px" }}
                                                />
                                                <div className="mt-md-4 mt-3">
                                                    <h4 className="mb-0">info@belgiumwebnet.com</h4>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-sm-end mt-md-0 mt-4">
                                                <h2>invoice</h2>
                                                <div className="mt-md-4 mt-3">
                                                    <h4 className="mb-2">20 W 47th St, Suite 601</h4>
                                                    <h4 className="mb-0"> New York, NY 10036</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="detail-bottom">
                                            <ul>
                                                <li>
                                                    <strong>issue date :</strong>
                                                    <h4>{moment(new Date(orderdata?.order?.created_at)).format("YYYY-MM-DD")}</h4>
                                                </li>
                                                <li>
                                                    <strong>invoice no :</strong>
                                                    <h4>{orderdata?.order?.order_no}</h4>
                                                </li>
                                                <li>
                                                    <strong>email :</strong>
                                                    <h4>{orderdata?.user?.email}</h4>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="invoice-body table-responsive-md">
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col"><strong>#</strong></th>
                                                    <th scope="col"><strong>Image</strong></th>
                                                    <th scope="col"><strong>Name</strong></th>
                                                    <th scope="col"><strong>Price</strong></th>
                                                    <th scope="col"><strong>Quantity</strong></th>
                                                    <th scope="col"><strong>Total</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderdata?.order_detail?.map((val,index) =>
                                                    <tr>
                                                        <th scope="row">{index+1}</th>
                                                        <td><Image src={val.image} width="50px" height="50px"></Image></td>
                                                        <td>{val.name}</td>
                                                        <td>{orderdata?.order?.currency_icon}{val.price}</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{orderdata?.order?.currency_icon}{val.total_price}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td />
                                                    <td className="font-bold text-dark" colSpan={4}>
                                                        <strong>TOTAL</strong>
                                                    </td>
                                                    <td className="font-bold text-theme text-right"> {orderdata?.order?.currency_icon}{orderdata?.order?.order_total}</td>
                                                </tr>
                                                <tr>
                                                    <td />
                                                    <td className="font-bold text-dark" colSpan={4}>
                                                        <strong>SHIPPING </strong>
                                                    </td>
                                                    <td className="font-bold text-theme text-right"> {orderdata?.order?.currency_icon}{orderdata?.order?.shipping_cost}</td>
                                                </tr>
                                                <tr>
                                                    <td />
                                                    <td className="font-bold text-dark" colSpan={4}>
                                                        <strong>DISCOUNT</strong>
                                                    </td>
                                                    <td className="font-bold text-theme text-right"> {orderdata?.order?.currency_icon}{orderdata?.order?.order_discount}</td>
                                                </tr>                                                
                                                <tr>
                                                    <td />
                                                    <td className="font-bold text-dark" colSpan={4}>
                                                        <strong>GRAND TOTAL</strong>
                                                    </td>
                                                    <td className="font-bold text-theme text-right">{orderdata?.order?.currency_icon}{orderdata?.order?.grand_total}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <Row className="rcs_address_details rcs_instruction_details mb-5">
                                        <Col xs={12}>
                                            <ul className='rcs_instruction_content'>
                                               {orderdata?.order?.gift_message?.length ? <li className='mb-2'><strong>Gift Options : {orderdata?.order?.gift_message}</strong></li>:""}
                                               {orderdata?.order?.instructions?.length ?<li className='mb-2'><strong>Special Instructions : {orderdata?.order?.instructions}</strong></li>:""}
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row className="rcs_address_details">
                                        <Col sm={6}>
                                            <div className="rcs_add_box" style={{ boxShadow: "none" }}>
                                                <address>
                                                    <p className="mb-3"><strong>Billing Address </strong></p>
                                                    <Divider />
                                                    <p class="card-text">
                                                        <strong><span class="addr-firstname">{orderdata?.billing_address?.first_name}</span> <span class="addr-lastname">{orderdata?.billing_address?.last_name}</span></strong><br />
                                                        <span class="addr-company">{orderdata?.billing_address?.company}</span><br />
                                                        <span class="addr-address1">{orderdata?.billing_address?.address1}</span><br />
                                                        <span class="addr-address2">{orderdata?.billing_address?.address2}</span><br />
                                                        <span class="addr-city">{orderdata?.billing_address?.city},</span> <span class="addr-state">{orderdata?.billing_address?.state},</span> <span class="addr-zip">{orderdata?.billing_address?.zip}</span><br />
                                                        <span class="addr-country">{orderdata?.billing_address?.country}</span>
                                                    </p>
                                                </address>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="rcs_add_box" style={{ boxShadow: "none" }}>
                                                <address>
                                                    <p className="mb-3"><strong>Shipping Address </strong></p>
                                                    <Divider />
                                                    <p class="card-text">
                                                        <strong><span class="addr-firstname">{orderdata?.shipping_address?.first_name}</span> <span class="addr-lastname">{orderdata?.shipping_address?.last_name}</span></strong><br />
                                                        <span class="addr-company">{orderdata?.shipping_address?.company}</span><br />
                                                        <span class="addr-address1">{orderdata?.shipping_address?.address1}</span><br />
                                                        <span class="addr-address2">{orderdata?.shipping_address?.address2}</span><br />
                                                        <span class="addr-city">{orderdata?.shipping_address?.city},</span> <span class="addr-state">{orderdata?.shipping_address?.state},</span> <span class="addr-zip">{orderdata?.shipping_address?.zip}</span><br />
                                                        <span class="addr-country">{orderdata?.shipping_address?.country}</span>
                                                    </p>
                                                </address>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <Row className="invoice-footer">
                                        <Col sm={6}>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="buttons">
                                                <Button className="rcs_print" onClick={() => window.print()}> <PrintIcon /> Print</Button>
                                            </div>
                                        </Col>
                                    </Row> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}
export default Invoice;
