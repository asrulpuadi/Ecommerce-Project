import React, { Component, Fragment } from 'react';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import NavMenuMobile from '../components/common/NavMenuMobile';
import FooterDesktop from '../components/common/FooterDesktop';
import FooterMobile from '../components/common/FooterMobile';
import axios from 'axios';
import AppURL from '../api/AppURL';
import SearchList from '../components/product_details/SearchList';

class SearchPage extends Component {
    constructor({ match }) {
        super()
        this.state = {
            getKeySearch: match.params.key,
            productData: []
        }
    }

    componentDidMount() {
        window.scroll(0, 0);

        axios.get(AppURL.ProductSearch(this.state.getKeySearch))
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

                <SearchList propsKeySearch={this.state.getKeySearch} propsSearchData={this.state.productData} />

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

export default SearchPage;