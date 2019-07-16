import axios from 'axios';

export class RestApi {

    constructor (endpoint, model) {
        this.endpoint = endpoint
        this.model = model
    }
    
    async list(token, options={}) {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + token}}
        try {
          Object.assign(sendOptions, options)
          let res = await axios.get(
              this.endpoint,
              sendOptions
          )
          return new Promise((resolve) => {
            resolve(res.data.map(d => this.model.fromData(d)))
          })
        } catch (err) {
          console.error(err)
        }
    }

    async create(instance, token, options={}) {
        const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + token}}
        try {
          Object.assign(sendOptions, options)
          let res = await axios.post(
            this.endpoint,
            instance.toData(),
            sendOptions
          )
          return new Promise((resolve) => {
            resolve(this.model.fromData(res.data))
          })
        } catch (err) {
            try {
                alert(JSON.stringify(error.response.data))
            } catch (error) {
                alert("failured")
            }
        }
    }

    async update(instance, token, options={}) {
      const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + token}}
      try {
        Object.assign(sendOptions, options)
        let res = await axios.put(
          this.endpoint + `${instance.id}/`,
          instance.toData(),
          sendOptions
        )
        return new Promise((resolve) => {
          resolve(this.model.fromData(res.data))
        })
      } catch (err) {
        try {
          alert(JSON.stringify(err.response.data))
        } catch (error) {
            alert("failured")
        }
      }
    }

    save(instance, token, options={}) {
      if (instance.id) {
        return this.update(instance, token, options)
      } else {
        return this.create(instance, token, options)
      }
    }

    async delete(instance, token) {
      const sendOptions = {headers: {'AUTHORIZATION': 'Bearer ' + token}}
      try {
        Object.assign(sendOptions, options)
        let res = await axios.delete(
          this.endpoint + `${instance.id}/`,
          sendOptions
        )
        return new Promise((resolve) => {
          resolve(res.data)
        })
      } catch (err) {
        try {
          alert(JSON.stringify(err.response.data))
        } catch (error) {
            alert("failured")
        }
      }
    }
}