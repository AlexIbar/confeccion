import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from "typeorm";
import { EmpresasEntity } from "./empresas.entity";
import { BodegaEntity } from "./maestros/bodegas.entity";
import { UnidadMedidaEntity } from "./maestros/unidadMedida.entity";
import { MovimientoInventarioEntity } from "./movimientoInventario.entity";
import { ProveedoresEntity } from "./proveedores.entity";

@Entity('insumos')
@Index(['codigoProveedor', 'empresa'])
export class InsumosEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:250,
        nullable:false
    })
    nombre:string;

    @Column({
        type:'nvarchar',
        length:50,
        nullable:false,
        name:'cod_proveedor'
    })
    codigoProveedor:string;

    @Column({
        type:'nvarchar',
        length:50,
        nullable:false,
        name:'cod_jn'
    })
    codigoJn:string;

    @Column({
        type:'nvarchar',
        length:50,
        nullable:true,
        name:'stock'
    })
    stock:string;

    @Column({
        type:'double',
        name:'cantidad_min',
        default:0
    })
    cantidadMinima:number;

    @Column({
        type:'double',
        name:'cantidad_max',
        default:0
    })
    cantidadMaxima:number;

    @Column({
        type:'double',
        name:'inv_actual',
        default:0
    })
    invActual:number;
    
    @Column({
        type:'double',
        name:'valor_unitario'
    })
    valorUnitario:number;


    @ManyToOne(()=> ProveedoresEntity, proveedorEntity => proveedorEntity.insumos, {nullable:false})
    proveedor:ProveedoresEntity

    @ManyToOne(()=> BodegaEntity, bodegaEntity => bodegaEntity.insumos, {nullable:false})
    bodega:BodegaEntity

    @OneToMany(()=> MovimientoInventarioEntity, movimientoInventarioEntity => movimientoInventarioEntity.insumo)
    movimientosInventario:MovimientoInventarioEntity[]

    @ManyToOne(()=> EmpresasEntity, empresaEntity => empresaEntity.insumos, {nullable:false})
    empresa:EmpresasEntity;

    @ManyToOne(()=> UnidadMedidaEntity, undidadMedidaEntity => undidadMedidaEntity.insumos, {nullable:false})
    unidadMedida:UnidadMedidaEntity;
}