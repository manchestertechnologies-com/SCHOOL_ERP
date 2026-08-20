import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _selectedRole = 'SCHOOL_ADMIN';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Scaffold(
      body: Row(
        children: [
          // Left visual panel (Hidden on small mobile screens)
          if (MediaQuery.of(context).size.width > 800)
            Expanded(
              flex: 12,
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [Color(0xFF0F2027), Color(0xFF203A43), Color(0xFF2C5364)],
                  ),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(48),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.stars, color: Colors.amber, size: 20),
                            SizedBox(width: 8),
                            Text('Manchester School Bridge v1.2', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 32),
                      const Text(
                        'Empowering Schools,\nConnecting Futures.',
                        style: TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          height: 1.2,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'A next-generation digital ecosystem for administrators, teachers, parents, and students.',
                        style: TextStyle(fontSize: 18, color: Colors.white.withOpacity(0.7)),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          
          // Right Login Form Panel
          Expanded(
            flex: 10,
            child: Container(
              color: const Color(0xFFF8F9FA),
              child: Center(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(40),
                  child: Container(
                    constraints: const BoxConstraints(maxWidth: 420),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // App Brand
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: const Color(0xFF1E88E5).withOpacity(0.1),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: const Icon(Icons.school, color: Color(0xFF1E88E5), size: 32),
                            ),
                            const SizedBox(width: 16),
                            const Text(
                              'MSB Portal',
                              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF1E88E5)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 40),
                        
                        const Text(
                          'Sign In',
                          style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800, color: Color(0xFF2C3E50)),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Welcome back! Choose your dashboard environment.',
                          style: TextStyle(color: Colors.grey, fontSize: 14),
                        ),
                        const SizedBox(height: 32),

                        // Role Selector dropdown
                        DropdownButtonFormField<String>(
                          value: _selectedRole,
                          decoration: InputDecoration(
                            labelText: 'Access Portal Role',
                            filled: true,
                            fillColor: Colors.white,
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          items: const [
                            DropdownMenuItem(value: 'SCHOOL_ADMIN', child: Text('School Administrator')),
                            DropdownMenuItem(value: 'TEACHER', child: Text('Teacher Portal')),
                            DropdownMenuItem(value: 'PARENT', child: Text('Parent Portal')),
                            DropdownMenuItem(value: 'STUDENT', child: Text('Student Portal')),
                          ],
                          onChanged: (val) {
                            if (val != null) setState(() => _selectedRole = val);
                          },
                        ),
                        const SizedBox(height: 20),

                        // Email Field
                        TextField(
                          controller: _emailController,
                          decoration: InputDecoration(
                            labelText: 'Username or Email',
                            hintText: 'name@school.com',
                            prefixIcon: const Icon(Icons.email_outlined),
                            filled: true,
                            fillColor: Colors.white,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade300),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),

                        // Password Field
                        TextField(
                          controller: _passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: 'Password',
                            prefixIcon: const Icon(Icons.lock_outlined),
                            filled: true,
                            fillColor: Colors.white,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                              borderSide: BorderSide(color: Colors.grey.shade300),
                            ),
                          ),
                        ),
                        const SizedBox(height: 32),

                        // Login Action Button
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF1E88E5),
                            foregroundColor: Colors.white,
                            minimumSize: const Size(double.infinity, 56),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            elevation: 2,
                          ),
                          onPressed: () {
                            if (_selectedRole == 'SCHOOL_ADMIN') {
                              context.go('/admin');
                            } else if (_selectedRole == 'TEACHER') {
                              context.go('/teacher');
                            } else if (_selectedRole == 'PARENT') {
                              context.go('/parent');
                            } else {
                              context.go('/student');
                            }
                          },
                          child: const Text(
                            'Enter Portal',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
