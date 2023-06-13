import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SearchList extends Component {
    render() {
        const MyList = this.props.propsSearchData

        const SearchKeyInput = this.props.propsKeySearch

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
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={"/"}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={"/productbysearch/" + SearchKeyInput}>Search for {SearchKeyInput}</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="section-title text-center mb-40 mt-2">
                        <h2>Search : {SearchKeyInput}</h2>
                    </div>
                    <Row>
                        {categoryView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default SearchList;