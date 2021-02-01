import axios from 'axios';
import { message } from 'antd';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    // if (config.headers['Content-Type'] !== 'application/json') {
    //     config.data = JSON.stringify(config.data);
    // }
    return config;
}, error => Promise.reject(error));

const contentTypeMap = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded',
    file: 'multipart/form-data',
};

export function ajax({
    method = 'get',
    api,
    params,
    contentType = 'form',
}) {
    const headers = {
        'Content-Type': contentTypeMap[contentType] || 'application/x-www-form-urlencoded',
    };

    let config;
    let callerFunc;
    if (method === 'post') {
        config = {
            headers,
        };
        callerFunc = axios.post;
    } else if (method === 'get') {
        params = {
            params,
            headers,
        };
        callerFunc = axios.get;
    } else {
        callerFunc = () => {
            throw new Error(`当前方法${method}暂不支持`);
        };
    }
    return callerFunc(api, params, config).then((response) => {
        const { status, data } = response;

        if (status === 200) {
            const res = data;
            if (typeof res === 'string') {
                message.error('返回值解析错误');
            } else {
                return res;
            }
        } else {
            message.error('网络请求失败');
        }
        return undefined;
    }).catch((e) => {
        console.log(e);
    });
}

export function ajaxFile({ api, params }) {
    const formData = new FormData();
    formData.append('file', params.file);
    const config = {
        method: 'post',
        body: formData,
    };
    return fetch(api, config).then(response => response.json());
}

export const pure = axios;

export default {
    common: ajax,
    ajaxFile,
};
