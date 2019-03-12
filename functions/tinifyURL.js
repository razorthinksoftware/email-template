import fetch from "node-fetch";

const API_ENDPOINT =
  "http://tinyurl.com/api-create.php?url=skype:terrence.robert?chat";

exports.handler = (event, context) => {
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
