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

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const saveBulkCreatDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
export {
    handldeLoginApi,
    GetAllUser,
    creatNewUserReact,
    DeleteUserService,
    UpdateUserService,
    GetAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkCreatDoctor
}