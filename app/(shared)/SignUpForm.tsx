"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  signUpUserWithEmailAndPassword,
  getCurrentUser,
} from "./../firebase/auth.js";

function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
    } else {
      await signUpUserWithEmailAndPassword(formData.email, formData.password);
      router.push("/");

      window.location.reload();
    }
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
    <div>
      <h1 className="text-xl">Sign Up</h1>
      <div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id=""
            value={formData["confirmPassword"]}
            onChange={onFormDataChange}
            className="border border-black block"
          />
        </div>
        <button
          type="button"
          onClick={onFormDataSubmit}
          className="border border-red-500 mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
