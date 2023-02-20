import { IsString, IsStrongPassword } from "class-validator";

export class Login {
    @IsString()
    email:string;

    @IsStrongPassword()
    password:string;
}