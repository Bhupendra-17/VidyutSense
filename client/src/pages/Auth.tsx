
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate with a backend
    console.log('Login:', { email, password });
    
    // Show success toast
    toast({
      title: "Login successful",
      description: "Welcome back to VidyutSense!"
    });
    
    // Redirect to dashboard
    navigate('/');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // In a real app, this would register with a backend
    console.log('Signup:', { name, email, password });
    
    // Show success toast
    toast({
      title: "Account created",
      description: `Welcome to VidyutSense, ${name}!`
    });
    
    // Redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vidyut-50 to-blue-50 p-4">
      <div className="max-w-md w-full">
        <AuthForm
          onLogin={handleLogin}
          onSignup={handleSignup}
          className="shadow-xl"
        />
      </div>
    </div>
  );
};

export default Auth;
