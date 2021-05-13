import { DbConstants } from "../../common/db/dbConstants";
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";
import {  Department } from "../../common/model/entities"

export class DepartmentManager {

    async getDepartments(): Promise<Department[]> {
        //Se inicializa el manejador de BD
        const mysqlManager = new MysqlManager(enumDB.im)
        //Se ejecuta el query
        return mysqlManager.executeQuery<Department>(DbConstants.CONST_DB_DEPARTMENTS_ALL);
    }
}