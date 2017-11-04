import React from 'react';
import Header from './Header';
import SearchInput from './SearchInput';
import AgencyResults from './AgencyResults';
import AgencyResults2 from './AgencyResults2';
import filterAgency from './filterAgency';
import getAgenciesFromGooglePlaces from './getAgenciesFromGooglePlaces';
import getLocationCoordinates from './getLocationCoordinates';
import NameForm from './NameForm';
import getAddressSuggestions from './getAddressSuggestions';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    // var updateList = function(mapAgencies){
    //   // this.setState({
    //   //   mapAgencies
    //   // });
    //   console.log(mapAgencies);
    // }

    this.state = {
      filteredAgency: filterAgency('', 100),
      mapAgencies: [],
      location1: {},
      location2: {},
      address1: 'Austin,Texas',
      address2: 'Madrid',
      agency_distance_array: [],
      agency_distance_array2: []
    };
    //var address = 'Austin,Texas';
    //var coordinates;
    
    this.componentDidMount.bind(this);
    // this.generateOutput.bind(this);
    //this.generateOutput();

    this.generateOutput.bind(this);


    this.generateOutput();

    //this.pushAgency_distance.bind();  

    // getLocationCoordinates(this.state.address1).then((coord) => {
    //   //this.setState({address1:coord});
    //   //this.coordinates=coord;
    //   //console.log("COORD: "+coord.geometry);
    //   //console.log("Address1: ",this.state.address1);
    //   //console.log("X: ",this.state.address1[0].geometry.location);
    //   console.log("X: ",coord[0].geometry.location);
    //   this.setState({location1:coord[0].geometry.location});
    //   console.log("location1: ",this.state.address1);

    //   getAgenciesFromGooglePlaces(this.state.location1).then((results) => {this.setState({mapAgencies:results});});
    // });
    


    // getAgenciesFromGooglePlaces().then((results) => {this.setState({mapAgencies:results});});

    //console.log("HERE",this.state.mapAgencies);
    //console.log("HERE2",this.state.filteredAgency);

    
    console.log("YY: ");
    console.log(this.state.mapAgencies);
    console.log("ZZ: ");
    console.log(this.state.agency_distance_array);
    console.log("MM: ");
    console.log(this);

  }
  componentDidMount() {
    //this.setState({mapAgencies:[["wer",3],["sdf",456]]});
    
    console.log("PPP: ");
    console.log(this.state.agency_distance_array);
  }

  generateOutput = () => {
    //console.log("FUNCIONA generate output");
    getLocationCoordinates.bind(this);

    getLocationCoordinates(this.state.address1).then((coord) => {
      //this.setState({address1:coord});
      //this.coordinates=coord;
      //console.log("COORD: "+coord.geometry);
      //console.log("Address1: ",this.state.address1);
      //console.log("X: ",this.state.address1[0].geometry.location);
      //console.log("XIII: ",coord[0].geometry.location);
      console.log("COORD: "+coord);
      console.log(coord==="request failure");
      if(coord!=="request failure" && coord.length > 0){
        this.setState({location1:coord[0].geometry.location});
      }
      else{
        this.setState({location1:0});
      }
      //console.log("location1: ",this.state.address1);
      //console.log("THIS 2: ");
      //console.log(this);

      getLocationCoordinates(this.state.address2).then((coord2) => {
        if(coord2!=="request failure" && coord2.length > 0){
          this.setState({location2:coord2[0].geometry.location});
        }
        else{
          this.setState({location2:0});
        }
        //getAgenciesFromGooglePlaces.bind(this);
        getAgenciesFromGooglePlaces(this.state.location1).then((results) => {
          console.log("RESS XX: ",results);
          this.setState({mapAgencies:results});
          console.log("Map agencies: ", this.state.mapAgencies);


          getAgenciesFromGooglePlaces(this.state.location2).then((results2) => {
            console.log("RESULTS2");
            console.log(results2);

            let updatedMapAgencies = this.state.mapAgencies.slice();
            //updatedMapAgencies.push({name:"Probandonombre",geometry:{location:{lat:23,lng:4}}});
            results2.forEach(function(res2){
              updatedMapAgencies.push(res2);
            });
            this.setState({mapAgencies:updatedMapAgencies});


            // var agency_distance_map = {
            //   key1:"value1",
            //   key2:"value2",
            // };
            // agency_distance_map["key3"] = "value3";

            // Generate array of agencies and distances to the specified addresses
            //var agency_distance_array = [];
            
            //this.calculateDistances.bind(this);
            //this.pushAgency_distance.bind(this);
            //this.setState({agency_distance_array:[["sdf",3],["see",4],["dfg",57]]});
            var promise = new Promise(function(resolve) {
              var dist = this.calculateDistances();
              resolve(dist);
            }.bind(this));
            promise.then(function(dist){
              console.log("DIST: ");
              console.log(dist);

              //this.setState({agency_distance_array:["ddsdf",23]});
              
              //this.setState({agency_distance_array:dist});

              // let p = this.state.people.slice();
              // p.push({id: "", key: ""});
              // this.setState({people: p});

              // Take only name and distances
              let p = [];
              let visitedKeys = [];
              //let p = this.state.agency_distance_array2.slice();
              dist.forEach(function(entry){
                var name = entry[0].name;
                var icon = entry[0].icon;
                var vicinity = entry[0].vicinity;
                var types = "(";
                console.log(entry[0].types);
                for(var i = 0 ; i<(entry[0].types.length)-1 ; i++){
                  types += entry[0].types[i] + ", ";
                }
                types += entry[0].types[entry[0].types.length-1]+")";
        
                var distance1 = entry[1];
                var distance2 = entry[2];
                console.log("entry: distance1 ",distance1+" | distance2 "+ distance2);
                console.log("icon: "+icon);
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
                console.log("AQUI: "+a.distance1+", "+a.distance2);
                console.log(isNaN(a.distance2));

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
                // return a.distance1-b.distance1;
                var distancesSumA = aDistance1 + aDistance2;
                var distancesSumB = bDistance1 + bDistance2;

                return distancesSumA - distancesSumB;

                //return a[1]>b[1]? 1:a[1]<b[1]?-1:0;
              });

              //console.log("P: "+p[0].distance2);

              this.setState({agency_distance_array2: p});

            }.bind(this));
            
            

            //this.calculateDistances(this.pushAgency_distance);
            console.log("Agency Distance Array: ",this.state.agency_distance_array);

            // this.state.agency_distance_array.sort(function(a,b) {
            //   // console.log("AQUI: "+a+", "+b);
            //   return a[1]-b[1];
            //     //return a[1]>b[1]? 1:a[1]<b[1]?-1:0;
            // });
            console.log("SORTED AGENCY DISTANCE ARRAY: ",this.state.agency_distance_array);
            //return this.state.agency_distance_array;
            //this.setState(this.state.agency_distance_array);

            // agency_distance_array.push([this.state.mapAgencies[0],2]);
            // agency_distance_array.push([this.state.mapAgencies[1],4]);
            // agency_distance_array.push([this.state.mapAgencies[2],1]);
            // console.log("TESTING MAP: ",agency_distance_map);
            // console.log("AGENCY DISTANCE ARRAY: ",agency_distance_array);

            // agency_distance_array.sort = function(a,b) {
            //   console.log("AQUI: "+a+", "+b);
            //   return b[1]-a[1];
            //     //return a[1]>b[1]? 1:a[1]<b[1]?-1:0;
            // }


            // agency_distance_array.sort(function(a,b) {
            //   console.log("AQUI: "+a+", "+b);
            //   return a[1]-b[1];
            //     //return a[1]>b[1]? 1:a[1]<b[1]?-1:0;
            // });
            // console.log("SORTED AGENCY DISTANCE ARRAY: ",agency_distance_array);


            // var points = [[40,2], [100,3], [1,1], [5,67]];
            // points.sort(function(a, b){return a[0]-b[0]})
            // console.log("POINTS: ",points);

          });
        });
      })

      


      //console.log("2 SORTED AGENCY DISTANCE ARRAY: ",this.state.agency_distance_array);
    });
  }
  // pushAgency_distance = (newAgencyDistance) => {
  //     console.log("IUIUIUIUIU");
  //     this.state.agency_distance_array.push(newAgencyDistance);
  //   }

  calculateDistances = () => {
    //recorre mapAgencies
    //en cada una calcula distancia a address1 y almacena agency y distancia en array
    
    var loc1 = this.state.location1;
    var loc2 = this.state.location2;
    //console.log("ESTOY AQUI AHORA: ",loc2);



    // var a = ["a", "b", "c"];
    // a.forEach(function(entry) {
    //     console.log(entry);
    // });

    // Calculate absolute distance between two locations.
    var calculateDistance = (l1,l2) => {
      // console.log("sss: " +l1.lat);
      // console.log(l2.lat);

      var latsDif = l2.lat - l1.lat;
      var lngsDif = l2.lng - l2.lng;

      var x = Math.sqrt(Math.pow(9,2));
      var result = Math.sqrt(Math.pow(latsDif,2) + Math.pow(lngsDif,2));
      return result;
    }

    // var pushAgency_distance = (newAgencyDistance) => {
    //   this.state.agency_distance_array.push(newAgencyDistance);
    // } 
    var resultWithDistances = [];
    // Calculate and store distance for each agency
    this.state.mapAgencies.forEach(function(agency){
      //console.log("Agency: ",agency);


      var agency_loc = agency.geometry.location;
      //console.log("AGENCY LOC: ",agency_loc);

      var distance1 = calculateDistance(loc1,agency_loc);
      var distance2 = calculateDistance(loc2,agency_loc);
      //console.log("DISTANCE: ",distance1);

      //this.state.agency_distance_array.push([agency,distance1]);
      

      //pushAgency_distance([agency,distance1]);
      resultWithDistances.push([agency,distance1,distance2]);
    })

    return resultWithDistances;
    // var loc2 = this.state.mapAgencies[0].geometry.location;

    // var distance = this.calculateDistance(loc1,loc2);
    // console.log("DISTANCE: ",distance);
    // //this.state.agency_distance_array.push(["s",2]);
    // this.state.agency_distance_array.push([distance,3]);
    // // console.log("QQQ: ",this.state.mapAgencies);
    // // console.log("QCS: ",this.state.location1);
    // console.log("AGENCY DISTANCE ARRAY: "+this.state.agency_distance_array);
  }

  // Calculate absolute distance between two locations.
  // calculateDistance = (l1,l2) => {
  //     console.log("sss: " +l1.lat);
  //     console.log(l2.lat);

  //     var latsDif = l2.lat - l1.lat;
  //     var lngsDif = l2.lng - l2.lng;

  //     var x = Math.sqrt(Math.pow(9,2));
  //     var result = Math.sqrt(Math.pow(latsDif,2) + Math.pow(lngsDif,2));
  //     return result;
  // }

  handleSearchChange = (event) => {
    this.setState({

      filteredAgency: filterAgency(event.target.value, 100),
    });
  }

  // updateList(mapAgencies){
  //   this.setState({
  //     mapAgencies
  //   });
  // }

  // function getAgenciesFromGooglePlaces() {
  //   axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M`)
  //       .then(res => {
  //         //const posts = res.data.data.children.map(obj => obj.data);
  //         //this.setState({ posts });
  //         //const resultsList = res.children.map(obj => obj.data);
  //         //console.log(resultsList);
  //         var resultsList = res.data.results;
  //         console.log("AQUIESTOY ",resultsList);
  //   });
  // }


  // <form>
        //   <label>
        //     Address1:
        //     <input type="text" address1="address1" />
        //   </label>
        //   <input type="submit" value="Submit" />
        // </form> 


  handleSubmit2 = (val,val2) => {
    console.log("VAL: "+val);
    console.log("VAL2: "+val2);
    //this.state.address1 = val;
    // this.setState({
    //   address1:val,
    // });
    // //console.log("State address1: "+this.state.address1);
    // this.generateOutput();

    let prom = new Promise((resolve) => {
      this.setState({
        address1:val,
        address2:val2,
      });
      resolve();
    });
    prom.then(() => {
      //console.log("YIIIHHA "+successMessage);
      this.generateOutput();
    }
    );
  }

  clearList = () => {
    console.log("CLEAR2");
    this.setState({agency_distance_array:[]});
    this.handleSubmit2("","");
  }

  generateSuggestions = (datalistID,partial_address) => {
    console.log("HHH: "+ datalistID);
    console.log("PARTIAL: "+partial_address);
    const list = document.getElementById(datalistID);

    if(partial_address !== ""){
      // First remove all previous suggestions
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }


      getAddressSuggestions(partial_address).then((suggs) => {
        console.log("SUGGS: ");
        //console.log(suggs[0].description);
        suggs.forEach(item => {
          console.log("Sug: "+item.description);
          let option = document.createElement('option');
          option.value = item.description;   
          list.appendChild(option);
        });
      });
    }
    


    // ['Herr','Frau'].forEach(item => {
    //   let option = document.createElement('option');
    //   option.value = item;   
    //   list.appendChild(option);
    // });
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
        
        <AgencyResults2
          //agencyDistanceData={this.state.agency_distance_array}
          
          //agencyDistanceData={"holaaa"}
          //estoesthis = {this.state.mapAgencies}
          //agencyDistanceData={[["x",43],["y",24],["z",333]]}
        />
      </div>
    );
  }
}
export default App;
        //<SearchInput
          //textChange={this.handleSearchChange}
        ///>

        //<AgencyResults
          //agencyData={this.state.mapAgencies}
        ///>


        // <AgencyResults
        //   agencyData={this.state.filteredAgency}
        // />