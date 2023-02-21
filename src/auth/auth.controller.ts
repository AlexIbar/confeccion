import { Body, Controller, Post} from '@nestjs/common';
import { Login } from 'src/dtos/usuarios/Login';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post()
    async login(
        @Body() logUser : Login
    ){
        let usuarioLogin =await this.authService.login(logUser)

        if(usuarioLogin.toString().split(' ').length == 1){
            return {token:usuarioLogin}
        }
        return usuarioLogin
    }
}
