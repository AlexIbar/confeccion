import { IsString, IsEmail, IsInt, IsOptional, IsPhoneNumber, MaxLength, MinLength, IsBoolean } from "class-validator";


export class UpdateProveedorDto{

    @IsInt()
    id:number;

    @IsString()
    @MaxLength(100, {message:"La longitud del nombre no puede superar los 100 caracteres"})
    @MinLength(1, { message:"No puede ser un valor vacio"})
    nombre:string;

    @IsInt()
    nit:number;

    @IsOptional()
    @IsString()
    @MaxLength(250, {message:"La longitud del nombre no puede superar los 100 caracteres"})
    imagen:string;

    @IsPhoneNumber()
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

    @IsBoolean()
    activo:boolean;

    @IsInt()
    empresaId:number;

}