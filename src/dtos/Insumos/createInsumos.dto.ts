import { IsIn, IsInt, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";
import { BodegaEntity } from "src/entities/maestros/bodegas.entity";
import { UnidadMedidaEntity } from "src/entities/maestros/unidadMedida.entity";
import { ProveedoresEntity } from "src/entities/proveedores.entity";

export class CreateInsumoDto {

    
    @IsString()
    @MinLength(3, {message:"El nombre debe de ser de minimo 3 caracteres"})
    @MaxLength(250, {message:"El nombre debe de ser de maximo 250 caracteres"})
    nombre:string;

    @IsString()
    @Length(1,50, {message:"El {codigoProveedor} debe tener como minimo 1 caracter y maxímo 50"})
    codigoProveedor:string;

    @IsString()
    @Length(1,50, {message:"El {stock} debe tener como minimo 1 caracter y maxímo 50"})
    stock:string

    @IsString()
    @Length(1,50, {message:"El {codigoJn} debe tener como minimo 1 caracter y maxímo 50"})
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

    @IsOptional()
    @IsInt()
    empresaId:number;

    @IsOptional()
    empresa:EmpresasEntity;

    @IsInt()
    medidaId:number;

    @IsOptional()
    unidadMedida:UnidadMedidaEntity;
}