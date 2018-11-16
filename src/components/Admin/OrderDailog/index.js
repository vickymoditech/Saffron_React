import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as saffronOrderDisplayAction from '../../../actions/saffronOrdersDisplayAction';

//import Loader from "../Loader/index";

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    },
    actionsContainerStyle: {
        textAlign: 'right',
        padding: '5 5'
    },
    leftCloseButton: {
        borderRadius: '50%',
        boxShadow: '0px 2px 9px -2px #000',
        float: 'right',
        backgroundColor: '#fff',
        width: 43,
        height: 43,
        fontSize: 25,
        fontFamily: 'FontAwesome',
        color: '#c53140',
        marginTop: '-6px',
        padding: "9px 12px"
    }
};

class OrderDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            column: props.column,
            order: props.order
        };
    }

    handleMoveToProgress = () => {
        this.props.actions.saffronOrderDisplayAction.MoveToProgress(this.state.order);
    };

    handleDone = () => {
        alert("Handle Done");
    };

    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2>Change Password</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <div className="form-group">
                                                    <div className="form-group text-center row">
                                                        <div className="col-xs-12 text-center">
                                                            {this.state.column && (this.state.column === "running late" || this.state.column === "recent orders") ?
                                                                < button type="button" className="btn btn-save"
                                                                         style={{margin: '12px 10px 0 0'}}
                                                                         onClick={this.handleMoveToProgress}>Move to
                                                                    Progress
                                                                </button> :
                                                                < button type="button" className="btn btn-save"
                                                                         style={{margin: '12px 10px 0 0'}}
                                                                         onClick={this.handleDone}>Done
                                                                </button>}
                                                            <button type="button" className="btn btn-save"
                                                                    style={{margin: '12px 10px 0 0'}}
                                                                    onClick={this.props.handleClose}>Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        saffronOrderDisplayAction: bindActionCreators(saffronOrderDisplayAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(OrderDialog);