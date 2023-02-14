import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";
import { BodegaEntity } from "src/entities/maestros/bodegas.entity";
import { ProveedoresEntity } from "src/entities/proveedores.entity";

export class CreateInsumoDto {

    
    @IsString()
    @MaxLength(250, {message:"El nombre debe de ser de maximo 250 caracteres"})
    nombre:string;

    @IsString()
    @MaxLength(50, {message:"El codigoProveedor debe de ser de maximo 50 caracteres"})
    codigoProveedor:string;

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
    proveedorId:number;

    @IsOptional()
    proveedor:ProveedoresEntity;

    @IsInt()
    bodegaId:number;

    @IsOptional()
    bodega:BodegaEntity

    @IsInt()
    empresaId:number;

    @IsOptional()
    empresa:EmpresasEntity;
}