import React from 'react';
import AgencyResultRow from './AgencyResultRow';
import './css/AgencyResults.css';

class AgencyResults extends React.Component {
  render() {
    return (
      <div className="component-agency-results">
        {
          this.props.agencyData.map((agencyData) => {
            return (

              <AgencyResultRow
                // key={agencyData.symbol}
                // symbol={agencyData.symbol}
                // title={agencyData.title}
                
                key={agencyData.name + agencyData.distance1}
                name={agencyData.name}
                //description={agencyData.description}
                //coordinates={agencyData.geometry.location}
                distance1={agencyData.distance1}
                distance2={agencyData.distance2}
              />
            );
          })
        }
      </div>
    );
  }
}
// AgencyResults.propTypes = {
//   agencyData: React.PropTypes.array,
// };
export default AgencyResults;