import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './modules/auth/auth.controller';
import { StudentController } from './modules/student/student.controller';
import { AttendanceController } from './modules/attendance/attendance.controller';
import { DatabaseService } from './core/database/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AuthController,
    StudentController,
    AttendanceController,
  ],
  providers: [
    DatabaseService,
  ],
})
export class AppModule {}
