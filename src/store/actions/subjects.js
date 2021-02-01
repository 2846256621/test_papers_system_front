import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {
    
    getAllSubjects: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.getAllSubjects,
            params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.GET_ALL_SUBJECTS,
                    subjectsAllList: res.data,
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
                    totalSubjectCount: res.data.totalSubjectCount,
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
        });
    },

    addSubject: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.addSubject,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
                dispatch({
                    type: actionType.ADD_SUBJECT,
                    subjectAddSuccess: true,
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
        });
    },

    updateSubject: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.updateSubject,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
                });
                dispatch({
                    type: actionType.UPDATE_SUBJECT,
                    subjectUpdateSuccess: true,
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
        });
    },

    dropSubject: params => () => {
        const options = {
            method: 'get',
            api: APIS.dropSubject,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success({
                    content: res.message,
                    className: 'custom-class',
                    style: {marginTop: '30vh'},
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
        });
    },

}
export default actions;