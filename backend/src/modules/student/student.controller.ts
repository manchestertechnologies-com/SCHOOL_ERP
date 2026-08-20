import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { TenantInterceptor } from '../../core/tenant/tenant.interceptor';
import { DatabaseService } from '../../core/database/db.service';

@Controller('students')
@UseInterceptors(TenantInterceptor)
export class StudentController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async getStudents() {
    // Queries the online schools/students relation
    const result = await this.db.query(
      `SELECT s.id, u.first_name as "firstName", u.last_name as "lastName", 
              s.admission_number as "admissionNumber", sec.name as "sectionName"
       FROM students s
       JOIN users u ON s.user_id = u.id
       JOIN sections sec ON s.section_id = sec.id
       WHERE s.deleted_at IS NULL`
    );

    return {
      data: result.rows,
      meta: { total: result.rowCount, page: 1, totalPages: 1 }
    };
  }

  @Post()
  async createStudent(@Body() body: any) {
    // 1. Create User Credential record
    const userResult = await this.db.query(
      `INSERT INTO users (school_id, email, password_hash, role, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [
        body.schoolId || 'a9a3b8cd-6612-4fb3-9828-569d300eb0be',
        body.email,
        '$2b$12$e0bfa90053bc423586f7b715a201b16c', // Pre-hashed mock password
        'STUDENT',
        body.firstName,
        body.lastName,
      ]
    );
    const userId = userResult.rows[0].id;

    // 2. Create Student Profile record
    const studentResult = await this.db.query(
      `INSERT INTO students (user_id, school_id, admission_number, section_id, academic_year_id, date_of_birth)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        userId,
        body.schoolId || 'a9a3b8cd-6612-4fb3-9828-569d300eb0be',
        body.admissionNumber,
        body.sectionId || 'd0ef4456-11f8-45a8-ac49-0cf02d1dcd4b',
        body.academicYearId || 'f7ab823c-9a44-486a-aa84-dcfb87b7a661',
        body.dateOfBirth || '2012-05-15'
      ]
    );

    return studentResult.rows[0];
  }
}
