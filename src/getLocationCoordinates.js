import axios from 'axios';

export default function getLocationCoordinates(address) {
	// APROX, pendiendte exactitud en AUSTIN,TX
	//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M
	
  //console.log("ADDRESS 1: ",address1);
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';

	var parameters = `address=`+address+`&key=`+key;
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?'+parameters;

	console.log("URL2: "+url);
	return axios.get(url)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        //this.setState({ posts });
        //const resultsList = res.children.map(obj => obj.data);
        //console.log(resultsList);
        var resultsList = res.data.results;
        console.log("RESULT: "+resultsList);
        return resultsList;
        //resolve(resultsList);
        //updateList(resultsList);
      }).catch((error) => {
        console.log(error);
        return "request failure";
      });
      //console.log("AQUI ",resultsList);
      //return resultsList;
}