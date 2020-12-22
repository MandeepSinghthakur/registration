
import axios from 'axios'

export  const userService = {
    login,
    deleteItem,
    getAll
};

function login(payload) {
	return axios.post('/login', {
           formdata:payload
       })
      .then(function (response) {
       return response;
      })
      .catch(function (error) {
        return error;
    });
}

function deleteItem(payload){
	return axios.post('/delete', {
           formdata:payload
       })
      .then(function (response) {
       return response;
      })
      .catch(function (error) {
        return error;
    });
}

function getAll(){
    return axios.get('/users')
      .then(function (response) {
      	return response.data.users
      })
      .catch(function (error) {
        console.log(error);
      });
  }

function update(payload, imageData){
  return  axios.put('/update', {
            formdata:payload,
            imageData: imageData
          })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
}
