import { TokenRole } from "../../common/model/tokenRole"
import { MysqlManager } from "../../common/db/mysqlManager";
import { enumDB } from "../../common/db/enums";
import { DbParameter } from "../../common/model/dbParameter";
import { DbConstants } from "../../common/db/dbConstants";
import { User } from "../../common/model/entities";
import { handler } from "../../common/helpers/verifyJWTManager"

export class AuthorizerManager {

    /**
     * @return {Promise<>}
     */
async getToken(token:any): Promise<TokenRole> {
    const resp = await handler({token});
    return resp;
    }

    /**
   *
   * @param {string} pgEmail
   * @return {Promise<object[] | undefined>}
   */
    async getPermissionByEmail(pgEmail : string): Promise<User> {
        //Se inicia el manejador de BD
        const mysqlManager = new MysqlManager(enumDB.im);
        const params: DbParameter[] = [];
        params.push({columnName: 'pgEmail', value: pgEmail});
        //Se ejecuta el query
        const result:User[] = await mysqlManager.executeQuery<User>(DbConstants.CONST_DB_VUSER_PERMISSIONS_BY_EMAIL, params)
        return result ? result[0] : {};
    }
}