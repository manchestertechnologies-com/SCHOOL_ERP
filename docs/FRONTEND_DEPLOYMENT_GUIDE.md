# Free Flutter Web Deployment Guide

Since the frontend is built using Flutter, it can be compiled into a static Web application (HTML/JS/CSS) and hosted completely online for free. The two best options are **GitHub Pages** (automated via GitHub Actions) and **Vercel**.

---

## Option 1: Deploy to GitHub Pages (Automated Workflow)

GitHub offers free hosting for static websites directly from your repository. We can configure a GitHub Action to automatically build and host the app.

### 1. Add the GitHub Action Workflow
Create a workflow file at `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Flutter Web to GitHub Pages

on:
  push:
    branches: [ "main" ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Set up Java
      uses: actions/setup-java@v3
      with:
        distribution: 'zulu'
        java-version: '11'

    - name: Set up Flutter
      uses: subosito/flutter-action@v2
      with:
        channel: 'stable'

    - name: Install dependencies
      run: |
        cd frontend
        flutter pub get

    - name: Build Web Application
      run: |
        cd frontend
        flutter build web --base-href "/SCHOOL_ERP/"

    - name: Deploy to GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: frontend/build/web
        branch: gh-pages
```

### 2. Enable GitHub Pages in your Repository
1. Go to your repository on GitHub: `https://github.com/manchestertechnologies-com/SCHOOL_ERP`.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select the **gh-pages** branch (this branch will be automatically created by the GitHub Action after your first push) and the `/ (root)` folder.
5. Click **Save**.
Your app will be live at: `https://manchestertechnologies-com.github.io/SCHOOL_ERP/`

---

## Option 2: Deploy to Vercel (Instant Deployment)

Vercel provides extremely fast global CDN hosting for static web projects for free.

1. Go to **[Vercel.com](https://vercel.com/)** and sign up with your GitHub account.
2. Click **Add New** > **Project** and select your `SCHOOL_ERP` repository.
3. In the project configurations:
   * **Framework Preset:** Choose **Other**.
   * **Root Directory:** Choose `frontend`.
   * **Build Command:** `flutter/bin/flutter build web` (or build locally and upload the `frontend/build/web` folder).
4. Click **Deploy**. Vercel will host it on a free subdomain like `school-erp.vercel.app`.
