
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, LogIn, UserPlus } from 'lucide-react';

interface AuthFormProps {
  onLogin?: (email: string, password: string) => void;
  onSignup?: (name: string, email: string, password: string) => void;
  className?: string;
}

const AuthForm = ({
  onLogin,
  onSignup,
  className,
}: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [signupName, setSignupName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (onLogin) {
        onLogin(loginEmail, loginPassword);
      } else {
        // Default implementation
        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });
        console.log('Login:', { email: loginEmail, password: loginPassword });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      if (onSignup) {
        onSignup(signupName, signupEmail, signupPassword);
      } else {
        // Default implementation
        toast({
          title: "Account created",
          description: `Welcome, ${signupName}!`,
        });
        console.log('Signup:', { 
          name: signupName,
          email: signupEmail,
          password: signupPassword 
        });
      }
      setIsLoading(false);
      setActiveTab('login');
    }, 1000);
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-1 flex flex-col items-center text-center">
        <div className="bg-vidyut-500 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-2">
          <User className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl">Welcome to VidyutSense</CardTitle>
        <CardDescription>
          Enter your information to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Button type="button" variant="link" className="px-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-r-transparent animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" /> Login
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-r-transparent animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" /> Create Account
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-xs text-center text-muted-foreground mt-2">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
