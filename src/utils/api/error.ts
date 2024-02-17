export class ApiError extends Error {
    readonly endpoint?: string;
    readonly statusCode?: number;

    constructor({ endpoint, message, statusCode }: { endpoint?: string; message: string; statusCode?: number }) {
        super(message);

        this.endpoint = endpoint;
        this.statusCode = statusCode;
    }
}