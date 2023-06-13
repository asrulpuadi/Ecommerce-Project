import React, { Component, Fragment } from 'react';
import { Breadcrumb, Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Category extends Component {
    render() {
        const MyList = this.props.propsCategoryData
        const CategorySelected = this.props.propsCategory
        const categoryView = MyList.map((dataParam, keyParam) => {
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
                <Container className="text-center">
                    <div className='breadbody'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to={"/"}> Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/product-list-category/" + CategorySelected}>{CategorySelected}</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="section-title text-center mb-40 mt-2">
                        <h2>{CategorySelected}</h2>
                    </div>
                    <Row>
                        {categoryView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Category;