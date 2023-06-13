import React, { Component } from 'react';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';

class MegaMenuAll extends Component {
    constructor() {
        super();
        this.state = {
            megaMenuAllData: []
        }
    }

    componentDidMount() {
        axios.get(AppURL.AllCategoryDetails)
            .then(response => {
                this.setState({ megaMenuAllData: response.data });
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    MegaMenuItemClick = (event) => {
        event.target.classList.toggle("active");
        var panel = event.target.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    render() {
        const CategoryList = this.state.megaMenuAllData;

        const MyView = CategoryList.map((CategoryList, i) => {
            return <div key={i.toString()}>
                <button className="accordionAll" onClick={this.MegaMenuItemClick}>
                    <img className="accordionMenuIconAll" src={CategoryList.item_category_image} alt='' />
                    &nbsp;
                    {CategoryList.item_category_name}
                </button>
                <div className="panelAll">
                    <ul>
                        {
                            CategoryList.item_sub_category_name.map((SubCategoryList, i) => {
                                return <li key={i.toString()}>
                                    <Link to={"/product-subcategory/" + SubCategoryList.category_name + "/" + SubCategoryList.sub_category_name} className="accordionItem">
                                        {SubCategoryList.sub_category_name}
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        });

        return (
            <div className="accordionMenuDivAll">
                <div className="accordionMenuDivInsideAll">
                    {MyView}
                </div>
            </div>
        );
    }
}

export default MegaMenuAll;