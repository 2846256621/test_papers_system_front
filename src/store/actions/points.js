import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {
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
                    totalPointsCount: res.data.totalCount,
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
                    pointsAllList: res.data,
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


    addPoint: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.addPoint,
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
                    type: actionType.ADD_POINT,
                    pointAddSuccess: true,
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

    updatePoint: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.updatePoint,
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
                    type: actionType.UPDATE_POINT,
                    pointUpdateSuccess: true,
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

    dropPoint: params => () => {
        const options = {
            method: 'get',
            api: APIS.dropPoint,
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