# 🍈 DurianPy CMS

**DurianPy CMS** is the central "Source of Truth" for the DurianPy ecosystem. Built on [Payload CMS](https://payloadcms.com), it provides a unified, enterprise-grade backend to power the **DurianPy Website** and all subsequent projects and microservices.

## 🎯 Purpose & Vision

DurianPy CMS is designed to be a headless content hub. By centralizing our data—from blog posts and site layouts to user roles and global configurations—we ensure consistency across all our digital touchpoints while providing our engineering and content teams with a powerful, flexible interface.

- **Centralized Content**: One dashboard to manage all DurianPy assets.
- **API-First**: Content delivered via highly-performant REST and GraphQL endpoints.
- **Enterprise Ready**: Built-in access control, audit logs (versions), and scalable AWS-backed infrastructure.

---

## 🚀 Quick Start

### Development Setup (DevContainers)

We strongly enforce using **DevContainers** to ensure a consistent environment across all machines.

1. Review the [Prerequisites by OS](./.wiki/local-setup/1-INITIALIZE-BY-OS.md).
2. Follow the [IDE Setup Guide](./.wiki/local-setup/2-INITIALIZE-IDE.md) to open the project in your container.
3. Once inside the container, follow the [Running the Project](./.wiki/local-setup/3-RUNNING-THE-PROJECT.md) guide to install dependencies, initialize git hooks, and start the local server.

> **Note:** Manual OS setup (without DevContainers) is the "Forbidden Path" and is strictly unsupported. See [the warning here](./.wiki/local-setup/5-NON-DEVCONTAINER-SETUP.md) if you must proceed at your own risk.

---

## 🛠️ Developer Workflow

To maintain code quality and a clean commit history, all contributors must follow our established workflows.

### 📖 Workflow Documentation

Please read our comprehensive **[Developer Workflow Guide](./.wiki/workflows/DEVELOPER_WORKFLOW.md)** before contributing. It covers:

- Adding new collections.
- Creating data seeders.
- Guidelines on when to use database migrations.

### 🌿 Git Branching Strategy

Naming convention: `<type>/<ticket-id>-task-title`

- `feat/DP-123-add-custom-blocks`
- `fix/DP-456-fix-media-upload`
- `chore/update-dependencies`

### ✍️ Commit Message Standards

We strictly follow [Conventional Commits](https://www.conventionalcommits.org/). Our hooks will reject non-compliant messages (e.g., `feat: implement user profiles`).

### 🔄 Staying Synchronized

Keep your branch updated with `main`:

```bash
git fetch origin
git rebase origin/main -r
```

### 📋 Git Lifecycle Summary

1. **Ticket**: Get assigned to a task.
2. **Branch**: `git checkout -b <type>/<ticket-id>-title`.
3. **Setup**: `npm i && npx prek install --hook-type pre-commit --hook-type commit-msg --prepare-hooks`.
4. **Code**: Implement changes & follow [Conventional Commits](https://www.conventionalcommits.org/).
5. **PR**: Push and create a Pull Request on GitHub.

---

## 🏗️ Architecture & Operations

### 📦 Key Components

- **Payload Config**: Custom-tailored in `src/payload.config.ts`.
- **Infrastructure**: AWS+GCP-backed serverless architecture (ECR, Lambda, SSM, S3, Firestore).
- **Database**: MongoDB (managed via `@payloadcms/db-mongodb` and hosted through Firestore).
- **Storage**: AWS S3 (managed via `@payloadcms/storage-s3`).

---

## 📚 Resources & Documentation

- **Local Setup Guides**: Detailed instructions in [`.wiki/local-setup/`](./.wiki/local-setup/)
- **API Overview**: How to consume the CMS in [`.wiki/consuming-cms-api/`](./.wiki/consuming-cms-api/)
- **Migrations**: Guide for database schema changes in [`.wiki/migrations/`](./.wiki/migrations/)
- **Workflow Detail**: Deep dive into our [Developer Workflow](./.wiki/workflows/DEVELOPER_WORKFLOW.md)

## 💬 Support

For assistance, contact the **DurianPy Engineering Leads**.
