import { IsArray, IsEmail, IsInt, IsNumber, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { EmpresasEntity } from "src/entities/empresas.entity";
import { RolesEntity } from "src/entities/maestros/roles.entity";

export class CreateUserDto {
    @IsString({message:"El campo {nombre} debe ser de tipo texto"})
    @Length(3, 150, {message:"El campo {nombre}, debe tener como minimo 3 caracteresa y maximo 5"})
    nombre:string

    @IsEmail()
    @Length(5, 150, {message:"El campo {email} requiere como minimo 5 caracteres y maxímo 150"})
    email:string;

    @IsStrongPassword({}, {message:"Para el campo {password - contraseña}, se requiere minimo 8 caracteres, combinación de mayusculas, minusculas, numeros y caracteres especiales tales como (+, -. _, *, @, entre otros)"})
    password:string;

    @IsInt()
    empresaId:number;

    @IsArray()
    @IsNumber({}, {each:true})
    rolesId: number[];

    @IsOptional()
    empresa:EmpresasEntity;

    @IsOptional()
    roles:RolesEntity[]

}