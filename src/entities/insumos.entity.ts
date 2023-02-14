import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EmpresasEntity } from "./empresas.entity";
import { BodegaEntity } from "./maestros/bodegas.entity";
import { MovimientoInventarioEntity } from "./movimientoInventario.entity";
import { ProveedoresEntity } from "./proveedores.entity";

@Entity('insumos')
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
        type:'double',
        name:'cantidad_min'
    })
    cantidadMinima:number;

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
        type:'double',
        name:'cantidad_max'
    })
    cantidadMaxima:number;

    @Column({
        type:'double',
        name:'valor_unitario'
    })
    valorUnitario:number;

    @Column({
        type:'double',
        name:'inv_actual'
    })
    invActual:number;


    @ManyToOne(()=> ProveedoresEntity, proveedorEntity => proveedorEntity.insumos)
    proveedor:ProveedoresEntity

    @ManyToOne(()=> BodegaEntity, bodegaEntity => bodegaEntity.insumos)
    bodega:BodegaEntity

    @OneToMany(()=> MovimientoInventarioEntity, movimientoInventarioEntity => movimientoInventarioEntity.insumo)
    movimientosInventario:MovimientoInventarioEntity

    @ManyToOne(()=> EmpresasEntity, empresaEntity => empresaEntity.insumos)
    empresa:EmpresasEntity;
}