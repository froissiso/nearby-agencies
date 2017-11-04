import React from 'react';
import './css/AgencyResultRow.css';

class AgencyResultRow extends React.Component {

  render() {
    return (
      <div className="component-agency-result-row">
          <img
            src={this.props.icon}
          />
          <span
            className="span1"
          >
            <b>{this.props.name}</b> | {this.props.vicinity}  <font color = "darkgray"><small> <sup>Distance index: {this.calculateDistancesSum(this.props.distance1,this.props.distance2)}</sup></small></font>
          </span>
      </div>
    );
  }

  roundDistancesSum(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }
  calculateDistancesSum(dist1,dist2){
    if(isNaN(dist1)){
      dist1 = 0;
    }
    if(isNaN(dist2)){
      dist2 = 0;
    }
    return this.roundDistancesSum(dist1 + dist2, 5)
  }

}
export default AgencyResultRow;