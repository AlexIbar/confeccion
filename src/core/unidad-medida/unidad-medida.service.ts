import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { UnidadMedidaEntity } from 'src/entities/maestros/unidadMedida.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadMedidaService {
    constructor(
        @InjectRepository(UnidadMedidaEntity)
        private medidaRepo:Repository<UnidadMedidaEntity>,

        @InjectRepository(EmpresasEntity)
        private empresaRepo:Repository<EmpresasEntity>
    ){}

    async getUnidadeMedida(id:number){
        let empresa = await this.empresaRepo.findOne({where:{id}})

        return this.medidaRepo.find({where:{empresa}})
    }
}
