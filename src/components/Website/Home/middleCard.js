import React, {Component} from 'react';
import './websiteCss/MiddleCard.css';
class MiddleCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="card col-md-12 p-3">
                            <div class="row ">
                                <div class="col-md-4">
                                    <img class="w-100" src="https://via.placeholder.com/350x350"/>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-block">
                                        <h6 class="card-title">Card Title</h6>
                                        <p class="card-text text-justify">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.</p>
                                        <a href="https://www.google.com" class="btn btn-primary">read more...</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card col-md-12 p-3">
                            <div class="row ">
                                <div class="col-md-8">
                                    <div class="card-block">
                                        <h6 class="card-title text-right">Card Title</h6>
                                        <p class="card-text text-justify">Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                            officia deserunt mollit anim id est laborum.</p>
                                        <a href="#" class="btn btn-primary">read more...</a>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img class="w-100" src="https://via.placeholder.com/350x350"/>
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