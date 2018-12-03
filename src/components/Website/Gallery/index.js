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
        this.state = {
            current_service: null,
            photos: []
        }
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
        return GalleryList;
    }


    getSpecificImages = (serviceId) => {
        this.setState({current_service: serviceId});
        if (serviceId !== null) {
            let findAllGalleryList = this.props.allGalleryList.filter((data) => data.service_id === serviceId);
            this.setState({photos: this.requestConvertToResponse(findAllGalleryList)});
        } else
            this.setState({photos: this.requestConvertToResponse(this.props.allGalleryList)});
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.current_service !== null) {
            let findAllGalleryList = this.props.allGalleryList.filter((data) => data.service_id === this.state.current_service);
            this.setState({photos: this.requestConvertToResponse(findAllGalleryList)});
        } else
            this.setState({photos: this.requestConvertToResponse(nextProps.allGalleryList)});
    }


    render() {
        const photos = this.state.photos;
        return (
            <div>
                <div>
                    {this.props.serviceList.map((service, index) => (
                        <button type="button" className="btn btn-primary" key={index}
                                onClick={event => {
                                    this.getSpecificImages(service.id)
                                }}>{service.title}</button>
                    ))}
                    <button type="button" className="btn btn-primary"
                            onClick={event => {
                                this.getSpecificImages(null)
                            }}>All
                    </button>
                </div>
                <PhotoGrid columns={3} photos={photos}/>
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