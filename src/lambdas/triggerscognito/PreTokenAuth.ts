import { DbConstants } from '../../common/db/dbConstants'
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";
import { errorConstants } from '../../common/helpers/errorConstants';
import { Program } from "../../common/model/entities";

const mysql = new MysqlManager(enumDB.ticket);
exports.handler = async (event: any, context: any, callback: any) => {

    const {email} = event.request.userAttributes;
    
    const user = await mysql.executeQuery<Program>(DbConstants.CONST_DB_USER_TOKEN_INFORMATION, [
        {
            columnName: 'email',
            value: email
        }
    ])
    if (!user) throw new Error(errorConstants.UNAUTHORIZED)
    console.log(user[0]['roles_name'])
    event.response = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "rol": user[0]['roles_name'],
                "department": user[0]['department_name']
            },
            "groupOverrideDetails": {
                "groupsToOverride": [user[0]['roles_name']],
            }
        }
    };


    context.succeed(event)
};