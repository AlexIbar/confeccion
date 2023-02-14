import { Body, Controller, Post } from '@nestjs/common';
import { CreateInsumoDto } from 'src/dtos/Insumos/createInsumos.dto';
import { InsumoService } from './insumo.service';

@Controller('insumo')
export class InsumoController {
    constructor(private readonly insumoService: InsumoService){}

    @Post()
    createInsumo(
        @Body() newInsumo : CreateInsumoDto
    ){
        return this.insumoService.create(newInsumo)
    }
}
