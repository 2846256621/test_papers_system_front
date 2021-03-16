import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {
    addUser: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.addUser,
            params: params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success(res.message);
                dispatch({
                    type: actionType.ADD_USER,
                    userAddSuccess: true,
                });
            } else {
                message.error({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            }
            return res;
        }).catch((e) => {
            console.log(e);
        })
    },
    updateUser: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.updateUser,
            params: params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success(res.message);
                dispatch({
                    type: actionType.UPDATE_USER,
                    userUpdateSuccess: true,
                });
            } else {
                message.error({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            }
            return res;
        }).catch((e) => {
            console.log(e);
        })
    },
    forbidUser: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.forbidUser,
            params: params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success(res.message);
                dispatch({
                    type: actionType.FORBID_USER,
                    userForbidSuccess: true,
                });
            } else {
                message.error({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
            }
            return res;
        }).catch((e) => {
            console.log(e);
        })
    },
}
export default actions;