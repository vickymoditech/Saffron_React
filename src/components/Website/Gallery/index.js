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



    componentWillReceiveProps(nextProps) {
        if (this.state.current_service !== null) {
            let findAllGalleryList = this.props.allGalleryList.filter((data) => data.service_id === this.state.current_service);
            this.setState({photos: this.requestConvertToResponse(findAllGalleryList)});
        } else
            this.setState({photos: this.requestConvertToResponse(nextProps.allGalleryList)});
    }


    handleChangeStore = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            let findAllGalleryList = this.props.allGalleryList.filter((data) => data.service_id === value);
            this.setState({photos: this.requestConvertToResponse(findAllGalleryList)});
        } else
            this.setState({photos: this.requestConvertToResponse(this.props.allGalleryList)});
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
        return (
            <div>
                <div>
                    <Dropdown placeholder='Select Service' fluid selection options={options}
                              onChange={this.handleChangeStore}/>
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