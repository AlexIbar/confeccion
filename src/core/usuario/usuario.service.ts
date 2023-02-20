import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/usuarios/createUser.dto';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { RolesEntity } from 'src/entities/maestros/roles.entity';
import { UsuarioEntity } from 'src/entities/usuarios.entity';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(EmpresasEntity)
        private readonly empresaRepo : Repository<EmpresasEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepo : Repository<UsuarioEntity>,

        @InjectRepository(RolesEntity)
        private readonly rolRepo : Repository<RolesEntity>,
    ){}

    async createUser(newUser:CreateUserDto){
        const empresa = await this.empresaRepo.findOne({where:{id:newUser.empresaId}})

        if(!empresa) return new HttpException("Empresa no registrada", HttpStatus.NOT_FOUND)

        const roles = await this.rolRepo.findBy({ id: In(newUser.rolesId)})

        if(roles.length <= 0) return new HttpException("Roles no existen", HttpStatus.NOT_FOUND)
        const userOne = await this.usuarioRepo.find({where:{ email: newUser.email}})

        if(userOne.length > 0) return new HttpException(`Ya existe un usuario con el email ${newUser.email}, por favor verificar`, HttpStatus.NOT_FOUND)

        newUser.empresa = empresa;
        newUser.roles = roles;

        newUser.password = await bcrypt.hashSync(newUser.password, 10)

        const usuario = this.usuarioRepo.create(newUser)

        return this.usuarioRepo.save(usuario)

    }
}
