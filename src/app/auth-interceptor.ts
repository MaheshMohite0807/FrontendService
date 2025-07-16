import { HttpInterceptorFn } from '@angular/common/http';

export const CsrfInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next(req);
  }

  const csrfToken = getCookie('XSRF-TOKEN');
  
  if (csrfToken) {
    const modifiedReq = req.clone({
      withCredentials: true,
      headers: req.headers.set('X-XSRF-TOKEN', csrfToken)
    });
    return next(modifiedReq);
  }
  
  return next(req);
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
