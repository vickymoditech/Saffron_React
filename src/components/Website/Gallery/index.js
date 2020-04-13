import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as websiteAction from '../../../actions/websiteAction';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import {Dropdown} from 'semantic-ui-react';
import ImageLoader from 'react-load-image';

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
        this.props.actions.websiteAction.basketVisible(true);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.serviceList.length > 0 && this.state.loadThisPage) {
            this.setState({loadThisPage: false}, () => {
                this.props.actions.websiteAction.getAllGallerys(this.props.serviceList[0].id);
            });
        }
        this.setState({photos: nextProps.allGalleryList});
    }

    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            this.props.actions.websiteAction.getAllGallerys(value);
        }
    };

    render() {
        const {photos} = this.state;
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let defaultValue = options.length > 0 ? options[0].value : "";

        return (
            <div>
                <section className="gallery pt-5 pb-5" style={{marginTop: '80px'}}>
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Gallery</span>
                            <Dropdown style={{width: '60%', margin: '0 auto', marginBottom: '10px'}}
                                      placeholder={"Select Service"} fluid selection options={options}
                                      defaultValue={defaultValue}
                                      onChange={this.handleChangeService}/>
                        </div>
                        <div className="row">
                            {photos.map((gallery, index) => (
                                <div className="col-md-3 px-0" key={index}>
                                    <div className="main_img_box">
                                        <ImageLoader
                                            src={ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url}>
                                            <img className="img-fluid" alt="Saffron Gallery Image"/>
                                            <img className="img-fluid" src="/assets/Images/NoImages.png" alt="Saffron Gallery Image" />
                                            <img className="img-fluid" src="/assets/Images/s_loader.gif" alt="Saffron Gallery Image" />
                                        </ImageLoader>
                                    </div>
                                </div>
                            ))}
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
