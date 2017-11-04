import React from 'react';
import AgencyResultRow2 from './AgencyResultRow2';
import './css/AgencyResults.css';

class AgencyResults2 extends React.Component {
  render() {
    return (
      <div className="component-agency-results">
      {this.props.agencyDistanceData}
        {
          // this.props.agencyDistanceData.forEach(function(agencyDD){
          //   console.log("AGENCY DD: ",agencyDD);
          // });


          // this.props.agencyDistanceData.map((agencyDD) => {
          //   return (
          //     <AgencyResultRow2
          //       // key={agencyData.symbol}
          //       // symbol={agencyData.symbol}
          //       // title={agencyData.title}
                
          //       key={agencyDD[0]}
          //       name={agencyDD[0]}
          //       distance1={agencyDD[1]}
          //       //description={agencyDistanceData[0].description}
          //       //coordinates={agencyDistanceData[0].geometry.location}
          //     />
          //   );
          // })
        }
      </div>
    );
  }
}
// AgencyResults.propTypes = {
//   agencyData: React.PropTypes.array,
// };
export default AgencyResults2;