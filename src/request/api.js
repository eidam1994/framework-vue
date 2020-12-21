import {deleteById, get, post} from './http'

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
