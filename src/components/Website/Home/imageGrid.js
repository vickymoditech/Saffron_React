import React from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="gallery pt-5">
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Gallery</span>
                            <p className="sub_title py-3">Separated they live in. A small river named Duden flows by
                                their place and supplies it with the necessary regelialia.</p>
                        </div>
                        <div className="row">
                            {this.props.galleryList.map((gallery, index) => (
                                <div className="col-md-3 px-0" key={index}>
                                    <div className="main_img_box">
                                        <img className="img-fluid" alt="image"
                                             src={ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ImageGrid;
