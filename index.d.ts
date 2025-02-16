import express = require('express')

export type Ip = string
export type CidrRange = string
export type Route = string
export type StartEndIpRange = Ip[]
export type IpRange = CidrRange | StartEndIpRange
export type IpList = Array<Ip | IpRange>

export interface IpCallback {
  (req: express.Request): IpList
}

export interface IpFilterOptions {
  detectIp?: (request: express.Request) => Ip
  excluding?: Route[]
  log?: boolean
  logLevel?: 'all' | 'deny' | 'allow'
  mode?: 'deny' | 'allow'
  // `@types/proxy-addr` does not export the `trust` parameter type
  trustProxy?: any
}

export function IpFilter(
  ips: IpList | IpCallback,
  opts?: IpFilterOptions
): express.RequestHandler

export class IpDeniedError extends Error {
  status: number
  constructor(message: string, extra: any)
}
