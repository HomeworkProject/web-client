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

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
