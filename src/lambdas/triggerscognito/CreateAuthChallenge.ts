exports.handler = async (event: any, context: any) => {
    try {
        console.log('1 valid')
        if (event.request.challengeName == 'CUSTOM_CHALLENGE') {

        console.log('2 valid')
            event.response.publicChallengeParameters = {};
            const {email} = event.request.userAttributes;
            const username = email.split("@")
            const temporaryPassword = `${username[0]}123`;
            event.response.privateChallengeParameters = {
                password: temporaryPassword,
            };
            event.response.challengeMetadata = 'PASSWORD_CHALLENGE';
            context.succeed(event);
        }
    } catch (e) {
        throw new Error("Error en esta seccion")
    }
}