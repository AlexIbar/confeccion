import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { EmpresasEntity } from './empresas.entity';
import { InsumosEntity } from './insumos.entity';
import { TipoProveedoresEntity } from './maestros/tipoProveedores.entity';

@Entity('proveedores')
@Index(['nit', 'empresa'])
export class ProveedoresEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:100,
        nullable:false
    })
    nombre:string;

    @Column({
        type:'int',
        nullable:false
    })
    nit:number;

    @Column({
        type:'nvarchar',
        length:250,
        nullable:true
    })
    imagen:string;

    @Column({
        type:'boolean',
        nullable:false,
        default:true
    })
    administraInventario:boolean;


    @Column({
        type:'nvarchar',
        length:15,
        nullable:true
    })
    telefono:string;

    @Column({
        type:'nvarchar',
        length:100,
        nullable:false
    })
    email:string;

    @Column('nvarchar', {length:200, nullable:false})
    direccion:string;

    @Column({type:'nvarchar',length:200, nullable:false, name:'nombre_contacto'})
    nombreContacto:string;

    @Column({
        type:'boolean',
        nullable:false,
        default:true
    })
    activo:boolean;

    @ManyToOne(()=> EmpresasEntity, empresaEntity => empresaEntity.proveedores)
    empresa:EmpresasEntity;

    @OneToMany(()=> InsumosEntity, insumosEntity => insumosEntity.proveedor)
    insumos: InsumosEntity[]

    @ManyToOne(()=> TipoProveedoresEntity, tipoProveedoresEntity => tipoProveedoresEntity.proveedores)
    tipoProveedor:TipoProveedoresEntity
}