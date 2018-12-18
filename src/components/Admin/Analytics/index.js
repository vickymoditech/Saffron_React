import React, {Component} from 'react';
import {Dropdown} from 'semantic-ui-react';
import './analytics.css';
import AverageWaitTimeReport from './AverageWaitTimeReport';

class Analytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            team: [{
                text: "one",
                value: 1
            }, {
                text: "two",
                value: 2
            }, {
                text: "three",
                value: 3
            }]
        }
    }

    onChangeReportSelection = (event, {value}) => {
        console.log(value);
    };

    render() {

        return (
            <div>
                <div className="sub-header-dropdown">
                    <div className="dropdown-right">
                        <Dropdown
                            placeholder="select team member"
                            options={this.state.team}
                            fluid selection
                            onChange={this.onChangeReportSelection}
                        />
                    </div>
                </div>
                <div className="dashboard-main">
                    <AverageWaitTimeReport loading={false}/>
                    <AverageWaitTimeReport loading={false}/>
                    <AverageWaitTimeReport loading={false}/>
                    <AverageWaitTimeReport loading={false}/>
                    <AverageWaitTimeReport loading={false}/>
                </div>
            </div>
        );

    }

}

export default Analytics;