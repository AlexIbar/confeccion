import { IsString, IsInt, MaxLength } from "class-validator";

export class UpdateBodegaDto {
    @IsInt()
    id:number;

    @IsString()
    @MaxLength(100, {message:"El nombre debe de ser de maximo 100 caracteres"})
    nombre:string;

    @IsString()
    @MaxLength(250, {message:"La descripción debe de ser de maximo 100 caracteres"})
    descripcion:string;

    @IsInt()
    idEmpresa:number;
}