import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { ProveedoresEntity } from 'src/entities/proveedores.entity';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProveedoresEntity } from 'src/entities/maestros/tipoProveedores.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProveedoresEntity, EmpresasEntity, TipoProveedoresEntity])],
  providers: [ProveedorService],
  controllers: [ProveedorController]
})
export class ProveedorModule {}
