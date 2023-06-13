import React, { Component, Fragment } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import UserImage from '../../assets/images/linkedin.jpg'
import { Link } from 'react-router-dom';

class Profile extends Component {
    render() {

        let name;
        let email;

        if (this.props.user) {
            name = this.props.user.name
            email = this.props.user.email
        }

        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        return (
            <Fragment>
                <div className="section-title text-center mb-55">
                    <h2>USER PROFILE</h2>
                </div>

                <Container>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <Card style={{ width: '18rem', height: '100%' }}>
                                <Card.Img variant="top" src={UserImage} className='userprofile' />

                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item className='text-center' >
                                        <Link to="/orderlist" style={{ textDecoration: 'none' }}>
                                            <p className="product-name-on-card mt-2">Order List</p>
                                        </Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='text-center'>
                                        <p className="product-name-on-card">Link A</p>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='text-center'>
                                        <p className="product-name-on-card">Link B</p>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Card>
                        </Col>

                        <Col lg={8} md={8} sm={12}>
                            <ul className='list-group'>
                                <li className='list-group-item'>Name : {name}</li>
                                <li className='list-group-item'>Email : {email}</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>


            </Fragment>
        );
    }
}

export default Profile;