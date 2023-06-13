import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import FeaturedLoading from '../placeholder/FeaturedLoading';

class FeaturedProducts extends Component {
    constructor() {
        super();
        this.state = {
            feauturedProductState: [],
            loaderDivFeatured: "",
            mainDivFeatured: "d-none"
        }
    }

    componentDidMount() {
        this.setState({ loaderDivFeatured: "", mainDivFeatured: "d-none" });

        axios.get(AppURL.ProductListByRemark("FEATURED"))
            .then(res => {
                setTimeout(() => {
                    this.setState({
                        feauturedProductState: res.data,
                        loaderDivFeatured: "d-none",
                        mainDivFeatured: ""
                    });
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const feauturedProductList = this.state.feauturedProductState;

        const featuredView = feauturedProductList.map((dataParam) => {
            if (dataParam.special_price === "N/A") {
                return <Col className="p-1" key={dataParam.id} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link to={"/product-detail/" + dataParam.id} style={{ textDecoration: 'none' }}>
                        <Card className="image-box card">
                            <img className="center" src={dataParam.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{dataParam.title}</p>
                                <p className="product-price-on-card">
                                    {
                                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.price)
                                    }
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

            } else {
                return <Col className="p-1" key={dataParam.id} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link to={"/product-detail/" + dataParam.id} style={{ textDecoration: 'none' }}>
                        <Card className="image-box card">
                            <img className="center" src={dataParam.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{dataParam.title}</p>
                                <p className="product-price-on-card" style={{ fontWeight: 'bold' }}>
                                    <strike className="text-secondary">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.price)}
                                    </strike>
                                    &nbsp;
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.special_price)}
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        });

        return (
            <Fragment>


                <Container className="text-center" fluid={true}>
                    <div className="section-title text-center mb-55">
                        <h2>FEATURED PRODUCT</h2>
                        <p>Some of Our Exclusive Collections, Maybe You Like</p>
                    </div>

                    <FeaturedLoading propsFeaturedLoding={this.state.loaderDivFeatured} />

                    <div className={this.state.mainDivFeatured}>
                        <Row>
                            {featuredView}
                        </Row>
                    </div>
                </Container>
            </Fragment>
        );
    }
}

export default FeaturedProducts;