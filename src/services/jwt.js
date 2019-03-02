import StorageService from './storage';

const JWT_KEY = 'jwt';

const JwtService = {};

Object.assign(JwtService, StorageService);

JwtService.clearToken = function() {
  this.remove(JWT_KEY);
};

JwtService.getToken = function() {
  return this.get(JWT_KEY);
};

JwtService.setToken = function(token) {
  return this.set(JWT_KEY, token);
};

export default JwtService;
