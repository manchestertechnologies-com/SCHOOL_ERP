import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class StudentDashboardView extends StatelessWidget {
  const StudentDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Student Portal', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.blue[900],
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => context.go('/login'),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Hello, John Smith!',
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
            ),
            const Text('Grade 10 - Section A | Admission ID: MSB2026001', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            
            // Student schedules
            const Text('Upcoming Exams', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Card(
              color: Colors.blue[50],
              child: const ListTile(
                leading: Icon(Icons.warning, color: Colors.orange),
                title: Text('Mathematics Term 1 Exam'),
                subtitle: Text('Date: 15th July 2026 | Duration: 2 Hours'),
              ),
            ),
            const SizedBox(height: 24),

            // Class Homework
            const Text('Your Homework Tasks', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Card(
              child: Column(
                children: [
                  ListTile(
                    leading: const Icon(Icons.assignment, color: Colors.blue),
                    title: const Text('Calculus Assignment 4'),
                    subtitle: const Text('Subject: Mathematics'),
                    trailing: Chip(
                      label: const Text('Pending', style: TextStyle(color: Colors.red)),
                      backgroundColor: Colors.red[50],
                    ),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: const Icon(Icons.assignment_turned_in, color: Colors.green),
                    title: const Text('History Essay'),
                    subtitle: const Text('Subject: World History'),
                    trailing: Chip(
                      label: const Text('Submitted', style: TextStyle(color: Colors.green)),
                      backgroundColor: Colors.green[50],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

