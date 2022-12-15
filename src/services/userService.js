import axios from '../axios';


const handldeLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}
const GetAllUser = (userId) => {
    return axios.get(`/api/get-all-user?id=${userId}`)
}
const creatNewUserReact = (data) => {
    return axios.post('/api/creat-new-user', data)
}

const DeleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        // headers: {
        //   Authorization: authorizationToken
        // },
        data: {
            id: userId
        }
    });
}
const UpdateUserService = (inPutUser) => {
    return axios.put('/api/edit-user', inPutUser)
}
const GetAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}
export {
    handldeLoginApi,
    GetAllUser,
    creatNewUserReact,
    DeleteUserService,
    UpdateUserService,
    GetAllCodeService
}