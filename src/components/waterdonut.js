import React from 'react'
import ApexCharts from 'apexcharts'

class WaterDonut extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{full: 0}, {empty: 100}],
        options: {
          chart: {
            width: 380,
            type: 'donut',
          },
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          }
        },
        cupCount: 0
      
      
      };
    }

  
    appendData() {
        let newFull
        let newEmpty
        if (this.state.series.full === 100 && this.state.series.empty === 0) {
            newFull = 10
            newEmpty = 90
            this.setState({
                cupCount: this.state.cupCount + 1 
            })
        } else {
            newFull = this.state.series.full + 10
            newEmpty = this.state.series.empty - 10
        }
    
        this.setState({
            series: [{full: newFull}, {empty: newEmpty}]
        })
    }
    
    removeData() {
        let newFull
        let newEmpty
        let newCupCount

        if (this.state.series.full === 0 && this.state.series.empty === 100 && this.state.cupCount > 1) {
            newFull = 90
            newEmpty = 10
            newCupCount = this.state.cupCount - 1
        } else {
            newFull = this.state.series.full - 10
            newEmpty = this.state.series.empty + 10
        }
    
        this.setState({
            series: [{full: newFull}, {empty: newEmpty}],
            cupCount: newCupCount
        })
    }
    
    
    reset() {
      this.setState({
        series: [{full: 0, empty: 100}],
        cupCount: 0
      })
    }
  

    render() {
      return (
        <div>
        <div class="chart-wrap">
        <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={380} />
        </div>
        </div>

        <div class="actions">
        <button
            
            onClick={() => this.appendData()}
            >
        + ADD
        </button>
        &nbsp;
        <button
            
            onClick={() => this.removeData()}
            >
        - REMOVE
        </button>
        &nbsp;
        <button
            
            onClick={() => this.randomize()}
            >
        RANDOMIZE
        </button>
        &nbsp;
        <button
            
            onClick={() => this.reset()}
            >
        RESET
        </button>
        </div>
        </div>


      );
    }
  }

  export default WaterDonut