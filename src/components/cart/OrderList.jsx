import React, { Component, Fragment } from 'react';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Col, Container, Row, Card, Button, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router';


class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            productData: [],
            show_state: false,
            name: "",
            rating: "",
            comment: "",
            product_name: "",
            product_code: "",
            ReviewModal: false
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name
        })
        axios.get(AppURL.OrderList(this.props.user.email))
            .then(res => {
                this.setState({
                    productData: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    ReviewModalClose = () => {
        this.setState({ ReviewModal: false });
    }

    ReviewModalOpen = (product_code, product_name) => {
        this.setState({
            ReviewModal: true,
            product_code: product_code,
            product_name: product_name
        });
    }

    nameOnChange = (event) => {
        let name = event.target.value
        this.setState({ name: name })
    }

    ratingOnchange = (event) => {
        let rating = event.target.value
        this.setState({ rating: rating })
    }

    commentOnChange = (event) => {
        let comment = event.target.value
        this.setState({ comment: comment })
    }

    postReview = () => {
        let product_code = this.state.product_code
        let product_name = this.state.product_name
        let name = this.state.name
        let rating = this.state.rating
        let comment = this.state.comment

        if (name.length === 0) {
            cogoToast.error('Please Input Your Name', {
                position: 'top-center'
            });
        } else if (rating.length === 0) {
            cogoToast.error('Please Select Your Rating', {
                position: 'top-center'
            });
        } else if (comment.length === 0) {
            cogoToast.error('Please Input Your Comment', {
                position: 'top-center'
            });
        } else {
            let MyForm = new FormData()

            MyForm.append("product_code", product_code)
            MyForm.append("product_name", product_name)
            MyForm.append("reviewer_name", name)
            MyForm.append("reviewer_photo", "")
            MyForm.append("reviewer_rating", rating)
            MyForm.append("reviewer_comment", comment)

            axios.post(AppURL.PostReview, MyForm, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.data) {
                    cogoToast.success('Review Submitted', {
                        position: 'top-center'
                    });

                    this.setState({
                        rating: "",
                        comment: "",
                    })

                    this.ReviewModalClose()

                } else {
                    cogoToast.error('Your Request Something Wrong ! Try Again', { position: 'top-center' });
                }

            }).catch(err => {
                cogoToast.error(err, { position: 'top-center' });
            })

        }

    }



    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const orderList = this.state.productData;

        const myView = orderList.map((val, key) => {
            return <div key={key}>
                <Col md={6} lg={6} sm={6} xs={6}>
                    <h5 className="product-name">{val.product_name}</h5>
                    <h6> Quantity = {val.quantity} </h6>
                    <p>{val.size} | {val.color}</p>
                    <h6>Price = {val.quantity} x {val.unit_price} = {val.total_price}</h6>
                    <h6>Status = {val.order_status}</h6>
                </Col>
                <Button onClick={this.ReviewModalOpen.bind(this, val.product_code, val.product_name)} className='btn btn-danger'>
                    Post Review
                </Button>
                <hr />
            </div>

        })

        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55">
                        <h2>Order History</h2>
                    </div>

                    <Row>
                        <Card className="card-cart-list">
                            <Card.Body>
                                {myView}
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>

                <Modal show={this.state.ReviewModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6><i className="fa fa-bell"></i>&nbsp;Post Your Review</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Your Name</label>
                        <input onChange={this.nameOnChange} className="form-control" type="text" placeholder={this.props.user.name} id='name' readOnly />

                        <label className="form-label">Rating Product</label>
                        <select onChange={this.ratingOnchange} className="form-control">
                            <option value="">Select Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <label className="form-label">Comment</label>
                        <textarea onChange={this.commentOnChange} rows={3} className="form-control" type="text" placeholder="Your Comment" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.postReview}>
                            Post
                        </Button>

                        <Button variant="secondary" onClick={this.ReviewModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default OrderList;