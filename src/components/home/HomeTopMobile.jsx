import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import HomeSlider from './HomeSlider';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class HomeTopMobile extends Component {
    constructor() {
        super()
        this.state = {
            HomeSliderData: []
        }
    }

    componentDidMount() {

        axios.get(AppURL.HomeSliderImage)
            .then(response => {
                this.setState({ HomeSliderData: response.data })
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <Fragment>
                <Container className="p-0 m-0 overflow-hidden" fluid>
                    <Row className="p-0 m-0 overflow-hidden">
                        <Col lg={12} md={12} smm={12}>
                            <HomeSlider data={this.state.HomeSliderData} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default HomeTopMobile;