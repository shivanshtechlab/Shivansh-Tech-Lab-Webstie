import UserManagement from './UserManagement';

export const metadata = {
  title: 'User Management — Shivansh Tech Lab',
  description: 'Manage all system users, roles and permissions.',
  robots: { index: false, follow: false },
};

export default function UsersPage() {
  return <UserManagement />;
}
