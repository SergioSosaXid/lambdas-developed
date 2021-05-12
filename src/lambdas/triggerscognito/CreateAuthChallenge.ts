exports.handler = async (event: any, context:any) => {
    try {
        if (event.request.challengeName == 'CUSTOM_CHALLENGE') {
            event.response.publicChallengeParameters = {};
            const {email} = event.request.userAttributes;
            const username = email.split("@")
            const temporaryPassword = `${username[0]}123`;
            event.response.privateChallengeParameters = {
                password: temporaryPassword,
            };
            event.response.challengeMetadata = 'PASSWORD_CHALLENGE';
            context.succeed(event);
        } else if(event.request.challengeName == 'PASSWORD_CHALLENGE') {
            
        }
    } catch (e) {
        console.log(e)
        throw new Error("Error en esta seccion")
    }
}