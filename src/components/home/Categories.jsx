import React, { Component, Fragment } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';
import CategoryLoading from '../placeholder/CategoryLoading';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: [],
            loaderDivCategories: "",
            mainDivCategories: "d-none",
            lengthCategories: 0
        }
    }

    componentDidMount() {
        axios.get(AppURL.AllCategoryDetails)
            .then(response => {
                this.setState({
                    MenuData: response.data,
                    loaderDivCategories: "d-none",
                    mainDivCategories: "",
                    lengthCategories: response.data.length
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    render() {

        const CardCategories = this.state.MenuData;

        const ViewCardCategories = CardCategories.map((item, i) => {
            return <Col className="p-0" key={i.toString()} xl={2} lg={2} md={2} sm={6} xs={6}>
                <Link to={"/product-list-category/" + item.item_category_name}>

                    <Card className="h-100 w-100 text-center">
                        <Card.Body>
                            <img className="center" src={item.item_category_image} alt='' />
                            <h5 className="category-name">{item.item_category_name}</h5>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })

        let a = [];

        for (let index = 0; index < 10; index++) {
            a.push(
                <div className='col-lg-2 col-md-2' style={{ height: "200px" }}>
                    <div className="ph-item">
                        <div className="ph-col-12">
                            <div className="ph-picture"></div>
                            <div className="ph-row">
                                <div className="ph-col-12 big"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const b = a.map((val, i) => {
            return <div key={i} className='col-lg-2 col-md-2' style={{ height: "200px" }}>
                <div className="ph-item">
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row">
                            <div className="ph-col-12 big"></div>
                        </div>
                    </div>
                </div>
            </div>
        })

        return (
            <Fragment>
                <Container className="text-center" fluid>
                    <div className="section-title text-center mb-55">
                        <h2>Kategori</h2>
                        <p>Beberapa Koleksi Eksklusif Kami, Mungkin Anda Suka</p>
                    </div>

                    <CategoryLoading propsFeaturedLoding={this.state.loaderDivCategories} />

                    <div className={this.state.loaderDivCategories}>
                        <div className='row'>
                            {b}
                        </div>
                    </div>

                    <div className={this.state.mainDivCategories}>
                        <Row>
                            {ViewCardCategories}
                        </Row>
                    </div>


                </Container>
            </Fragment>
        );
    }
}

export default Categories;