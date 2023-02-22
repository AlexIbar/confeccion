import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { InsumosEntity } from 'src/entities/insumos.entity';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedoresEntity } from 'src/entities/proveedores.entity';
import { BodegaEntity } from 'src/entities/maestros/bodegas.entity';
import { UnidadMedidaEntity } from 'src/entities/maestros/unidadMedida.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InsumosEntity, EmpresasEntity, ProveedoresEntity, BodegaEntity, UnidadMedidaEntity])],
  providers: [InsumoService],
  controllers: [InsumoController]
})
export class InsumoModule {}
