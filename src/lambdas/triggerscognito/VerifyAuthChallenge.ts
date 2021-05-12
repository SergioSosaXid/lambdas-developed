import { DbConstants } from "../../common/db/dbConstants";
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";
import { Program } from "../../common/model/entities";



exports.handler = async (event: any, context: any) => {
    // const resp = await Questions.findOne({where:{id: event.request.privateChallengeParameters.id}})
    try{
        const conection = new MysqlManager(enumDB.ticket)
        const {email} = event.request.userAttributes;
        const {department} = event.request.clientMetadata;
        console.log(event)
        const resp = await conection.executeQuery<Program>(DbConstants.CONST_DB_USER_DEPARTMENT, [
            {
                columnName: 'email',
                value: email
            },
            {
                columnName: 'department',
                value: department
            }
        ])
        // console.log("resp", resp);
        // if(resp.length <= 0) throw new Error("Este usuario no esta registrado en el departamento")
        if (event.request.privateChallengeParameters.password === event.request.challengeAnswer) {
            event.response.answerCorrect = true;
        } else {
            event.response.answerCorrect = false;
        }
        return event;
    } catch(e) {
        console.log(e)
        throw new Error(JSON.stringify(e))
    }
    
};