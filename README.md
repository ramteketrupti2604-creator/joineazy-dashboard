 Joineazy - Assignment & Review Dashboard (Task 1)

Live Demo: https://joineazy-dashboard-7yep.vercel.app/
GitHub Repo: https://github.com/ramteketrupti2604-creator/joineazy-dashboard
Submitted by: Trupti Ramteke

This is a responsive dashboard for a student-assignment system with two roles: Student and Admin (Professor), built as per Joineazy Frontend Intern Assignment.

 Live Links
Deployed Link (Vercel): https://joineazy-dashboard-7yep.vercel.app/
GitHub: https://github.com/ramteketrupti2604-creator/joineazy-dashboard

Must-Have Features - DONE

1. Login and Roles (Mock)
 Simple role switcher implemented in header (no real auth)
 Seeded users: 2 Admins, 5 Students
 Each user sees only their own data

2. Student View
 List of assignments with title, description, due date, status, and Drive link
 Two-step submission: `Yes, I have submitted` -> Final confirmation dialog -> Status changes to Submitted
 Overall progress indicator: `3 of 5 submitted`

3. Admin View
 Create, Edit, Delete assignments with Drive link
 Assign to all students or selected students
 For each assignment: shows every student's status (Submitted/Not Submitted)
 Progress bar showing class completion rate
 Admin sees only assignments they created

4. General
Fully responsive on mobile and desktop
Data saved in localStorage (survives page refresh)
 Empty, loading, and error states handled

Bonus Features Implemented
 Search / Filter by status
 Sorting by due date
 Overdue highlighting (red for overdue assignments)
 Dark Mode
 Small animations & transitions
 localStorage persistence

 Tech Stack
React.js (Vite)
Tailwind CSS
React Hooks: useState, useEffect
Storage: localStorage (No backend)
Deployment: Vercel

 Setup Steps (Run Locally)

1. Clone the repo
git clone https://github.com/ramteketrupti2604-creator/joineazy-dashboard.git
cd joineazy-dashboard
2. Install dependencies
npm install
3. Run dev server
npm run dev
4. Build for production
npm run build

Folder Structure
joineazy-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminView.jsx      # Admin dashboard logic - CRUD + class completion
│   │   ├── StudentView.jsx    # Student dashboard - 2-step submit + progress
│   │   ├── AssignmentCard.jsx # Reusable assignment card
│   │   ├── RoleSwitcher.jsx   # Mock login / role switcher
│   │   └── ConfirmDialog.jsx  # Final confirmation dialog
│   ├── App.jsx                # Main App with role state & localStorage
│   ├── main.jsx
│   └── index.css              # Tailwind setup
├── package.json
└── README.md

 Component Architecture

1. http://App.jsx (Root)_
 Holds global state: `currentUser`, `assignments`, `role`
 Manages localStorage sync via `useEffect`
 Handles role switching logic
 Conditional rendering: AdminView vs StudentView

2. RoleSwitcher Component
Mock login dropdown with 2 admins + 5 students
 On change, updates App state, filters data accordingly

3. AdminView Component
State: assignments created by logged-in admin
Functions: `handleCreate()`, `handleEdit()`, `handleDelete()`
Logic: For each assignment, calculate `completionRate = (submittedCount / totalAssigned) _ 100`
 Shows table of students with status

4. StudentView Component
 Filters assignments assigned to current student
Two-step confirmation:
  Step 1: `isConfirming` state -> shows dialog
  Step 2: `handleFinalSubmit()` -> status = Submitted
 Progress Indicator: `submitted.length / total.length`

 Key Design Decisions

1.  No Backend, localStorage: As per requirement, used localStorage for persistence. On first load, seed data is injected if no data exists, ensuring data survives refresh.

2.  Role-based Filtering: Instead of real auth, filtered assignments by `createdBy` for Admin and `assignedTo` array for Student. This ensures privacy of data as required.

3.  Two-step Submit for Safety: To avoid accidental submits, added a confirmation dialog (ConfirmDialog component) before marking as submitted. This improves UX.

4.  Class Completion Rate: Calculated dynamically in AdminView - not stored, derived from student submissions. Makes it real-time.

5.  Mobile Responsive: Used Tailwind's responsive utilities (`grid-cols-1 md:grid-cols-2`, `flex-col md:flex-row`) for both dashboards. Tested on 375px width.

6.  Component Reusability: AssignmentCard used in both roles with conditional props (show edit/delete only for admin).

Screenshots
 Admin View
screenshots/admin.png

 Student View
screenshots/student.png

