import { DbConstants } from "../../common/db/dbConstants";
import { enumDB } from "../../common/db/enums";
import { MysqlManager } from "../../common/db/mysqlManager";

exports.handler = async (event: any, context: any) => {
    try {
        if (event.request.challengeName == 'CUSTOM_CHALLENGE') {
            const conection = new MysqlManager(enumDB.im)
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
            
        
            event.response.challengeMetadata = 'DEPARTMENT_CHALLENGE';
            context.succeed(event);
        }else if( event.request.challengeName == 'DEPARTMENT_CHALLENGE' ) {
            /*            const resp = await Questions.findAll({
                attributes:['id','question','answer'], 
                limit: 1,
                order: db.random()
            });*/

            event.response.publicChallengeParameters = {};
            // event.response.publicChallengeParameters.question = resp[0].dataValues.question;
            const {email} = event.request.userAttributes;

            const username = email.split("@")
            const temporaryPassword = `${username[0]}123`;
            
            event.response.privateChallengeParameters = {
                // id: resp[0].dataValues.id,
                password: temporaryPassword,
            //    answer: resp[0].dataValues.answer  
            };
            event.response.challengeMetadata = 'PASSWORD_CHALLENGE';
            context.succeed(event);
        }
    } catch (e) {
        throw new Error("Error en esta seccion")
    }
}