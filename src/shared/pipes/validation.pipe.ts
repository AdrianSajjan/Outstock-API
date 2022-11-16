import { BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      transform: true,
      exceptionFactory: (errors) => {
        const message = errors.map((error) => ({ field: error.property, error: Object.values(error.constraints).pop() }));
        throw new BadRequestException(message, 'One or more fields are invalid');
      },
    });
  }
}
