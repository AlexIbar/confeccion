import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { UsuarioEntity } from "../usuarios.entity";

@Entity('roles')
export class RolesEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:50,
        nullable:false
    })
    nombre:string

    @Column({
        type:'nvarchar'
    })
    descripcion:string

    @ManyToMany(()=> UsuarioEntity, usuarioEntity => usuarioEntity.roles)
    Usuarios:UsuarioEntity[]
}