# Online Quran — Full Functionality

This document describes the full functionality of the Online Quran project: backend APIs, data models, frontend pages, flows and admin operations. Use this as a reference for features, important endpoints, and expected behaviors.

---

## High-level overview

- Purpose: An online platform to offer Quran-related courses, allow users to enroll, enable teachers to apply and be approved as tutors, and provide an admin dashboard for managing users, tutors, courses, enrollments and payments.
- Stack: Node.js + Express backend, MongoDB (Mongoose), React frontend (Vite), Cloudinary for media, Stripe for payments, email via SMTP.

---

## Backend (APIs)

Base URL prefix: `/api`

### Authentication & profile
- `POST /api/auth/signup` — Signup (creates PendingUser + sends OTP).
- `POST /api/auth/verify-otp` — Verify OTP to finalize signup and create `User`.
- `POST /api/auth/login` — Login for `User` or `Admin`. Returns `accessToken` and `refreshToken`.
- `POST /api/auth/refresh-token` — Exchange refresh token for a new access token.
- `POST /api/auth/logout` — Invalidate refresh token.
- `PUT /api/auth/profile` — Edit profile (authenticated). Accepts `multipart/form-data` with optional `profileImage` (upload via Cloudinary). Handles email-change OTP flow and basic fields: `username`, `phone`, `bio`, `address`.
- `POST /api/auth/verify-email-change` — Verify email-change OTP.
- `POST /api/auth/change-password` — Change password (requires current password).
- `POST /api/auth/forgot-password` / `POST /api/auth/reset-password` — Reset password via OTP.

### Protected profile route (used by frontend to fetch logged-in profile)
- `GET /api/protected/profile` — Returns current `User` or `Admin` profile (requires Authorization header with Bearer token).

### Teacher Applications (public submit, admin manage)
- `POST /api/teacher-applications` — Submit teacher application (public, accepts files `certificate`, `cnic`, `cv`). Creates `TeacherApplication` with status `pending`.
- `GET /api/teacher-applications` — Admin: list all applications.
- `GET /api/teacher-applications/:id` — Get a single application.
- `PATCH /api/teacher-applications/:id/status` — Admin: update application status (`approved` / `rejected`). On `approved`, server creates a `Tutor` record (if not already present) from application fields and links `userId` to the new tutor id.
- `DELETE /api/teacher-applications/:id` — Delete application.

### Tutors
- `GET /api/tutors` — List tutors (omits sensitive fields).
- `GET /api/tutors/:id` — Get tutor by id.
- `POST /api/tutors` — Create tutor (supports file upload for profile image via FormData).
- `PUT /api/tutors/:id` — Update tutor data.
- `DELETE /api/tutors/:id` — Delete tutor.
- `PATCH /api/tutors/:id/toggle-status` — Activate/deactivate tutor.
- `PATCH /api/tutors/:id/assign-student` — Increment/decrement assigned students.

### Users (admin management)
- `GET /api/users` — List all users (admin protected).
- `GET /api/users/:id` — Get user by id.
- `PUT /api/users/:id` — Update user (admin panel uses this to edit user fields).
- `DELETE /api/users/:id` — Delete user.
- `PATCH /api/users/:id/toggle-status` — Toggle `isVerified` / active status.

### Courses, Enrollments, Services, Plans, Payments
- Standard CRUD endpoints exist for courses, enrollments (manual/test utilities), services and plans.
- Stripe integration uses `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`. Webhook route listens on `/webhook` (raw body parser required).

### Utilities
- Cloudinary utilities: upload images, profile images, delete by public id.
- Email utility: `sendEmail` configured via SMTP settings in `.env`.

---

## Data Models (summary)

- User:
  - Fields: `username`, `email`, `password`, `role`, `phone`, `bio`, `address`, `profileImage`, `cloudinaryPublicId`, `isVerified`, `refreshTokens`, password reset / OTP fields.

- Admin:
  - Similar to `User` but for admin accounts.

- Tutor:
  - Fields: `username`, `email`, `password`, `role` (enum), `gender`, `experience`, `studentsAssigned`, `reviews`, `isVerified`, `isActive`, `phone`, `bio`, `address`, `profileImage`, `qualifications`, `certifications`, `teachingSubjects`, `availableHours`, `refreshTokens`.

- TeacherApplication:
  - Applicant details: `fullName`, `fatherName`, `whatsapp`, `email`, `address`, `country`, `education`, `specialization`, `experience`, `languages`, `courses`, `gender`, `certificate`, `cnic`, `cv`, `about`.
  - Status: `pending` | `approved` | `rejected`.
  - `userId` field to optionally link to a related user/tutor ID.

- Other models: Course, Enrollment, Service, Plan, Contact, PendingUser, PendingAdmin, RefreshToken, etc.

---

## Frontend (React) — pages & components

Top-level routes (examples):
- `/` — Home page.
- `/teachers` — Public tutors listing.
- `/courses/*` — Various course pages.
- `/contact` — Contact page.
- `/profile` — Edit profile and upload profile picture (authenticated).
- `/dashboard` — Admin dashboard (authenticated + admin role required). Children include `users`, `tutors`, `courses`, `enrollments`, `reviews`, `settings`, etc.

Key frontend features:

- Authentication handling:
  - `API` wrapper (`src/features/api.js`) includes Axios instance with `baseURL` (from `VITE_API_URL` or `http://localhost:5000/api`), Authorization header injection from `localStorage` `accessToken`, and refresh-token logic.

- Profile:
  - `src/features/profile/Profile.jsx` fetches `/protected/profile` to display user.
  - Upload profile picture: sends `PUT /auth/profile` with `multipart/form-data` (field name `profileImage`).
  - Edit fields like `username`, `phone`, `address`, `bio`. Email changes trigger OTP flow: server sends OTP to old email; frontend calls `/auth/verify-email-change`.
  - Change password via `/auth/change-password`.

- Teacher Application (public form):
  - Form submits `FormData` to `POST /teacher-applications` (field names `certificate`, `cnic`, `cv`).
  - Admin dashboard view to review applications and call `PATCH /teacher-applications/:id/status`.
  - When admin approves, backend now automatically creates a `Tutor` record (if one with the same email doesn't exist).

- Tutors listing in Dashboard:
  - Uses `GET /tutors` to show all tutors.
  - Editing tutors calls `PUT /tutors/:id`.
  - Tutors created by admin or by application approval appear in this list.

- Admin panels:
  - Users: list, edit, delete, toggle status.
  - Tutors: list, create, edit, activate/deactivate.
  - Courses / Enrollments: manage content and student enrollments.

- Payments & Stripe:
  - Frontend uses Stripe publishable key from env to create checkout or payment intent flows.
  - Backend provides webhook endpoint for verifying events.

---

## Important flows (detailed)

1. Sign-up & Verify
   - User POSTs `/auth/signup` → PendingUser created with hashed password and OTP sent.
   - User POSTs `/auth/verify-otp` → PendingUser converted into User (verified).

2. Login & token lifecycle
   - Login returns `accessToken` (short-lived) and `refreshToken` (longer-lived, stored in DB).
   - API interceptors refresh `accessToken` by calling `/auth/refresh-token` with the `refreshToken`.

3. Profile update & email-change
   - `PUT /auth/profile` handles both JSON and `multipart/form-data` (image). If email changed, server sends OTP to the current (old) email; frontend then calls `/auth/verify-email-change`.

4. Teacher application → Tutor creation
   - Applicant submits `POST /teacher-applications` (files optional).
   - Admin reviews and calls `PATCH /teacher-applications/:id/status` with `status=approved`.
   - On approval, backend creates a `Tutor` document (unless one exists) using application data (email, name, courses → teachingSubjects, about → bio, etc.) and stores a hashed temporary password. The application record is updated to `approved` and `userId` is set to the created tutor's id.

5. Course enrollment
   - Students enroll in courses; enrollments are managed by admin and the system can create manual/test enrollments via utility endpoints.

6. Payments
   - Stripe flows (create payment intent / checkout) and webhook listener handle payment state changes.

---

## Notes for developers / troubleshooting

- Environment variables needed (see `.env`): `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `PORT`, `FRONTEND_URL`, email & Cloudinary keys, Stripe keys.
- Cloudinary uploads use in-memory `multer` and the `uploadProfileImage` / `uploadFile` helpers.
- When approving a teacher application, the backend generates a temporary password; consider sending the account details (email + temp password) to the tutor's email or providing a password-set flow.
- If profile uploads fail, ensure Cloudinary credentials are valid and file types are images.
- Check `api.js` interceptors: if `refreshToken` is missing or invalid, the interceptor redirects to `/login`.

---

## To-dos & recommended improvements

- Send an email to newly created tutors with a secure password-set link instead of a temp password.
- Link `TeacherApplication.userId` field to a real `User` (if the platform also wants to keep separate `User` and `Tutor` accounts aligned).
- Add unit/integration tests for the approval→tutor creation flow.
- Improve deduplication logic: if a `User` with the same email exists, determine whether to link or to prompt admin.

---

If you want, I can:
- Run the backend locally and test the approval flow end-to-end.
- Add an email notification to tutors when approved with instructions to set their password.
- Update frontend admin UI to automatically refresh the tutors list after an approval.

