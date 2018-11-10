import React, {Component} from 'react';
import jQuery from 'jquery';
import Order from '../Order';


export default class Recent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTicket: 0
        }
    }

    setTicket = (activeTicket) => {
        let windowWidth = jQuery(window).width();
        let windowHeight = jQuery(window).height() - 130; //130 px for header part
        let lengthoful = document.getElementById("onTheWay") && document.getElementById("onTheWay").getElementsByTagName("li").length;
        let liHeight = jQuery("#onTheWay")[0] && jQuery("#onTheWay li").height();
        let hereNowHeight = jQuery("#onTheWay")[0] && (liHeight * lengthoful);

        if (hereNowHeight > windowHeight - 50) {
            let hereNowUl = jQuery("#onTheWay li");
            let prevTicket = hereNowUl.slice(0, activeTicket);
            let currentTickets = hereNowUl.slice(activeTicket, activeTicket + 4);
            let lastTicket = hereNowUl.slice(activeTicket + 3, lengthoful);
            let ulHeight = Math.floor(hereNowHeight / lengthoful * 4);
            let remainHeight = windowHeight - ulHeight - 24 - 4 - 20; //24px for 8px of each margin bottom,4 px for bottom
            let marginSetValue = liHeight - remainHeight / (prevTicket.length + lastTicket.length - 1);
            let marginSet;
            if (marginSetValue < 60) {
                marginSet = "-" + (marginSetValue) + "px";
            } else {
                jQuery('.on-the-way-scroll').addClass('overflow-scroll');
                marginSet = "-60px";
            }
            let prevTicketLength = prevTicket.length;
            jQuery("#onTheWay li").each(function (i, data) {
                let bodyStyle = data.style;
                bodyStyle.removeProperty('position');
                bodyStyle.removeProperty('z-index');
                bodyStyle.removeProperty('opacity');
                bodyStyle.removeProperty('margin-bottom');
                bodyStyle.removeProperty('margin-top');
            });
            currentTickets.each(function (index, data) {
                currentTickets[index].style.marginBottom = '8px';
            });
            prevTicket.each(function (index, data) {
                prevTicket[prevTicketLength - (index + 1)].style.position = 'relative';
                prevTicket[prevTicketLength - (index + 1)].style.marginBottom = marginSet;
            });
            let lastTicketLength = lastTicket.length;
            lastTicket.each(function (index, data) {
                lastTicket[index].style.position = 'relative';
                lastTicket[index].style.zIndex = lastTicketLength - index;
                if (index !== 0) {
                    lastTicket[index].style.marginTop = marginSet;
                }
            });
        } else {
            jQuery("#onTheWay li").each(function (index, data) {
                if (lengthoful - 1 !== index) jQuery(this).css("margin-bottom", "8px");
            });
        }

    };

    handleChangeTicket = (activeTicket) => {
        let lengthoful = document.getElementById("onTheWay") && document.getElementById("onTheWay").getElementsByTagName("li").length;
        if (activeTicket > lengthoful - 4) {
            this.setState({currentTicket: lengthoful - 4});
        } else {
            this.setState({currentTicket: activeTicket});
        }
    };

    render() {
        const sortedData = this.props.orders;
        return (
            <div className="col-lg-4 col-sm-12 col-md-6 card on-the-way">
                <div className="card-header"><span
                    className="item-number">{(sortedData && sortedData.length) || 0}</span>
                    <h3 className="sub-title">Recent All Orders</h3></div>
                <div className="card-body on-the-way-scroll">
                    <ul id="onTheWay">
                        <Order
                            key="0"
                            status="waiting"
                            column="recent orders"
                            currentElement="0"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="1"
                            status="waiting"
                            column="recent orders"
                            currentElement="1"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="2"
                            status="waiting"
                            column="recent orders"
                            currentElement="2"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="3"
                            status="waiting"
                            column="recent orders"
                            currentElement="3"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="4"
                            status="waiting"
                            column="recent orders"
                            currentElement="4"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="5"
                            status="waiting"
                            column="recent orders"
                            currentElement="5"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="6"
                            status="waiting"
                            column="recent orders"
                            currentElement="6"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="7"
                            status="waiting"
                            column="recent orders"
                            currentElement="7"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="8"
                            status="waiting"
                            column="recent orders"
                            currentElement="8"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="9"
                            status="waiting"
                            column="recent orders"
                            currentElement="9"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="10"
                            status="waiting"
                            column="recent orders"
                            currentElement="10"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="11"
                            status="waiting"
                            column="recent orders"
                            currentElement="11"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="12"
                            status="waiting"
                            column="recent orders"
                            currentElement="12"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                        <Order
                            key="13"
                            status="waiting"
                            column="recent orders"
                            currentElement="13"
                            handleChangeTicket={this.handleChangeTicket}
                        />
                    </ul>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        this.setTicket(this.state.currentTicket);
    }

    componentDidMount(){
        this.setTicket(this.state.currentTicket);
    }

}