import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PhotoGrid from "react-photo-feed";
import "react-photo-feed/library/style.css";
import * as websiteAction from '../../../actions/websiteAction';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class Gallery extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.websiteAction.getAllGallerys();
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
        debugger;
        return GalleryList;
    }

    render() {
        const photos = this.requestConvertToResponse(this.props.allGalleryList);
        return (
            <div>
                <PhotoGrid columns={3} photos={photos}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        allGalleryList: websiteReducer.allGalleryList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);