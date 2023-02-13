import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { CreateProveedorDto } from 'src/dtos/proveedor/createProveedor.dto';
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
        @Body() createProveedor : CreateProveedorDto
    ) : Promise<ProveedoresEntity | HttpException>{
        return this.proveedorService.create(createProveedor)
    }

    @Get('id')
    getAllBodegasByEmpresas(
        @Param('id', new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_ACCEPTABLE})) id:number
    ){
        return this.proveedorService.getAllBodegasByEmpresa(id)
    }
}
