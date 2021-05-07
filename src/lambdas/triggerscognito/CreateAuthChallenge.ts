const questions = [
    {
        id:1,
        question: 'Superheroe mas famoso de ciudad gotica',
        answer: 'Batman'
    },
    {
        id:2,
        question: '¿Que dice el primer programa que hacen en programación?',
        answer: 'Hola Mundo'
    },
    {
        id:3,
        question: '¿Cuál es el río más largo del mundo?',
        answer: 'Amazonas'
    },
    {
        id:4,
        question: '¿Dónde originaron los juegos olímpicos?',
        answer: 'Grecia'
    }
]


export const handler = async (event:any, context:any) => {
    try {
        if (event.request.challengeName == 'CUSTOM_CHALLENGE') {
            const indexRand = Math.floor(Math.random() * (questions.length - 0))
            const resp = questions[indexRand];
            event.response.publicChallengeParameters = {};
            event.response.publicChallengeParameters.question = resp.question;
            event.response.privateChallengeParameters = {
                id: resp.id  
            };
            event.response.challengeMetadata = 'QUESTION_CHALLENGE';
            context.succeed(event);
        }
    } catch (e) {
        throw new Error("Error en esta seccion")
    }
}