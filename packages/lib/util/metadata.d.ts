/* eslint-disable @typescript-eslint/no-explicit-any */

export default UserscriptMeta

export interface UserscriptMetaData extends Partial<Omit<VMScriptGMInfoScriptMeta, 'runAt'>> {
  name: string
  version: string
  copyright?: string
  'run-at'?: VMScriptRunAt
  [key: string]: any
}

export class UserscriptMeta implements UserscriptMetaData {
  name: string
  version: string;
  [key: string]: any

  static parse(scriptMetaStr?: string): UserscriptMeta
  static stringify(metadata: UserscriptMetaData): string
  constructor(data: UserscriptMetaData)
  toJSON(): UserscriptMetaData
  toString(): string
}
