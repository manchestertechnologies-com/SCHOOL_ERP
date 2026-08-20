import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/auth/presentation/views/login_view.dart';
import '../../features/dashboard/presentation/views/admin_dashboard_view.dart';
import '../../features/dashboard/presentation/views/teacher_dashboard_view.dart';
import '../../features/dashboard/presentation/views/parent_dashboard_view.dart';
import '../../features/dashboard/presentation/views/student_dashboard_view.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginView(),
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => const AdminDashboardView(),
      ),
      GoRoute(
        path: '/teacher',
        builder: (context, state) => const TeacherDashboardView(),
      ),
      GoRoute(
        path: '/parent',
        builder: (context, state) => const ParentDashboardView(),
      ),
      GoRoute(
        path: '/student',
        builder: (context, state) => const StudentDashboardView(),
      ),
    ],
  );
});
