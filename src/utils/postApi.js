import tokenService from './tokenService';

const BASE_URL = '/api/posts';

export function create(post) {
  return fetch(BASE_URL, {
    method: 'POST',
    body: post,
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken() //sending headers to make sure someone is logged in (token stored in localstorage)
    },
  }).then((res) => res.json());
}

export function getAll() {
  return fetch(BASE_URL, {
    headers: {
      Authorization: "Bearer " + tokenService.getToken(), //always have to send over the token now that we're loggeed in
    },
  }).then((res) => res.json());
}