import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/usuarios/createUser.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Post()
    createUsuer(
        @Body() newUser:CreateUserDto
    ){
        return this.usuarioService.createUser(newUser)
    }

    @Get()
    logueado(){
        return true;
    }
}
