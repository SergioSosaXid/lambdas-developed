import {ResponseManager} from '../../common/helpers/responseManager'
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";
import { DbConstants } from '../../common/db/dbConstants';
import { Program } from '../../common/model/entities';



export const handler = async (event: any, context:any) => {
    const responseManager = new ResponseManager()
    try {   
        const conection = new MysqlManager(enumDB.ticket)
        const resp = await conection.executeQuery<Program>(DbConstants.CONST_DB_USER_DEPARTMENT,[
            {
                columnName: "email",
                value: 'sergioarsosa95@gmail.com'
            }
        ]);
        return responseManager.handleResponse({
            message: "Todo bien"
        })
    }catch(e) {
        console.log(e)
        return responseManager.handleError(JSON.stringify(e))
    }
}