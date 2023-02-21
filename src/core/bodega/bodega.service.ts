import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBodegaDto } from 'src/dtos/bodegas/createBodega.dto';
import { UpdateBodegaDto } from 'src/dtos/bodegas/updateBodega.dto';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { BodegaEntity } from 'src/entities/maestros/bodegas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BodegaService {

    constructor(
        @InjectRepository(BodegaEntity)
        private readonly bodegaRepo : Repository<BodegaEntity>,
        @InjectRepository(EmpresasEntity)
        private readonly empresaRepo : Repository<EmpresasEntity>
    ){}

    async getBodegasByEmpresa(idEmpresa:number) : Promise < BodegaEntity [] | HttpException > {
        let empresa = await this.empresaRepo.findOne({where :{ id : idEmpresa}})

        if(!empresa) return new HttpException("La empresa de consulta no se encuentra registrada", HttpStatus.NOT_FOUND)

        return this.bodegaRepo.find({where:{empresa}})
    }

    async createBodega(createBodega : CreateBodegaDto) : Promise<BodegaEntity | HttpException>{
        let empresa = await this.empresaRepo.findOne({where :{ id : createBodega.idEmpresa}})

        if(!empresa) return new HttpException("La empresa de consulta no se encuentra registrada", HttpStatus.NOT_FOUND)

        createBodega.empresa = empresa;

        const newBodega = this.bodegaRepo.create(createBodega)

        return this.bodegaRepo.save(newBodega)
    }

    async update(updateBodega : UpdateBodegaDto) : Promise <BodegaEntity | HttpException>{
        let empresa = await this.empresaRepo.findOne({where:{id:updateBodega.idEmpresa}})

        if(!empresa) return new HttpException("La empresa de consulta no se encuentra registrada", HttpStatus.NOT_FOUND)

        let bodegaActualizar = await this.bodegaRepo.findOne({where : { id: updateBodega.id, empresa: empresa}})
        
        if(!bodegaActualizar) return new HttpException("La bodega que intenta actualizar no se encuentra registrada", HttpStatus.NOT_FOUND)

        this.bodegaRepo.merge(bodegaActualizar, updateBodega)

        let actualiza = await this.bodegaRepo.save(bodegaActualizar)

        if(actualiza) return bodegaActualizar;

        return new HttpException("Ocurrio un error actualizando la bodega, por favor intentelo más tarde", HttpStatus.NOT_FOUND)
    }
}
