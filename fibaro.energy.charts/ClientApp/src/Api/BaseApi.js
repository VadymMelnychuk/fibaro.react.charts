import axios from 'axios';
//import stringify from 'qs-stringify';

export default class BaseApi {
    RootUrl = '/';

    QueryMethods = class {
        static  GET = "GET";
        static  DELETE = "DELETE";
        static  HEAD = "HEAD";
        static  OPTIONS = "OPTIONS";
        static  PUT = "PUT";
        static  POST = "POST";
        static  PATCH  = "PATCH";
    };

    // private DefaultConfig: AxiosRequestConfig = {
    //     baseURL: this.RootUrl,
    //     timeout: 120000,
    //     paramsSerializer: stringify
    // };

    HandleResponse = function(response) {
        if (response.status >= 0) {
            return response.data;
        }

        return Promise.reject();
    };

    HandleError = function(e) {
        if (e?.response?.status === 401 || e?.response?.status === 403) {
            window.location.href = this.RootUrl;
        }

        if (axios.isCancel(e)) {
            console.warn(e.message);
        }

        return Promise.reject(e);
    };

    Query = function(params, url, method = this.QueryMethods.POST, options) {
        //let { token: cancelToken, cancel } = axios.CancelToken.source();
        let config = { ...options, method, url};//, cancelToken };

        //cancel = cancel.bind(this, `${method} "${url}" request is canceled.`);

        method = method || this.QueryMethods.POST;

        if (
            method === this.QueryMethods.POST ||
            method === this.QueryMethods.PUT ||
            method === this.QueryMethods.PATCH
        ) {
            config.data = params;
        } else {
            config.params = params;
        }

        const query = axios(config)
             .then(response => this.HandleResponse(response))
             .catch((e) => this.HandleError(e));

        return query;    
        //return new Promise((resolutionFunc,rejectionFunc) => {resolutionFunc();});
    }

    // protected Submit<T>(
    //     formData: FormData,
    //     url: string
    // ): CancelablePromise<T> {

    //     let { token: cancelToken, cancel } = axios.CancelToken.source();
    //     const options = {
    //         headers: {
    //             'content-type': 'multipart/form-data',
    //         },
    //         cancelToken
    //     };

    //     cancel = cancel.bind(this, `POST "${url}" request is canceled.`);

    //     const query = axios.post(url, formData, options)
    //         .then((response: AxiosResponse<IData>) => this.HandleResponse<T>(response))
    //         .catch((e) => this.HandleError<T>(e));

    //     return Object.assign(query, { cancel });
    // }
}
