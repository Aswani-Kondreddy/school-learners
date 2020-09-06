import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['June', 'July', 'August'],
                datasets: [
                    {
                        label: 'Learners status',
                        data: [
                            this.props.juneAttendance,
                            this.props.julyAttendance,
                            this.props.augustAttendance
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'

                        ]
                    }
                ]
            }
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
    }

    render() {
        return (
            <div style={{margin:"25px"}}>
                <div style={{ width: "70%" }}>
                    <Bar
                        data={this.state.chartData}
                        options={{
                            title: {
                                display: this.props.displayTitle,
                                text: "School Attendance of Learners",
                                fontSize: 25
                            },
                            legend: {
                                display: this.props.displayLegend,
                            },

                        }}
                    />
                </div>

            </div>
        )
    }
}

export default Chart;