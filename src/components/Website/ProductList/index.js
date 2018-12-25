import React, {Component} from 'react';
import NotificationSystem from 'react-notification-system';
import ProductDialogStepper from './ProductDialogStepper';


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

        return (

            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <ProductDialogStepper handleClose={this.DialogClose} isOpen={this.state.isDialogOpen}
                                      notify={this.addNotifications}/>}

                <button type="button" className="btn btn-primary"
                        onClick={this.DialogOpen}>Open
                </button>
                {/*{this.props.Loading || this.props.Galley_Loading && <Loader/>}*/}
            </div>

        );

    }
}

export default ProductList;