import React, {Component} from 'react';

import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Line} from 'react-chartjs-2';


export default class AverageWaitTimeReport extends Component {

    render() {
        const data =[];
        return (
            <div>
                <div className="col-lg-6 col-xs-12 col-sm-12 avg-wait-time-report">
                    <div className="analytics-chart-modal">
                        <div className="analytics-chart-header">
                            <div className="chart-title">
                                <span>Average Wait Time Analytics</span>
                            </div>
                            <div className="chart-tools">
                            </div>
                        </div>
                        <div className="analytics-chart-body">
                            {this.props.loading ? <ChartLoader/> :
                                data.length > 0 ?
                                    <Line data={data}/> :
                                    <DataNotFound/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
