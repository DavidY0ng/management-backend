import { verifyAccessToken } from '../utils/jwt.js'

export default async function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({'error': 'Unauthorized no header'})
  }
  let token
  if(req.headers.authorization){
     token = req.headers.authorization.split(' ')[1]
  } else {
    return res.status(401).send({ 'error': 'Unauthorized, no token' })
  }
 

  await verifyAccessToken(token).then(user => {
    req.user = user // store the user in the `req` object. our next route now has access to the user via `req.user`
    next()
  }).catch(e => {
    return res.status(401).send({ 'error': e.message })
  })
}