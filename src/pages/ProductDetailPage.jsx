import React, { Component, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import ProductDetails from '../components/product_details/ProductDetails';
import axios from 'axios';
import AppURL from '../api/AppURL';
import SliderLoading from '../components/placeholder/SliderLoading';

class ProductDetailPage extends Component {

    constructor({ match }) {
        super()
        this.state = {
            productDetailState: match.params.id,
            productData: [],
            loadingProductDetail: "",
            mainDivProductDetail: "d-none",
        }
    }

    componentDidMount() {
        window.scroll(0, 0);

        axios.get(AppURL.Productetail(this.state.productDetailState))
            .then(res => {
                this.setState({
                    productData: res.data.item,
                    loadingProductDetail: "d-none",
                    mainDivProductDetail: ""
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const User = this.props.user

        if (this.state.mainDivProductDetail == "d-none") {
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop />
                    </div>

                    <div className="Mobile">
                        <NavMenuMobile />
                    </div>

                    <SliderLoading propsSliderLodaing={this.state.loadingProductDetail} />

                    <div className="Desktop">
                        <FooterDesktop />
                    </div>

                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop />
                    </div>

                    <div className="Mobile">
                        <NavMenuMobile />
                    </div>

                    <ProductDetails user={User} propsProductDetail={this.state.productData} />

                    <div className="Desktop">
                        <FooterDesktop />
                    </div>

                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            );
        }
    }
}

export default ProductDetailPage;