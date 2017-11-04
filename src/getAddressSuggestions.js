import axios from 'axios';

export default function getAddressSuggestions(partial_address) {
	
	var input = partial_address;
	var key = 'AIzaSyDeF5VsxeTsdAaoEpX7mzoTRt7Zxq5WP6M';
	var types = 'geocode';

	var parameters = `input=`+input+`&types=`+types+`&key=`+key;
	var url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?'+parameters;

	console.log("URL3: "+url);
	return axios.get(url)
      .then(res => {
        //const posts = res.data.data.children.map(obj => obj.data);
        //this.setState({ posts });
        //const resultsList = res.children.map(obj => obj.data);
        //console.log(resultsList);
        var resultsList = res.data.predictions;
        console.log("RES3:"+resultsList);
        return resultsList;
        //resolve(resultsList);
        //updateList(resultsList);
      });
      //console.log("AQUI ",resultsList);
      //return resultsList;

}