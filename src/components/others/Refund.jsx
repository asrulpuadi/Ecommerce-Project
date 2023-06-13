import React, { Component, Fragment } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';


class Refund extends Component {
    constructor() {
        super();
        this.state = {
            refundState: "",
            loaderDivRefund: "",
            mainDivRefund: "d-none"
        }
    }

    componentDidMount() {
        axios.get(AppURL.AllSiteInfo)
            .then(response => {
                let statusCode = response.status;

                if (statusCode === 200) {
                    let jsonData = response.data[0]['refund'];

                    this.setState({
                        refundState: jsonData,
                        loaderDivRefund: "d-none",
                        mainDivRefund: ""
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
                <Container>
                    <div className='breadbody'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={"/"}> Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/refund-policy"}>Refund</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <div className={this.state.loaderDivRefund}>
                                <div class="ph-item">
                                    <div class="ph-col-12">
                                        <div class="ph-row">
                                            <div class="ph-col-4"></div>
                                            <div class="ph-col-8 empty"></div>
                                            <div class="ph-col-6"></div>
                                            <div class="ph-col-6 empty"></div>
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div><br />
                                            <div class="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={this.state.mainDivRefund}>
                                <h4 className="section-title-login">Refund Policy</h4>
                                <p className="section-title-contact">
                                    {parse(this.state.refundState)}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Refund;