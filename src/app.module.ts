import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { RolesEntity } from './entities/maestros/roles.entity';
import { UsuarioEntity } from './entities/usuarios.entity';
import { UsuarioModule } from './core/usuario/usuario.module';
import { VerificaRolMiddleware } from './Middleware/VerificaRolMiddleware';
import { UsuarioController } from './core/usuario/usuario.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BodegaController } from './core/bodega/bodega.controller';
import { ProveedorController } from './core/proveedor/proveedor.controller';
import { InsumoController } from './core/insumo/insumo.controller';
import { UnidadMedidaEntity } from './entities/maestros/unidadMedida.entity';
import { UnidadMedidaModule } from './core/unidad-medida/unidad-medida.module';
import { UnidadMedidaController } from './core/unidad-medida/unidad-medida.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        type:"mysql",
        host:configService.get("TYPEORM_HOST"),
        port:parseInt(configService.get("TYPEORM_PORT") || "3306"),
        username:configService.get("TYPEORM_USERNAME"),
        password:configService.get("TYPEORM_PASSWORD"),
        database:configService.get("TYPEORM_DATABASE"),
        entities:[
          EmpresasEntity, ProveedoresEntity, InsumosEntity, TipoProveedoresEntity, BodegaEntity, MovimientoInventarioEntity, TipoMovimientoEntity, UsuarioEntity, RolesEntity, UnidadMedidaEntity
        ],
        synchronize:true
      }),
    }),
    EmpresaModule,
    ProveedorModule,
    InsumoModule,
    BodegaModule,
    UsuarioModule,
    AuthModule,
    UnidadMedidaModule],
})

export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer){
    consumer.apply(VerificaRolMiddleware)
    .forRoutes(UsuarioController, BodegaController, ProveedorController, InsumoController, UnidadMedidaController)
   }
}