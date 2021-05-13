import { PolicyIamManager } from "../../common/helpers/PolicyIamManager";
import { AuthorizerManager } from "../authorizer/manager"
import { ResponseManager } from "../../common/helpers/responseManager";
import { errorConstants } from "../../common/helpers/errorConstants";

export async  function authorizer(event:any, context:any, callback:any) {

    const authorizerMagager = new AuthorizerManager()
    const policyIamManager = new PolicyIamManager();
    const responseManager = new ResponseManager();

    const token = await  authorizerMagager.getToken(event.authorizationToken.split(" ")[1]);
    
    if(!token.isValid) return  responseManager.handleError(errorConstants.UNAUTHORIZED)
    console.log(token)
    const query = await authorizerMagager.getPermissionByEmail(token.email);
    const role = query ? query.roles_name: "unauthorized";
    switch (role) {
        case 'ADMIN':
            callback(null, policyIamManager.getPolicy('user', "Allow", event.methodArn));
            break;
        case 'CUSTOMER':
            callback(null, policyIamManager.getPolicy('user', "Deny", event.methodArn));
            break;
        default:
            return  responseManager.handleError(errorConstants.UNAUTHORIZED)   // Return a 401 Unauthorized response
    } 
          
   
};