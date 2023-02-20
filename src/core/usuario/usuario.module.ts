import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { RolesEntity } from 'src/entities/maestros/roles.entity';
import { UsuarioEntity } from 'src/entities/usuarios.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioEntity, EmpresasEntity, RolesEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
