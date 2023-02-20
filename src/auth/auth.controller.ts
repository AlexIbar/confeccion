import { Body, Controller, Post } from '@nestjs/common';
import { Login } from 'src/dtos/usuarios/Login';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post()
    login(
        @Body() logUser : Login
    ){
        return this.authService.login(logUser)
    }
}
