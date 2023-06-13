import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppStore from '../../assets/images/apple.png';
import PlayStore from '../../assets/images/google.png';

class FooterMobile extends Component {
    render() {
        return (
            <Fragment>
                <div className="footerback m-0 mt-5 pt-3 shadow-sm">
                    <Container className="text-center">
                        <Row className="px-0 my-5">
                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">Alamat Kantor</h5>
                                <p>
                                    Jln.Sultan Alamudinsyah Kecamatan Tualang
                                    <br></br>
                                    Email : Support@gmail.com
                                </p>

                                <h5 className="footer-menu-title">Social Link</h5>

                                <a href="/" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-facebook"></i> </a>
                                <a href="/" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-instagram"></i> </a>
                                <a href="/" style={{ textDecoration: 'none' }}><i className="fab m-1 h4 fa-twitter"></i> </a>
                            </Col>

                            <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                <h5 className="footer-menu-title">Download Apps</h5>
                                <a href="/"><img src={AppStore} alt="" /></a>
                                <br />
                                <a href="/"><img className="mt-2" src={PlayStore} alt="" /></a>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="text-center m-0 pt-3 pb-1 bg-dark" fluid>
                        <Container>
                            <Row>
                                <h6 className="text-white">@ Copyrigt 2023 by Easy Shop, All Rights Reserved</h6>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FooterMobile;