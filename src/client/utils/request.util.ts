import axios, { AxiosRequestConfig } from 'axios'

import { services } from 'config/services'
import { getDebugger } from 'utils/debugger.util'
import { RequestError } from 'errors/request-error'
import { getContext, Context } from 'utils/context.util'

interface ServiceRequestOptions
    extends Pick<AxiosRequestConfig, 'timeout' | 'params'>,
        Required<Pick<AxiosRequestConfig, 'url'>> {
    ctx?: Context
    serviceName: keyof typeof services
    url: string
}

export type RequestOptions<RequestPostData> =
    | (ServiceRequestOptions & { method: 'POST' | 'post' | 'PUT' | 'put' } & { data: RequestPostData })
    | (ServiceRequestOptions & { method: 'get' | 'GET' | 'delete' | 'DELETE' })

const debug = getDebugger('utils.request')

export async function request<RequestPostData, ResponseData>(options: RequestOptions<RequestPostData>) {
    const { ctx, serviceName, ...axiosOptions } = options
    const { host, pathPrefix = '' } = services[serviceName]
    const { headers } = getContext(ctx)

    try {
        const response = await axios.request<ResponseData>({
            baseURL: `${host}${pathPrefix}`,
            withCredentials: true,
            headers,
            ...axiosOptions
        })

        if (response.data) return response.data

        throw new RequestError('Неожиданный ответ', response)
    } catch (error) {
        debug('Ошибка запроса: %o', error)
        throw new RequestError('Ошибка axios запроса', error)
    }
}
