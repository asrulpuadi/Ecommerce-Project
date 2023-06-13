import React, { Component } from 'react';

class CategoryLoading extends Component {
    render() {
        let getClassLoadingCatgeory = this.props.propsFeaturedLoding

        return (
            <div>
                <div className={getClassLoadingCatgeory}>
                    <div className='row'>

                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryLoading;