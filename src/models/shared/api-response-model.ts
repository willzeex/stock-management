export interface ApiResponseModel<TResult> {
    error: Error
    result: TResult
}

export interface Error {
    name: string
    description: string
    fieldErrors: FieldError[]
}

export interface FieldError {
    key: string
    value: string[]
}