import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { TenantInterceptor } from '../../core/tenant/tenant.interceptor';

@Controller('attendance')
@UseInterceptors(TenantInterceptor)
export class AttendanceController {
  private static attendanceRecords = [];

  @Get()
  async getAttendance() {
    return AttendanceController.attendanceRecords;
  }

  @Post()
  async markAttendance(@Body() body: any) {
    const record = {
      id: new Date().getTime().toString(),
      date: body.date,
      records: body.records,
      markedAt: new Date().toISOString(),
    };
    AttendanceController.attendanceRecords.push(record);
    return { success: true, message: 'Attendance marked successfully', data: record };
  }
}
