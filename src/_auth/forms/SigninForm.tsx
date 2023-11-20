import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

 

const SigninForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isPending: isUserLoading  } = useUserContext();

  //Queries
  const { mutateAsync: signInAccount } = useSignInAccount();
  
   const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({ title: 'Sign in failed. Please try again.' })
    }

    const isLoggedIn = await checkAuthUser();

    if( isLoggedIn ){
      form.reset();
      navigate('/');
    }else{
      return toast({ title: 'Sign in failed. Please try again.'})
    }    
  }

  return (
  <Form {...form}>

    <div className="sm:420 flex-center flex-col">
      <img src="/assets/images/logo.svg" alt="logo" />

      <h2 className="h3-bold pt-5 sm:pt-12">Welcome Back</h2>
      <p className="text-light-3 small-medium md:base-regular mt-2">To log in, Please Enter your details</p>
    
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" 
                  className="shad-input"{...field} />
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
                  <Input type="password" 
                  className="shad-input"{...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader />Loading...
            </div>
          ): "Sign In"}
        </Button>
        <p className="text-small-regular text-light-2 text-center">
          Don't have an account? 
          <Link to='/sign-up' className="text-primary-500 text-small ml-1">Sign Up</Link>
        </p>
      </form>
    </div>
  </Form>
  )
}

export default SigninForm