/**
 * @copyright Palace Resorts
 * @description Lambda del proceso chargebacktypes
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import winston from 'winston'
import { CommonResponse } from '../../common/model/commonResponse'
import { ResponseManager } from '../../common/helpers/responseManager'
import { errorConstants } from '../../common/helpers/errorConstants'
import { ChargebackTypeManager } from '../chargebacktypes/manager'

/**
 * Funcion para obtener catalod e Programas
 * @param {any} event Parametro enviado por API Gateway
 * @param {any} context Parametro enviado por API Gateway
 * @return {Promise<CommonResponse>} result Objeto serializado en JSON
 */
export async function getData(event: any, context: any): Promise<CommonResponse> {
  // Variables
  const chargebacktypeManager = new ChargebackTypeManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params
    // Se realiza la consulta
    const result = await chargebacktypeManager.getChargebackTypes()
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    winston.error(err)
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
  const chargebacktypeManager = new ChargebackTypeManager()
  const responseManager = new ResponseManager()

  try {
    // En el parametro event se encuentran los valores del Path y Query Params
    // Se realiza la consulta
    const result = await chargebacktypeManager.getChargebackTypeById(event.pathParameters.id)
    // Se genera el response
    return responseManager.handleResponse(result)
  } catch (err) {
    // Se registra el error presentado
    winston.error(err)
    // Se entrega el error al lambda
    return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
  }
}
