import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInsumoDto } from 'src/dtos/Insumos/createInsumos.dto';
import { GetInsumoDto } from 'src/dtos/Insumos/getInsumo.dto';
import { UpdateInsumoDto } from 'src/dtos/Insumos/updateInsumos.dto';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { InsumosEntity } from 'src/entities/insumos.entity';
import { BodegaEntity } from 'src/entities/maestros/bodegas.entity';
import { UnidadMedidaEntity } from 'src/entities/maestros/unidadMedida.entity';
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
        private readonly proveedorRepo : Repository<ProveedoresEntity>,

        @InjectRepository(UnidadMedidaEntity)
        private readonly medidaRepo : Repository<UnidadMedidaEntity>
    ){}

    getById(id:number) : Promise<InsumosEntity>{
        return this.insumoRepo.findOne({where : { id}})
    }

    async getAllByEmpresa(idEmpresa:number) : Promise <InsumosEntity[] | HttpException>{
        let empresa = await this.empresaRepo.findOne({where : { id : idEmpresa}})

        if(!empresa ) return new HttpException("Error, la empresa asignada para la busqueda no existe en la base de datos", HttpStatus.BAD_REQUEST)

        return this.insumoRepo.find({where : { empresa},relations:['proveedor', 'bodega','unidadMedida']})
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

        let unidadMedida = await this.medidaRepo.findOne({where:{empresa:proveedor.empresa, id:newInsumo.medidaId}})

        if(!unidadMedida) return new HttpException("Error, unidad medida no encontrada", HttpStatus.NOT_FOUND);

        newInsumo.proveedor = proveedor;
        newInsumo.empresa = proveedor.empresa;
        newInsumo.bodega = bodega;
        newInsumo.unidadMedida = unidadMedida

        let existe = await this.insumoRepo.findOne({where: {codigoJn:newInsumo.codigoJn, empresa:proveedor.empresa}})

        if(existe)  return new HttpException("Ya tienes un producto registrado con el codigo #"+newInsumo.codigoJn, HttpStatus.NOT_FOUND);

        let existeProv = await this.insumoRepo.findOne({where: {codigoProveedor:newInsumo.codigoProveedor, empresa:proveedor.empresa, proveedor:proveedor}})

        if(existeProv)  return new HttpException("Ya tienes un producto registrado con el codigo de proveedor #"+newInsumo.codigoProveedor, HttpStatus.NOT_FOUND);

        const newInsumoEntity = this.insumoRepo.create(newInsumo);

        return this.insumoRepo.save(newInsumoEntity);
    }

    async updateInsumo(updateInsumo: UpdateInsumoDto) : Promise < InsumosEntity | HttpException>{
        let insumo = await this.insumoRepo.findOne({where : { id: updateInsumo.id}, relations: ['empresa', 'bodega', 'unidadMedida']})

        if(updateInsumo.empresaId != insumo.empresa.id)  return new HttpException("Error, no tienes permitido modificar este insumo", HttpStatus.NOT_FOUND);

        if(insumo.bodega.id != updateInsumo.bodegaId){
            let bodega = await this.bodegaRepo.findOne({where:{id:updateInsumo.bodegaId, empresa: insumo.empresa}})
            if(!bodega) return new HttpException("Error, bodega no encontrada", HttpStatus.NOT_FOUND);
            updateInsumo.bodega = bodega
        }

        if(insumo.unidadMedida.id != updateInsumo.medidaId){

            let unidadMedida = await this.medidaRepo.findOne({where:{empresa:insumo.empresa, id:updateInsumo.medidaId}})
            if(!unidadMedida) return new HttpException("Error, unidad medida no encontrada", HttpStatus.NOT_FOUND);
            updateInsumo.unidadMedida = unidadMedida
        }

        this.insumoRepo.merge(insumo, updateInsumo)

        let actualiza = await this.insumoRepo.save(insumo);

        if(actualiza) return insumo;

        return new HttpException("Ocurrio un error actualizando el insumo", HttpStatus.BAD_GATEWAY)
    }
}
