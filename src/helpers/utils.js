export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(params[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
}

export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export function setAuthTokeninLocalStorage(token) {
  return localStorage.setItem('token', token);
}
