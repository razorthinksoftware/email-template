// import fetch from "node-fetch";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API_ENDPOINT = id =>
  `http://tinyurl.com/api-create.php?url=skype:${id}?chat`;

exports.handler = (event, context, callback) => {
	console.log('EVENT', JSON.parse(event.body).url);
	const xhr = new XMLHttpRequest()
	xhr.onreadystatechange = () => {
	  if (xhr.readyState === 4) {
	    xhr.status === 200 ? 
	    	 console.log(xhr.responseText) : console.log("Error")
	  }

	  if (xhr.readyState === 4) {
	    xhr.status === 200 ? 
    	 callback(null, {
    		statusCode: 200,
    		body: xhr.responseText
		 }) : 
		 callback(null, {
    		statusCode: 404,
    		body: "Error"
		 })
	  }

	}
	xhr.open('GET', API_ENDPOINT(JSON.parse(event.body).url))
	xhr.send();
};
