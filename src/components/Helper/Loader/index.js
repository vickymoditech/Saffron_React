import React, {Component} from 'react';
import $ from "jquery";
export default class Loader extends Component {
    componentWillMount(){
        $("body").addClass("loading");
    }
    componentWillUnmount() {
        $("body").removeClass("loading");
    }
    render(){

        return(<div className="loadingPanel"></div>
        )
    }
}
