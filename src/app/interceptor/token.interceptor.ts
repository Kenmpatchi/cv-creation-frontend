import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(clonedReq); // Pass the cloned request with the token
  }

  return next(req); // Pass the original request if no token is found
};
