import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/** Marks a request made in the background, which should not show the progress bar. */
export const BACKGROUND_REQUEST = new HttpContextToken(() => false);

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.context.get(BACKGROUND_REQUEST)) return next(request);
  const loading = inject(LoadingService);
  loading.requestStarted();
  return next(request).pipe(finalize(() => loading.requestFinished()));
};
