import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Modal from "react-responsive-modal";
import * as websiteAction from "../../../actions/websiteAction";
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillMount() {
        if (this.props.serviceList.length <= 0) {
            this.props.actions.websiteAction.getWebsiteHome();
        }
        this.props.actions.websiteAction.getAllProducts();
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    DialogClose = () => {
        this.setState({isDialogOpen: false});
    };

    DialogOpen = () => {
        this.setState({isDialogOpen: true});
    };


    render() {
        const {isDialogOpen} = this.state;
        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>
                <NotificationSystem ref="notificationSystem"/>
                <Modal open={isDialogOpen} onClose={this.DialogClose}>
                    <h2>Simple centered modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
                </Modal>

                <div className="d-flex align-items-center pl-md-3 service_menu">
                    {this.props.serviceList.map((singleService) => (
                        <a href={"#" + singleService.title}>{singleService.title}</a>
                    ))}
                </div>

                {this.props.AllProductsList.AllProducts && this.props.AllProductsList.AllProducts.map((singleService) => (
                    <div id={singleService.title} className="service_1" key={singleService.service_id}>
                        <div className="container">

                            <div className="title_space">
                                <span className="service_main_title">{singleService.title}</span>
                            </div>

                            <div className="row">
                                {singleService.products.map((singleProdct) => (
                                    <div className="col-md-4">
                                        <div className="service_box">
                                            {singleProdct.offerPrice > 0 && <div id="pointer"><span className="shape_text">Best Seller</span></div>}
                                            <div>
                                                <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProdct.image_url} className="img-fluid"
                                                     alt="service1" style={{height: '50px', width: '50px'}}/>
                                                <span className="service_title ml-md-3">{singleProdct.title}</span>
                                            </div>
                                            <div className="price">
                                                {singleProdct.offerPrice > 0 && <strike className="price1">{singleProdct.offerPrice}</strike>}
                                                <span className="price2">{singleProdct.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                ))}

                <button type="button" className="btn btn-primary"
                        onClick={this.DialogOpen}>Open
                </button>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        AllProductsList: websiteReducer.AllProductsList,
        serviceList: websiteReducer.serviceList,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);