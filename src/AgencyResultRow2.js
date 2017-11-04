import React from 'react';
import './css/AgencyResultRow.css';

class AgencyResultRow2 extends React.Component {
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
          Name: {this.props.name} | Distance 1: {this.props.distance1}
        </span>
      </div>
    );
  }
}
// AgencyResultsRow.propTypes = {
//   title: React.PropTypes.string,
//   symbol: React.PropTypes.string,
// };
export default AgencyResultRow2;