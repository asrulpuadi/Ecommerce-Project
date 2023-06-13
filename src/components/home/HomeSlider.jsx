import React, { Component } from 'react';
// import { Col, Container, Row, Card, } from 'react-bootstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeSlider extends Component {

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
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

        const SliderData = this.props.data

        const viewSlider = SliderData.map((value, key) =>
            <div key={key}>
                <img className="slider-img" src={value.slider_image} alt='' />
            </div>
        )

        return (
            <div>
                <Slider {...settings}>
                    {viewSlider}
                </Slider>
            </div>
        );
    }
}

export default HomeSlider;