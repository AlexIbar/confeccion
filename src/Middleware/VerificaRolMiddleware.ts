import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//@ts-ignore
import { verify } from 'jsonwebtoken'
import { accesos } from './Accesos';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerificaRolMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService
  ){}

  rutaSelect(req:Request) :string{
    let ruta = req.path
    let params = Object.values(req.params)
    if (params.length > 0) {
      params.map(p => {
        ruta = ruta.replace(p, '')
      })
      let rutaArray: string[] = ruta.split('/')
      rutaArray.pop()
      ruta = rutaArray.join('/')
    }
    ruta = req.method+'-'+ruta
    return ruta
  }

  use(req: Request, res: Response, next: NextFunction) {
    let token: string = req.headers?.authorization?.replace('Bearer ', '')

    let ruta = this.rutaSelect(req)
    console.log(ruta)
    try {
      let data:any = verify(token, this.configService.get("SECRET_JWT"))
      let roles:Array<string> = data.data.roles
      let hallado = roles.filter(rol => {
        if(accesos[rol.toUpperCase()]) return accesos[rol.toUpperCase()].find(ele => ele == ruta || ele+'/' == ruta)
        return false
      })

      if(hallado.length <= 0){
        return res.status(401).json({
          message: "Usuario no autorizado",
          porRol: true
        })
      }
      req.headers.usuario = data;
      next()
    } catch (error) {
      return res.status(401).json({
        message: "Usuario no autorizado",
        porRol: false
      })
    }
  }
}