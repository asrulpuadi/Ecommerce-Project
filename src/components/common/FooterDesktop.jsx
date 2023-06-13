import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppStore from '../../assets/images/apple.png';
import PlayStore from '../../assets/images/google.png';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';

class FooterDesktop extends Component {
    constructor() {
        super()
        this.state = {
            address_State: "",
            android_app_link_State: "",
            ios_app_link_State: "",
            facebook_link_State: "",
            twitter_link_State: "",
            instagaram_link_State: "",
            copyright_text_State: "",
            loaderDivFooter: "",
            mainDivFooter: "d-none",
        }
    }

    componentDidMount() {

        axios.get(AppURL.AllSiteInfo)
            .then(response => {
                let statusCode = response.status;

                if (statusCode === 200) {
                    let jsonData = response.data[0];

                    this.setState({
                        address_State: jsonData['address'],
                        android_app_link_State: jsonData['android_app_link'],
                        ios_app_link_State: jsonData['ios_app_link'],
                        facebook_link_State: jsonData['facebook_link'],
                        twitter_link_State: jsonData['twitter_link'],
                        instagaram_link_State: jsonData['instagaram_link'],
                        copyright_text_State: jsonData['copyright_text'],
                        loaderDivFooter: "d-none",
                        mainDivFooter: ""
                    });
                }
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <Fragment>
                <div className="footerback m-0 mt-5 pt-3 shadow-sm">
                    <Container>
                        <Row className="px-0 my-5">
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <div className={this.state.loaderDivFooter}>
                                    <div className="ph-item">
                                        <div className="ph-col-12">
                                            <div className="ph-row">
                                                <div className="ph-col-4"></div>
                                                <div className="ph-col-8 empty"></div>
                                                <div className="ph-col-6"></div>
                                                <div className="ph-col-6 empty"></div>
                                                <div className="ph-col-12"></div><br />
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={this.state.mainDivFooter}>
                                    <h5 className="footer-menu-title">OFFICE ADDRESS</h5>
                                    {parse(this.state.address_State)}
                                </div>

                                <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                <a href={this.state.facebook_link_State} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-facebook"></i> </a>
                                <a href={this.state.instagaram_link_State} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-instagram"></i> </a>
                                <a href={this.state.twitter_link_State} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-twitter"></i> </a>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">THE COMPANY</h5>
                                <Link to="/about-us" className="footer-link">About Us</Link>
                                <br />
                                <Link to="/" className="footer-link">The Company</Link>
                                <br />
                                <Link to="/contact-us" className="footer-link">Contact Us</Link>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">MORE INFO</h5>
                                <Link to="/purchase" className="footer-link">How To Purchase</Link>
                                <br />
                                <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
                                <br />
                                <Link to="/refund-policy" className="footer-link">Refund Policy</Link>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">Download Apps</h5>
                                <a href={this.state.android_app_link_State} target='_blank' rel="noreferrer"><img src={AppStore} alt="" /></a>
                                <br />
                                <a href={this.state.ios_app_link_State} target='_blank' rel="noreferrer"><img className="mt-2" src={PlayStore} alt="" /></a>

                                <br />
                                Change Your Language
                                <br />
                                <div id="google_translate_element">

                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="text-center m-0 pt-3 pb-1 bg-dark" fluid>
                        <Container>
                            <Row>
                                <div className="text-white">
                                    {parse(this.state.copyright_text_State)}
                                </div>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FooterDesktop;