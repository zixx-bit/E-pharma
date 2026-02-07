'use client';
import { useRouter } from 'next/navigation';
import{useForm} from "react-hook-form";
import React, { useState } from 'react'

type FormData ={
    email: string;
    password: string;
}
const Login= () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ServerError, setServerError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter
    const { register, handleSubmit, formState: { errors } } = useForm<FormData> ();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }
  return (
    <div className='w-full py-10 min-h-[85vh] bg-[#f1f1f1] '>
        <h1 className='text-4xl font-Poppins font-semibold text-black text-center'>
            Login
        </h1>
        <p className='text-center text-lg font-medium py-3 text-[#00000099]'>
            Home.Login
        </p>
        <div className='w-full flex justify-center'>
            <div className='md:w-[480px] p-8 bg-white shadow rounded-lg'>
                <h3 className='text-3xl font-semibold text-center mb-2'>
                    Login to AfyaNova Phamarcy

                </h3>

            </div>

        </div>
    </div>
  )
}

export default Login;