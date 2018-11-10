import React, {Component} from 'react';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTicketDialogOpen: false,
            tapped: false
        };
    }

    handleChangeTicket = () => {
        this.props.handleChangeTicket(this.props.currentElement);
    };

    render() {
        const {column, status} = this.props;
        const time = "12";
        const orderTime = "12:50";
        const orderNo = "1234";
        const modeOfTransport = "user";
        const color = "#12232d";
        let driveThroughColor = "#F3D250";
        if (column === "running") {
            driveThroughColor = "#61892F";
        } else if (column === "running late") {
            driveThroughColor = "#f76C6C";
        }
        const userAvatar = "http://192.168.0.5:9000/images/UserAvatar/demo.png";
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

                <div className={classes.join(' ')}>
                    <audio ref="audio">
                        <source src="/assets/store_door.mp3" type="audio/mpeg"/>
                    </audio>
                    <div className="waiting-details" style={{backgroundColor: driveThroughColor}}>
                        <div className="drive-status">{status}</div>
                        <div className="pickup-time">{time}</div>
                        <div className="min text-uppercase">min</div>
                    </div>
                    {
                        column === "running" ?
                            <div className="status in-progress" style={{backgroundColor: driveThroughColor}}>in
                                progress... #{orderNo}
                            </div> : <div className="status pickup">Order No - #{orderNo}
                            </div>
                    }
                    <div className="box-right">
                        <div className="number">{orderTime}</div>
                        <div className="icon">
                            <button>click</button>
                            <p className="color">
                                #{orderNo}
                            </p>
                        </div>
                         <div className="image">
                            {userAvatar && <img src={userAvatar} className="img-responsive" style={{border:"none"}} alt=""/>}
                        </div>
                    </div>
                </div>
            </li>
        );
    }

    componentDidMount() {
        if (this.props.column !== "running late") {
            let audio = this.refs.audio;
            audio && audio.play();
        }
    }
}
