import actionType from '../actionType.js';
import APIS from '../../constants/api.js';
import $ajax from '../../utils/ajax';
import { message } from 'antd';

const actions = {
    onLogin: params => dispatch => {
        const options = {
            method: 'post',
            api: APIS.login,
            params: params.formData,
        };
        $ajax.common(options).then((res) => {
            if (res.code === 10000) {
                message.success(res.message);
                dispatch({
                    type: actionType.LOGIN,
                    username: res.data.userName,
                    type: res.data.type,
                });
                window.localStorage.setItem('userId', res.data.userId);
                window.localStorage.setItem('username', res.data.userName);
                window.localStorage.setItem('type', res.data.type); 
                params.props.history.push('/home');
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