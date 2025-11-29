export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;

    constructor(message: string, statusCode: number, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this);
    }
}

// error for not found
export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

// Validation error ( use for joi/zod/react-hook-form validation errors )
export class ValidationError extends AppError {
    constructor(message = "Invalid request data", details?: any){
        super(message, 400, true, details)
    }
}