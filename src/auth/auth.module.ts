import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/entities/usuarios.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
