import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProveedorDto } from 'src/dtos/proveedor/createProveedor.dto';
import { UpdateProveedorDto } from 'src/dtos/proveedor/updateProveedor.dto';
import { EmpresasEntity } from 'src/entities/empresas.entity';
import { TipoProveedoresEntity } from 'src/entities/maestros/tipoProveedores.entity';
import { ProveedoresEntity } from 'src/entities/proveedores.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {

    constructor(
        @InjectRepository(ProveedoresEntity)
        private proveedorRepository: Repository<ProveedoresEntity>,
                
        @InjectRepository(EmpresasEntity)
        private empresaRepository: Repository<EmpresasEntity>,

        @InjectRepository(TipoProveedoresEntity)
        private tipoProveedorRepository : Repository<TipoProveedoresEntity>
    ){    }

    getById(id:number) : Promise<ProveedoresEntity>{
        return this.proveedorRepository.findOne({where:{id}})
    }

    async getAllBodegasByEmpresa(id:number){
        let empresa = await this.empresaRepository.findOne({where:{id}})
        return this.proveedorRepository.find({where:{empresa:empresa}})
    }

    async create(newProveedor:CreateProveedorDto) : Promise<ProveedoresEntity | HttpException>{
        let empresa = await this.empresaRepository.findOne({where:{id:newProveedor.empresaId}})

        if(!empresa) return new HttpException("Error la empresa asignada al proveedor no esta creada en la base de datos", HttpStatus.NOT_FOUND)

        let tipoProveedor = await  this.tipoProveedorRepository.findOne({where:{id:newProveedor.tipoProveedorId}})

        if(!tipoProveedor) return new HttpException("Error, la tipificacion del proveedor no es la correcta", HttpStatus.NOT_FOUND)

        newProveedor.empresa = empresa;
        newProveedor.tipoProveedor = tipoProveedor;
        
        const newProveedorEntity = this.proveedorRepository.create(newProveedor)

        return this.proveedorRepository.save(newProveedorEntity);
    }

    async update(updateProveedor: UpdateProveedorDto) : Promise<ProveedoresEntity | HttpException>{
        let empresa = await this.empresaRepository.findOne({where : {id:updateProveedor.empresaId}})

        if(!empresa) return new HttpException("Error la empresa asignada al proveedor no esta creada en la base de datos", HttpStatus.NOT_FOUND)

        let proveedor =await this.proveedorRepository.findOne({where:{id:updateProveedor.id, empresa}})

        if(!proveedor) return new HttpException("Error, no hay ningun proveedor registrado con esta identificacion para la empresa", HttpStatus.NOT_FOUND)
        
        this.proveedorRepository.merge(proveedor, updateProveedor)

        return this.proveedorRepository.save(proveedor);
    }
}
