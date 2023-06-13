import React, { Component, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';

import axios from 'axios';
import AppURL from '../api/AppURL';
import SubCategory from '../components/product_details/SubCategory';

class ProductSubCategoryPage extends Component {
    constructor({ match }) {
        super()
        this.state = {
            categoryState: match.params.category,
            subCategoryState: match.params.subcategory,
            productData: []
        }
    }

    componentDidMount() {
        window.scroll(0, 0);

        axios.get(AppURL.ProductListBySubCategory(this.state.categoryState, this.state.subCategoryState))
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

                <SubCategory propsCategory={this.state.categoryState} propsSubCategory={this.state.subCategoryState} propsSubCategoryData={this.state.productData} />

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

export default ProductSubCategoryPage;