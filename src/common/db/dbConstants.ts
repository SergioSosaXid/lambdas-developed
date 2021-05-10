/**
 * @copyright Palace Resorts
 * @description Namespace que se encarga de almacenar las sentencias SQL en constantes
 * @author Edder Salim Rosado Lira - Tomas Fernando Cob Cime - Edgar Rene Rodriguez Medina
 * @creationDate 8 de Abril del 2021
 */
export namespace DbConstants {
  // OrigosVCPalace DB
  export const CONST_DB_ALL_PROGRAM: string = 'SELECT pgID, pgN FROM Programs'
  export const CONST_DB_PROGRAM_BY_ID: string = 'SELECT pgID, pgN FROM Programs WHERE pgID = @pgID'
  // imchargebacks_qa DB
  export const CONST_DB_ALL_CHBTYPES: string = 'SELECT * FROM ChargebackTypes'
  export const CONST_DB_CHBTYPE_BY_ID: string = 'SELECT * FROM ChargebackTypes WHERE chtID = @chtID'
  export const CONST_DB_USER_DEPARTMENT: string = 'SELECT * FROM v_user_complete WHERE email = @email AND department_name = @department'
}
