import React, {Component} from 'react';
import Loader from '../../Helper/Loader';
import NotificationSystem from 'react-notification-system';

import './layout.css';
import Running from '../Running';
import Recent from '../Recent';
import RunningLate from '../RunningLate';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hereNow: [],
            runningLate: [],
            onTheWay: [],
            isResetOpen: false
        }
    }

    render() {

        return (

            <div className="drive-by myClass">
                <NotificationSystem ref="notificationSystem"/>
                <section className={this.state.isResetOpen ? "drive-widget recent-runner" : "drive-widget"}>
                    <div className="drive-details">
                        <Running orders={this.state.hereNow}/>
                        <Recent orders={this.state.onTheWay}/>
                        <RunningLate orders={this.state.runningLate}/>
                    </div>
                    {/*<RecentOrder recentOrderData={this.state.recentOrder}*/}
                    {/*isLoading={this.props.startupData.loadRecentOrder} timeZone={this.state.timeZone}*/}
                    {/*storeInfo={this.state.storeInformation} storeName={this.state.storeName}*/}
                    {/*isResetOpen={this.state.isResetOpen}/>*/}
                </section>
                {this.state.loading && <Loader/>}
            </div>

        );

    }

}

export default Home;

