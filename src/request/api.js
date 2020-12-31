import {deleteById, get, post, put} from './http'

/**
 * 用户操作
 */
export const getUserInfo = () => get('/auth/userInfo', {});

export const login = (params) => post('/auth/login', params);

export const logout = () => get('/auth/logout', {});

/**
 * 网站地址接口
 */
export const websiteRecordList = () => get('/public/v1/websites', {});

export const saveWebsiteRecord = (params) => post('/v1/websites', params);

export const deleteWebSiteRecord = (id) => deleteById('/v1/' + id + '/websites');

/**
 * 系统管理接口
 */
export const userList = (params) => get('/v1/users', params);

export const roleList = (params) => get('/v1/roles', params);

export const updatePassword = (params) => post('/v1/users/password', params);

export const addUser = (params) => post('/v1/users', params);

export const addRole = (params) => post('/v1/roles', params);

export const getUsersOfRole = (params) => get('/v1/usersOfRole', params);

export const updateUsersOfRole = (params) => put('/v1/usersOfRole', params);
