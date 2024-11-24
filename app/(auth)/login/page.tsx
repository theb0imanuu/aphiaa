import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to <span className="aphiaa-title font-normal">aphiaa</span></h1>
      <p className="text-center text-gray-600 mb-6">Please log in to continue.</p>
      <LoginForm />
    </div>
  );
}
