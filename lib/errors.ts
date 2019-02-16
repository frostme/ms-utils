import {Response} from 'express'

const notFound = (res: Response, error: string) => {
  res.status(404).send({error: error})
}

const unAuthorized = (res: Response, error: string) => {
  res.status(403).send({error: error})
}

const serverError = (res: Response, error: string) => {
  res.status(500).send({error: error})
}

export {
  notFound,
  unAuthorized,
  serverError
};
