import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';

class Collection extends Component {
    constructor() {
        super()
        this.state = {
            collectionProductState: []
        }
    }

    componentDidMount() {
        axios.get(AppURL.ProductListByRemark("COLLECTION"))
            .then(res => {
                this.setState({ collectionProductState: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const collectionProductList = this.state.collectionProductState;

        const collectionView = collectionProductList.map((dataParam, keyParam) => {
            if (dataParam.special_price === "N/A") {
                return <Col key={dataParam.id} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link to={"/product-detail/" + dataParam.id} style={{ textDecoration: 'none' }}>
                        <Card className="image-box card">
                            <img className="center" src={dataParam.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{dataParam.title}</p>
                                <p className="product-price-on-card text-center">
                                    {
                                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.price)
                                    }
                                </p>

                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col key={dataParam.id} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link to={"/product-detail/" + dataParam.id} style={{ textDecoration: 'none' }}>
                        <Card className="image-box card">
                            <img className="center" src={dataParam.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{dataParam.title}</p>
                                <p className="product-price-on-card text-center">
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
        })

        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55">
                        <h2>Koleksi Produk</h2>
                        <p>Beberapa Koleksi Eksklusif Kami, Mungkin Anda Suka</p>
                    </div>
                    <Row>
                        {collectionView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Collection;