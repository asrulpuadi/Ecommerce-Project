import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import MegaMenu from './MegaMenu';
import HomeSlider from './HomeSlider';
import axios from 'axios';
import SliderLoading from '../placeholder/SliderLoading';

class HomeTop extends Component {
    constructor() {
        super()
        this.state = {
            MenuData: [],
            HomeSliderData: [],
            loaderDivSlider: "",
            mainDivSlider: "d-none"
        }
    }

    componentDidMount() {
        this.setState({ loaderDivSlider: "", mainDivSlider: "d-none" });

        axios.get(AppURL.AllCategoryDetails)
            .then(response => {
                this.setState({ MenuData: response.data })
            })
            .catch(error => {
                // handle error
                console.log(error);
            })

        axios.get(AppURL.HomeSliderImage)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        HomeSliderData: response.data,
                        loaderDivSlider: "d-none",
                        mainDivSlider: ""
                    });
                }, 1000);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <Fragment>
                <SliderLoading propsSliderLodaing={this.state.loaderDivSlider} />

                <div className={this.state.mainDivSlider}>
                    <Container className="p-0 m-0 overflow-hidden" fluid>

                        <Row>
                            <Col lg={3} md={3} sm={12}>
                                <MegaMenu dataCategory={this.state.MenuData} />
                            </Col>

                            <Col lg={9} md={9} sm={12}>
                                <HomeSlider data={this.state.HomeSliderData} />
                            </Col>
                        </Row>
                    </Container>
                </div>


            </Fragment>
        );
    }
}

export default HomeTop;
