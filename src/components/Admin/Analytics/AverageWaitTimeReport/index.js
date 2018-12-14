import React, {Component} from 'react';

import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Line} from 'react-chartjs-2';


export default class AverageWaitTimeReport extends Component {


    render() {

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

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
                                data.datasets[0].data.length > 0 ?
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
