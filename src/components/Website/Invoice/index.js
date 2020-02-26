import React, {Component} from 'react';
import './InvoiceStyle.css';

class Invoice extends Component {
    render() {
        return (
            <div style={{paddingTop: '100px', backgroundColor: '#f5f2ea'}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex message_box pt-2">
                                <i className="fa fa-info-circle pt-1 pl-3"></i>
                                <div className="pl-3">
                                    <span>Import Message</span>
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="mt-2 main_review_box">
                                <div className="review_order_box d-flex justify-content-between align-items-center p-2 m-2">
                                    <img src="Car-Wallpaper-For-Mac-38-2880x1800.jpg" className="img-fluid"/>
                                        <span>Hair Folling</span>
                                        <span>&#8377; 800</span>
                                        <span>&#8377; 500</span>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                </div>
                                <div className="review_order_box d-flex justify-content-between align-items-center p-2 m-2">
                                    <img src="Car-Wallpaper-For-Mac-38-2880x1800.jpg" className="img-fluid"/>
                                        <span>Hair Folling</span>
                                        <span>&#8377; 800</span>
                                        <span>&#8377; 500</span>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                </div>
                                <div className="review_order_box d-flex justify-content-between align-items-center p-2 m-2">
                                    <img src="Car-Wallpaper-For-Mac-38-2880x1800.jpg" className="img-fluid"/>
                                        <span>Hair Folling</span>
                                        <span>&#8377; 800</span>
                                        <span>&#8377; 500</span>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                </div>
                                <div className="review_order_box d-flex justify-content-between align-items-center p-2 m-2">
                                    <img src="Car-Wallpaper-For-Mac-38-2880x1800.jpg" className="img-fluid"/>
                                        <span>Hair Folling</span>
                                        <span>&#8377; 800</span>
                                        <span>&#8377; 500</span>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 pl-sm-0">
                            <div className="mt-3">
                                <div className="sub_total_box d-flex justify-content-between p-2">
                                    <span>Sub Total:</span>
                                    <span>&#8377; 5000</span>
                                </div>
                                <div className="sub_total_box d-flex justify-content-between p-2 mt-2">
                                    <span>Discount:</span>
                                    <span>&#8377; 2000</span>
                                </div>
                                <div className="sub_total_box d-flex justify-content-between p-2 mt-2">
                                    <span>Total:</span>
                                    <span>&#8377; 3000</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex message_box pt-2 mt-2">
                                <i className="fa fa-info-circle pt-1 pl-3"></i>
                                <div className="pl-3">
                                    <span>Import Message</span>
                                    <p>Message</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Invoice;
