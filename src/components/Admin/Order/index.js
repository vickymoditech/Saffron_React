import React, {Component} from 'react';
import moment from 'moment';
import OrderDialog from '../OrderDailog';
import ENVIRONMENT_VARIABLES from '../../../environment.config';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            Time: 0
        };
    }

    handleChangeTicket = () => {
        this.props.handleChangeTicket(this.props.currentElement);
    };

    componentDidMount() {
        if (this.props.order.column !== "running late") {
            let audio = this.refs.audio;
            audio && audio.play();
        }
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    orderDialogOpen = () => {
        this.setState({isDialogOpen: true});
    };

    orderDialogClose = () => {
        this.setState({isDialogOpen: false});
    };


    tick() {
        let currentTime = new Date();
        let timeDiff = 0;
        if (this.props.order.column === "running" || this.props.order.column === "running late") {
            let OrderTime = new Date(this.props.order.statusDateTime);
            timeDiff = Math.abs(Math.round(((currentTime.getTime() - OrderTime.getTime()) / 1000) / 60));
        } else {
            let OrderTime = new Date(this.props.order.bookingStartTime);
            timeDiff = Math.abs(Math.round(((OrderTime.getTime() - currentTime.getTime()) / 1000) / 60));
        }

        this.setState({
            Time: timeDiff || 0
        });

    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    };


    render() {
        const {column, status} = this.props.order;
        const time = this.state.Time;
        const orderTime = (moment(this.props.order.bookingStartTime).utcOffset('IST').format("DD-MM-YYYY HH:mm:ss")).toString().split(" ");
        const HHMM = orderTime[1].toString().split(":");
        const orderNo = this.props.order.id;
        const customerName = this.props.order.customerName;

        let Color = "#F3D250";
        if (column === "running") {
            Color = "#61892F";
        } else if (column === "running late") {
            Color = "#f76C6C";
        }
        //TODO change product images.
        const productImg = ENVIRONMENT_VARIABLES.PRODUCT_IMAGE;
        let classes = ['small-box'];

        if (column === "running") {
            classes = ['small-box', 'w3-animate-right'];
        } else if (column === "running late") {
            classes = ['small-box', 'w3-animate-left'];
        } else if (column === "recent orders") {
            classes = ['small-box', 'w3-animate-top'];
        }
        return (
            <li onClick={this.handleChangeTicket} style={{cursor: 'pointer'}}>
                {this.state.isDialogOpen &&
                <OrderDialog handleClose={this.orderDialogClose} isOpen={this.state.isDialogOpen} column={column}
                             order={this.props.order}/>}
                <div className={classes.join(' ')}>
                    {column !== "running" &&
                    <audio ref="audio">
                        <source src="/assets/store_door.mp3" type="audio/mpeg"/>
                    </audio>}
                    <div className="waiting-details" style={{backgroundColor: Color}}>
                        <div className="drive-status">{status}</div>
                        <div className="pickup-time">{time}</div>
                        <div className="min text-uppercase">min</div>
                    </div>
                    {
                        column === "running" ?
                            <div className="status in-progress" style={{backgroundColor: Color}}>in
                                progress... #{customerName}
                            </div> : <div className="status pickup">{customerName}
                            </div>
                    }
                    <div className="box-right">
                        <div className="number">{HHMM[0]}:{HHMM[1]}</div>
                        <div className="icon icon-btn-save">
                            <button type="submit" onClick={this.orderDialogOpen} className="btn btn-save" style={{
                                minWidth: "none",
                                minHeight: "none",
                                padding: "4px 0px",
                                height: "40px",
                                width: "88px",
                                backgroundSize: "none"
                            }}>Show
                            </button>
                            {/*<p className="color">*/}
                            {/*#{customerName}*/}
                            {/*</p>*/}
                        </div>
                        <div className="image">
                            {productImg &&
                            <img src={productImg} className="img-responsive" style={{border: "none", height: "50px"}}
                                 alt=""/>}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
