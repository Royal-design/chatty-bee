"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { RegisterFormData, registerSchema } from "@/schema/registerSchema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { useAppDispatch } from "@/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/redux/slice/authSlice";
import chattLogo from "../assets/BEEPME.png";

import { toast } from "sonner";
import { UserLoadingSpinner } from "./UserLoadingSpinner";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }
  });

  const handleSubmit = async (userData: RegisterFormData) => {
    const response = await dispatch(
      registerUser(userData.email, userData.password, userData.name)
    );

    if (response.success) {
      form.reset();
      navigate("/chats");
      toast.success("User registered successfully");
    } else {
      toast.error(response.message || "Registration failed");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 h-screen flex flex-col p-8  justify-center  items-center w-full"
      >
        <Card className="max-w-sm text-light w-full mx-auto p-2 md:p-4 md:border md:border-border-color border-0 bg-background rounded-md ">
          <CardHeader className="text-center flex flex-col items-center text-xl md:text2xl mb-4 fontbold">
            <img
              src={chattLogo}
              alt="chatty-bee"
              className="size-15 object-contain"
            />
            <CardTitle className="text-light"> Create an Account</CardTitle>
            <p className="text-sm text-light  mt-2">
              Sign Up & Start Connecting with BeepME
            </p>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="text-light h-12 border border-border-color"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="text-light h-12 border border-border-color"
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
                      placeholder="Enter your password"
                      className="text-light h-12 border border-border-color"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="p-0 flex flex-col gap-1">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full text-light h-12 bg-background-heavy border-border-color border hover:bg-background-hover"
            >
              {form.formState.isSubmitting ? (
                <UserLoadingSpinner />
              ) : (
                "Register"
              )}
            </Button>
            <p className="text-light text-sm mt-2">
              {" "}
              You have an account?{" "}
              <Link
                to="/login"
                className="text-light text-sm hover:text-heavy transition"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
