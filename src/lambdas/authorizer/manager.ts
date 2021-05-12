import { TokenRole } from "../../common/model/tokenRole"
import * as jwt from "jsonwebtoken"
import { MysqlManager } from "../../common/db/mysqlManager";
import { enumDB } from "../../common/db/enums";
import { DbParameter } from "../../common/model/dbParameter";
import { DbConstants } from "../../common/db/dbConstants";
import { User } from "../../common/model/entities";
const jwkTopem = require("jwk-to-pem");

export class AuthorizerManager {

    protected jwk:any = {
        "alg": "RS256",
        "e": "AQAB",
        "kid": "ZaE1z9Q+nYqOjYPnOElc6TQkfXhDhPcskAiskY0/hQk=",
        "kty": "RSA",
        "n": "wxHu-bZFyYgSEyP9HNMfmabJ2JtzWo8mtSv46DPnAOD4ApllgsVNNa8aF6WL1ekbGLAWT1IqCIkCDYY0g48slaLuKsm0yB9ILIhof_5zyDZI-Z-PUFv-6fsy7O4VTjvGdv4pSedem_cuJnQk42ZEA52fB2JdwO0Kzn3N3QKBwMvpNuXpfmiowmnnudWHMQAPwy5qn4fO20MHscGTXwKPNdUX3xi5Q_d0cUZBhR26x5FiL9KLTXuh9oHN_AIJ_wMpVXR2ihal1zXoyvlSIrrW-XKAqREv_XGy-xa1Bo7SA0OxNblx2Zo94zYWZPRIjgLXF4QjmPCqht1gxqu0bAGKmw",
        "use": "sig"
    }

    /**
     * @return {Promise<>}
     */
async getToken(token:any): Promise<TokenRole> {
        const pem = jwkTopem(this.jwk);
        try {
            const resp: any = await jwt.verify(token,pem,{ algorithms: ['RS256'] });
            console.log(resp)
            return resp;
        } catch (error) {
            return {}
        }
    }

    /**
   *
   * @param {string} pgEmail
   * @return {Promise<object[] | undefined>}
   */
    async getPermissionByEmail(pgEmail : string): Promise<User> {
        console.log("entro en el getpermission")
        //Se inicia el manejador de BD
        const mysqlManager = new MysqlManager(enumDB.im);
        const params: DbParameter[] = [];
        params.push({columnName: 'pgEmail', value: pgEmail});
        //Se ejecuta el query
        console.log(params)
        const result:User[] = await mysqlManager.executeQuery<User>(DbConstants.CONST_DB_VUSER_PERMISSIONS_BY_EMAIL, params)
        return result ? result[0] : {};
    }
}