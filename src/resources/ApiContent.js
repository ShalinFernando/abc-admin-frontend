import axios from 'axios';

// Post API
export var postApi = (api, postDetail) => new Promise(((resolve, reject) => {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
  axios.post(api, postDetail).then((response) => {
    if (response.data.success) resolve(response); else resolve(response);
  }).catch((error) => { reject(error) })
}));

// Put API
export var putApi = (api, postDetail, id) => new Promise(((resolve, reject) => {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
  axios.put(api + "/" + id, postDetail).then((response) => {
    if (response.data.success) resolve(response); else resolve(false);
  }).catch((error) => { reject(error) })
}));

export var deleteApi = (api, postDetail) => new Promise(((resolve, reject) => {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
  axios.delete(api + "/" + postDetail).then((response) => {
    if (response.data.success) resolve(response); else resolve(false);
  }).catch((error) => { reject(error) })
}));

// GET API
export var getApi = (api, params) => new Promise(((resolve, reject) => {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
  axios.get(api, { params }).then((response) => {
    if (response.data.success) resolve(response); else { resolve(response) }
  }).catch((error) => { reject(error) })
}));

// Post API with Headers
export var postHeaderApi = (api, postDetail, headers) => new Promise(((resolve, reject) => {
  axios.post(api, postDetail, headers).then((response) => {
    if (response.data.success) resolve(response); else resolve(false);
  }).catch((error) => { reject(error) })
}));


// Post API with Headers
export var deleteHeaderApi = (api, postDetail, headers) => new Promise(((resolve, reject) => {
  axios.delete(api, postDetail, headers).then((response) => {
    if (response.data.success) resolve(response); else resolve(false);
  }).catch((error) => { reject(error) })
}));