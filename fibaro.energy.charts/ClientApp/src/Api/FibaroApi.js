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

    GetEnergyData(from, to, deviceId) {
        let data = {
            url: Endpoints.Energy.Power.replace('{from}', from).replace('{to}', to).replace('{deviceId}', deviceId),
            method: "GET"
        }

        return this.Query(data, "/fibaro")
    }
};