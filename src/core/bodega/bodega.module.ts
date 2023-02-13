import { Module } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { BodegaController } from './bodega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { BodegaEntity } from 'src/entities/maestros/bodegas.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmpresasEntity, BodegaEntity])],
  providers: [BodegaService],
  controllers: [BodegaController]
})
export class BodegaModule {}
