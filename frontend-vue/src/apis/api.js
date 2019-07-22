import axios from 'axios'
import { keycloak } from '../main'


export class RestApi {

  constructor (endpoint, model) {
      this.endpoint = endpoint
      this.model = model
  }

  show(instance, options={}) {
    return new Promise((resolve) => {
      keycloak.updateToken(30).success(async () => {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + keycloak.token}}
        Object.assign(sendOptions, options)
        let res = await axios.get(
            this.endpoint,
            sendOptions
        )
        resolve(res.data.map(d => this.model.fromData(d)))
      })
    })
  }

  list(options={}) {
    return new Promise((resolve) => {
      keycloak.updateToken(30).success(async () => {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + keycloak.token}}
        Object.assign(sendOptions, options)
        let res = await axios.get(
            this.endpoint,
            sendOptions
        )
        resolve(res.data.map(d => this.model.fromData(d)))
      })
    })
  }

  create(instance, options={}) {
    return new Promise((resolve) => {
      keycloak.updateToken(30).success(async () => {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + keycloak.token}}
        Object.assign(sendOptions, options)
        let res = await axios.post(
          this.endpoint,
          instance.toData(),
          sendOptions
        )
        resolve(this.model.fromData(res.data))
      })
    })
  }

  update(instance, options={}) {
    return new Promise((resolve) => {
      keycloak.updateToken(30).success(async () => {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + keycloak.token}}
        Object.assign(sendOptions, options)
        let res = await axios.put(
          this.endpoint + `${instance.id}/`,
          instance.toData(),
          sendOptions
        )
        resolve(this.model.fromData(res.data))
      })
    })
  }

  save(instance, options={}) {
    if (instance.id) {
      return this.update(instance, options)
    } else {
      return this.create(instance, options)
    }
  }

  delete(instance, options={}) {
    return new Promise((resolve) => {
      keycloak.updateToken(30).success(async () => {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + keycloak.token}}
        Object.assign(sendOptions, options)
        let res = await axios.delete(
          this.endpoint + `${instance.id}/`,
          sendOptions
        )
        resolve(res.status)
      })
    })
  }
}