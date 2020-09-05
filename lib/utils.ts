import fetch from 'isomorphic-unfetch';

export function post(endpoint: string, data: Object) {
  return fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  }).then((r) => r.json());
}
