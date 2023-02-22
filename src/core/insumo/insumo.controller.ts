import { Body, Controller, Post, Request, Get, Put } from '@nestjs/common';
import { CreateInsumoDto } from 'src/dtos/Insumos/createInsumos.dto';
import { UpdateInsumoDto } from 'src/dtos/Insumos/updateInsumos.dto';
import { InsumoService } from './insumo.service';

@Controller('insumo')
export class InsumoController {
    constructor(private readonly insumoService: InsumoService){}

    @Get()
    getInsumos(
        @Request() request
    ){
        return this.insumoService.getAllByEmpresa(request.headers.usuario.data.empresa)
    }

    @Post()
    createInsumo(
        @Body() newInsumo : CreateInsumoDto,
        @Request() request
    ){
        newInsumo.empresaId = request.headers.usuario.data.empresa
        return this.insumoService.create(newInsumo)
    }

    @Put()
    updateInsumo(
        @Body() updateInsumo : UpdateInsumoDto,
        @Request() request
    ){
        updateInsumo.empresaId = request.headers.usuario.data.empresa
        return this.insumoService.updateInsumo(updateInsumo)
    }

}
