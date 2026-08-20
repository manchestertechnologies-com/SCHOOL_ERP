# Frontend Folder Structure (Flutter Blueprint)

This Flutter project structure is designed to compile to Android, iOS, and Flutter Web using a single codebase. It enforces strict Clean Architecture combined with Model-View-ViewModel (MVVM) and state management using Riverpod.

## 1. Directory Structure

```
frontend/
├── android/                          # Native Android files
├── ios/                              # Native iOS files
├── web/                              # Web templates & index.html
│
├── lib/
│   ├── main.dart                     # App Initialization & ProviderScope startup
│   ├── app.dart                      # MaterialApp definition with GoRouter integration
│   │
│   ├── core/                         # Shared utilities, components & configs
│   │   ├── theme/                    # Material 3 color schemes, typography, dark/light modes
│   │   │   ├── app_theme.dart
│   │   │   └── color_schemes.g.dart
│   │   │
│   │   ├── router/                   # GoRouter navigation setup
│   │   │   ├── app_router.dart       # Route hierarchy definition
│   │   │   └── route_names.dart
│   │   │
│   │   ├── network/                  # Dio/Http network wrappers with Tenant Interceptors
│   │   │   ├── api_client.dart
│   │   │   └── token_interceptor.dart
│   │   │
│   │   └── widgets/                  # Reusable UI elements (Buttons, InputFields, Alerts)
│   │       ├── custom_button.dart
│   │       └── state_view.dart
│   │
│   └── features/                     # Feature-specific modules (Bounded Contexts)
│       ├── auth/
│       │   ├── data/                 # Remote API models, datasources, and repository impl
│       │   │   ├── datasources/
│       │   │   ├── models/           # DTOs: user_model.dart, token_model.dart
│       │   │   └── repositories/
│       │   │
│       │   ├── domain/               # Core business rules (Entities & Use Cases)
│       │   │   ├── entities/         # user_entity.dart
│       │   │   ├── repositories/     # Contract definitions
│       │   │   └── usecases/         # login_usecase.dart, logout_usecase.dart
│       │   │
│       │   └── presentation/         # ViewModels and UI Screens (MVVM)
│       │       ├── viewmodels/       # Riverpod Providers: login_viewmodel.dart
│       │       └── views/            # login_view.dart, otp_view.dart
│       │
│       ├── student/
│       │   ├── data/
│       │   ├── domain/
│       │   └── presentation/
│       │       ├── viewmodels/
│       │       └── views/
│       │           ├── student_list_view.dart
│       │           └── student_detail_view.dart
│       │
│       ├── attendance/
│       │   ├── data/
│       │   ├── domain/
│       │   └── presentation/
│       │       ├── viewmodels/
│       │       └── views/
│       │           ├── mark_attendance_view.dart
│       │           └── attendance_history_view.dart
│       │
│       └── fee/
│           ├── data/
│           ├── domain/
│           └── presentation/
│               ├── viewmodels/
│               └── views/
│                   ├── fee_invoice_view.dart
│                   └── payment_history_view.dart
│
├── pubspec.yaml                      # Project dependencies configuration
└── README.md
```

---

## 2. Dynamic Theme Config (Material Design 3)
The app implements a flexible theming engine inside `core/theme/app_theme.dart` supporting light, dark, and custom brand modes. 
- When a user logs in, the tenant school's custom color scheme is fetched (via the school profile database schema details: `theme_primary_color` and `theme_secondary_color`).
- A customized `ColorScheme` is built dynamically on the fly using `ColorScheme.fromSeed(seedColor: HexColor(school.primaryColor))`, and injected into `MaterialApp` using Riverpod.
