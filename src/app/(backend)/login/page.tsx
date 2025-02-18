import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import AdminLoginForm from '@/components/form/AdminLoginForm';
import Link from 'next/link';

function AdminLoginPage() {
  return (
    <main className="w-full pt-64 sm:pt-48">
      <ResponsiveContainer>
        <Link
          href="/"
          className="absolute block text-neutral-lighter -mt-12 w-fit hover:bg-black-lighter px-1.5 py-0.5"
        >
          {'<- '}Home
        </Link>
        <h1 className="text-4xl font-medium mb-16 sm:mb-32">Admin Login</h1>
        <ResponsiveContainer className="flex justify-center">
          <AdminLoginForm />
        </ResponsiveContainer>
      </ResponsiveContainer>
    </main>
  );
}

export default AdminLoginPage;
