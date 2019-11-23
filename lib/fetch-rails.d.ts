interface IDefaultOptions {
    headers: any;
    credentials: any;
}
interface IJSONOptions {
    headers: any;
    credentials: any;
    method: string;
    body: string;
}
declare const Fetch: {
    getCSRF: () => string;
    defaultHeadersJSON: (options: any) => any;
    defaultHeaders: (options?: {
        headers: any;
    }) => any;
    defaultCredentials: (options?: {
        credentials: any;
    }) => any;
    checkStatus: (response: any) => Promise<object>;
    json: (url: string, params: object, options: IDefaultOptions) => Promise<any>;
    requestDataJSON: (method: string, url: string, body: object, options: IJSONOptions) => Promise<any>;
    postJSON: (url: string, body: object, options: IJSONOptions) => any;
    putJSON: (url: string, body: object, options: IJSONOptions) => any;
    deleteJSON: (url: string, body: object, options: IJSONOptions) => any;
    html: (url: string, params: object, options: IDefaultOptions) => Promise<Response>;
    text: (url: string, options: IDefaultOptions) => Promise<any>;
    postForm: (url: string, form: any, options: {
        headers: any;
        credentials: any;
        body: FormData;
        method: any;
    }) => Promise<Response>;
};
export declare const encodeParams: (a: any) => any;
export default Fetch;
