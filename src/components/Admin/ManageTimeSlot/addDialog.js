import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as timeSlotsAction from '../../../actions/timeSlotsAction';
import {Dropdown} from 'semantic-ui-react';

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

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            start_time_hours: null,
            start_time_minutes: null,
            end_time_hours: null,
            end_time_minutes: null,
            start_time: null,
            end_time: null,
        };
    }

    handleChangeServiceSH = (event, {value}) => {
        if (value !== null) {
            this.setState({start_time_hours: value});
        }
    };

    handleChangeServiceSM = (event, {value}) => {
        if (value !== null) {
            this.setState({start_time_minutes: value});
        }
    };

    handleChangeServiceEH = (event, {value}) => {
        if (value !== null) {
            this.setState({end_time_hours: value});
        }
    };

    handleChangeServiceEM = (event, {value}) => {
        if (value !== null) {
            this.setState({end_time_minutes: value})
        }
    };


    handleSave = () => {
        if (this.state.start_time_hours !== null && this.state.start_time_minutes !== null && this.state.end_time_hours !== null && this.state.end_time_minutes !== null) {
            this.setState({
                start_time: this.state.start_time_hours + ":" + this.state.start_time_minutes,
                end_time: this.state.end_time_hours + ":" + this.state.end_time_minutes
            }, () => {
                this.props.actions.timeSlotsAction.TimeSlotAdd({
                    start_time: this.state.start_time,
                    end_time: this.state.end_time
                });
            });
        }
        else {
            this.props.notify("Please input valid time format", 'error');
        }
    };

    render() {

        let hours = [];
        let minutes = [];
        for (let i = 1; i <= 24; i++) {
            let text = "";
            if (i < 10)
                text = "0";
            let option = {
                text: text + i,
                value: i
            };
            hours.push(option);
        }

        for (let i = 0; i <= 60; i++) {
            let text = "";
            if (i < 10)
                text = "0";
            let option = {
                text: text + i,
                value: i
            };
            minutes.push(option);
        }

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
                                        <h2>Add New TimeSlot</h2>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <form>
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <Dropdown placeholder="Select Starting Time" fluid
                                                                          selection
                                                                          options={hours}
                                                                          style={{width: '342px'}}
                                                                          onChange={this.handleChangeServiceSH}/>

                                                                <Dropdown placeholder="Select Starting Minutes" fluid
                                                                          selection
                                                                          options={minutes}
                                                                          style={{width: '342px'}}
                                                                          onChange={this.handleChangeServiceSM}/>

                                                                <Dropdown placeholder="Select Ending Time" fluid
                                                                          selection
                                                                          options={hours}
                                                                          style={{width: '342px'}}
                                                                          onChange={this.handleChangeServiceEH}/>

                                                                <Dropdown placeholder="Select Ending Minutes" fluid
                                                                          selection
                                                                          options={minutes}
                                                                          style={{width: '342px'}}
                                                                          onChange={this.handleChangeServiceEM}/>

                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
                                                                    <button type="button" className="btn btn-save"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.handleSave}>Save
                                                                    </button>
                                                                    <button type="button" className="btn btn-save"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.props.handleClose}>Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
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
        timeSlotsAction: bindActionCreators(timeSlotsAction, dispatch),
    }
});


export default connect(null, mapDispatchToProps)(AddDialog);