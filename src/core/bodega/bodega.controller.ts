import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBodegaDto } from 'src/dtos/bodegas/createBodega.dto';
import { BodegaService } from './bodega.service';

@Controller('bodega')
export class BodegaController {
    constructor(
        private readonly bodegaService : BodegaService
    ){}
    @Post()
    create(
        @Body() createBodega: CreateBodegaDto
    ){
        return this.bodegaService.createBodega(createBodega)
    }

}
