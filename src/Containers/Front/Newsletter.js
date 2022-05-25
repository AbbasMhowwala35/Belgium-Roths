import React, { useState } from 'react';
import { Container, NavLink, Form, InputGroup, FormControl } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Assets/css/home.css";
import { Button } from '@material-ui/core';
import { base_url, currency, currencycode, helmet_url, postHeader } from '../../Helpers/request';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Newsletter = () => {
  const history = useHistory();
  const [newsletteremail, setNewsletteremail] = useState("")
  const newsletter = (e) => {
    e.preventDefault();
    const data = { currency_code : currencycode,
      email: newsletteremail
    }
    axios.post(base_url + '/common/subscribe_newsletter', data, {
      headers: postHeader
    })
      .then(res => {
        if (res.data.status == 1) {
          setNewsletteremail('');
          return swal(res.data.message, "", "success");
        } else {
          return swal(res.data.message, "", "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div className="rcs_newsletter">
        <Container>
          <div className="rcs_news_content">
            <h2>Be a part of Belgium Webnet</h2>
            <p>Be the first to see our latest collections, invite to exclusive events, and all things extraordinary.</p>
            <div className="gs_newsletter_input_section">
              <Form className="gs_news_form w-100" onSubmit={newsletter}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Email Address..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="email"
                    value={newsletteremail}
                    required
                    onChange={(e) => setNewsletteremail(e.target.value)}
                  />
                  <Button variant="outline-secondary" type="submit" id="button-addon2">
                    Subscribe
                  </Button>
                </InputGroup>
              </Form>
            </div>
            <div className="gs_newsletter_content">
              <p>By signing up you confirm that you have read the <NavLink onClick={() => history.push("/privacy-policy")}>Privacy Policy</NavLink> and agree that your email will be collected and used for the purposes of sending news, promotions and updates via email. You can withdraw your consent at any time by unsubscribing.</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Newsletter;