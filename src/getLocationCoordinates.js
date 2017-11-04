import axios from 'axios';

export default function getLocationCoordinates(address) {
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';

	var parameters = `address=`+address+`&key=`+key;
	//var url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?'+parameters;
  var url = 'https://cors-anywhere-own.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?'+parameters;

	console.log("URL2: "+url);
	return axios.get(url)
      .then(res => {

        var resultsList = res.data.results;
        console.log("RESULT: ");
        console.log(resultsList);
        return resultsList;

      }).catch((error) => {
        console.log(error);
        return "request failure";
      });
}