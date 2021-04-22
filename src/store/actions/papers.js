import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {

    detailsPaper: params => dispatch => {
        const options = {
            method: 'get',
            api: APIS.detailsPaper,
            params,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.DETAILS_PAPER,
                    paperAttribute: res.data.paperAttribute,
                    paperDetails: res.data.paperDetails,
                    problemList: res.data.problemList,
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


    getPaperList: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.getpaperList,
            params,
            contentType: 'json',
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                dispatch({
                    type: actionType.PAPER_LIST,
                    paperList: res.data.dataList,
                    totalPaperCount: res.data.totalCount,
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

    dropPaper: params => () => {
        const options = {
            method: 'post',
            api: APIS.dropPaper,
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
    modifyPaper: params => (dispatch) => {
        const options = {
            method: 'post',
            api: APIS.modifyPaper,
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
                    type: actionType.MODIFY_PAPER,
                    modifyPaperSuccess: true,
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