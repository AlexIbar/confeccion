import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EmpresasEntity } from "../empresas.entity";
import { InsumosEntity } from "../insumos.entity";

@Entity('bodegas')
export class BodegaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:100,
        nullable:false
    })
    nombre:string;

    @Column({
        type:'nvarchar',
        length:250,
        nullable:true
    })
    descripcion:string;

    @Column({
        type:'bool',
        nullable:false,
        default:true
    })
    activa:boolean

    @OneToMany(()=> InsumosEntity, insumosEntity => insumosEntity.bodega)
    insumos:InsumosEntity[];

    @ManyToOne(()=> EmpresasEntity, empresaEntity => empresaEntity.bodegas, {nullable:false})
    empresa:EmpresasEntity;
}