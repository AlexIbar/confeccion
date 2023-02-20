import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpresasEntity } from "./empresas.entity";
import { RolesEntity } from "./maestros/roles.entity";

@Entity('usuarios')
@Index(['email', 'empresa'])
export class UsuarioEntity {
    @Column({
        type:'nvarchar',
        length:36
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'nvarchar',
        length:'150',
        nullable:false
    })
    nombre:string;

    @Column({
        type:'nvarchar',
        length:150,
        nullable:false
    })
    email:string;

    @Column({
        type:'nvarchar',
        length:250,
        nullable:false
    })
    password:string;

    @Column({
        type:'bool',
        default:true
    })
    activo:boolean

    @ManyToOne(()=> EmpresasEntity, empresaEntity => empresaEntity.usuarios, {nullable:false})
    empresa:EmpresasEntity;

    @JoinTable()
    @ManyToMany(()=> RolesEntity, rolesEntity => rolesEntity.Usuarios)
    roles:RolesEntity[]
}