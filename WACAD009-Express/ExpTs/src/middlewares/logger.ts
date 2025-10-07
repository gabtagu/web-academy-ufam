import { Request, Response, NextFunction } from 'express';

type LogType = 'simples' | 'completa';

function logger(logType: LogType) {
  if (logType === 'simples') {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log(new Date().toISOString(), req.url, req.method);
      next();
    };
  } else {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log(
        new Date().toISOString(),
        req.url,
        req.method,
        req.httpVersion,
        req.get('User-Agent'),
      );
      next();
    };
  }
}

export default logger;
