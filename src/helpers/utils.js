export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
}
