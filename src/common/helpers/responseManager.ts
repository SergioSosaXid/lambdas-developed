/**
 * @copyright Palace Resorts
 * @description Clase que agrega a la estructura base del response, el contenido del modelo body
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
import { Body } from '../model/body'
import { Header } from '../model/headers'
import { CommonResponse } from '../model/commonResponse'
/**
 * Clase base para Response
 */
export class ResponseManager {
  /**
   *
   * @return {Header}
   */
  private setHeaders(): Header {
    const headers: { [key: string]: any } = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Headers':
        'timestamp,tz,tenant-id,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
    return headers
  }
  /**
   *
   * @param {Body} body
   * @return {CommonResponse}
   */
  handleResponse(body: any): CommonResponse {
    let customResponse: CommonResponse
    if (body) {
      const bd: Body = {
        message: '',
        status: 'success',
        error: false,
        data: body
      }

      customResponse = {
        statusCode: 200,
        body: JSON.stringify(bd),
        headers: this.setHeaders()
      }
    } else {
      customResponse = {
        statusCode: 204,
        body: '',
        headers: this.setHeaders()
      }
    }
    return customResponse
  }
  /**
   *
   * @param {string} errorMsg
   * @return {CommonResponse}
   */
  handleError(errorMsg: string): CommonResponse {
    const bd: Body = {
      message: errorMsg,
      status: 'fail',
      error: true,
      data: null
    }

    const customError: CommonResponse = {
      statusCode: 409,
      body: JSON.stringify(bd),
      headers: this.setHeaders()
    }
    return customError
  }
}
