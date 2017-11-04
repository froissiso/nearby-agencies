import axios from 'axios';

export default function getAgenciesFromGooglePlaces(location1) {
	//var resultsList;
	
	//var location = '30.267779,-97.748258';
	console.log("Location: ",location1);
	var location = ``+location1.lat+`,`+location1.lng;
	console.log(location);
	// miles
	var radius_miles = 10;
	// meters
	var radius = radius_miles * 1609.344;
	//console.log("radius meters: "+radius);
	var types = 'real_estate_agency';
	//var name = 'cruise';
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';

	var parameters = `location=`+location+`&radius=`+radius+`&types=`+types+`&key=`+key;//+`&name=`+name;
	var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+parameters;

	console.log("URL1: "+url);
	return axios.get(url)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        //this.setState({ posts });
        //const resultsList = res.children.map(obj => obj.data);
        //console.log(resultsList);
        var resultsList = res.data.results;
        console.log("RES:"+resultsList);
        return resultsList;
        //resolve(resultsList);
        //updateList(resultsList);
      });
      //console.log("AQUI ",resultsList);
      //return resultsList;
}