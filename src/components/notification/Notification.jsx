import React, { Component, Fragment } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Redirect } from 'react-router';


class Notification extends Component {
    constructor() {
        super();
        this.state = {
            show_state: false,
            notificationDataState: [],
            notificationMessage: "",
            notificationTitle: "",
            notificationDate: ""
        }
    }

    componentDidMount() {
        axios.get(AppURL.Notification)
            .then(res => {

                this.setState({ notificationDataState: res.data, });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleClose = () => {
        this.setState({ show_state: false });
    }

    handleShow = (event) => {
        this.setState({ show_state: true });

        let nMsg = event.target.getAttribute('data-message')
        let nTitle = event.target.getAttribute('data-title')
        let nDate = event.target.getAttribute('data-date')

        this.setState({
            notificationMessage: nMsg,
            notificationTitle: nTitle,
            notificationDate: nDate
        });
    }

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }

        const notificationList = this.state.notificationDataState;
        const notificationView = notificationList.map((val, i) => {
            return <Col key={i} className=" p-1 " md={6} lg={6} sm={12} xs={12}>
                <Card className="notification-card">
                    <Card.Body>
                        <h6>{val.title}</h6>
                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>   Date: {val.date} | Status: Unread</p>
                        <Button variant="primary" onClick={this.handleShow} data-title={val.title} data-message={val.message} data-date={val.date}>Detail</Button>
                    </Card.Body>
                </Card>
            </Col>
        })

        return (
            <Fragment>
                <Container className="TopSection">
                    <Row>
                        {notificationView}
                    </Row>
                </Container>

                <Modal show={this.state.show_state} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6><i className="fa fa-bell"></i>&nbsp;{this.state.notificationDate}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>{this.state.notificationTitle}</h6>
                        <p>
                            {this.state.notificationMessage}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default Notification;