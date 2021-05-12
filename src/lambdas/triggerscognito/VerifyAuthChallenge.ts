import { MysqlManager, enumDB } from "common-palace";

exports.handler = async (event: any, context: any) => {
    console.log('valid password chanllenge');
    console.log(event)
    //if (event.request.session.slice(-1)[0].challengeName  == 'PASSWORD_CHALLENGE') {
        console.log('PASSWORD_CHALLENGE');
        const conection = new MysqlManager(enumDB.im)
        const {email} = event.request.userAttributes;
        const {department} = event.request.clientMetadata;
        const resp = await conection.executeQuery('SELECT * FROM v_user_complete WHERE email = @email AND department_name = @department', [
            {
                columnName: 'email',
                value: email
            },
            {
                columnName: 'department',
                value: department
            }
        ])
        console.log('valid departament');
        if(resp.length <= 0) throw new Error("Este usuario no esta registrado en el departamento")
        console.log('valid password');
        if (event.request.privateChallengeParameters.password === event.request.challengeAnswer) {
            event.response.answerCorrect = true;
        } else {
            event.response.answerCorrect = false;
        }
    /*}else{
        console.log('else');
    }*/
    return event;
};