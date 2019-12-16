import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
import * as websiteAction from '../../../actions/websiteAction';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import {Dropdown} from 'semantic-ui-react';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_service: null,
            photos: [],
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
    }

    requestConvertToResponse(galleryList) {
        let GalleryList = [];
        galleryList.map((gallery, index) => {
            let single = {
                id: index, src: ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url,
                bigSrc: ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url
            };
            GalleryList.push(single);
        });
        return GalleryList;
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.serviceList.length > 0 && this.state.loadThisPage) {
            this.setState({loadThisPage: false}, () => {
                this.props.actions.websiteAction.getAllGallerys(this.props.serviceList[0].id);
            });
        }
        this.setState({photos: this.requestConvertToResponse(nextProps.allGalleryList)});
    }


    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            this.props.actions.websiteAction.getAllGallerys(value);
        }
    };

    render() {
        const photos = this.state.photos;
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let placeHolder = options.length > 1 ? options[0].text : "Service Loading...";

        return (
            <div className="mt-5 pt-md-5 pt-2">
                <div className="mt-5 mb-3 w-100 d-flex flex-column align-items-center">
                    <Dropdown style={{width:'60%'}} placeholder={placeHolder} fluid selection options={options}
                              onChange={this.handleChangeService}/>
                </div>
                <PhotoGrid columns={4} photos={photos}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        allGalleryList: websiteReducer.allGalleryList,
        serviceList: websiteReducer.serviceList,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);