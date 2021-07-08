import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const authUrl = 'http://localhost:8000/auth/';
export const apiUrl = 'http://localhost:8000/api/';

export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;