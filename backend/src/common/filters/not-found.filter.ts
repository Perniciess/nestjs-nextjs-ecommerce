import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import type { Response } from 'express'
import { Catch, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string | string[] = 'Internal server error'

        if (exception.message && exception.message.includes('ENOENT: no such file or directory')) {
            status = HttpStatus.NOT_FOUND
            message = 'Custom error: bad URL.'
        }
        else if (exception instanceof HttpException) {
            status = exception.getStatus()
            const exceptionResponse = exception.getResponse()
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                if (Array.isArray((exceptionResponse as any).message)) {
                    message = (exceptionResponse as any).message
                }
                else {
                    message = (exceptionResponse as any).message || 'Bad Request'
                }
            }
            else {
                message = exceptionResponse as string
            }
        }
        response.status(status).json({
            statusCode: status,
            message,
        })
    }
}
