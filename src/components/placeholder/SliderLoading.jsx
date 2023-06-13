import React, { Component } from 'react';

class SliderLoading extends Component {
    render() {

        let classLoading = this.props.propsSliderLodaing;

        return (
            <div className={classLoading}>
                <div className='row'>
                    <div className='col-3'>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-9'>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-picture" style={{ marginBottom: "0px" }}></div>
                                <div className="ph-picture" style={{ marginTop: "0px" }}></div>
                                <div className="ph-picture" style={{ marginTop: "0px" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SliderLoading;