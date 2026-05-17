# ⚠️ The Forbidden Path: Manual OS Setup (Non-DevContainer)

**STOP.** You are entering the realm of the "Dark Arts." This setup is **strongly discouraged** and should only be used as a last resort if your machine is physically incapable of running Docker (e.g., less than 8GB RAM).

By proceeding, you accept that you are opting out of the "Source of Truth" environment. Issues encountered here may not be reproducible by the rest of the team.

### 💀 The Risks

- **"Works on my machine" syndrome**: You will likely encounter bugs that don't exist in production.
- **Dependency Hell**: OS-level library mismatches (especially with `sharp` and `bcrypt`).
- **Zero Support**: The team will not help you debug environment-related errors on this path.

---

### 📜 Requirements for the Brave

If you must persist, ensure your local OS matches these exact specifications:

1.  **Node.js**: You **MUST** use exactly `20.9.0`. (Use [nvm](https://github.com/nvm-sh/nvm) to manage this).
2.  **Database**: You must provision your own MongoDB instance (Local or Atlas).

### 🛠️ Configuration

Create a `.env.local` file in the root directory. This is where you manually bypass the safety of our infrastructure.

```env
# Your manually managed environment
ENVIRONMENT=development
DATABASE_URL="your-own-mongodb-url"
PAYLOAD_SECRET="super-secret-key"
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Running the App

Once your OS is prepared and your database is live:

```bash
npm install
npm run dev
```

**Final Warning:** May the Git History have mercy on your soul 💀.
