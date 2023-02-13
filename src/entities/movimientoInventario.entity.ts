import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import { InsumosEntity } from './insumos.entity';
import { TipoMovimientoEntity } from './maestros/tipoMovimiento';

@Entity('movimiento_inventario')
export class MovimientoInventarioEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type:'date',
        nullable:false,
        default:()=> "CURRENT_TIMESTAMP"
    })
    fecha:string;

    @Column({
        type:'double',
        nullable:false
    })
    cantidad:number;

    @Column({
        type:'nvarchar',
        length:50,
        name:'num_doc'
    })
    numDoc:string;

    @Column({
        type:'double',
        nullable:false,
        name:'cost_unitario'
    })
    costoUnitario:number;

    @Column({
        type:'double',
        nullable:false,
        name:'cost_total'
    })
    costoTotal:number;

    @ManyToOne(()=> InsumosEntity, insumoEntity => insumoEntity.movimientosInventario)
    insumo:InsumosEntity

    @ManyToOne(()=> TipoMovimientoEntity, tipoMovimiento => tipoMovimiento.movimientosInventario)
    tipoMovimiento:TipoMovimientoEntity;
}