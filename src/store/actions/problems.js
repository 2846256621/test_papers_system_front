import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {

    addProblem: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.addProblem,
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
                    type: actionType.ADD_PROBLEM,
                    problemAddSuccess: true,
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

    getAllProblem: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.getProblemList,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.GET_ALL_PROBLEM,
                    problemList: res.data.dataList,
                    totalProblemsCount: res.data.totalCount,
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

    viewProblem: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.viewProblem,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.VIEW_PROBLEM,
                    problemDetail: res.data,
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

    dropProblem: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.dropProblem,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.DROP_PROBLEM,
                    problemDropSuccess: true,
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

    modifyProblem: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.modifyProblem,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.MODIFY_PROBLEM,
                    problemModifySuccess: true,
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