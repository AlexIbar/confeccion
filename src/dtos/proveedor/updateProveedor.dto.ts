import { IsString, IsEmail, IsInt, IsOptional, IsPhoneNumber, MaxLength, MinLength, IsBoolean, Length, IsNumberString } from "class-validator";
import { TipoProveedoresEntity } from "src/entities/maestros/tipoProveedores.entity";


export class UpdateProveedorDto{

    @IsInt()
    id:number;

    @IsString()
    @Length(1,100, {message:"La longitud del nombre debe de ser de minimo 1 caracter maximo 100"})
    nombre:string;

    @IsNumberString()
    @Length(7,11, {message:"La longitud del nit debe de ser de minimo 7 caracter maximo 11"})
    nit:string;

    @IsNumberString()
    @Length(7,11, {message:"La longitud del nit debe de ser de minimo 7 caracter maximo 11"})
    telefono:string;

    @IsEmail()
    @MaxLength(100, {message:"El email supera el maximo de caracteres permitidos"})
    email:string;

    @IsString()
    @MaxLength(200, {message:"El maximo de caracteres permitidos para la dirección es de 200"})
    direccion:string;

    @IsString()
    @MaxLength(200, {message:"El maximo de caracteres permitidos para la el {nombreContacto} es de 200"})
    nombreContacto:string;

    @IsBoolean()
    activo:boolean;

    @IsOptional()
    @IsInt()
    empresaId:number;

    @IsInt()
    tipoProveedorId:number;

    @IsOptional()
    tipoProveedor : TipoProveedoresEntity;

}