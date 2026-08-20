import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TeacherDashboardView extends StatelessWidget {
  const TeacherDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Teacher Portal', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.green[800],
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
              'Good Morning, Mrs. Jane!',
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
            ),
            const Text('Class Teacher of Grade 10 - Section A', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            
            // Actions
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green[50],
                      foregroundColor: Colors.green[800],
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: const Icon(Icons.check_circle),
                    label: const Text('Mark Attendance'),
                    onPressed: () {},
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue[50],
                      foregroundColor: Colors.blue[800],
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: const Icon(Icons.upload_file),
                    label: const Text('Upload Homework'),
                    onPressed: () {},
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),

            // Today's classes
            const Text('Today\'s Classes', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Card(
              child: Column(
                children: [
                  ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.green[100],
                      child: const Text('1'),
                    ),
                    title: const Text('Mathematics (Grade 10-A)'),
                    subtitle: const Text('09:00 AM - 10:00 AM | Room 102'),
                  ),
                  const Divider(height: 1),
                  ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.green[100],
                      child: const Text('2'),
                    ),
                    title: const Text('Physics (Grade 10-B)'),
                    subtitle: const Text('10:15 AM - 11:15 AM | Lab 1'),
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
