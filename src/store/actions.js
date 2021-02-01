import actionType from './actionType.js';
import APIS from '../constants/api.js';
import $ajax from '../utils/ajax';
import { message } from 'antd';

const actions = {
    onLogin: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.login,
            params: params.formData,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success(res.msg);
                dispatch({
                    type: actionType.LOGIN,
                    username: res.data.username,
                });
                window.localStorage.setItem('username', res.data.username);
                window.localStorage.setItem('type', res.data.type); 
                params.props.history.push('/home');
            } else {
                message.error(res.msg);
            }
            return res;
        }).catch((e) => {
            console.log(e);
        })
    },
    getPoints: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.getPoints,
            params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.GET_POINTS,
                    pointsList: res.data.dataList,
                });
            } else {
                console.log(res.message);
                message.error(res.message);
            }
            return res;
        }).catch((e) => {
            console.log(e);
            console.log(e.message);
            message.error(e.message);
        });
    },

    getAllPoints: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.getAllPoints,
            params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.GET_ALL_POINTS,
                    pointsAllList: res.data.dataList,
                    totalCount: res.data.totalCount,
                });
            } else {
                message.error(res.message);
            }
            return res;
        }).catch((e) => {
            console.log(e);
        });
    },

    getSubjects: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.getSubjects,
            params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.GET_SUBJECTS,
                    subjectsList: res.data.dataList,
                    totalCount: res.data.totalCount,
                });
            } else {
                message.error(res.message);
            }
            return res;
        }).catch((e) => {
            console.log(e);
        });
    }
}
export default actions;