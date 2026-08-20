import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AdminDashboardView extends StatelessWidget {
  const AdminDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          // Premium Side Navigation Panel
          Container(
            width: 260,
            color: const Color(0xFF0F172A),
            child: Column(
              children: [
                const SizedBox(height: 32),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF38BDF8).withOpacity(0.1),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.school, color: Color(0xFF38BDF8), size: 28),
                      ),
                      const SizedBox(width: 12),
                      const Text(
                        'SchoolBridge',
                        style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 40),
                _buildNavItem(Icons.dashboard_outlined, 'Dashboard', true),
                _buildNavItem(Icons.people_alt_outlined, 'Students', false),
                _buildNavItem(Icons.supervisor_account_outlined, 'Teachers', false),
                _buildNavItem(Icons.receipt_long_outlined, 'Fee Desk', false),
                _buildNavItem(Icons.campaign_outlined, 'Circulars', false),
                _buildNavItem(Icons.settings_outlined, 'System Settings', false),
                const Spacer(),
                _buildNavItem(Icons.logout, 'Sign Out', false, onTap: () => context.go('/login')),
                const SizedBox(height: 24),
              ],
            ),
          ),

          // Main Screen Contents
          Expanded(
            child: Container(
              color: const Color(0xFFF1F5F9),
              child: Column(
                children: [
                  // Top bar
                  Container(
                    height: 70,
                    color: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'System Administration Overview',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF334155)),
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.notifications_none, color: Colors.grey),
                              onPressed: () {},
                            ),
                            const SizedBox(width: 12),
                            const CircleAvatar(
                              backgroundColor: Color(0xFF38BDF8),
                              child: Text('A', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            ),
                          ],
                        )
                      ],
                    ),
                  ),

                  // Main Scrollable Area
                  Expanded(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(32),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Control Console',
                            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                          ),
                          const SizedBox(height: 24),

                          // Cards Grid
                          LayoutBuilder(
                            builder: (context, constraints) {
                              double width = (constraints.maxWidth - 48) / 4;
                              return Wrap(
                                spacing: 16,
                                runSpacing: 16,
                                children: [
                                  _buildPremiumStatCard('Total Enrolled', '1,248', '+12% from last term', Icons.people_alt, Colors.blue, width),
                                  _buildPremiumStatCard('Active Teachers', '84', 'No pending requests', Icons.school, Colors.green, width),
                                  _buildPremiumStatCard('Attendance Rate', '96.2%', 'Target is 98.0%', Icons.check_circle_outline, Colors.purple, width),
                                  _buildPremiumStatCard('Gross Collections', '\$48,250', '82% of total targets', Icons.account_balance_wallet, Colors.orange, width),
                                ],
                              );
                            },
                          ),
                          const SizedBox(height: 32),

                          // Split panel: Recent Notices & Student Logs
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Students Table
                              Expanded(
                                flex: 3,
                                child: Card(
                                  elevation: 0,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    side: BorderSide(color: Colors.grey.shade200),
                                  ),
                                  child: Padding(
                                    padding: const EdgeInsets.all(24),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Recent Enrollments',
                                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                        ),
                                        const SizedBox(height: 16),
                                        Table(
                                          columnWidths: const {
                                            0: FlexColumnWidth(2),
                                            1: FlexColumnWidth(2),
                                            2: FlexColumnWidth(2),
                                            3: FlexColumnWidth(1),
                                          },
                                          children: [
                                            _buildTableRowHeader(),
                                            _buildTableRow('John Smith', 'Grade 10-A', 'john.smith@mail.com', 'Active'),
                                            _buildTableRow('Emma Watson', 'Grade 9-B', 'emma.watson@mail.com', 'Active'),
                                            _buildTableRow('Michael Jordan', 'Grade 11-A', 'jordan.m@mail.com', 'Pending'),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 24),

                              // System announcements
                              Expanded(
                                flex: 2,
                                child: Card(
                                  elevation: 0,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    side: BorderSide(color: Colors.grey.shade200),
                                  ),
                                  child: Padding(
                                    padding: const EdgeInsets.all(24),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Platform Broadcasts',
                                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                                        ),
                                        const SizedBox(height: 16),
                                        _buildBroadcastItem('Quarterly Exam Schedules Out', 'Circular published under Grade 10-12 classes.', 'High', Colors.red),
                                        const SizedBox(height: 12),
                                        _buildBroadcastItem('Sports Meet registrations open', 'Registration portal live until July 5th.', 'Medium', Colors.blue),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String title, bool isActive, {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        color: isActive ? const Color(0xFF1E293B) : Colors.transparent,
        child: Row(
          children: [
            Icon(icon, color: isActive ? const Color(0xFF38BDF8) : const Color(0xFF94A3B8), size: 22),
            const SizedBox(width: 16),
            Text(
              title,
              style: TextStyle(
                color: isActive ? Colors.white : const Color(0xFF94A3B8),
                fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPremiumStatCard(String title, String value, String rate, IconData icon, Color color, double width) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: Container(
        width: width,
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(title, style: const TextStyle(color: Color(0xFF64748B), fontWeight: FontWeight.w600)),
                Icon(icon, color: color, size: 24),
              ],
            ),
            const SizedBox(height: 16),
            Text(value, style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w800, color: Color(0xFF0F172A))),
            const SizedBox(height: 8),
            Text(rate, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }

  TableRow _buildTableRowHeader() {
    return const TableRow(
      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFFE2E8F0), width: 1.5))),
      children: [
        Padding(padding: EdgeInsets.symmetric(vertical: 12), child: Text('Student Name', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF64748B)))),
        Padding(padding: EdgeInsets.symmetric(vertical: 12), child: Text('Section', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF64748B)))),
        Padding(padding: EdgeInsets.symmetric(vertical: 12), child: Text('Email Address', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF64748B)))),
        Padding(padding: EdgeInsets.symmetric(vertical: 12), child: Text('Status', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF64748B)))),
      ],
    );
  }

  TableRow _buildTableRow(String name, String section, String email, String status) {
    final statusColor = status == 'Active' ? Colors.green : Colors.orange;
    return TableRow(
      decoration: const BoxDecoration(border: Border(bottom: BorderSide(color: Color(0xFFF1F5F9)))),
      children: [
        Padding(padding: const EdgeInsets.symmetric(vertical: 16), child: Text(name, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A)))),
        Padding(padding: const EdgeInsets.symmetric(vertical: 16), child: Text(section, style: const TextStyle(color: Color(0xFF475569)))),
        Padding(padding: const EdgeInsets.symmetric(vertical: 16), child: Text(email, style: const TextStyle(color: Color(0xFF64748B)))),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: statusColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                status,
                style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBroadcastItem(String title, String desc, String priority, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade100),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(priority, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(desc, style: const TextStyle(color: Color(0xFF64748B), fontSize: 13)),
        ],
      ),
    );
  }
}
