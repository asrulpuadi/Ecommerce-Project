import React, { Component } from 'react';

class MegaMenuMobile extends Component {
    constructor() {
        super();
        this.megaMenu = this.megaMenu.bind();
    }

    componentDidMount() {
        this.megaMenu();
    }

    megaMenu() {
        var acc = document.getElementsByClassName("accordionMobile");
        var accNum = acc.length;
        var i;
        for (i = 0; i < accNum; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;

                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            })

        }

    }

    render() {
        return (
            <div className="accordionMenuDivMobile">
                <div className="accordionMenuDivInsideMobile">
                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/128/739/739249.png" alt='' />
                        &nbsp;
                        Pakaian Pria
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 1</a>
                            </li>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/128/739/739249.png" alt='' />
                        &nbsp;
                        Pakaian Pria
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 1</a>
                            </li>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 2</a>
                            </li>
                        </ul>
                    </div>

                    <button className="accordionMobile">
                        <img className="accordionMenuIconMobile" src="https://cdn-icons-png.flaticon.com/128/739/739249.png" alt='' />
                        &nbsp;
                        Pakaian Pria
                    </button>
                    <div className="panelMobile">
                        <ul>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 1</a>
                            </li>
                            <li>
                                <a href="/" className="accordionItemMobile">Kaos Pria 2</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default MegaMenuMobile;