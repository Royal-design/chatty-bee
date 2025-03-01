"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import googleImage from "../assets/google.webp";
import chattLogo from "../assets/chatty.png";
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
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";
import { useAppDispatch } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { loginUser, loginWithGoogle } from "@/redux/slice/authSlice";
import { toast } from "sonner";

export const Login = () => {
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
    const response = await dispatch(loginWithGoogle());

    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/");
    } else {
      toast.error(response.message || "Google login failed");
    }
  };

  const handleSubmit = async (data: LoginFormData) => {
    const response = await dispatch(loginUser(data.email, data.password));
    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/");
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
        <Card className="max-w-sm w-full bg-background  mx-auto p-2 md:p-4  md:border md:border-border-color rounded-md ">
          <CardHeader className="text-center flex flex-col items-center w-full text-xl md:text-2xl my-4 fontbold">
            <img src={chattLogo} alt="chatty-bee" className="size-12" />
            <CardTitle className="text-heavy">Log In to Your Account</CardTitle>
            <p className="text-sm  text-light">
              Access Your Messages Instantly with Chatty Bee
            </p>
          </CardHeader>
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
                    className="border text-light border-border-color"
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
                    className="border text-light border-border-color"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="p-0 flex-col gap-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full bg-background-heavy border border-border-color hover:bg-background-hover duration-200 cursor-pointer"
            >
              Login
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              onClick={handleGoogleLogin}
              variant="ghost"
              className="w-full cursor-pointer hover:bg-background-heavy duration-200 border border-border-color"
            >
              <div className="items-center  flex text-light">
                <img src={googleImage} className="w-[2rem]" />
                <p>Google</p>
              </div>
            </Button>
            <p className="text-center text-light text-sm mt-2">
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
