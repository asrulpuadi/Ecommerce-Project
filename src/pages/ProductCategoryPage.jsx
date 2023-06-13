import React, { Component, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import Category from '../components/product_details/Category';
import axios from 'axios';
import AppURL from '../api/AppURL';

class ProductCategoryPage extends Component {
    constructor({ match }) {
        super()
        this.state = {
            categoryState: match.params.catg,
            productData: []
        }
    }

    componentDidMount() {
        window.scroll(0, 0);

        axios.get(AppURL.ProductListByCategory(this.state.categoryState))
            .then(res => {
                this.setState({ productData: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop />
                </div>

                <div className="Mobile">
                    <NavMenuMobile />
                </div>

                <Category propsCategory={this.state.categoryState} propsCategoryData={this.state.productData} />

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

export default ProductCategoryPage;