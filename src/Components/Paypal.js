import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { base_url, postHeader } from "../Helpers/request";

export default function Paypal(props) {

    const paypal = useRef();
    const history = useHistory();
    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    layout: 'horizontal'
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            reference_id: props.data.order_no,
                            description: "Malak-Jewelers",
                            custom_id: props.data.order_id,
                            amount: {
                                currency_code: 'USD',
                                value: props.data.grand_total,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: props.data.order_total,
                                    },
                                    shipping: {
                                        currency_code: 'USD',
                                        value: props.data.shipping_cost.cost,
                                    },
                                    tax_total: {
                                        currency_code: 'USD',
                                        value: props.data.tax_amount,
                                    },
                                    discount: {
                                        currency_code: 'USD',
                                        value: props.data.order_discount,
                                    }
                                }
                            },
                            items: props.data.product_list
                        }],
                        application_context: {
                            shipping_preference: "NO_SHIPPING"
                        }
                    });
                },
                onApprove: async (data, actions) => {
                    return await actions.order.capture()
                        .then((res) => {
                            axios.post(base_url + '/order/success', res, {
                                headers: postHeader
                            })
                                .then(response => {
                                    if (response.data.status == 1) {
                                        history.push(`/ordersuccess/${response.data.data.order_id}/${response.data.data.order_no}/${response.data.data.txn_id}`)
                                        localStorage.removeItem("bw-addtocartlength")
                                        sessionStorage.removeItem("bw-checkoutdata")
                                    } else {
                                        console.log(response.message);
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })

                },
                onError: (err) => {
                    alert(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}