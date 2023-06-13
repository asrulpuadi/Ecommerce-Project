import React, { Component } from 'react';
import axios from 'axios';
import AppURL from '../../api/AppURL';

class ReviewList extends Component {
    constructor() {
        super()
        this.state = {
            reviewData: []
        }
    }

    componentDidMount() {
        axios.get(AppURL.ReviewList(this.props.product_code))
            .then(res => {
                this.setState({ reviewData: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const ReviewList = this.state.reviewData

        if (ReviewList.length > 0) {
            const MyView = ReviewList.map((val) => {
                let star = []

                for (let index = 0; index < val.reviewer_rating; index++) {
                    star.push(<i key={index} className="fa fa-star"></i>)
                }

                return <div key={val.id}>
                    <p className=" p-0 m-0">
                        <span className="Review-Title">{val.reviewer_name}</span>
                        &nbsp;
                        <span className="text-success">
                            {star}
                        </span>
                    </p>
                    <p>{val.reviewer_comment}</p>
                </div>
            })

            return (
                <>
                    <h6 className="mt-2">REVIEWS</h6>
                    {MyView}
                </>
            );

        } else {
            return (
                <>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p className="mt-2">Product don't have any review</p>
                </>
            );
        }
    }
}

export default ReviewList;