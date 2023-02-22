import { Module } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaController } from './unidad-medida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedidaEntity } from 'src/entities/maestros/unidadMedida.entity';
import { EmpresasEntity } from 'src/entities/empresas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadMedidaEntity, EmpresasEntity])],
  providers: [UnidadMedidaService],
  controllers: [UnidadMedidaController]
})
export class UnidadMedidaModule {}
