import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class SuggestedProduct extends Component {
    constructor() {
        super()
        this.state = {
            productData: []
        }
    }

    componentDidMount() {
        axios.get(AppURL.SuggestedProduct(this.props.suggested))
            .then(res => {
                this.setState({ productData: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const ListSuggested = this.state.productData

        if (ListSuggested.length > 0) {
            const ViewSuggested = ListSuggested.map((value, key) => {
                if (value.special_price === "N/A") {
                    return <Col key={key} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Card className="image-box card">
                            <img className="center" src={value.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{value.title} </p>
                                <p className="product-price-on-card">
                                    {
                                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.price)
                                    }
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>
                } else {
                    return <Col key={key} className="p-1" xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Card className="image-box card">
                            <img className="center" src={value.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{value.title} </p>
                                <p className="product-price-on-card">
                                    <strike className="text-secondary">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.price)}
                                    </strike>
                                    &nbsp;
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.special_price)}
                                </p>

                            </Card.Body>
                        </Card>
                    </Col>
                }
            })

            return (
                <Fragment>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Same of Our Exclusive Collection, You May Like</p>
                        </div>
                        <Row>
                            {ViewSuggested}
                        </Row>
                    </Container>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Same of Our Exclusive Collection, You May Like</p>
                        </div>
                        <Row>
                            <p>There have no simillar product</p>
                        </Row>
                    </Container>
                </Fragment>
            );
        }
    }
}

export default SuggestedProduct;