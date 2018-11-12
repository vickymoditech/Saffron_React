import React, {Component} from 'react';
import moment from 'moment';

import SidebarComponent from '../../Helper/Sidebar';

import './Header.css';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            time:"Loading....",
            timeZone:'IST'
        }
    }

    openNav = () =>{
        this.setState({open:true});
    };

    closeNav = () => {
        this.setState({open:false});
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    };

    tick() {
        this.setState({
            time: this.getDateGMTChangeStore(this.state.timeZone)
        });
    }

    getDateGMTChangeStore = (timeZone) => {
        return moment(Date.now()).utcOffset(timeZone).format("DD-MM-YYYY HH:mm:ss");
    };


    render(){
        if (this.state.time.toString() === "01:00:00") {
            window.location.reload();
        }
        return(
            <div className="form-header">
                {this.state.open && <SidebarComponent closeNav={this.closeNav} open={this.state.open}/>}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-logo">
                                {!this.props.isNotFound && <a onClick={this.openNav}><i className="fa fa-bars fa-2x" style={{color: '#fff', padding: '5px 10px', verticalAlign: 'middle',cursor: 'pointer'}}/></a>}
                                <img src="/assets/Images/DB_Logo.png" alt="" style={{width:120}}/>
                                <ul className="nav navbar-nav navbar-right" style={{color:'#fff',fontSize:'2vw'}}>
                                    <li className="sub-title">Time - {this.state.time} </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

