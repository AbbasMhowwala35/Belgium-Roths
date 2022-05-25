import { Button } from '@material-ui/core'
import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import OrderImage from '../../../Assets/images/sucess.png'

export const ordersuccess = (props) => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Order Success | Belgium Webnet | Charlotte, NC</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="gs_myaccount gs_order_success">
                <Container className="gs_customer_container">
                    <Row className="w-100 m-auto">
                        <Col>
                            <Image src={OrderImage} alt="Order Success"></Image>
                            <h1>THANK YOU</h1>
                            <p className="mt-3 d-inline-block">Payment Is Successfully Processed and Your Order Is On The Way</p>
                            <p>Order Id : {props.match.params.order_id}</p>
                            <p>Order No : {props.match.params.order_no}</p>
                            <p>Transaction Id : {props.match.params.txn_id}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
