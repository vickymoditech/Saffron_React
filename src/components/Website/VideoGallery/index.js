import React, {Component} from 'react';
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {Dropdown} from 'semantic-ui-react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class VideoGalleryMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_service: null
        }
    }

    componentDidMount() {
        this.props.actions.websiteAction.basketVisible(true);
        window.scrollTo(0, 0);
    }

    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            alert(value);
        }
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

        return (
            <div>
                <section className="gallery pt-5 pb-5" style={{marginTop: '80px'}}>
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Videos</span>
                            <Dropdown style={{width: '60%', margin: '0 auto', marginBottom: '10px'}}
                                      placeholder={placeHolder} fluid selection options={options}
                                      onChange={this.handleChangeService}/>
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