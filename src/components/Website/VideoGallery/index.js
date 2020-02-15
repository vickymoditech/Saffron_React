import React, {Component} from 'react';
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {Dropdown} from 'semantic-ui-react';
import ImageLoader from 'react-load-image';
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
            this.props.actions.websiteAction.getAllGallerys(this.props.serviceList[0].id);
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

    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            this.props.actions.websiteAction.getAllGallerys(value);
        }
    };

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    render() {

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
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
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
                                        <div className="video_box m-3">
                                            <YouTube
                                                videoId="2g811Eo7K8U"
                                                opts={opts}
                                                onReady={this._onReady}
                                            />
                                            <div className="video_content">
                                                <span>Name</span>
                                                <p>Description</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="video_box m-3">
                                            <ImageLoader src="/assets/Images/NoImages.png">
                                                <img className="img-fluid" alt="Video Image"/>
                                                <img src="/assets/Images/NoImages.png" alt="Gallery Image"/>
                                                <img src="/assets/Images/s_loader.gif" alt="Gallery Image"/>
                                            </ImageLoader>
                                            <div className="video_content">
                                                <span>Name</span>
                                                <p>Description</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="video_box m-3">
                                            <ImageLoader src="/assets/Images/NoImages.png">
                                                <img className="img-fluid" alt="Video Image"/>
                                                <img src="/assets/Images/NoImages.png" alt="Gallery Image"/>
                                                <img src="/assets/Images/s_loader.gif" alt="Gallery Image"/>
                                            </ImageLoader>
                                            <div className="video_content">
                                                <span>Name</span>
                                                <p>Description</p>
                                            </div>
                                        </div>
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
        serviceList: websiteReducer.serviceList,

    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGalleryMain);
