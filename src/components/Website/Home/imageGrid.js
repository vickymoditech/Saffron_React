import React from 'react';

class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="container1">
                    <div id="carousel">
                        {this.props.galleryList.map((image, index) => (
                            <figure key={index}>
                                <img src={image.src} alt="" style={{height: "100%", width: "100%"}}/>
                            </figure>
                        ))}
                    </div>
                </div>


            </div>
        );
    }
}

export default ImageGrid;