import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { InsumosEntity } from "./insumos.entity";
import { BodegaEntity } from "./maestros/bodegas.entity";
import { ProveedoresEntity } from "./proveedores.entity";
import { UsuarioEntity } from "./usuarios.entity";

@Entity('empresas')
export class EmpresasEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:100,
        unique:true,
        nullable:false
    })
    nombre:string;

    @Column({
        type:'int',
        unique:true,
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
        type:'nvarchar',
        length:15,
        nullable:true,
        unique:true
    })
    telefono:string;

    @Column({
        type:'nvarchar',
        length:100,
        unique:true,
        nullable:false
    })
    email:string;

    @OneToMany(()=> ProveedoresEntity, proveedorEntity => proveedorEntity.empresa)
    proveedores: ProveedoresEntity[]

    @OneToMany(()=> InsumosEntity, insumosEntity => insumosEntity.empresa)
    insumos:InsumosEntity[]

    @OneToMany(()=> BodegaEntity, bodegasEntity => bodegasEntity.empresa)
    bodegas: BodegaEntity[]

    @OneToMany(()=> UsuarioEntity, usuarioEntity => usuarioEntity.empresa)
    usuarios:UsuarioEntity[]
}
