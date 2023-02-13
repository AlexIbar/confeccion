import {Column, PrimaryGeneratedColumn, ManyToOne, Entity, OneToMany} from 'typeorm'
import { MovimientoInventarioEntity } from '../movimientoInventario.entity';

@Entity('tipo_movimiento')
export class TipoMovimientoEntity{
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

    @OneToMany(()=> MovimientoInventarioEntity, movimientoInventario=> movimientoInventario.tipoMovimiento)
    movimientosInventario:MovimientoInventarioEntity[]

}