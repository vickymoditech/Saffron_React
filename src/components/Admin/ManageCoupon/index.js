import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as videoAction from '../../../actions/videoAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import './manage-video.css';

class ManageVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            couponList: [],
            notificationSystem: null,
            isDialogOpen: false,
            selectedCoupon: null,
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.Loading && nextProps.error_msg) {
    //         this.addNotifications(nextProps.error_msg, "error");
    //     }
    //     else if (!nextProps.Video_Loading && nextProps.Video_Error_msg) {
    //         this.addNotifications(nextProps.Video_Error_msg, "error");
    //         this.props.actions.videoAction.DefaultMessageClear();
    //     }
    //     else if (!nextProps.Video_Loading && nextProps.success_msg) {
    //         this.addNotifications(nextProps.success_msg, "success");
    //         this.props.actions.videoAction.DefaultMessageClear();
    //         this.setState({isDialogOpen: false});
    //         this.setState({isEditDialogOpen: false});
    //         this.setState({videoList: nextProps.videoList || []});
    //     } else {
    //         if (this.state.serviceNotFound && nextProps.serviceList.length > 0) {
    //             this.setState({serviceNotFound: false}, () => {
    //                 let first_service_id = nextProps.serviceList[0].id;
    //                 //Todo action call.
    //                 this.props.actions.videoAction.VideoList(first_service_id);
    //             });
    //         }
    //         this.setState({videoList: nextProps.videoList || []});
    //     }
    // }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        //Todo call coupon list
        //this.props.actions.videoAction.VideoList(first_service_id);
    }

    removeSpecificService = (VideoId) => {
        confirmAlert({
            key: VideoId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.videoAction.VideoDelete(VideoId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewVideo = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    editDialogClose = () => {
        this.setState({isEditDialogOpen: false});
    };

    handleChangeStore = (event, {value}) => {
        this.setState({selectedServiceId: value});
        if (value !== null) {
            //Todo ChangeList
            this.props.actions.videoAction.VideoList(value);
        }
    };


    render() {
        const {videoList} = this.state;
        let selected_video = videoList.find((gallery) => gallery.id === this.state.selectedVideoId);
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen} serviceList={options}
                           notify={this.addNotifications} selectedServiceId={this.state.selectedServiceId}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                        <h2 className="text-white"> Manage Coupon </h2>
                        <button type="button" className="w-25 mr-4 button_main2"
                                onClick={this.addNewVideo}>Add New Coupon
                        </button>
                    </div>
                    <div>
                        {videoList.length > 0 && <div className="data-display col-sm-12">
                            <div className="overflow-scroll">
                                <table width="100%" className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{cursor: 'context-menu'}}>Video URL</th>
                                        <th style={{cursor: 'context-menu'}}>Title</th>
                                        <th style={{cursor: 'context-menu'}}>Description</th>
                                        <th style={{cursor: 'context-menu'}}>Sex</th>
                                        <th style={{cursor: 'context-menu'}}>Action</th>
                                    </tr>
                                    {videoList && videoList.map((value, index) => (
                                        <tr key={index}>
                                            <td>{value.video_url}</td>
                                            <td style={{"textTransform": "capitalize"}}>{value.title}</td>
                                            <td style={{"textTransform": "capitalize"}}>{value.description}</td>
                                            <td style={{"textTransform": "capitalize"}}>{value.sex}</td>
                                            <td style={{textAlign: "center"}}>
                                                <button type="button" className="btn btn-primary" key={index}
                                                        onClick={event => {
                                                            this.getSpecificService(value.id)
                                                        }}>Edit
                                                </button>
                                                &nbsp;
                                                <button type="button" className="btn btn-danger" key={value.id}
                                                        onClick={event => {
                                                            this.removeSpecificService(value.id)
                                                        }}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                    </div>
                </div>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageCouponReducer} = state;
    return {
        Loading: manageCouponReducer.Loading,
        error_msg: manageCouponReducer.error_msg,
        couponList: manageCouponReducer.couponList,
        success_msg: manageCouponReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        videoAction: bindActionCreators(videoAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageVideo);
