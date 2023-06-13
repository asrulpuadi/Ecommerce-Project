import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast'
import { Redirect } from 'react-router-dom';

class Favourite extends Component {

    constructor() {
        super();
        this.state = {
            productData: [],
            pagerefreshStatus: false,
        }
    }

    componentDidMount() {

        axios.get(AppURL.FavouriteList(this.props.user.email))
            .then(res => {
                this.setState({ productData: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    removeItem = (event) => {
        let id = event.target.getAttribute('data-id')
        let email = this.props.user.email

        axios.get(AppURL.FavouriteRemove(id, email))
            .then(res => {
                cogoToast.success('Favourite Item Successfully Remove', {
                    position: 'top-center'
                });

                this.setState({ pagerefreshStatus: true })

            })
            .catch(err => {
                cogoToast.error(err, {
                    position: 'top-center'
                });

                this.setState({ pagerefreshStatus: true })
            })
    }

    pageRefresh = () => {
        if (this.state.pagerefreshStatus === true) {
            let URL = window.location

            return (
                <Redirect to={URL} />
            )
        }
    }

    render() {

        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const FavouriteList = this.state.productData;

        const FavouriteView = FavouriteList.map((val, key) => {
            return <Col key={key} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className="image-box card">
                    <img className="center" src={val.image} alt="" />
                    <Card.Body className="text-center">
                        <p className="product-name-on-card">{val.product_name}</p>
                        <div className="text-center">
                            <Button onClick={this.removeItem} data-id={val.id} variant="primary" size="sm">
                                <i className="fa fa-trash-alt"></i>&nbsp;Remove
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        })

        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55">
                        <h2>MY FAVOURITE ITEM</h2>
                        <p>Beberapa Koleksi Eksklusif Kami, Mungkin Anda Suka</p>
                    </div>
                    <Row>
                        {FavouriteView}
                    </Row>
                </Container>
                {this.pageRefresh()}
            </Fragment>
        );
    }
}

export default Favourite;