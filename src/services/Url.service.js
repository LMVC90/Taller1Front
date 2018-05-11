import ApiService from './Api.service.js'

class UrlService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const urlService = new UrlService('url{/id}')