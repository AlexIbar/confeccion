import { IsInt } from "class-validator";

export class GetInsumoDto{
    @IsInt()
    idEmpresa:number;
    @IsInt()
    idInsumo:number;
}