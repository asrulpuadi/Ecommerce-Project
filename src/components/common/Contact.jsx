import React, { Component, Fragment } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import Validation from '../../validation/Validation';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


class Contact extends Component {
    constructor() {
        super();
        this.state = {
            name_state: "",
            email_state: "",
            message_state: ""
        }
    }

    nameOnChange = (event) => {
        let name_value = event.target.value;
        this.setState({ name_state: name_value });
    }

    emailOnChange = (event) => {
        let email_value = event.target.value;
        this.setState({ email_state: email_value });
    }

    messageOnChange = (event) => {
        let message_value = event.target.value;
        this.setState({ message_state: message_value });
    }

    ecomSendContactMessage = (event) => {
        let nameValue = this.state.name_state;
        let emailValue = this.state.email_state;
        let messageValue = this.state.message_state;
        let sendContactBtn = document.getElementById("sendContactBtn");
        let ecomContactForm = document.getElementById("ecomContactForm");

        if (messageValue.length === 0) {
            toast.error('Please write your message', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (nameValue.length === 0) {
            toast.error('Please write your name', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (emailValue.length === 0) {
            toast.error('Please write your email', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (!(Validation.NameRegex).test(nameValue)) {
            toast.error('Invalid Name', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            sendContactBtn.innerHTML = "Sending...";

            let MyFormData = new FormData();
            MyFormData.append("name", nameValue);
            MyFormData.append("email", emailValue);
            MyFormData.append("message", messageValue);

            axios.post(AppURL.BaseURL + '/post-contact', MyFormData)
                .then(function (response) {
                    if (response.status === 201 && response.data) {
                        toast.success('Message send successfully', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        sendContactBtn.innerHTML = "Send";
                        ecomContactForm.reset();
                    } else {
                        toast.error('error', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        sendContactBtn.innerHTML = "Send";
                    }
                })
                .catch(function (error) {
                    toast.error(error, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    sendContactBtn.innerHTML = "Send";
                });
        }

        event.preventDefault();

    }

    render() {
        return (
            <Fragment>
                <Container>
                    <div className='breadbody'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={"/"}> Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/contact-us"}>Contact</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>

                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form onSubmit={this.ecomSendContactMessage} className="onboardForm" id="ecomContactForm">
                                        <h4 className="section-title-login">CONTACT WITH US</h4>

                                        <h5 className="section-sub-title">Please Contact With Us</h5>
                                        <input type="text" name="name" id="" className="form-control m-2" onChange={this.nameOnChange} placeholder="Enter Your Name" />

                                        <input type="email" name="email" id="" className="form-control m-2" onChange={this.emailOnChange} placeholder="Enter Your Email" />

                                        <Form.Control className="form-control m-2" as="textarea" rows={3} onChange={this.messageOnChange} placeholder="Enter Your Message" />

                                        <Button id="sendContactBtn" type="submit" className="btn btn-block m-2 site-btn-login">Send

                                        </Button>
                                    </Form>
                                </Col>

                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <br />
                                    <br />
                                    <p className="section-title-contact">Jln.Sultan Alamudinsyah Kecamatan Tualang</p>
                                    <p className="section-title-contact">Support@gmail.com</p>

                                    <iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d1924.0399293378175!2d101.58191066232139!3d0.6784652589110387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d0.6793094!2d101.583109!5e0!3m2!1sen!2sid!4v1684656387630!5m2!1sen!2sid" title="Address UDA ECOMMERCE" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer />

            </Fragment>
        );
    }
}

export default Contact;