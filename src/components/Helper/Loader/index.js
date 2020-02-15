import React, {Component} from 'react';
import $ from "jquery";
import Lottie from 'react-lottie';
import * as animationData from './loader'

export default class Loader extends Component {
    componentWillMount() {
        $("body").addClass("loading");
    }

    componentWillUnmount() {
        $("body").removeClass("loading");
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (

            <div className="loadingPanel h-100 d-flex align-items-center">
                <Lottie options={defaultOptions} height={250}
                        width={250}/>
            </div>

        )
    }
}
