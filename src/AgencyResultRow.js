import React from 'react';
import './css/AgencyResultRow.css';

class AgencyResultRow extends React.Component {

  render() {
    // const codePointHex = this.props.symbol.codePointAt(0).toString(16);
    // const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
    return (
      <div className="component-agency-result-row">
        <img
          //alt={this.props.name}
          //src={src}
        />
        <span
          className="name"
        >
          {this.props.name} | Distances Sum (rounded after sorting): {this.calculateDistancesSum(this.props.distance1,this.props.distance2)}

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
// AgencyResultsRow.propTypes = {
//   title: React.PropTypes.string,
//   symbol: React.PropTypes.string,
// };
export default AgencyResultRow;

//| LAT: {this.props.coordinates.lat}  LNG: {this.props.coordinates.lng} 