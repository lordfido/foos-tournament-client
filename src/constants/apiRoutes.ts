import { isProduction, isPre } from '../common/utils/platforms';

export const BASE_URL = isProduction()
  ? '//api.man-app.com/?endpoint='
  : isPre()
    ? '//dev-api.man-app.com/?endpoint='
    : '//api.man-app.local/?endpoint=';
