import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/dtos/usuarios/Login';
import { UsuarioEntity } from 'src/entities/usuarios.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo:Repository<UsuarioEntity>,

        private configService: ConfigService
    ){}

    async login(login:Login){
        let usuario = await this.usuarioRepo.findOne({where: {email:login.email}, relations:['roles']})
        if(!usuario) return new HttpException("Usuario y/o contraseña no valida", HttpStatus.NOT_FOUND)
        let contraseniaValida = await bcrypt.compare(login.password, usuario.password)
        if(!contraseniaValida) return new HttpException("Usuario y/o contraseña no valida", HttpStatus.NOT_FOUND)

        if(!usuario.activo) return new HttpException("Usuario no activo, por favor solicitar a la organización la respectiva activación del usuario", HttpStatus.UNAUTHORIZED)

        let roles = usuario.roles.map(ele=> ele.nombre)

        let logHash = await jwt.sign({data:{
            sub:usuario.id,
            email:usuario.email,
            roles,
            activo:usuario.activo,
            usuario:usuario.nombre
        }, exp: Math.floor(Date.now() / 1000) + ((60 * 60)*3)}, this.configService.get('SECRET_JWT'))

        return logHash
    }
}
