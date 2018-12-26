import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dialog} from 'material-ui';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import ENVIRONMENT_VARIABLES from "../../../environment.config";
import './ImageSelector.css';

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

class ProductDialogStepper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            finished: false,
            stepIndex: 0,
            teamMemberSelect: null
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });

        if (stepIndex === 2) {
            alert("finish");
        }

    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    selectImage = (event) => {
        this.setState({teamMemberSelect: event.target.name});
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <form method="get">
                        <div className="form-group">
                            {this.props.teamList.length > 0 && this.props.teamList.map((value, index) => (
                                <div className="col-md-3" key={index}><label
                                    className={value.id === this.state.teamMemberSelect ? "btn btn-success" : "btn btn-warning"}><img
                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url}
                                    alt="..."
                                    className={value.id === this.state.teamMemberSelect ? "img-thumbnail check" : "img-thumbnail img-check"}/>
                                    <input type="checkbox" name={value.id} id="item4" value="val1" className="hidden"
                                           autoComplete="off" onClick={this.selectImage}/></label></div>
                            ))}
                        </div>
                    </form>
                </div>;
            case 1:
                return <div>
                    <h2> Time Schedule </h2>
                </div>;
            case 2:
                return <div><h2> Time Schedule </h2></div>;
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    };


    render() {

        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

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
                    <div className="modal-dialog" style={{width: "700px"}}>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2>Stepper Example</h2>
                                    </div>

                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                                                    <Stepper activeStep={stepIndex}>
                                                        <Step>
                                                            <StepLabel> Demo - select any one </StepLabel>
                                                        </Step>
                                                        <Step>
                                                            <StepLabel> Demo - select </StepLabel>
                                                        </Step>
                                                        <Step>
                                                            <StepLabel>Information</StepLabel>
                                                        </Step>
                                                    </Stepper>
                                                    <div style={contentStyle}>
                                                        {!finished && (
                                                            <div>
                                                                <div>{this.getStepContent(stepIndex)}</div>
                                                                <div style={{marginTop: 5}}>
                                                                    <FlatButton
                                                                        label="Back"
                                                                        disabled={stepIndex === 0}
                                                                        onClick={this.handlePrev}
                                                                        style={{marginRight: 12}}
                                                                    />
                                                                    <RaisedButton
                                                                        label={stepIndex === 2 ? 'Booking' : 'Next'}
                                                                        primary={true}
                                                                        disabled={this.state.teamMemberSelect === null}
                                                                        onClick={this.handleNext}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <form>
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
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
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        teamList: websiteReducer.teamList,
    };
};

export default connect(mapStateToProps, null)(ProductDialogStepper);