import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";
import { BodegaEntity } from "src/entities/maestros/bodegas.entity";
import { UnidadMedidaEntity } from "src/entities/maestros/unidadMedida.entity";
import { ProveedoresEntity } from "src/entities/proveedores.entity";

export class UpdateInsumoDto {

    @IsInt()
    id:number;
    
    @IsString()
    @MaxLength(250, {message:"El nombre debe de ser de maximo 250 caracteres"})
    nombre:string;

    @IsString()
    @MaxLength(50, {message:"El codigoProveedor debe de ser de maximo 50 caracteres"})
    codigoProveedor:string;

    @IsString()
    @MaxLength(50, {message:"El stock debe de ser de maximo 50 caracteres"})
    stock:string

    @IsString()
    @MaxLength(50, {message:"El codigoJN debe de ser de maximo 50 caracteres"})
    codigoJn:string;

    @IsInt()
    cantidadMinima:number;

    @IsInt()
    cantidadMaxima:number;

    @IsNumber()
    valorUnitario:number;

    @IsNumber()
    invActual:number;

    @IsInt()
    bodegaId:number;

    @IsOptional()
    bodega:BodegaEntity

    @IsOptional()
    @IsInt()
    empresaId:number;

    @IsOptional()
    @IsInt()
    medidaId:number;

    @IsOptional()
    unidadMedida:UnidadMedidaEntity;

}