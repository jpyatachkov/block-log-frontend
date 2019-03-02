import HttpService from './http';
import RouteService from './route';

const AccountService = {};

Object.assign(AccountService, HttpService, RouteService);

AccountService.login = async function({ userToken }) {
  const url = this.jwtRoute();
  const data = {
    userToken,
  };

  const response = await this.doPost({
    url,
    data,
  });

  return response.data;
};

AccountService.logout = async function() {
  this.clearToken();
};

AccountService.register = async function({ user }) {
  const url = this.registerRoute();
  const data = {
    user,
  };

  const response = await this.doPost({
    url,
    data,
  });

  return response.data;
};

export default AccountService;
