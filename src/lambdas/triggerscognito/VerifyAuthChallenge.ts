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


const users = [
    {
        id: 1,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 2,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 3,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 4,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 5,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 6,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 7,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 8,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 9,
        email:"sergio.sosa@xid.com.mx"
    },
    {
        id: 10,
        email:"sergio.sosa@xid.com.mx"
    }
]

const VerifyAuth = async (event: any, context: any) => {
    const resp = questions.find((item) => item.id === event.request.privateChallengeParameters.id);
    
    if(!resp) throw new Error("Question not found")

    const {password} = event.request.clientMetadata;
    const {email} = event.request.userAttributes;
    const user = users.find((item) => item.email === email)
    
    if(!user) throw new Error("User in database not found")
    
    if (resp.answer.toLowerCase() === event.request.challengeAnswer.toLowerCase()) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};