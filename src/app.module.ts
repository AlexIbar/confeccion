import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from './core/empresa/empresa.module';
import { EmpresasEntity } from './entities/empresas.entity';
import { ProveedoresEntity } from './entities/proveedores.entity';
import { ProveedorModule } from './core/proveedor/proveedor.module';
import { InsumosEntity } from './entities/insumos.entity';
import { TipoProveedoresEntity } from './entities/maestros/tipoProveedores.entity';
import { BodegaEntity } from './entities/maestros/bodegas.entity';
import { MovimientoInventarioEntity } from './entities/movimientoInventario.entity';
import { TipoMovimientoEntity } from './entities/maestros/tipoMovimiento';
import { InsumoModule } from './core/insumo/insumo.module';
import { BodegaModule } from './core/bodega/bodega.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'127.0.0.1',
      port:3306,
      username:'root',
      password:'1036Alex',
      database:'confeccion',
      entities:[EmpresasEntity, ProveedoresEntity, InsumosEntity, TipoProveedoresEntity, BodegaEntity, MovimientoInventarioEntity, TipoMovimientoEntity],
      synchronize:true
    }),
    EmpresaModule,
    ProveedorModule,
    InsumoModule,
    BodegaModule],
})
export class AppModule {}