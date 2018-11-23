import React, {Component} from 'react';
import {Link} from 'react-router';

class VideoGalleryMain extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4> Child Router </h4>
                <Link to="/VideoGallery/demo" className="link"> click here </Link>
                {this.props.children}
            </div>
        )
    }

}

export default VideoGalleryMain;