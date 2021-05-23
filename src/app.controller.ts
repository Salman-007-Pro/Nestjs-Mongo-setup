import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

interface Person {
  name: string;
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/javascript')
  getHello(): Person {
    // return this.appService.getHello();
    return {
      name: 'Muhammad Salman Asif',
      age: 23,
    };
  }
}
