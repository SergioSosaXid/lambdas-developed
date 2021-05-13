import { CommonResponse } from "../../common/model/commonResponse"
import { ResponseManager } from "../../common/helpers/responseManager"
import { DepartmentManager } from "../departments/manager";
import { errorConstants } from "../../common/helpers/errorConstants";

export async function getDepartments(event:any, context:any): Promise<CommonResponse> {
    
    //variables
    const responseManager = new ResponseManager()
    const departmentManager = new DepartmentManager();

    try {
        const result = await departmentManager.getDepartments();
        //Se genera y devuelve el response
        return responseManager.handleResponse(result);
    } catch (error) {
        console.log(error)
     return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)   
    }
}