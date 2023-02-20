export class TokenDecode {
    data: InfoToken;
    exp: number;
    iat: number
}
class InfoToken {
    sub: string;
    email: string;
    roles: Array<string>;
    activo: boolean;
    usuario: string
  }