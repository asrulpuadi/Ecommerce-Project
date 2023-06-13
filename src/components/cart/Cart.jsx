import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            productData: [],
            pagerefreshStatus: false,
            pageRedirectStatus: false,
            confirmBtn: "Confirm Order",
            city: "",
            payment: "",
            name: "",
            address: ""
        }
    }

    componentDidMount() {
        axios.get(AppURL.CartList(this.props.user.email))
            .then(res => {
                this.setState({
                    productData: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    removeItem = (id) => {
        axios.get(AppURL.RemoveCartList(id))
            .then(res => {
                if (res.data) {
                    cogoToast.success('Product Remove from Your Cart Successfully', {
                        position: 'top-center'
                    });

                    this.setState({ pagerefreshStatus: true })
                } else {
                    cogoToast.error('Something wrong !', {
                        position: 'top-center'
                    });
                }
            })
            .catch(err => {
                cogoToast.error(err, {
                    position: 'top-center'
                });
            })
    }

    ItemPlus = (id, quantity, price) => {
        axios.get(AppURL.CartItemPlus(id, quantity, price))
            .then(res => {
                if (res.data) {
                    cogoToast.success('Item Quantity Increase Successfully', {
                        position: 'top-center'
                    });

                    this.setState({ pagerefreshStatus: true })
                } else {
                    cogoToast.error('Something wrong !', {
                        position: 'top-center'
                    });
                }
            })
            .catch(err => {
                cogoToast.error(err, {
                    position: 'top-center'
                });
            })
    }

    ItemMinus = (id, quantity, price) => {
        axios.get(AppURL.CartItemMinus(id, quantity, price))
            .then(res => {
                if (res.data) {
                    cogoToast.success('Item Quantity Decrease Successfully', {
                        position: 'top-center'
                    });

                    this.setState({ pagerefreshStatus: true })
                } else {
                    cogoToast.error('Something wrong !', {
                        position: 'top-center'
                    });
                }
            })
            .catch(err => {
                cogoToast.error(err, {
                    position: 'top-center'
                });
            })
    }

    cityOnchange = (event) => {
        let city = event.target.value

        this.setState({ city: city })
    }

    paymentOnchange = (event) => {
        let payment = event.target.value

        this.setState({ payment: payment })
    }

    nameOnChange = (event) => {
        let name = event.target.value

        this.setState({ name: name })
    }

    addressOnChange = (event) => {
        let address = event.target.value

        this.setState({ address: address })
    }

    confirmOnClick = () => {
        let city = this.state.city
        let payment = this.state.payment
        let name = this.state.name
        let address = this.state.address

        let email = this.props.user.email

        if (city.length === 0) {
            cogoToast.error('Please Select City', {
                position: 'top-center'
            });
        } else if (payment.length === 0) {
            cogoToast.error('Please Select Payment Method', {
                position: 'top-center'
            });
        } else if (name.length === 0) {
            cogoToast.error('Please Input Your Name', {
                position: 'top-center'
            });
        } else if (address.length === 0) {
            cogoToast.error('Please Input Your Address', {
                position: 'top-center'
            });
        } else {
            let invoice = new Date().getTime()
            let FormOrder = new FormData()

            FormOrder.append("city", city)
            FormOrder.append("payment_method", payment)
            FormOrder.append("name", name)
            FormOrder.append("email", email)
            FormOrder.append("delivery_address", address)
            FormOrder.append("invoice_number", invoice)
            FormOrder.append("delivery_charge", "00")

            axios.post(AppURL.CartOrder, FormOrder, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.data === 1) {
                    cogoToast.success('Order Request Received', {
                        position: 'top-center'
                    });

                    this.setState({ pageRedirectStatus: true })
                } else {
                    cogoToast.error('Your Request Something Wrong ! Try Again', { position: 'top-center' });
                }

            }).catch(err => {
                cogoToast.error(err, { position: 'top-center' });
            })
        }
    }

    pageRefresh = () => {
        if (this.state.pagerefreshStatus === true) {
            let URL = window.location

            return (
                <Redirect to={URL} />
            )
        }
    }

    PageRedirect = () => {
        if (this.state.pageRedirectStatus === true) {
            return <Redirect to="/orderlist" />
        }
    }

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const cartList = this.state.productData;

        let totalPriceSum = 0

        const cartListView = cartList.map((val, key) => {
            totalPriceSum = totalPriceSum + parseInt(val.total_price)

            return <Card key={key} className="card-cart-list" >
                <Card.Body>
                    <Row>
                        <Col md={3} lg={3} sm={6} xs={6}>
                            <img className="cart-product-img" src={val.image} alt="" />
                        </Col>

                        <Col md={6} lg={6} sm={6} xs={6}>
                            <h5 className="product-name">{val.product_name}</h5>
                            <h6> Quantity = {val.quantity} </h6>
                            <h6>Price = {val.quantity} x {val.unit_price} = {val.total_price}</h6>
                        </Col>

                        <Col md={3} lg={3} sm={12} xs={12}>

                            <Button onClick={() => this.removeItem(val.id)} className="btn mt-2 mx-1 btn-lg mt-3  site-btn">
                                <i className="fa fa-trash-alt"></i>
                            </Button>

                            <Button onClick={() => this.ItemPlus(val.id, val.quantity, val.unit_price)} className="btn mt-2 mx-1 btn-lg mt-3  site-btn">
                                <i className="fa fa-plus"></i>
                            </Button>

                            <Button onClick={() => this.ItemMinus(val.id, val.quantity, val.unit_price)} className="btn mt-2 mx-1 btn-lg mt-3  site-btn">
                                <i className="fa fa-minus"></i>
                            </Button>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        })

        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55"><h2>Product Cart List</h2>
                    </div>
                    <Row>
                        <Col className="p-1" lg={7} md={7} sm={12} xs={12} >
                            <div>
                                {cartListView}
                            </div>




                        </Col>

                        <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
                            <div>
                                <Card className="card-cart-list" >
                                    <Card.Body>
                                        <h5 className="Product-Name text-danger">Total Due : {totalPriceSum}</h5>

                                        <label className="form-label">Choose City</label>
                                        <select onChange={this.cityOnchange} className="form-control">
                                            <option value="">Choose</option>
                                            <option value="Jakarta">Jakarta</option>
                                            <option value="Pekanbaru">Pekanbaru</option>
                                            <option value="Dhaka">Assam</option>
                                            <option value="Dhaka">Bihar </option>
                                            <option value="Dhaka">Goa </option>
                                            <option value="Dhaka">Gujarat </option>
                                            <option value="Dhaka">Himachal Pradesh </option>
                                            <option value="Dhaka">Punjab  </option>
                                        </select>

                                        <label className="form-label">Choose Payment Method</label>
                                        <select onChange={this.paymentOnchange} className="form-control">
                                            <option value="">Choose</option>
                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                            <option value="Stripe">Stripe</option>
                                            <option value="XENDIT">XENDIT</option>
                                            <option value="MIDTRANS">MIDTRANS</option>
                                        </select>

                                        <label className="form-label">Your Name</label>
                                        <input onChange={this.nameOnChange} className="form-control" type="text" placeholder="" />

                                        <label className="form-label">Delivery Address</label>
                                        <textarea onChange={this.addressOnChange} rows={2} className="form-control" type="text" placeholder="" />

                                        <Button onClick={this.confirmOnClick} className="btn btn-block w-100 mt-3  site-btn-checkout">
                                            <i className="fa fa-shopping-cart"></i> {this.state.confirmBtn}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>


                        </Col>
                    </Row>
                </Container>

                {this.pageRefresh()}

                {this.PageRedirect()}

            </Fragment>
        );
    }
}

export default Cart;