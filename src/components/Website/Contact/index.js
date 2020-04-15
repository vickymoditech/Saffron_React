import React,{Component} from 'react';
import Loader from '../../Helper/Loader';
import * as websiteAction from "../../../actions/websiteAction";
import './contactStyle.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from 'react-router';

class Contact extends Component{

    constructor(props) {
        super(props);
        this.state = {Loading: true};
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.websiteAction.basketVisible(true);
        setTimeout(() => {
            this.setState({Loading: false});
        }, 3000);
    };

    render(){
        const {Loading} = this.state;
        return(
            <div style={{marginTop: '120px',paddingBottom:'20px', backgroundColor: '#f5f2ea'}}>
                <div className="container">
                    <div className="text-center">
                        <span className="title">CONTACT INFO</span>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="map">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Unisex%20Saffron%20Hair%20%26%20Beauty%20Hazira%20Rd%2C%20Hazira%2C%20Ichchhapor%2C%20Surat%2C%20Gujarat%20394510&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <div className="address_box d-flex flex-column align-items-center justify-content-center my-5">
                                <Link to="/"><span><img src="/assets/Images/SAFFRON_logo.png" alt="saffron" style={{width:130}}/></span></Link>
                                <br/>
                                <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                <p>4/3648 abc xyz surat adajan hajira road</p>
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                <p>+(91) 8401060120</p>
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                <p>vicky123modi@gmail.com</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {Loading && <Loader/>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Contact);
