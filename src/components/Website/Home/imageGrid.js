import React from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import './websiteCss/ImageGrid.css';

class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="container1">
                    <div id="carousel">
                        {this.props.galleryList.map((gallery, index) => (
                            <figure key={index}>
                                <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url} alt=""
                                     style={{height: "100%", width: "100%"}}/>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageGrid;