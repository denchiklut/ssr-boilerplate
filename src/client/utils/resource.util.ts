import { ResourceError } from 'errors/resource-error'
import { request, RequestOptions } from 'utils/request.util'
import { Context } from 'utils/context.util'

export type IResourceOptions<ResponseData, ReturnType> = {
    name: string
    onSuccess: (data: ResponseData) => ReturnType
    onError?: (error: ResourceError) => ResourceError
}

type OptionsMaker<ResourceParams, RequestPostData, ResponseData, ReturnType> = (
    ctx: Context,
    params: ResourceParams
) => RequestOptions<RequestPostData> & IResourceOptions<ResponseData, ReturnType>

export function resource<ResourceParams, RequestPostData, ResponseData, ResourceResult>(
    optionsMaker: OptionsMaker<ResourceParams, RequestPostData, ResponseData, ResourceResult>
) {
    return async (ctx: Context, params: ResourceParams): Promise<ResourceResult> => {
        const { name, onSuccess, onError, ...options } = optionsMaker(ctx, params)

        try {
            const response = await request<RequestPostData, ResponseData>(options)
            return onSuccess(response)
        } catch (error) {
            const resourceError = new ResourceError(name, error)
            if (onError) onError(resourceError)
            throw resourceError
        }
    }
}
