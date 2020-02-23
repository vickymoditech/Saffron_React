import React, {Component} from 'react';
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {Dropdown} from 'semantic-ui-react';
import './videoStyle.css';
import YouTube from 'react-youtube';

class VideoGalleryMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_service: null,
            videos: [],
            loadThisPage: false
        }
    }

    componentWillMount() {
        if (this.props.serviceList.length > 0) {
            this.props.actions.websiteAction.getAllVideos(this.props.serviceList[0].id);
        } else {
            this.setState({loadThisPage: true}, () => {
                this.props.actions.websiteAction.getWebsiteHome();
            });
        }
        this.props.actions.websiteAction.basketVisible(true);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.serviceList.length > 0 && this.state.loadThisPage) {
            this.setState({loadThisPage: false}, () => {
                this.props.actions.websiteAction.getAllVideos(this.props.serviceList[0].id);
            });
        }
        this.setState({videos: nextProps.allVideoList});
    }

    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            this.props.actions.websiteAction.getAllVideos(value);
        }
    };

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    render() {

        const {videos} = this.state;

        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let placeHolder = options.length > 1 ? options[0].text : "Service Loading...";

        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 0
            }
        };

        return (
            <div>
                <section className="gallery pt-5 pb-5" style={{marginTop: '80px'}}>
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Videos</span>
                            <Dropdown style={{width: '60%', margin: '0 auto', marginBottom: '10px'}}
                                      placeholder={placeHolder} fluid selection options={options}
                                      onChange={this.handleChangeService}/>

                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6">
                                        {videos.map((video, index) => (
                                            <div className="video_box" key={index}>
                                                <YouTube className="w-100"
                                                    videoId={video.video_url}
                                                    opts={opts}
                                                    onReady={this._onReady}
                                                />
                                                <div className="video_content">
                                                    <span>Name</span>
                                                    <p>Description</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        allVideoList: websiteReducer.allVideoList,
        serviceList: websiteReducer.serviceList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGalleryMain);
