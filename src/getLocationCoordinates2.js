export default function getLocationCoordinates2(address) {
	// APROX, pendiendte exactitud en AUSTIN,TX
	//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M
	
  //console.log("ADDRESS 1: ",address1);
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';

	var parameters = `address=`+address+`&key=`+key;
	var url = 'http://anyorigin.com/go?url=https://maps.googleapis.com/maps/api/geocode/json?'+parameters;


  $.getJSON('http://anyorigin.com/go?url=https%3A//maps.googleapis.com/maps/api/geocode/json%3Faddress%3D1600+Amphitheatre+Parkway%2C+Mountain+View%2C+CA%26key%3DAIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M&callback=?', function(data){
    $('#output').html(data.contents);
  });

	console.log("URL2: "+url);
	return axios.get(url)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        //this.setState({ posts });
        //const resultsList = res.children.map(obj => obj.data);
        //console.log(resultsList);
        console.log("RES EEE: ");
        console.log(res);
        //console.log(JSON.parse(res.data.contents));
        console.log("RES: ");
        console.log(res.data.contents.results[0]);
        //console.log(JSON.parse(res.data.contents));
        //console.log("ESTO ES : ",res.data.contents.results);
        var resultsList = res.data.contents.results;
        //var resultsList = res.data.results;
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