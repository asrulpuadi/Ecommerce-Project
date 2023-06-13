import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MegaMenu extends Component {
    constructor(props) {
        super()
    }

    MegaMenuItemClick = (event) => {
        event.target.classList.toggle("active")
        var panel = event.target.nextElementSibling

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    // megaMenu() {
    //     var acc = document.getElementsByClassName("accordion");
    //     var accNum = acc.length;
    //     var i;
    //     for (i = 0; i < accNum; i++) {
    //         acc[i].addEventListener("click", function () {
    //             this.classList.toggle("active");
    //             var panel = this.nextElementSibling;

    //             if (panel.style.maxHeight) {
    //                 panel.style.maxHeight = null;
    //             } else {
    //                 panel.style.maxHeight = panel.scrollHeight + "px";
    //             }
    //         })

    //     }
    // }

    render() {
        const CategoryList = this.props.dataCategory

        const MyView = CategoryList.map((CategoryList) =>
            <div key={CategoryList.item_category_id}>
                <button className="accordion" onClick={this.MegaMenuItemClick}>
                    <img className="accordionMenuIcon" src={CategoryList.item_category_image} alt='' />
                    &nbsp;
                    {CategoryList.item_category_name}
                </button>
                <div className="panel">
                    <ul>
                        {
                            CategoryList.item_sub_category_name.map((SubCategoryList, keyParam) =>
                                <li key={keyParam}>
                                    <Link to={"/product-subcategory/" + SubCategoryList.category_name + "/" + SubCategoryList.sub_category_name} className="accordionItem">
                                        {SubCategoryList.sub_category_name}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )

        return (
            <div className="accordionMenuDiv">
                <div className="accordionMenuDivInside">
                    {MyView}
                </div>
            </div>
        );
    }
}

export default MegaMenu;