import { DbConstants } from "../../common/db/dbConstants";
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";



exports.handler = async (event: any, context: any) => {
    // const resp = await Questions.findOne({where:{id: event.request.privateChallengeParameters.id}})
/*    const conection = new MysqlManager(enumDB.im)
    const {email} = event.request.userAttributes;
    const {department} = event.request.clientMetadata;
    const resp = await conection.executeQuery(DbConstants.CONST_DB_USER_DEPARTMENT, [
        {
            columnName: 'email',
            value: email
        },
        {
            columnName: 'department',
            value: department
        }
    ])

    if(resp.length <= 0) throw new Error("Este usuario no esta registrado en el departamento")
    */

    if (event.request.privateChallengeParameters.password === event.request.challengeAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};