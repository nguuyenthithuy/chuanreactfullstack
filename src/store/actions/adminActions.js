import actionTypes from './actionTypes';
import {
    GetAllCodeService, creatNewUserReact, GetAllUser,
    DeleteUserService, UpdateUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await GetAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        }
        catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart err', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        }
        catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionFailed err', e)
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        }
        catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleFailed err', e)
        }
    }
}
export const creatNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await creatNewUserReact(data)
            console.log('check res', res)
            if (res && res.errCode === 0) {
                toast.success("Creat a new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart())
            }
            else {
                dispatch(saveUserFailed())
            }
        }
        catch (e) {
            dispatch(saveUserFailed())
            console.log('creatNewUser err', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREAT_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREAT_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllUser("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.user.reverse()))
            }
            else {
                dispatch(fetchAllUsersFailed())
            }
        }
        catch (e) {
            dispatch(fetchAllUsersFailed())
            console.log('fetchAllUsersStart err', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data

})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED

})

export const deleteAUsser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await DeleteUserService(userId)
            console.log('check res', res)
            if (res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart())
            }
            else {
                dispatch(deleteUserFailed());
                toast.error("Don't user wrong");
            }
        }
        catch (e) {
            dispatch(deleteUserFailed())
            console.log('deleteAUsser err', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUsser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await UpdateUserService(data)
            console.log('check res', res)
            if (res && res.errCode === 0) {
                toast.success("Edit user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart())
            }
            else {
                dispatch(editUserFailed());
                toast.error("Don't user wrong");
            }
        }
        catch (e) {
            dispatch(editUserFailed())
            console.log('editUserFailed err', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,

                })
            }


        }
        catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })

        }
    }
}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,

                })
            }


        }
        catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })

        }
    }
}
export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail doctor success");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                toast.error("Save detail doctor failed");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,

                })
            }


        }
        catch (e) {
            toast.error("Save detail doctor failed");
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })

        }
    }
}

export const fetchAllCodeTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await GetAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,

                })
            }


        }
        catch (e) {
            console.log('FETCH_ALL_CODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
            })

        }
    }
}
export const getAllRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await GetAllCodeService("PRICE");
            let resPresPaymentrice = await GetAllCodeService("PAYMENT");
            let resProvince = await GetAllCodeService("PROVINCE");

            if (resPrice && resPrice.errCode === 0
                && resPresPaymentrice && resPresPaymentrice.errCode === 0
                && resProvince && resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPresPaymentrice: resPresPaymentrice.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequireDoctorInforSuccess(data))
            }
            else {
                dispatch(fetchRequireDoctorInforFailed())
            }
        }
        catch (e) {
            dispatch(fetchRequireDoctorInforFailed())
            console.log('fetchRequireDoctorInforFailed err', e)
        }
    }
}
export const fetchRequireDoctorInforSuccess = (allRequireData) => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequireData
})
export const fetchRequireDoctorInforFailed = () => ({
    type: actionTypes.FETCH_ALL_REQUIRED_DOCTOR_INFOR_FAILED
})
