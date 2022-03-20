
import { HttpApi, HttpOptions, HttpResponse } from '@cogears/http-client'

export default class BaseApi extends HttpApi {
    static env: string = ''
    static token: string = ''

    constructor(domain: string) {
        super(domain)
    }

    preRequest(options: HttpOptions): HttpOptions {
        return options
    }

    async postRequest(response: HttpResponse, url: string) {
        return response
    }

}