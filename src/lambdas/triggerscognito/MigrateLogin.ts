import { Users } from "../../mocks/users.db";

function getUserByUsernameAndPassword(user: string, password: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
        try {
            let userResult: any = Users.find(f => f.email == user && f.password == password);
            userResult.password = undefined;
            resolve(userResult);
        } catch (e) {
            reject(e);
        }
    });

    return promise;
}

function getUserByUsername(user: string): Promise<any> {
    let promise = new Promise<any>((resolve, reject) => {
        try {
            let userResult: any = Users.map(m => { return { email: m.email }; }).find(f => f.email == user);
            resolve(userResult);
        } catch (e) {
            reject(e);
        }
    });

    return promise;
}


export class UserService {
    public async authenticateUser(user: string, password: string) {
        let userResult: any = await getUserByUsernameAndPassword(user, password);
        return userResult;
    }
    public async lookupUser(user: string) {
        let userResult: any = await getUserByUsername(user);
        return userResult;
    }
};


module.exports.migrationCustom = async (event: any, context: any, callback: any) => {
    try {
        var user;

        if (event.triggerSource == "UserMigration_Authentication") {
            let service = new UserService();
            user = await service.authenticateUser(event.userName, event.request.password);
            if (user) {
                event.response.userAttributes = {
                    "email": user.email,
                    "email_verified": "true"
                };
                event.response.finalUserStatus = "CONFIRMED";
                event.response.messageAction = "SUPPRESS";
                context.succeed(event);
            }
            else {
                // Return error to Amazon Cognito
                callback("Bad password");
            }
        }
        else if (event.triggerSource == "UserMigration_ForgotPassword") {
            let service = new UserService();
            // Lookup the user in your existing user directory service
            user = await service.lookupUser(event.userName);
            if (user) {
                event.response.userAttributes = {
                    "email": user.email,
                    "email_verified": "true"
                };
                event.response.messageAction = "SUPPRESS";
                context.succeed(event);
            }
            else {
                // Return error to Amazon Cognito
                callback("Bad password");
            }
        }
        else {
            // Return error to Amazon Cognito
            callback("Bad triggerSource " + event.triggerSource);
        }
    } catch (error) {
        console.log(error);
        callback(error, event);
    }
};