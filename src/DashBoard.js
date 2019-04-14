import React, {Component} from 'react';
import Header from '../src/components/Helper/Header';
import $ from "jquery";
import * as saffronOrdersDisplayAction from "./actions/saffronOrdersDisplayAction";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {newSODMessage} from './socket';

class App extends Component {

    componentWillMount() {
        // eslint-disable-next-line
        let ua = navigator.userAgent.toLowerCase();
        let isSafari = false;
        try {
            // eslint-disable-next-line
            isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {return p.toString() === "[object SafariRemoteNotification]";})(!window['safari'] || safari.pushNotification);
        }
        catch (err) {
        }
        isSafari = (isSafari || ((ua.indexOf('safari') !== -1) && (!(ua.indexOf('chrome') !== -1) && (ua.indexOf('version/') !== -1))));
        if (isSafari) {
            $('body').addClass("iosSafari");
        }

        this.props.actions.saffronOrdersDisplayAction.OrdersList();

        newSODMessage((err, data) => {
            console.log(data);
            if(data.message === "new order")
                this.props.actions.saffronOrdersDisplayAction.NewOrder(data.data);
            else if(data.message === "running late")
                this.props.actions.saffronOrdersDisplayAction.MoveToRunningLate(data.data);
            else if(data.message === "running")
                this.props.actions.saffronOrdersDisplayAction.MoveToProgress(data.data);
            else if(data.message === 'finish')
                this.props.actions.saffronOrdersDisplayAction.MoveToFinish(data.data);
        });
    }

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        saffronOrdersDisplayAction: bindActionCreators(saffronOrdersDisplayAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(App);
