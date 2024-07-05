"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'
import querystring from 'querystring';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "email", 
      password: "password", 
    },
    resolver: zodResolver(schema),
  });
  const router = useRouter()

  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if login details match the predefined values
      if (data.email === "abc@gmail.com" && data.password === "abcd1234") {
        // Set loggedIn to true
        setLoggedIn(true);
      } else {
        // If details don't match, show error
        setError("root", {
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    const queryString = querystring.stringify({ token: 'abc' });
    const pathname = "/"
    const href = pathname + '?' + queryString;
    document.cookie = "token=abc; path=/";
    router.push(href);
  };
  return (
    <>
      {loggedIn && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-slate-500 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Logged In!</h2>
            <p>You have successfully logged in.</p>
            <Button onClick={handleClick} className="mt-6 ms-20">Close</Button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-8">
        <span className="text-3xl font-extrabold text-slate-600 underline underline-offset-8">
        Login
        </span>
        </div>
      {/* Login form */}
      <form className="container flex flex-col justify-center gap-4 mt-10 p-10 border-4 border-emerald-300 rounded-lg text-black bg-slate-700 h-[50vh] max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" placeholder="Email" className="border border-slate-600 rounded-lg p-2" />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <input {...register("password")} type="password" placeholder="Password" className="border border-slate-600 text-black rounded-lg p-2" />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <Button disabled={isSubmitting} type="submit" className="bg-violet-500 hover:bg-violet-600">
          Submit
        </Button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </>
  );
};

export default App;
