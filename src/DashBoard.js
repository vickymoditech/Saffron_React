import React, {Component} from 'react';
import Header from '../src/components/Helper/Header';
import $ from "jquery";

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

export default App;