import { PolicyIamManager } from "../../common/helpers/PolicyIamManager";
import { AuthorizerManager } from "../authorizer/manager"
import  { isObjEmpty } from "../../common/helpers/objectManager"

export async  function authorizer(event:any, context:any, callback:any) {

    const authorizerMagager = new AuthorizerManager()
    const policyIamManager = new PolicyIamManager();

    const token = await  authorizerMagager.getToken(event.authorizationToken.split(" ")[1]);
    if(isObjEmpty(token)) return  callback("Unauthorized")
    const query = await authorizerMagager.getPermissionByEmail(token.email);
    const role = query ? query.roles_name: "unauthorized";

    switch (role) {
        case 'ADMIN':
            callback(null, policyIamManager.getPolicy('user', "Allow", event.methodArn));
            break;
        case 'CUSTOMER':
            callback(null, policyIamManager.getPolicy('user', "Deny", event.methodArn));
            break;
        case 'unauthorized':
            callback("Unauthorized");   // Return a 401 Unauthorized response
            break;
        default:
            callback("Error: Invalid token"); // Return a 500 Invalid token response
    } 
          
   
};