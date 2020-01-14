import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import Modal from "react-responsive-modal";

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    DialogClose = () => {
        this.setState({isDialogOpen: false});
    };

    DialogOpen = () => {
        this.setState({isDialogOpen: true});
    };


    render() {
        const {isDialogOpen} = this.state;
        return (
            <div style={{marginTop:'100px',backgroundColor:'#f5f2ea'}}>
                <NotificationSystem ref="notificationSystem"/>
                <button type="button" className="btn btn-primary"
                        onClick={this.DialogOpen}>Open
                </button>
                <Modal open={isDialogOpen} onClose={this.DialogClose}>
                    <h2>Simple centered modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
                </Modal>

                {/*{this.props.Loading || this.props.Galley_Loading && <Loader/>}*/}
            </div>
        );

    }
}

export default ProductList;
