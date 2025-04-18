import { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import googleImage from "../assets/google.webp";
import chattLogo from "../assets/BEEPME.png";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";
import { useAppDispatch } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "@/redux/slice/authSlice";
import { toast } from "sonner";
import { UserLoadingSpinner } from "./UserLoadingSpinner";

export const Login = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingGoogle(true);
    const response = await dispatch(loginWithGoogle());

    setLoadingGoogle(false);

    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/");
    } else {
      toast.error(response.message || "Google login failed");
    }
  };

  const handleSubmit = async (data: LoginFormData) => {
    setLoadingLogin(true);

    const response = await dispatch(loginUser(data.email, data.password));

    setLoadingLogin(false);

    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/chats");
      form.reset();
    } else {
      toast.error(response.message || "Login failed");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 h-screen flex flex-col p-8  justify-center  items-center w-full"
      >
        <Card className="max-w-sm text-light w-full mx-auto p-2 md:p-4 md:border md:border-border-color border-0 bg-background rounded-md ">
          <CardHeader className="text-center flex mb-0 flex-col items-center w-full text-xl md:text-2xl my-4 font-bold">
            <img
              src={chattLogo}
              alt="chatty-bee"
              className="size-15 object-contain"
            />
            <CardTitle className="text-light">
              {" "}
              Log In to Your Account
            </CardTitle>
            <p className="text-sm text-light ">
              Access Your Messages Instantly with BeepME
            </p>
          </CardHeader>
          <CardContent className="px-0 gap-4 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="border h-12 text-light border-border-color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border h-12 text-light border-border-color"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="p-0 flex-col gap-2">
            <Button
              disabled={loadingLogin || loadingGoogle}
              type="submit"
              className="w-full h-12 text-light bg-background-heavy border border-border-color hover:bg-background-hover duration-200 cursor-pointer"
            >
              {loadingLogin ? <UserLoadingSpinner /> : "Login"}
            </Button>
            <Button
              disabled={loadingLogin || loadingGoogle}
              onClick={handleGoogleLogin}
              variant="ghost"
              className="w-full h-12 cursor-pointer hover:bg-background-heavy duration-200 border border-border-color"
            >
              {loadingGoogle ? (
                <UserLoadingSpinner />
              ) : (
                <div className="items-center flex text-light">
                  <img src={googleImage} className="w-[2rem]" />
                  <p>Google</p>
                </div>
              )}
            </Button>
            <p className="text-center text-light text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-light hover:text-heavy transition"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
