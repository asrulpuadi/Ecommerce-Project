import React, { Component, Fragment } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import LoginImage from '../../assets/images/login.png';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class UserLogin extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            message: '',
            loggedIn: false
        }
    }

    // login form submit method
    formLoginSubmit = (event) => {
        event.preventDefault()

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(AppURL.UserLogin, data)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                this.setState({ loggedIn: true })
                this.props.setUser(response.data.user)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        // if (this.state.loggedIn == true) {
        //     return <Redirect to="/profile" />
        // }

        if (localStorage.getItem('token')) {
            return <Redirect to="/profile" />
        }

        return (
            <Fragment>
                <Container>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>

                            <Row className="text-center">
                                <Col className="d-flex justify-content-center" lg={6} md={6} sm={12} xs={12}>
                                    <Form onSubmit={this.formLoginSubmit} className="onboardForm">
                                        <h4 className="section-title-login">USER SIGN IN</h4>

                                        <input onChange={(event) => this.setState({ email: event.target.value })} type="email" className="form-control m-2" placeholder="Enter Your Email" />

                                        <input onChange={(event) => this.setState({ password: event.target.value })} type="password" className="form-control m-2" placeholder="Enter Your Password" />

                                        <Button type='submit' className="btn btn-block m-2 site-btn-login">Login</Button>

                                        <br />
                                        <hr />
                                        <p><b>Forget My Password?</b>&nbsp;<Link to="/forgetpassword"><b>Forget Password</b></Link> </p>
                                        <p><b>Don't Have an Account?</b>&nbsp;<Link to="/register"><b>Register</b></Link> </p>
                                    </Form>
                                </Col>

                                <Col className="p-0 m-0 Desktop" lg={6} md={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src={LoginImage} alt="" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default UserLogin;