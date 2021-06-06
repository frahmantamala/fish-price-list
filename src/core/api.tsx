import axios from 'axios';

export default class Api {
  apiToken: string | null;
  clientReq: any | null;
  apiBaseUrl: string | undefined;

  constructor() {
    this.apiToken = null;
    this.clientReq = null;
    this.apiBaseUrl = 'https://stein.efishery.com/v1/';
  }

  initApi() {
    this.apiToken = this.getCookie('APP_TOKEN');

    let headers = {
      Accept: "application/json",
      Authorization: ''
    }

    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`;
    }
    this.clientReq = axios.create({
      baseURL: this.apiBaseUrl,
      timeout: 31000,
      headers: headers
    })

    return this.clientReq
  }

  getData(url: string, params?: any) {
    return this.initApi().get(url, { params: params });
  }

  postData(url: string, data: any) {
    return this.initApi().post(url, data);
  }

  private getCookie(name: string): string {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const caName = `${name}=`;
    let c: string;
    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(caName) === 0) {
        return c.substring(caName.length, c.length);
      }
    }
    return '';
  }

  private setCookie(name: string, value: string, expireDays: number, path = '/'): void {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)};`;
    if (expireDays) {
      const dtExpires = new Date(new Date().getTime() + expireDays * 1000 * 60 * 60 * 24);
      cookieStr += `expires=${dtExpires.toUTCString()};`;
    }
    if (path) cookieStr += `path=${path};`;
    document.cookie = cookieStr;
  }
}