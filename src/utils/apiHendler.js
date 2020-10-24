import axios from 'axios';

const postAPI = (path, dataForm) => {
  return axios.post(path, dataForm)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }

      Promise.reject(res);
    })
    .catch(err => err.response.data);
};

const getAPI = path => {
  return axios.get(`${process.env.REACT_APP_API_SERVER}${path}`)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }

      Promise.reject(res);
    })
    .catch(() => {
      localStorage.removeItem('jwtToken');
      window.location.href = './login';
    });
};

// export const UpdateAPI = (path, params, dataForm, load = document.querySelector('.loading-bar')) => {
//   load.classList.add('is-loading');

//   return Axios.put(`${process.env.REACT_APP_API_SERVER}${path}/${params}`, dataForm, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   })
//     .then(res => {
//       if (res.status >= 200 && res.status <= 299) {
//         load.classList.remove('is-loading');
//         window.location.reload();
//       } else {
//         Promise.reject(res);
//       }
//     })
//     .catch(err => console.log(err));
// }

// export const DeleteAPI = id => {
//   return Axios.delete(`${process.env.REACT_APP_API_SERVER}${id}`)
//     .then(res => {
//       if (res.status >= 200 && res.status <= 299) {
//         window.location.reload();
//       } else {
//         Promise.reject(res);
//       }
//     })
//     .catch(err => console.log(err));
// }

export { postAPI, getAPI };
