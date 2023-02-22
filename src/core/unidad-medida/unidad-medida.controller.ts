import { Controller, Get, Request } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';

@Controller('unidad-medida')
export class UnidadMedidaController {
    constructor(
        private unidadMedidaService:UnidadMedidaService
    ){}

    @Get()
    getUnidadMedida(
        @Request() request
    ){
        return this.unidadMedidaService.getUnidadeMedida(request.headers.usuario.data.empresa)
    }
}
