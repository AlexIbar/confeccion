
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProveedoresEntity } from "../proveedores.entity";

@Entity('tipo_proveedores')
export class TipoProveedoresEntity{
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
        type:'nvarchar',
        length:250
    })
    descripcion:string

    @OneToMany(()=> ProveedoresEntity, proveedorEntity => proveedorEntity.tipoProveedor)
    proveedores:ProveedoresEntity[]
}