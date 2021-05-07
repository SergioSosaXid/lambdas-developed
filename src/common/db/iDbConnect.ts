import { DbParameter } from '../model/dbParameter'
import { Dictionary } from '../model/dictionary'
import { enumDB } from './enums'

export interface IDbConnect {
  dbName: enumDB
  getConnectionInfo(): Dictionary
  getConnectionString(): Dictionary
  createConnection(): any
  executeQuery<Type>(query: string, params: DbParameter[]): Promise<Type[]>
}
