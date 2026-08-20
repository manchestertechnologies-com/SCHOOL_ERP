import { Controller, Post, Body, Get, UseInterceptors } from '@nestjs/common';
import { TenantInterceptor } from '../../core/tenant/tenant.interceptor';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body: any) {
    // Mock login returning JWT and user profile
    return {
      accessToken: 'mock_jwt_access_token_manchester_school_bridge_2026',
      refreshToken: 'mock_jwt_refresh_token_2026',
      user: {
        id: 'c7a7263b-9a84-4861-bf96-2de68d374465',
        email: body.email || 'admin@manchesterschool.com',
        role: body.email?.includes('teacher') ? 'TEACHER' : 'SCHOOL_ADMIN',
        firstName: 'Alex',
        lastName: 'Developer',
        schoolId: 'a9a3b8cd-6612-4fb3-9828-569d300eb0be',
      },
    };
  }

  @Post('refresh')
  async refresh(@Body() body: any) {
    return {
      accessToken: 'new_mock_jwt_access_token',
      refreshToken: 'new_mock_jwt_refresh_token',
    };
  }
}
