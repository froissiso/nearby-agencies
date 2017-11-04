import AgencyResults from './AgencyResults';
import getAgenciesFromGooglePlaces from './getAgenciesFromGooglePlaces';
import getAddressSuggestions from './getAddressSuggestions';
import getLocationCoordinates from './getLocationCoordinates';
import Header from './Header';
import NameForm from './NameForm';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapAgencies: [],
      location1: {},
      location2: {},
      address1: 'Austin,Texas',
      address2: 'Redwood City,California',
      agency_distance_array: [],
      agency_distance_array2: []
    };

    this.generateOutput.bind(this);
    this.generateOutput();
  }

  generateOutput = () => {
    getLocationCoordinates.bind(this);
    getLocationCoordinates(this.state.address1).then((coord) => {
      if(coord!=="request failure" && coord.length > 0){
        this.setState({location1:coord[0].geometry.location});
      }
      else{
        this.setState({location1:0});
      }

      getLocationCoordinates(this.state.address2).then((coord2) => {
        if(coord2!=="request failure" && coord2.length > 0){
          this.setState({location2:coord2[0].geometry.location});
        }
        else{
          this.setState({location2:0});
        }
        getAgenciesFromGooglePlaces(this.state.location1).then((results) => {
          console.log("RESS __: ",results);
          this.setState({mapAgencies:results});
          console.log("Map agencies: ", this.state.mapAgencies);


          getAgenciesFromGooglePlaces(this.state.location2).then((results2) => {
            console.log("RESULTS2");
            console.log(results2);

            let updatedMapAgencies = this.state.mapAgencies.slice();
            results2.forEach(function(res2){
              updatedMapAgencies.push(res2);
            });
            this.setState({mapAgencies:updatedMapAgencies});

            var promise = new Promise(function(resolve) {
              var dist = this.calculateDistances();
              resolve(dist);
            }.bind(this));
            promise.then(function(dist){
              console.log("DIST: ");
              console.log(dist);

              // Take only name and distances
              let p = [];
              let visitedKeys = [];
              dist.forEach(function(entry){
                var name = entry[0].name;
                var icon = entry[0].icon;
                var vicinity = entry[0].vicinity;
                var types = "(";
                //console.log(entry[0].types);
                for(var i = 0 ; i<(entry[0].types.length)-1 ; i++){
                  types += entry[0].types[i] + ", ";
                }
                types += entry[0].types[entry[0].types.length-1]+")";
        
                var distance1 = entry[1];
                var distance2 = entry[2];
                var newEntry = {name:name,distance1:distance1,distance2:distance2,icon:icon,vicinity:vicinity,types:types};
                var key = newEntry.name + newEntry.distance1;

                if(visitedKeys.indexOf(key) === -1){
                  p.push(newEntry);
                  visitedKeys.push(key);
                }
                else{
                  console.log("Avoided duplicate with key: "+key);
                }
              });

              // SORT LIST when two input addresses
              p.sort(function(a,b) {

                var aDistance1 = 0;
                var aDistance2 = 0;
                var bDistance1 = 0;
                var bDistance2 = 0;

                if(isNaN(a.distance1)){
                  aDistance2 = a.distance2;
                  bDistance2 = b.distance2;
                }
                else if(isNaN(a.distance2)){
                  aDistance1 = a.distance1;
                  bDistance1 = b.distance1;
                }
                else{
                  aDistance1 = a.distance1;
                  bDistance1 = b.distance1;
                  aDistance2 = a.distance2;
                  bDistance2 = b.distance2;
                }
                var distancesSumA = aDistance1 + aDistance2;
                var distancesSumB = bDistance1 + bDistance2;

                return distancesSumA - distancesSumB;
              });

              this.setState({agency_distance_array2: p});

            }.bind(this));
          });
        });
      })
    });
  }

  calculateDistances = () => {
    var loc1 = this.state.location1;
    var loc2 = this.state.location2;

    // Calculate absolute distance between two locations.
    var calculateDistance = (l1,l2) => {
      var latsDif = l2.lat - l1.lat;
      var lngsDif = l2.lng - l2.lng;

      var result = Math.sqrt(Math.pow(latsDif,2) + Math.pow(lngsDif,2));
      return result;
    }

    var resultWithDistances = [];
    // Calculate and store distance for each agency
    this.state.mapAgencies.forEach(function(agency){
      var agency_loc = agency.geometry.location;
      var distance1 = calculateDistance(loc1,agency_loc);
      var distance2 = calculateDistance(loc2,agency_loc);

      resultWithDistances.push([agency,distance1,distance2]);
    });

    return resultWithDistances;
  }

  handleSubmit2 = (val,val2) => {
    let prom = new Promise((resolve) => {
      this.setState({
        address1:val,
        address2:val2,
      });
      resolve();
    });
    prom.then(() => {
      this.generateOutput();
    }
    );
  }

  clearList = () => {
    this.setState({agency_distance_array:[]});
    this.handleSubmit2("","");
  }

  generateSuggestions = (datalistID,partial_address) => {
    const list = document.getElementById(datalistID);

    if(partial_address !== ""){
      // First remove all previous suggestions
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }

      getAddressSuggestions(partial_address).then((suggs) => {
        suggs.forEach(item => {
          let option = document.createElement('option');
          option.value = item.description;   
          list.appendChild(option);
        });
      });
    }
  }
  render() {
    return (
      <div>
        <Header/>
        <NameForm handleSubmit2={this.handleSubmit2} add1={this.state.address1} add2={this.state.address2} 
        clearList={this.clearList} generateSuggestions={this.generateSuggestions}/>
        
        <AgencyResults
          agencyData={this.state.agency_distance_array2}
        />
      </div>
    );
  }
}
export default App;