import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { Container, Col, Row, Image, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import "../../../Assets/css/mjstatic.css"
import customImg1 from '../../../Assets/images/static/demo/custom_design1.jpg';
import customImg2 from '../../../Assets/images/static/demo/custom_design2.jpg';
import customImg3 from '../../../Assets/images/static/demo/custom_design3.jpg';
import { base_url } from '../../../Helpers/request';

const CustomDesigns = () => {
    const history = useHistory();
    const [chooseType, setChooseType] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [budget, setBudget] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [material, setMaterial] = React.useState('');
    const [image, setImage] = React.useState(null);
    const handleChangeChooseType = (event) => {
        setChooseType(event.target.value);
    };
    const handleChangeMaterial = (event) => {
        setMaterial(event.target.value);
    };
    const postform = (e) => {
        e.preventDefault();
        var data = {
            name, email, mobile, budget, notes, material, image
        }

        let formData = new FormData();
        formData.append('type', chooseType);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('budget', budget);
        formData.append('material', material);
        formData.append('note', notes);
        formData.append('file', image);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post(base_url + '/common/customProductRequest', formData, config)
            .then(response => {
                if (response.data.status == 1) {
                    swal(response.data.message, "", "success");
                } else {
                    swal(response.data.message, "", "error");
                }
                setName('');
                setEmail('');
                setMobile('');
                setBudget('');
                setNotes('');
                setMaterial('');
                setImage('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Create Custom</title>
                <meta name="description" content="Create Custom"></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>
            <div className="rcs_customDesgin_banner">
            </div>
            <div className='rcs_new_custome_page'>
                <Container className="pt-4 pb-4">
                    <Row>
                        <Col xs={12} sm={12} md={4}>
                            <div className="rcs_customDesgin_content">
                                <Image src={customImg1}></Image>
                                <div className="rcs_customDesgin_content rcs_customDesgin_content1 mt-4 pb-3">
                                    <h2>TELL US YOUR IDEAS</h2>
                                    <p>Bringing your ideas to life is indeed what we’re best at! Share with us all about how you want your jewelry to look. Our experts craft jewelry that speaks for you, hence, being a beautiful symbol of your emotions.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <div className="rcs_customDesgin_content">
                                <Image src={customImg2}></Image>
                                <div className="rcs_customDesgin_content rcs_customDesgin_content1 mt-4 pb-3">
                                    <h2>FINALIZE THE DESIGN</h2>
                                    <p>We will present to you a Computer-Aided Design which will be a digital 3-dimensional representation of the final product. You can review the design and request changes at this stage.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4}>
                            <div className="rcs_customDesgin_content">
                                <Image src={customImg3}></Image>
                                <div className="rcs_customDesgin_content rcs_customDesgin_content1 mt-4 pb-3">
                                    <h2>FLAUNT YOUR JEWELRY</h2>
                                    <p>Our jewelry technicians and experts not only craft jewelry with precision but also test it for durability and perfection. The final product will be delivered to you once it's ready.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='rcs_new_custome_page_form rcs_account_content_left mt-3 mb-5'>
                <Container>
                    <Row className='m-auto w-100'>
                        <Col xs={12}>
                            <h4 className='mb-5'>LET'S START YOUR PROJECT!</h4>
                        </Col>
                    </Row>
                    <Form onSubmit={postform}>
                        <Row className='m-auto w-100'>
                            <Col md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="rcs_choose_type">Choose Type</InputLabel>
                                    <Select
                                        labelId="rcs_choose_type"
                                        id="demo-simple-select"
                                        value={chooseType}
                                        label="Choose Type"
                                        onChange={handleChangeChooseType}
                                        required
                                    >
                                        <MenuItem value='Bracelet'>Bracelet</MenuItem>
                                        <MenuItem value='Chain'>Chain</MenuItem>
                                        <MenuItem value='Pendant'>Pendant</MenuItem>
                                        <MenuItem value='Ring'>Ring</MenuItem>
                                        <MenuItem value='Other'>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    variant="outlined" >

                                </TextField>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    variant="outlined" >
                                </TextField>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Mobile Number"
                                    type="number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                    variant="outlined" >
                                </TextField>
                            </Col>
                            <Col md={6}><TextField
                                id="outlined-basic"
                                label="Total Budget"
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                required
                                variant="outlined" >
                            </TextField></Col>
                            <Col md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="rcs_metal_type">Metal Type</InputLabel>
                                    <Select
                                        labelId="rcs_metal_type"
                                        id="demo-simple-select"
                                        value={material}
                                        label="Material"
                                        onChange={handleChangeMaterial}
                                    >
                                        <MenuItem value='10k Gold'>10k Gold</MenuItem>
                                        <MenuItem value='14k Gold'>14k Gold</MenuItem>
                                        <MenuItem value='18k Gold'>18k Gold</MenuItem>
                                        <MenuItem value='22k Gold'>22k Gold</MenuItem>
                                        <MenuItem value='24 Gold'>24k Gold</MenuItem>
                                        <MenuItem value='Platinum'>Platinum</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    id="filled-multiline-static"
                                    label="Notes"
                                    type="text"
                                    multiline
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder='Please describe your idea for this Custom Project and provide us with as many details as you can, so we can get back to you with a quote for your Custom Jewelry.'
                                    variant="outlined"
                                >
                                </TextField>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="Upload"
                                    type="file"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setImage(e.target.files[0])}
                                    helperText="Choose your file here to upload. Allowed type(pdf,jpg,png,jpeg,doc,docx)" >
                                </TextField>
                            </Col>
                            <Col xs={12} className="mt-3">
                                <Button variant="contained" type="submit" className="rcs_acc_button rcs_review_btn">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default CustomDesigns;