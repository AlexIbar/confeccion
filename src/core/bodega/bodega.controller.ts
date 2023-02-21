import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { CreateBodegaDto } from 'src/dtos/bodegas/createBodega.dto';
import { UpdateBodegaDto } from 'src/dtos/bodegas/updateBodega.dto';
import { BodegaService } from './bodega.service';

@Controller('bodega')
export class BodegaController {
    constructor(
        private readonly bodegaService : BodegaService
    ){}
    @Post()
    create(
        @Body() createBodega: CreateBodegaDto,
        @Request() request
    ){
        createBodega.idEmpresa = request.headers.usuario.data.empresa
        return this.bodegaService.createBodega(createBodega)
    }

    @Get()
    getBodegasByEmpresa(
        @Request() request
    ){
        return this.bodegaService.getBodegasByEmpresa(request.headers.usuario.data.empresa);
    }

    @Put()
    update(
        @Body() updateBodega: UpdateBodegaDto,
        @Request() request
    ){
        updateBodega.idEmpresa = request.headers.usuario.data.empresa;
        return this.bodegaService.update(updateBodega)
    }

}
