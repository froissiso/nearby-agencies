import axios from 'axios';

export default function getAgenciesFromGooglePlaces(location1) {
	var location = ``+location1.lat+`,`+location1.lng;
	console.log(location);
	// radius in miles
	var radius_miles = 10;
	// radius in meters
	var radius = radius_miles * 1609.344;
	var types = 'real_estate_agency';
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';

	var parameters = `location=`+location+`&radius=`+radius+`&types=`+types+`&key=`+key;//+`&name=`+name;
	//var url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+parameters;
	var url = 'https://cors-anywhere-own.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?'+parameters;

	console.log("URL1: "+url);
	return axios.get(url)
      .then(res => {
        var resultsList = res.data.results;
        console.log("RES:"+resultsList);
        return resultsList;
      });
}