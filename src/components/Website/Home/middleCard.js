import React, {Component} from 'react';
import './websiteCss/MiddleCard.css';
class MiddleCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-12 p-3">
                            <div className="row ">
                                <div className="col-md-4">
                                    <img className="w-100" src="https://via.placeholder.com/350x350"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-block">
                                        <h6 className="card-title">Card Title</h6>
                                        <p className="card-text text-justify">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.</p>
                                        <a href="https://www.google.com" className="btn btn-primary">read more...</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card col-md-12 p-3">
                            <div className="row ">
                                <div className="col-md-8">
                                    <div className="card-block">
                                        <h6 className="card-title text-right">Card Title</h6>
                                        <p className="card-text text-justify">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.</p>
                                        <a href="#" className="btn btn-primary">read more...</a>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <img className="w-100" src="https://via.placeholder.com/350x350"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MiddleCard;