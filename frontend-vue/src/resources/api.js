import axios from 'axios';
import { keycloak } from '../main';

export class RestApi {

    constructor (target) {
        this.url = target
    }
    
    list() {
        const options = {
            headers: {
                'AUTHORIZATION': 'Bearer ' + keycloak.token
            }
        }
        return axios.get(
            this.url,
            options
        );
    }

    save(instance) {
        const options = {
            headers: {
                'AUTHORIZATION': 'Bearer ' + keycloak.token
            }
        }
        return axios.post(
            this.url,
            instance,
            options
        );
    }

}