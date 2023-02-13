import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { InsumosEntity } from 'src/entities/insumos.entity';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([InsumosEntity, EmpresasEntity])],
  providers: [InsumoService],
  controllers: [InsumoController]
})
export class InsumoModule {}
