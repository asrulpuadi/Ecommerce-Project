import React, { Component, Fragment } from 'react';
import { Navbar, Container, Row, Col, Button, } from 'react-bootstrap';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/menu.png';
import { Link, Redirect } from "react-router-dom";
import MegaMenuAll from '../home/MegaMenuAll';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class NavMenuDesktop extends Component {
    constructor() {
        super();
        this.state = {
            SideNavState: "sideNavClose",
            ContentOverState: "ContentOverlayClose",
            searchkeyState: "",
            searchRedirectStatus: false,
            cartCount: 0
        }

        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this)
        this.onClickSearchProduct = this.onClickSearchProduct.bind(this)
        this.searchRedirect = this.searchRedirect.bind(this)

    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            axios.get(AppURL.CartCount, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => {
                    this.setState({ cartCount: res.data })
                })
                .catch(err => {
                    console.log(err.message);
                })
        } else {
            console.log("Unauthorized");
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

    onChangeSearchProduct(event) {
        let inputValue = event.target.value

        this.setState({ searchkeyState: inputValue });
    }

    onClickSearchProduct() {
        if (this.state.searchkeyState.length > 2) {
            this.setState({ searchRedirectStatus: true })
        }
    }

    searchRedirect() {
        if (this.state.searchRedirectStatus === true) {
            return <Redirect to={"/productbysearch/" + this.state.searchkeyState} />
        }
    }

    logoutApp = () => {

        axios.post(AppURL.UserLogout, {}, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data.message);

            })
            .catch(err => {
                console.log(err.message);
            })

        localStorage.removeItem('token')
    }

    render() {
        var button;

        if (localStorage.getItem('token')) {
            button = (
                <div>
                    <Link to="/favourite" className="btn">
                        <i className="fa h4 fa-heart">
                            <sup>
                                <span className="badge text-white bg-danger">2</span>
                            </sup>
                        </i>
                    </Link>

                    <Link to="/notification" className="btn">
                        <i className="fa h4 fa-bell">
                            <sup>
                                <span className="badge text-white bg-danger">4</span>
                            </sup>
                        </i>
                    </Link>

                    <Link to="/profile" className="h4 btn">PROFILE</Link>
                    <Link to="/" onClick={this.logoutApp} className="h4 btn">LOGOUT</Link>

                    <Link to="/cart" className="cart-btn">
                        <i className="fa fa-shopping-cart"></i>&nbsp;{this.state.cartCount} Items
                    </Link>
                </div>
            )
        } else {
            button = (
                <div>
                    <Link to="/favourite" className="btn">
                        <i className="fa h4 fa-heart">
                            <sup>
                                <span className="badge text-white bg-danger">2</span>
                            </sup>
                        </i>
                    </Link>

                    <Link to="/notification" className="btn">
                        <i className="fa h4 fa-bell">
                            <sup>
                                <span className="badge text-white bg-danger">4</span>
                            </sup>
                        </i>
                    </Link>

                    <Link to="/login" className="h4 btn">LOGIN</Link>
                    <Link to="/register" className="h4 btn">REGISTER</Link>

                    <Link to="/cart" className="cart-btn">
                        <i className="fa fa-shopping-cart"></i>&nbsp;0 Items
                    </Link>
                </div>
            )
        }

        return (
            <Fragment>
                <div className="TopSectionDown">
                    <Navbar fixed={"top"} className="navbar" bg="light">
                        <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
                            <Row>
                                <Col lg={4} md={4} sm={12} xs={12}>
                                    <img onClick={this.MenuBarClickHandler} src={Bars} alt="" className="bar-image" />

                                    <Link to="/" style={{ textDecoration: 'none' }}> <img className="nav-logo" src={Logo} alt="" /> </Link>
                                </Col>

                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    <div className="input-group w-100">
                                        <input onChange={this.onChangeSearchProduct} type="text" className="form-control" />
                                        <Button onClick={this.onClickSearchProduct} type="button" className="btn site-btn">
                                            <i className="fa fa-search"></i>
                                        </Button>
                                    </div>
                                </Col>

                                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                                    {button}
                                </Col>
                            </Row>

                            {this.searchRedirect()}

                        </Container>

                    </Navbar>

                    <div className={this.state.SideNavState}>
                        <MegaMenuAll />
                    </div>

                    <div className={this.state.ContentOverState} onClick={this.ContentOverlayClickHandler}>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NavMenuDesktop