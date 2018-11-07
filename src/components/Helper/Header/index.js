import React, {Component} from 'react';

import SidebarComponent from '../../Helper/Sidebar';

import './Header.css';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }

    openNav = () =>{
        this.setState({open:true});
    };

    closeNav = () => {
        this.setState({open:false});
    };

    render(){
        return(
            <div className="form-header">
                {this.state.open && <SidebarComponent closeNav={this.closeNav} open={this.state.open}/>}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-logo">
                                {!this.props.isNotFound && <a onClick={this.openNav}><i className="fa fa-bars fa-2x" style={{color: '#fff', padding: '5px 10px', verticalAlign: 'middle',cursor: 'pointer'}}/></a>}
                                <img src="/assets/Images/DB_Logo.png" alt="" style={{width:120}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

