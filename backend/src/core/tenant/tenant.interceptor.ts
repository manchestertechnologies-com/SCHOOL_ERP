import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Bypass tenant checks for super admin, auth, and global endpoints
    const path = request.route?.path || '';
    if (path.includes('/auth/login') || path.includes('/super-admin')) {
      return next.handle();
    }

    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new BadRequestException('Missing X-Tenant-ID header');
    }

    // Set tenant context on the request object for database ORM scoping
    request.tenantId = tenantId;

    return next.handle();
  }
}
