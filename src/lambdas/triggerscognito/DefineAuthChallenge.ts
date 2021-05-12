export const DefineAuthChallenge = async (event: any, context: any) => {
    if (event.request.userNotFound) {
        throw new Error("User not found")
    }
    
    if (event.request.session &&
        event.request.session.find((attempt: any) => attempt.challengeName !== 'CUSTOM_CHALLENGE')) {
        // We only accept custom challenges; fail auth
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    } else if (event.request.session &&
        event.request.session.length >= 1 &&
        event.request.session.slice(-1)[0].challengeResult === false) {
        // The user provided a wrong answer 3 times; fail auth
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
    } else if (event.request.session &&
        event.request.session.length &&
        event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE' && // Doubly stitched, holds better
        event.request.session.slice(-1)[0].challengeResult === true) {
            event.response.issueTokens = true;
            event.response.failAuthentication = false;
          //  event.response.challengeName = 'PASSWORD_CHALLENGE'
    } else if (event.request.session &&
        event.request.session.length &&
        event.request.session.slice(-1)[0].challengeName === 'PASSWORD_CHALLENGE' && // Doubly stitched, holds better
        event.request.session.slice(-1)[0].challengeResult === true) {
            event.response.issueTokens = true;
            event.response.failAuthentication = false;
    } else {
        // The user did not provide a correct answer yet; present challenge
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    }

    return event;
};