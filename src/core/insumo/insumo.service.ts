import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { InsumosEntity } from 'src/entities/insumos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InsumoService {

    constructor(
        @InjectRepository(InsumosEntity)
        private readonly insumoRepo : Repository<InsumosEntity>,

        @InjectRepository(EmpresasEntity)
        private readonly empresaRepo : Repository<EmpresasEntity>
    ){}

    getById(id:number) : Promise<InsumosEntity>{
        return this.insumoRepo.findOne({where : { id}})
    }

    async getAllByEmpresa(idEmpresa:number) : Promise <InsumosEntity[] | HttpException>{
        let empresa = await this.empresaRepo.findOne({where : { id : idEmpresa}})

        if(!empresa ) return new HttpException("Error, la empresa asignada para la busqueda no existe en la base de datos", HttpStatus.BAD_REQUEST)

        return this.insumoRepo.find({where : { empresa}})
    }

    async create() : Promise < InsumosEntity | HttpException>{
        return null;
    }
}
