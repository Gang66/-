export {}
declare global {
    interface IResponse<T = any> {
        code: number
        message: string
        data: T
    }
    interface IResult<T = any> {
        StatusCode: number;
        Errors: string;
        Data: T;
    }
    interface IObject<T> {
        [index: string]: T
    }
    interface ITable<T = any> {
        data : Array<T>
        total: number
        page: number
        size: number
    }
    interface Isearch<T = any> {
        page: number
        size: number
        param?:T
    }
    interface ImportMetaEnv {
        VITE_APP_TITLE: string
        VITE_PORT: number;
        VITE_PROXY: string;
    }
}