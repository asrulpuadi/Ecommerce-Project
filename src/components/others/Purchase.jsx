import React, { Component, Fragment } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


class Purchase extends Component {
    constructor() {
        super();
        this.state = {
            purchaseState: "",
            loaderDiv: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        let sessionPurchase = sessionStorage.getItem("sessionPurchase");

        if (sessionPurchase == null) {
            axios.get(AppURL.AllSiteInfo)
                .then(response => {
                    let statusCode = response.status;

                    if (statusCode === 200) {
                        let jsonData = response.data[0]['purchase_guide'];
                        this.setState({ purchaseState: jsonData, loaderDiv: "d-none", mainDiv: "" });

                        sessionStorage.setItem("sessionPurchase", jsonData);
                    } else {
                        toast.error('Something went wrong.!', {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                })
                .catch(error => {
                    // handle error
                    toast.error(error, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
        } else {
            setTimeout(() => {
                this.setState({ purchaseState: sessionPurchase, loaderDiv: "d-none", mainDiv: "" });
            }, 1000);

            this.setState({ loaderDiv: "", mainDiv: "d-none" });
        }
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
                                <Link to={"/purchase"}>Purchase</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" lg={12} md={12} sm={12} xs={12}>
                            <div className={this.state.loaderDiv}>
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

                            <div className={this.state.mainDiv}>
                                <h4 className="section-title-login">Purchase</h4>
                                <p className="section-title-contact">
                                    {parse(this.state.purchaseState)}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment>
        );
    }
}

export default Purchase;