import React, { useState } from 'react';
import {Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import { Col, Row } from 'react-bootstrap';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';
import { base_url, currencycode, postHeader, user } from '../Helpers/request';
import { toast } from 'react-toastify';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';

export default function Address({getadd}) {
    const history = useHistory();
    const [formheading, setFormheading] = React.useState('');
    const [add_firstname, setAdd_firstname] = React.useState('');
    const [add_lastname, setAdd_lastname] = React.useState('');
    const [add_phone, setAdd_phone] = React.useState('');
    const [add_email, setAdd_email] = React.useState('');
    const [add_address1, setAdd_address1] = React.useState('');
    const [add_address2, setAdd_address2] = React.useState('');
    const [add_city, setAdd_city] = React.useState('');
    const [add_state, setAdd_state] = React.useState('');
    const [add_postalcode, setAdd_postalcode] = React.useState('');
    const [add_company, setAdd_company] = React.useState('');
    const [add_country, setAdd_country] = React.useState('');
    const [add_name, setAdd_name] = React.useState('');
    const [addressUpdate, setAddressUpdate] = useState(false);
    const [addressshow, setAddressShow] = useState(false);
    const [address_id, setAddress_id] = useState('');
    const [add_ship_default, setAdd_ship_default] = useState(false);
    const [add_bill_default, setAdd_bill_default] = useState(false);

    const getaddress = () => {
       getadd();
    }
    const editaddress = (e, type) => {
        e.preventDefault();
        setAddressUpdate(false);
        const data = {
            currency_code: currencycode,
            address_id: address_id,
            user_id: user?.user_id ? user?.user_id : 0,
            first_name: add_firstname,
            last_name: add_lastname,
            phone: add_phone,
            email: add_email,
            address1: add_address1,
            address2: add_address2,
            city: add_city,
            state: add_state,
            zip: add_postalcode,
            company: add_company,
            country: add_country,
            name: add_name,
            token: user?.token,
            is_shipping_default: add_ship_default ? 1 : 0,
            is_billing_default: add_bill_default ? 1 : 0
        }
        axios.post(base_url + '/user/update_address', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    getaddress();
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
        resetAddress();
    }
    const handleSubmit = (e, type) => {
        e.preventDefault();
        const data = {
            currency_code: currencycode,
            user_id: user?.user_id ? user?.user_id : 0,
            first_name: add_firstname,
            last_name: add_lastname,
            phone: add_phone,
            email: add_email,
            address1: add_address1,
            address2: add_address2,
            city: add_city,
            state: add_state,
            zip: add_postalcode,
            company: add_company,
            country: add_country,
            name: add_name,
            token: user?.token,
            is_billing_default: add_bill_default ? 1 : 0,
            is_shipping_default: add_ship_default ? 1 : 0,
        }
        axios.post(base_url + '/user/add_user_address', data, {
            headers: postHeader
        })
            .then(response => {
                if (response.data.status == 1) {
                    setAddressShow(false);
                    getaddress()
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
        resetAddress();
    }
    const resetAddress = () => {
        setFormheading('');
        setAdd_firstname('');
        setAdd_lastname('');
        setAdd_phone('');
        setAdd_email('');
        setAdd_address1('');
        setAdd_address2('');
        setAdd_city('');
        setAdd_state('');
        setAdd_postalcode('');
        setAdd_company('');
        setAdd_country('');
        setAdd_name('');
        setAdd_ship_default(false);
        setAdd_bill_default(false);
    }

    return (
        <>
            
            <Button className=" rcs_acc_button " onClick={() => { setAddressShow(!addressshow); setAddressUpdate(false); resetAddress(); }}>
            {addressshow ? <> Add New Address <RemoveCircleIcon className='ml-2' /> </> : <> Add New Address <AddCircleIcon className='ml-2' /></>}
             </Button>
            {addressshow ? <div className='mt-5' >
                <form onSubmit={(e) => handleSubmit(e, formheading)}>
                    {/* <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_name}
                                                                    onChange={(e) => setAdd_name(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row> */}
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                required
                                value={add_firstname}
                                onChange={(e) => setAdd_firstname(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={add_lastname}
                                onChange={(e) => setAdd_lastname(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                type="Email"
                                variant="outlined"
                                value={add_email}
                                onChange={(e) => setAdd_email(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Company"
                                type="text"
                                variant="outlined"
                                value={add_company}
                                onChange={(e) => setAdd_company(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Address1"
                                type="text"
                                variant="outlined"
                                value={add_address1}
                                onChange={(e) => setAdd_address1(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Address2"
                                type="text"
                                variant="outlined"
                                value={add_address2}
                                onChange={(e) => setAdd_address2(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="City"
                                type="text"
                                variant="outlined"
                                value={add_city}
                                onChange={(e) => setAdd_city(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="State"
                                type="text"
                                variant="outlined"
                                value={add_state}
                                onChange={(e) => setAdd_state(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Country"
                                type="text"
                                variant="outlined"
                                value={add_country}
                                onChange={(e) => setAdd_country(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Postal Code"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                variant="outlined"
                                value={add_postalcode}
                                onChange={(e) => setAdd_postalcode(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Phone"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                variant="outlined"
                                value={add_phone}
                                onChange={(e) => setAdd_phone(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    checked={add_ship_default}
                                    onChange={() => setAdd_ship_default(!add_ship_default)}
                                />
                            }
                            label="Shipping Address"
                            className="rcs_top_select"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                    checked={add_bill_default}
                                    onChange={() => setAdd_bill_default(!add_bill_default)}

                                />
                            }
                            label="Billing Address"
                            className="rcs_top_select"
                        />
                        <Button variant="secondary" className="rcs_cancel_button mr-3" onClick={() => setAddressShow(false)}>
                            Cancel
                        </Button>
                        <Button type="Submit" variant="primary" className="rcs_save_button">
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </div> : ""}
            {addressUpdate ? <div >
                <form onSubmit={(e) => editaddress(e, formheading)}>
                    {/* <Row>
                                                            <Col xs={12}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Address Name"
                                                                    type="text"
                                                                    variant="outlined"
                                                                    value={add_name}
                                                                    onChange={(e) => setAdd_name(e.target.value)}
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }} />
                                                            </Col>
                                                        </Row> */}
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                required
                                value={add_firstname}
                                onChange={(e) => setAdd_firstname(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                value={add_lastname}
                                onChange={(e) => setAdd_lastname(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Email Address"
                                type="Email"
                                variant="outlined"
                                value={add_email}
                                onChange={(e) => setAdd_email(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="Company"
                                type="text"
                                variant="outlined"
                                value={add_company}
                                onChange={(e) => setAdd_company(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Address1"
                                type="text"
                                variant="outlined"
                                value={add_address1}
                                onChange={(e) => setAdd_address1(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Address2"
                                type="text"
                                variant="outlined"
                                value={add_address2}
                                onChange={(e) => setAdd_address2(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="City"
                                type="text"
                                variant="outlined"
                                value={add_city}
                                onChange={(e) => setAdd_city(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                        <Col xs={12} sm={6}>
                            <TextField
                                id="outlined-basic"
                                label="State"
                                type="text"
                                variant="outlined"
                                value={add_state}
                                onChange={(e) => setAdd_state(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Country"
                                type="text"
                                variant="outlined"
                                value={add_country}
                                onChange={(e) => setAdd_country(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Postal Code"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                variant="outlined"
                                value={add_postalcode}
                                onChange={(e) => setAdd_postalcode(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Phone"
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                variant="outlined"
                                value={add_phone}
                                onChange={(e) => setAdd_phone(e.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Row className='w-100 m-auto'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                        checked={add_ship_default}
                                        onChange={() => setAdd_ship_default(true)}
                                    />
                                }
                                label="Shipping Address"
                                className="rcs_top_select"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                        checked={add_bill_default}
                                        onChange={() => setAdd_bill_default(true)}

                                    />
                                }
                                label="Billing Address"
                                className="rcs_top_select"
                            />
                        </Row>
                        <Button variant="secondary" className="rcs_cancel_button mr-3" onClick={() => setAddressUpdate(false)}>
                            Cancel
                        </Button>
                        <Button type="Submit" variant="primary" className="rcs_save_button">
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </div> : ""}
        </>)
}
