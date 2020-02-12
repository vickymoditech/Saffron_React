import React,{Component} from 'react';
import Loader from '../../Helper/Loader';
import './contactStyle.css';

class Contact extends Component{

    constructor(props) {
        super(props);
        this.state = {Loading: true};
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({Loading: false});
        }, 3000);
    };

    render(){
        const {Loading} = this.state;
        return(
            <div style={{marginTop: '120px',paddingBottom:'20px', backgroundColor: '#f5f2ea'}}>
                <div className="container">
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
                            <div className="address_box d-flex flex-column align-items-center justify-content-center">
                                <span>Logo</span>
                                <p>Address</p>
                                <span>Phone Number</span>
                                <span>Email Id</span>
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

export default Contact;