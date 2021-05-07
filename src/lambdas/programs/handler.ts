/**
 * @copyright Palace Resorts
 * @description Lambda del proceso programs
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { CommonResponse } from '../../common/model/commonResponse'
import { ResponseManager } from '../../common/helpers/responseManager'
import { errorConstants } from '../../common/helpers/errorConstants'
import { ProgramManager } from '../programs/manager'
import { logger } from '../../common/helpers/logManager'

/**
 * Funcion para obtener catalo de Programas
 * @param {any} event Parametro enviado por API Gateway
 * @param {any} context Parametro enviado por API Gateway
 * @return {Promise<CommonResponse>} result Objeto serializado en JSON
 */
export async function getData(event: any, context: any): Promise<CommonResponse> {
  // Variables
  const programManager = new ProgramManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params
    // Se realiza la consulta
    const result = await programManager.getPrograms()
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    logger.error(err)
    // Se entrega el error al lambda
    return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
  }
}

/**
 * Funcion para obtener catalod e Programas
 * @param {any} event Parametro enviado por API Gateway
 * @param {any} context Parametro enviado por API Gateway
 * @return {Promise<CommonResponse>} result Objeto serializado en JSON
 */
export async function getDataById(event: any, context: any): Promise<CommonResponse> {
  // Variables
  const programManager = new ProgramManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params
    // Se realiza la consulta
    const result = await programManager.getProgramById(event.pathParameters.id)
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    logger.error(err)
    // Se entrega el error al lambda
    return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
  }
}
