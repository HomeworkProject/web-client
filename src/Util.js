export function makeRequestBody(requestParameters) {
  const requestBody = [];
  for (var property in requestParameters) {
    if (requestParameters.hasOwnProperty(property)) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(requestParameters[property]);
      requestBody.push(encodedKey + "=" + encodedValue);
    }
  }
  return requestBody.join("&");
}
