import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ParentDashboardView extends StatelessWidget {
  const ParentDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Parent Portal', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.orange[800],
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
              'Welcome, Robert Smith!',
              style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
            ),
            const Text('Linked Child: John Smith (Grade 10-A)', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 24),
            
            // Student summary cards
            const Text('Child Progress Overview', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            LayoutBuilder(
              builder: (context, constraints) {
                double cardWidth = (constraints.maxWidth - 24) / 2;
                return Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  children: [
                    _buildOverviewCard('Attendance', '98.5%', Icons.calendar_month, Colors.green, cardWidth),
                    _buildOverviewCard('Fees Due', '\$450.00', Icons.payment, Colors.red, cardWidth),
                  ],
                );
              },
            ),
            const SizedBox(height: 32),

            // Pending Homework
            const Text('Assigned Homework', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Card(
              child: Column(
                children: const [
                  ListTile(
                    leading: Icon(Icons.assignment, color: Colors.blue),
                    title: Text('Calculus Assignment 4'),
                    subtitle: Text('Due Date: Tomorrow'),
                  ),
                  Divider(height: 1),
                  ListTile(
                    leading: Icon(Icons.assignment, color: Colors.blue),
                    title: Text('Chemistry Lab Report'),
                    subtitle: Text('Due Date: 3 days left'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOverviewCard(String title, String value, IconData icon, Color color, double width) {
    return Container(
      width: width,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        border: Border.all(color: color.withOpacity(0.15)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: color.withOpacity(0.1),
            child: Icon(icon, color: color),
          ),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(color: Colors.black54, fontWeight: FontWeight.w500)),
              Text(value, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color)),
            ],
          )
        ],
      ),
    );
  }
}
