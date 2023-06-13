import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ForgetImage from '../../assets/images/forget.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ForgetPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            message: ''
        }
    }

    formForgetPasswordSubmit = (event) => {
        event.preventDefault()

        const data = {
            email: this.state.email,
        }

        axios.post(AppURL.UserForgetPassword, data)
            .then((response) => {
                // this.setState({ message: response.data.message })

                let message = response.data.message

                toast.success(message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                document.getElementById("forgetPasswordForm").reset();

            })
            .catch((error) => {
                let message = error.response.data.message

                toast.error(message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    }


    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>

                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form onSubmit={this.formForgetPasswordSubmit} className="onboardForm" id='forgetPasswordForm'>
                                        <h4 className="section-title-login">FORGET PASSWORD</h4>

                                        <input onChange={(event) => this.setState({ email: event.target.value })} type="email" className="form-control m-2" placeholder="Enter Your Email" />

                                        <Button type='submit' className="btn btn-block m-2 site-btn-login">Reset Password</Button>
                                        <br />
                                        <hr />
                                        <p><b>Already Have an Account?</b>&nbsp;<Link to="/login"><b>Login</b></Link> </p>
                                        <p><b>Don't Have an Account?</b>&nbsp;<Link to="/register"><b>Register</b></Link> </p>
                                    </Form>
                                </Col>

                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src={ForgetImage} alt="" />
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

export default ForgetPassword;