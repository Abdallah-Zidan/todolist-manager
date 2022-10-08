import express from 'express';
import { JWTPayload } from './services/jwt.service';
import passport from 'passport';

export function reqUser(request: express.Request): JWTPayload {
  return request.user as JWTPayload;
}

export function reqUserId(request: express.Request): string {
  return reqUser(request)?._id;
}

export function authJwt(){
  return passport.authenticate('jwt',{session:false});
}