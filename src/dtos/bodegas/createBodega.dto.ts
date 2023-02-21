import { IsString, IsInt, IsOptional, MaxLength, IsBoolean } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";

export class CreateBodegaDto {
    @IsString()
    @MaxLength(100, {message:"El nombre debe de ser de maximo 100 caracteres"})
    nombre:string;

    @IsString()
    @MaxLength(100, {message:"La descripción debe de ser de maximo 100 caracteres"})
    descripcion:string;

    @IsBoolean()
    activa:boolean;

    @IsOptional()
    @IsInt()
    idEmpresa:number;

    @IsOptional()
    empresa:EmpresasEntity
}