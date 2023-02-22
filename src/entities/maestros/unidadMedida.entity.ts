import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmpresasEntity } from "../empresas.entity";
import { InsumosEntity } from "../insumos.entity";

@Entity('unidad_medida')
export class UnidadMedidaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'nvarchar',
        length:50,
        nullable:false
    })
    nombre:string;

    @Column({
        type:'nvarchar',
        length:250
    })
    descripcion:string;

    @OneToMany(()=> InsumosEntity, insumoEntity=> insumoEntity.unidadMedida)
    insumos:InsumosEntity[]

    @ManyToOne(()=> EmpresasEntity, empresa => empresa.unidadesMedida, {nullable:false})
    empresa:EmpresasEntity;

}