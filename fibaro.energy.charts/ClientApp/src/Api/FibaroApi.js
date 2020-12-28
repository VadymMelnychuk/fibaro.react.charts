import BaseApi from './BaseApi';
import { Endpoints } from './Endpoints';

export default class FibaroApi extends BaseApi {

    GetInterfaceData() {
        let data = {
            url: Endpoints.Interface.Data,
            method: "GET"
        }

        return this.Query(data, "/fibaro");
    }
};