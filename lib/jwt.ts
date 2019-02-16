import jwt from 'jsonwebtoken'
import _ from 'lodash'

const verifyJWToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decodedToken: any) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

const createJWToken = (details: any) => {
  if (typeof details !== 'object'){
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number'){
    details.maxAge = 3600
  }

  details.sessionData = _.reduce(details.sessionData || {}, (memo:any, val:any, key:string) => {
    if (typeof val !== "function" && key !== "password"){
      memo[key] = val
    }
    return memo
  }, {})

  const token = jwt.sign({
    data: details.sessionData
  }, process.env.JWT_SECRET || '', {
    expiresIn: details.maxAge,
    algorithm: 'HS256'
  })

  return token
}

export {
  verifyJWToken,
  createJWToken
}

