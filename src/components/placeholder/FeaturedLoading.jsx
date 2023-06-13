import React, { Component } from 'react';

class FeaturedLoading extends Component {
    render() {
        let setClassLoading = this.props.propsFeaturedLoding

        let a = [];

        for (let index = 0; index < 6; index++) {
            a.push(
                <div className='col-lg-2 col-md-2' style={{ height: "200px" }}>
                    <div className="ph-item">
                        <div className="ph-col-12">
                            <div className="ph-picture"></div>
                            <div className="ph-row">
                                <div className="ph-col-12 big"></div>
                                <div className="ph-col-12 big"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        const b = a.map((val, i) => {
            return <div key={i} className='col-lg-2 col-md-2' style={{ height: "200px" }}>
                <div className="ph-item">
                    <div className="ph-col-12">
                        <div className="ph-picture"></div>
                        <div className="ph-row">
                            <div className="ph-col-12 big"></div>
                            <div className="ph-col-12 big"></div>
                        </div>
                    </div>
                </div>
            </div>
        })

        return (
            <div className={setClassLoading}>
                <div className='row'>
                    {b}
                </div>
                {/* <div className='col-lg-2 col-md-2' style={{ height: "200px" }}>
                        <div class="ph-item">
                            <div class="ph-col-12">
                                <div class="ph-picture"></div>
                                <div class="ph-row">
                                    <div class="ph-col-12 big"></div>
                                    <div class="ph-col-12 big"></div>
                                </div>
                            </div>
                        </div>
                    </div> */}


            </div>
        );
    }
}

export default FeaturedLoading;