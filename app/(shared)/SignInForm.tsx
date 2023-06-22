"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  signInUserWithEmailAndPassword,
  getCurrentUser,
} from "../firebase/auth.js";

function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () => {
    await signInUserWithEmailAndPassword(formData.email, formData.password);
    router.replace("/");
    window.location.reload();
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        console.log(user);
        router.replace("/");
      }
    });
  }, [router]);

  return (
    // <>
    // <div>
    //   <h1 className="text-xl">Sign Up</h1>
    //   <div>
        /* <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            value={formData["email"]}
            onChange={onFormDataChange}
            className="border border-black block"
          />
        </div> */
        /* <div>
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id=""
            value={formData["password"]}
            onChange={onFormDataChange}
            className="border border-black block"
          />
        </div> */
        /* <button
          type="button"
          onClick={onFormDataSubmit}
          className="border border-red-500 mt-4"
        >
          Submit
        </button> */
      /* </div>
    </div> */

<div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    Sign In to your account
  </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
  {/* <form className="space-y-6" action="#" method="POST"> */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          value={formData["email"]}
          onChange={onFormDataChange}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <div className="text-sm">
          {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a> */}
        </div>
      </div>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          value={formData["password"]}
          onChange={onFormDataChange}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        onClick={onFormDataSubmit}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </div>
  {/* </form> */}

  {/* <p className="mt-10 text-center text-sm text-gray-500">
    Not a member?{' '}
    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
      Start a 14 day free trial
    </a>
  </p> */}
</div>
</div>
// </>


  );
}

export default SignInForm;
