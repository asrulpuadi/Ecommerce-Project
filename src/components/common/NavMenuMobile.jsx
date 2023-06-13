import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, } from 'react-bootstrap';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/menu.png';
import { Link } from "react-router-dom";
import MegaMenuMobile from '../home/MegaMenuMobile';

class NavMenuMobile extends Component {
    constructor() {
        super();
        this.state = {
            SideNavState: "sideNavClose",
            ContentOverState: "ContentOverlayClose"
        }
    }

    MenuBarClickHandler = () => {
        this.SideNavOpenClose();
    }

    ContentOverlayClickHandler = () => {
        this.SideNavOpenClose();
    }

    SideNavOpenClose = () => {
        let side_nav_state = this.state.SideNavState;
        // let content_over_state = this.state.ContentOverState;

        if (side_nav_state === "sideNavOpen") {
            this.setState({ SideNavState: "sideNavClose", ContentOverState: "ContentOverlayClose" });
        } else {
            this.setState({ SideNavState: "sideNavOpen", ContentOverState: "ContentOverlayOpen" })
        }
    }

    render() {
        return (
            <Fragment>
                <div className="TopSectionDown">
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                        <Row>
                            <Col lg={4} md={4} sm={12} xs={12}>
                                <img onClick={this.MenuBarClickHandler} src={Bars} alt="" className="bar-image" />

                                <Link to="/"> <img className="nav-logo" src={Logo} alt="" /> </Link>

                                <Button className="cart-btn">
                                    <i className="fa fa-shopping-cart"></i>&nbsp;3 Items
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <div className={this.state.SideNavState}>
                        <MegaMenuMobile />
                    </div>

                    <div className={this.state.ContentOverState} onClick={this.ContentOverlayClickHandler}>

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NavMenuMobile;