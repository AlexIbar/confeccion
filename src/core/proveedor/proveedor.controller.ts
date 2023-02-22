import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateProveedorDto } from 'src/dtos/proveedor/createProveedor.dto';
import { UpdateProveedorDto } from 'src/dtos/proveedor/updateProveedor.dto';
import { ProveedoresEntity } from 'src/entities/proveedores.entity';
import { ProveedorService } from './proveedor.service';

@ApiTags('Proveedor')
@Controller('proveedor')
export class ProveedorController {
    constructor(
        private readonly proveedorService : ProveedorService
    ){}

    @Post()
    async create(
        @Body() createProveedor : CreateProveedorDto,
        @Request() request
    ) : Promise<ProveedoresEntity | HttpException>{
        createProveedor.empresaId = request.headers.usuario.data.empresa
        return this.proveedorService.create(createProveedor)
    }

    @Put()
    async update(
        @Body() updateProveedor : UpdateProveedorDto,
        @Request() request
    ) : Promise<ProveedoresEntity | HttpException>{
        updateProveedor.empresaId = request.headers.usuario.data.empresa
        return this.proveedorService.update(updateProveedor)
    }

    @Get()
    getAllBodegasByEmpresas(
        @Request() request
    ){
        let id = request.headers.usuario.data.empresa
        return this.proveedorService.getAllBodegasByEmpresa(id)
    }

    @Get('tipo-proveedores/all')
    getTipoProveedores(){
        return this.proveedorService.getTipoProveedores()
    }
}
