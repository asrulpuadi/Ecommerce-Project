import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import SuggestedProduct from './SuggestedProduct';
import ReviewList from './ReviewList';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class ProductDetails extends Component {
    constructor() {
        super()
        this.state = {
            previewImage: "0",
            isSize: null,
            isColor: null,
            color: "",
            size: "",
            quantity: "",
            productCode: null,
            addToCart: "Add To Cart",
            pagerefreshStatus: false,
            addtofavourite: "Favourite",
            orderNow: "Order Now",
            OrderNowRedirect: false
        }
    }

    onClickImgPreview = (event) => {
        let imgSrc = event.target.getAttribute('src')
        // let preview = document.getElementById('previewImg')

        // ReactDOM.findDOMNode(preview).setAttribute('src', imgSrc)

        this.setState({ previewImage: imgSrc })
    }

    priceOption = (price, special_price) => {
        if (special_price === "N/A") {
            return (
                <p className='product-price-on-card'>
                    {
                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)
                    }
                </p>
            )

        } else {
            return (
                <p className='product-price-on-card'>
                    <strike className="text-secondary">
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)}
                    </strike>
                    &nbsp;

                    {
                        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(special_price)
                    }
                </p>
            )

        }
    }

    colorOnChange = (event) => {
        this.setState({ color: event.target.value })
    }

    sizeOnChange = (event) => {
        this.setState({ size: event.target.value })
    }

    quantityOnChange = (event) => {
        this.setState({ quantity: event.target.value })
    }


    addToCart = () => {
        let isSize = this.state.isSize
        let isColor = this.state.isColor
        let color = this.state.color
        let size = this.state.size
        let quantity = this.state.quantity
        let productCode = this.state.productCode
        let email = this.props.user.email

        if (isColor === "YES" && color.length === 0) {
            cogoToast.error('Please Select Color', {
                position: 'top-center'
            });
        } else if (isSize === "YES" && size.length === 0) {
            cogoToast.error('Please Select Size', {
                position: 'top-center'
            });
        } else if (quantity.length === 0) {
            cogoToast.error('Please Select Quantity', {
                position: 'top-center'
            });
        } else if (!localStorage.getItem('token')) {
            cogoToast.warn('Please Login to Add Product', {
                position: 'top-center'
            });
        } else {
            this.setState({ addToCart: "Adding..." })

            let MyForm = new FormData()

            MyForm.append("color", color)
            MyForm.append("size", size)
            MyForm.append("quantity", quantity)
            MyForm.append("product_code", productCode)
            MyForm.append("email", email)

            axios.post(AppURL.AddToCart, MyForm, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(res => {
                if (res.data) {
                    cogoToast.success('Product Add to Your Cart Successfully', {
                        position: 'top-center'
                    });

                    this.setState({ addToCart: "Add To Cart" })

                    this.setState({ pagerefreshStatus: true })
                } else {
                    cogoToast.error('Your Request Something Wrong ! Try Again', { position: 'top-center' });
                    this.setState({ addToCart: "Add To Cart" })
                }

            }).catch(err => {
                cogoToast.error(err, { position: 'top-center' });

                this.setState({ addToCart: "Add To Cart" })
            })
        }
    }

    OrderNow = () => {
        let isSize = this.state.isSize
        let isColor = this.state.isColor
        let color = this.state.color
        let size = this.state.size
        let quantity = this.state.quantity
        let productCode = this.state.productCode
        let email = this.props.user.email

        if (isColor === "YES" && color.length === 0) {
            cogoToast.error('Please Select Color', {
                position: 'top-center'
            });
        } else if (isSize === "YES" && size.length === 0) {
            cogoToast.error('Please Select Size', {
                position: 'top-center'
            });
        } else if (quantity.length === 0) {
            cogoToast.error('Please Select Quantity', {
                position: 'top-center'
            });
        } else if (!localStorage.getItem('token')) {
            cogoToast.warn('Please Login to Add Product', {
                position: 'top-center'
            });
        } else {
            this.setState({ orderNow: "Order..." })

            let MyForm = new FormData()

            MyForm.append("color", color)
            MyForm.append("size", size)
            MyForm.append("quantity", quantity)
            MyForm.append("product_code", productCode)
            MyForm.append("email", email)

            axios.post(AppURL.AddToCart, MyForm, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(res => {
                if (res.data) {
                    cogoToast.success('Product Add to Your Cart Successfully', {
                        position: 'top-center'
                    });

                    this.setState({ orderNow: "Order Now" })

                    this.setState({ OrderNowRedirect: true })
                } else {
                    cogoToast.error('Your Request Something Wrong ! Try Again', { position: 'top-center' });
                    this.setState({ orderNow: "Order Now" })
                }

            }).catch(err => {
                cogoToast.error(err, { position: 'top-center' });

                this.setState({ orderNow: "Order Now" })
            })
        }
    }

    addToFavourite = () => {
        this.setState({ addtofavourite: "Adding..." })

        let product_code = this.state.productCode
        let email = this.props.user.email

        setTimeout(() => {
            if (!localStorage.getItem('token')) {

                cogoToast.warn('Please Login to Add Your Favourite', {
                    position: 'top-center'
                });

                this.setState({ addtofavourite: "Favourite" })
            } else {
                axios.get(AppURL.AddFavourite(product_code, email), {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.data) {
                        cogoToast.success('Product is now in your favourite', {
                            position: 'top-center'
                        });

                        this.setState({ addtofavourite: "Favourite" })

                        this.setState({ pagerefreshStatus: true })
                    } else {
                        cogoToast.error('Your Request Something Wrong ! Try Again', { position: 'top-center' });

                        this.setState({ addtofavourite: "Favourite" })
                    }

                }).catch(err => {
                    cogoToast.error(err, { position: 'top-center' });

                    this.setState({ addtofavourite: "Favourite" })
                })
            }
        }, 1000);
    }

    pageRefresh = () => {
        if (this.state.pagerefreshStatus === true) {
            let URL = window.location

            return (
                <Redirect to={URL} />
            )
        }
    }

    OrderNowRedirect = () => {
        if (this.state.OrderNowRedirect === true) {
            return <Redirect to='/cart' />

        }
    }


    render() {

        let productDetailData = this.props.propsProductDetail

        let title = productDetailData.productList.title
        let brand = productDetailData.productList.brand
        let category = productDetailData.productList.category
        let image = productDetailData.productList.image
        let price = productDetailData.productList.price
        let product_code = productDetailData.productList.product_code
        // let remark = productDetailData.productList.remark
        let special_price = productDetailData.productList.special_price
        let subcategory = productDetailData.productList.subcategory

        if (this.state.previewImage === "0") {
            this.setState({ previewImage: image })
        }

        let product_id = productDetailData.productDetail[0].product_list_id
        let image_one = productDetailData.productDetail[0].image_one
        let image_two = productDetailData.productDetail[0].image_two
        let image_three = productDetailData.productDetail[0].image_three
        let image_four = productDetailData.productDetail[0].image_four
        let shortDescription = productDetailData.productDetail[0].short_description
        let color = productDetailData.productDetail[0].color
        let size = productDetailData.productDetail[0].size
        let long_description = productDetailData.productDetail[0].long_description

        let colorDiv = 'd-none'
        if (color !== "N/A") {
            let colorArr = color.split(",")

            var colorOption = colorArr.map((val, i) => {
                return <option value={val} key={i}>{val}</option>
            })
            colorDiv = ''
        } else {
            colorDiv = 'd-none'
        }

        let sizeDiv = 'd-none'
        if (size !== "N/A") {
            let sizeArr = size.split(",")

            var sizeOption = sizeArr.map((val, i) => {
                return <option value={val} key={i}>{val}</option>
            })
            sizeDiv = ''
        } else {
            sizeDiv = 'd-none'
        }

        if (this.state.isSize === null) {
            if (size !== "N/A") {
                this.setState({ isSize: "YES" })
            } else {
                this.setState({ isSize: "NO" })
            }
        }

        if (this.state.isColor === null) {
            if (color !== "N/A") {
                this.setState({ isColor: "YES" })
            } else {
                this.setState({ isColor: "NO" })
            }
        }

        if (this.state.productCode === null) {
            this.setState({ productCode: product_code })
        }

        return (
            <Fragment>
                <Container className="BetweenTwoSection" fluid>
                    <div className='breadbody'>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/"}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={"/product-list-category/" + category}>{category}</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={"/product-subcategory/" + category + "/" + subcategory}>{subcategory}</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={"/product-detail/" + product_id}>{product_code}</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>

                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                    {/* <img id='previewImg' className="bigimage" src={image} alt="" /> */}

                                    <div>
                                        <InnerImageZoom className="detailimage" zoomScale={1.8} zoomType="hover" src={this.state.previewImage} zoomSrc={this.state.previewImage} />
                                    </div>


                                    <Container className="my-3">
                                        <Row>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.onClickImgPreview} className="w-100 smallimage product-sm-img" src={image_one} alt="" />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.onClickImgPreview} className="w-100 smallimage product-sm-img" src={image_two} alt="" />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.onClickImgPreview} className="w-100 smallimage product-sm-img" src={image_three} alt="" />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.onClickImgPreview} className="w-100 smallimage product-sm-img" src={image_four} alt="" />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{title}</h5>
                                    <h6 className="section-sub-title">{shortDescription}</h6>

                                    {this.priceOption(price, special_price)}

                                    <h6 className="mt-2">Category : {category}</h6>
                                    <h6 className="mt-2">Sub Category : {subcategory} </h6>
                                    <h6 className="mt-2">Brand : {brand} </h6>
                                    <h6 className="mt-2">Product Code : {product_code} </h6>

                                    <div className={colorDiv}>
                                        <h6 className="mt-2">Choose Color</h6>
                                        <select className='form-control form-select' id='colorOption' onChange={this.colorOnChange}>
                                            <option>Choose Color</option>
                                            {colorOption}
                                        </select>

                                    </div>

                                    <div className={sizeDiv}>
                                        <h6 className="mt-2">Choose Size</h6>
                                        <select className='form-control form-select' onChange={this.sizeOnChange}>
                                            <option>Choose Size</option>
                                            {sizeOption}
                                        </select>

                                    </div>

                                    <div>
                                        <h6 className="mt-2">Choose Quantity</h6>
                                        <select className='form-control form-select' onChange={this.quantityOnChange}>
                                            <option value="">Choose Quantity</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                    <div className="input-group mt-3">
                                        <button onClick={this.addToCart} className="btn site-btn m-1 ">
                                            <i className="fa fa-shopping-cart"></i>  {this.state.addToCart}
                                        </button>
                                        <button onClick={this.OrderNow} className="btn btn-primary m-1">
                                            <i className="fa fa-car"></i> {this.state.orderNow}
                                        </button>
                                        <button onClick={this.addToFavourite} className="btn btn-primary m-1">
                                            <i className="fa fa-heart"></i> {this.state.addtofavourite}
                                        </button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    <p>{long_description}</p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <ReviewList product_code={product_code} />
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>

                <SuggestedProduct suggested={subcategory} />

                {this.pageRefresh()}
                {this.OrderNowRedirect()}

            </Fragment>
        );
    }
}

export default ProductDetails;