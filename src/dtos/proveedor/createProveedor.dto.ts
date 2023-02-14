import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { IsString,  IsEmail, IsInt, IsOptional, IsPhoneNumber, MaxLength, MinLength } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";
import { TipoProveedoresEntity } from "src/entities/maestros/tipoProveedores.entity";


export class CreateProveedorDto{

    @IsString()
    @MaxLength(100, {message:"La longitud del nombre no puede superar los 100 caracteres"})
    @MinLength(1, { message:"No puede ser un valor vacio"})
    nombre:string;

    @IsString()
    @MaxLength(11, {message:"La longitud del nombre no puede superar los 100 caracteres"})
    @MinLength(7, { message:"No puede ser un valor vacio"})
    nit:string;

    @MaxLength(15, {message:"La longitud del nombre no puede superar los 100 caracteres"})
    @MinLength(7, {message:"El dato ingresado no corresponde a un número de telefono"})
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

    @IsInt()
    tipoProveedorId:number;

    @IsOptional()
    tipoProveedor : TipoProveedoresEntity;

    @IsInt()
    empresaId:number;

    @IsOptional()
    empresa:EmpresasEntity
}