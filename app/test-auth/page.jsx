"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthTest() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome!</h1>
            
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
            )}
            
            <div className="space-y-2 mb-6">
              <p className="text-lg font-medium text-gray-900">
                {session.user.name}
              </p>
              <p className="text-gray-600">{session.user.email}</p>
              <p className="text-sm text-gray-500">
                Role: {session.user.role || 'user'}
              </p>
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Authentication Test
          </h1>
          <p className="text-gray-600 mb-8">
            You are not signed in. Please sign in to continue.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => signIn("google", { callbackUrl: '/test-auth' })}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              </svg>
              Continue with Google
            </button>
            
            <button 
              onClick={() => signIn("credentials")}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Sign in with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
