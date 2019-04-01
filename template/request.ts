import http from 'utils/http';
import API from 'utils/API';

const request = {
    getList: params => {
        return http.get(API.BIS.user.list(), {
            params
        });
    }
};

export default request;
