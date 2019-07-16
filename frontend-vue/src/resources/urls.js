const TARGET_SERVER = {
  django: "http://192.168.99.100:8082",
  rails: ""
}

const urls = {
  django: {
    demo: '/demo/'
  },
  rails: {
    test: '/test/'
  }
}

class UrlBuilder {
  constructor(servers, urls) {
    this.servers = servers
    this.urls = urls
  }

  build () {
    let apiUrls = {}
    for (const [key, value] of Object.entries(this.urls)) {
      const targetServer = this.servers[key]
      for (const [api, path] of Object.entries(value)) {
        apiUrls[api] = targetServer + path
      }
    }
    return apiUrls
  }
}

export const apiUrls = new UrlBuilder(TARGET_SERVER, urls).build()
