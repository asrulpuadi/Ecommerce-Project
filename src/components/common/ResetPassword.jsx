import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ForgetImage from '../../assets/images/forget.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            pincode: '',
            email: '',
            password: '',
            password_confirmation: '',
            message: '',
        }
    }

    formResetPasswordSubmit = (event) => {
        event.preventDefault()

        const data = {
            pincode: this.state.pincode,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        axios.post(AppURL.UserResetPassword, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
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

            document.getElementById("resetPasswordForm").reset();
        }).catch(error => {
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
                                    <Form onSubmit={this.formResetPasswordSubmit} className="onboardForm" id='resetPasswordForm'>
                                        <h4 className="section-title-login">RESET PASSWORD</h4>

                                        <input onChange={(event) => this.setState({ pincode: event.target.value })} type="text" className="form-control m-2" placeholder="Enter Your Pin Code" />

                                        <input onChange={(event) => this.setState({ email: event.target.value })} type="email" className="form-control m-2" placeholder="Enter Your Email" />

                                        <input onChange={(event) => this.setState({ password: event.target.value })} type="password" className="form-control m-2" placeholder="Enter Your New Password" />

                                        <input onChange={(event) => this.setState({ password_confirmation: event.target.value })} type="password" className="form-control m-2" placeholder="Confirm Your Password" />

                                        <Button type='submit' className="btn btn-block m-2 site-btn-login">Reset Password</Button>
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

export default ResetPassword;