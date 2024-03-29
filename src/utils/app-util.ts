import _ from 'lodash';

export class AppUtil {
  static getFormattedExcelName(name: string): string {
    return _.join(
      _.filter(
        _.join(
          _.filter(name.split('/'), (key) => key.trim() !== ''),
          '_'
        ).split(' '),
        (key) => key.trim() !== ''
      ),
      '_'
    );
  }

  static getPaginationsFilters(
    response: { pager: any },
    pageSize: number = 25
  ): string[] {
    const pagefilters: string[] = [];
    const pager = response.pager || {};
    const total = pager.total || pageSize;
    for (let page = 1; page <= Math.ceil(total / pageSize); page++) {
      pagefilters.push(`page=${page}&pageSize=${pageSize}`);
    }
    return _.flattenDeep(pagefilters);
  }

  static getFormattedDate(date: any): string {
    let dateObject = new Date(date);
    if (isNaN(dateObject.getDate())) {
      dateObject = new Date();
    }
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return (
      year +
      (month > 9 ? `-${month}` : `-0${month}`) +
      (day > 9 ? `-${day}` : `-0${day}`)
    );
  }

  static uid(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allowedChars = '0123456789' + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    let uid;
    uid = letters.charAt(Math.random() * letters.length);
    for (let i = 1; i < CODESIZE; ++i) {
      uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
    }
    return uid;
  }

  static getHttpAuthorizationHeader(
    username: string,
    password: string
  ): {
    Authorization: string;
    'Content-Type': string;
  } {
    return {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    };
  }
}
