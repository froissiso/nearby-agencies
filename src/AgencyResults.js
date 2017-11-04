import React from 'react';
import AgencyResultRow from './AgencyResultRow';

class AgencyResults extends React.Component {
  render() {
    return (
      <div className="component-agency-results">
        {
          this.props.agencyData.map((agencyData) => {
            return (

              <AgencyResultRow
                key={agencyData.name + agencyData.distance1}
                name={agencyData.name}

                distance1={agencyData.distance1}
                distance2={agencyData.distance2}
                icon={agencyData.icon}
                vicinity={agencyData.vicinity}
                types={agencyData.types}
              />
            );
          })
        }
      </div>
    );
  }
}
export default AgencyResults;