import React, { Component, Fragment } from 'react';
import { Container, Row, Card, } from 'react-bootstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';

class NewArrival extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProductState: []
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();

    }

    componentDidMount() {
        axios.get(AppURL.ProductListByRemark("NEW"))
            .then(res => {
                this.setState({ newProductState: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        const newProductList = this.state.newProductState;

        const newView = newProductList.map((dataParam) => {
            if (dataParam.special_price == "N/A") {
                return <div key={dataParam.id}>
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
                </div>

            } else {
                return <div key={dataParam.id}>
                    <Link to={"/product-detail/" + dataParam.id} style={{ textDecoration: 'none' }}>
                        <Card className="image-box card">
                            <img className="center" src={dataParam.image} alt="" />
                            <Card.Body>
                                <p className="product-name-on-card">{dataParam.title}</p>
                                <p className="product-price-on-card">
                                    <strike className="text-secondary">
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.price)}
                                    </strike>
                                    &nbsp;
                                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataParam.special_price)}
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            }
        })

        return (
            <Fragment>
                <Container>
                    <div className="section-title text-center mb-55">
                        <h2>Produk Terbaru &nbsp;
                            <button className="btn btn-sm ml-2 site-btn" onClick={this.previous}>
                                <i className="fa fa-angle-left"></i>
                            </button>
                            &nbsp;
                            <button className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </h2>

                        <p>Beberapa Koleksi Eksklusif Kami, Mungkin Anda Suka</p>
                    </div>

                    <Row>
                        <Slider ref={c => (this.slider = c)} {...settings}>
                            {newView}
                        </Slider>
                    </Row>

                </Container>
            </Fragment>
        );
    }
}

export default NewArrival;