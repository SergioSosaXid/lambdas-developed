import { PolicyIamManager } from "../../common/helpers/PolicyIamManager";
import { AuthorizerManager } from "../authorizer/manager"
import  { isObjEmpty } from "../../common/helpers/objectManager"
import { RESPONSE_MESSAGES } from '../../common/helpers/Constants'
import { ResponseManager} from '../../common/helpers/responseManager'


const responseManager = new ResponseManager()
export async  function authorizer(event:any, context:any, callback:any) {

    const authorizerMagager = new AuthorizerManager()
    const policyIamManager = new PolicyIamManager();

    const token = await authorizerMagager.getToken(event.authorizationToken.split(" ")[1]);
    if(isObjEmpty(token)) return  callback(RESPONSE_MESSAGES.error.Unauthorized)
    const query = await authorizerMagager.getPermissionByEmail(token.email);
    const role = query ? query.roles_name: RESPONSE_MESSAGES.error.Unauthorized;

    switch (role) {
        case 'ADMIN':
            callback(null, policyIamManager.getPolicy('user', "Allow", event.methodArn));
            break;
        case 'CUSTOMER':
            callback(null, policyIamManager.getPolicy('user', "Deny", event.methodArn));
            break;
        case 'unauthorized':
            return responseManager.handleError(RESPONSE_MESSAGES.error.Unauthorized)
        default:
            callback(RESPONSE_MESSAGES.error.token); // Return a 500 Invalid token response
    } 
          
   
};