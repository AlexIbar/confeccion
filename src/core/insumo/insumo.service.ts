import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInsumoDto } from 'src/dtos/Insumos/createInsumos.dto';
import { GetInsumoDto } from 'src/dtos/Insumos/getInsumo.dto';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { InsumosEntity } from 'src/entities/insumos.entity';
import { BodegaEntity } from 'src/entities/maestros/bodegas.entity';
import { ProveedoresEntity } from 'src/entities/proveedores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsumoService {

    constructor(
        @InjectRepository(InsumosEntity)
        private readonly insumoRepo : Repository<InsumosEntity>,

        @InjectRepository(EmpresasEntity)
        private readonly empresaRepo : Repository<EmpresasEntity>,

        @InjectRepository(BodegaEntity)
        private readonly bodegaRepo : Repository<BodegaEntity>,

        @InjectRepository(ProveedoresEntity)
        private readonly proveedorRepo : Repository<ProveedoresEntity>
    ){}

    getById(id:number) : Promise<InsumosEntity>{
        return this.insumoRepo.findOne({where : { id}})
    }

    async getAllByEmpresa(idEmpresa:number) : Promise <InsumosEntity[] | HttpException>{
        let empresa = await this.empresaRepo.findOne({where : { id : idEmpresa}})

        if(!empresa ) return new HttpException("Error, la empresa asignada para la busqueda no existe en la base de datos", HttpStatus.BAD_REQUEST)

        return this.insumoRepo.find({where : { empresa}})
    }

    async getInsumo(datosQuery: GetInsumoDto) : Promise <InsumosEntity[] | HttpException>{
        let empresa = await this.empresaRepo.findOne({where : { id : datosQuery.idEmpresa}})

        if(!empresa ) return new HttpException("Error, la empresa asignada para la busqueda no existe en la base de datos", HttpStatus.BAD_REQUEST)

        return this.insumoRepo.find({where : { id:datosQuery.idInsumo,empresa}})
    }

    async create(newInsumo: CreateInsumoDto) : Promise < InsumosEntity | HttpException>{
        let proveedor = await this.proveedorRepo.findOne({where :{ id: newInsumo.proveedorId}, relations:['empresa']})
        if(!proveedor || proveedor.empresa.id != newInsumo.empresaId) return new HttpException("Error, empresas o proveedor asociado se encuentran invalidos", HttpStatus.NOT_FOUND);

        let bodega = await this.bodegaRepo.findOne({where:{id:newInsumo.bodegaId, empresa: proveedor.empresa}})
        if(!bodega) return new HttpException("Error, bodega no encontrada", HttpStatus.NOT_FOUND);

        newInsumo.proveedor = proveedor;
        newInsumo.empresa = proveedor.empresa;
        newInsumo.bodega = bodega;

        const newInsumoEntity = this.insumoRepo.create(newInsumo);

        return this.insumoRepo.save(newInsumoEntity);
    }
}
