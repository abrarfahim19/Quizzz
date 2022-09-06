import React from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import { auth } from "../lib/firebase.init";
// import useTokens from "../../../Hooks/useTokens";


const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    let navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification:true});
    
    // const [tokens] = useTokens(user||gUser);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);

    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors },
    } = useForm();

    if(loading || gLoading || updating){
        return <Loader/>
    }

    if (user || gUser){
        navigate('/home');
    }

    let errorM;
    if (gError || uError){
        errorM =<p className="text-red-600 mt-3">{gError?.message || uError?.message}</p>;
    };

    const onSubmit = async (data) => {
        console.log(data.email);
        const displayName = data.name;
        console.log(displayName);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName })
        resetField("password");
    };

    return (
        <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-right">
                    <h1 className="text-5xl font-bold text-white">Join The Community</h1>
                    <p className="py-6 text-white">
                        We have served our product to 10k+ happy customer. We go the extra mile.
                    </p>
                    <h1 className="text-3xl font-bold text-white">Already Have An Accout?</h1>
                    <p className="py-6">
                    <Link className="btn glass btn-wide text-white mt-3" to='/login'> Log In </Link>
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-5">
                <div className="card-body ">
                    <h2 className="text-xl text-center font-bold">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Name
                                </span>
                            </label>
                            <input
                                {...register("name", { required: true})}
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                <span className="label-text-alt text-red-600">
                                {errors.name?.type === "required" &&
                            "A Name is required"}
                                </span>
                            </label>
                            
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Email
                                </span>
                            </label>
                            <input
                                {...register("email", { required: true , pattern:/^\S+@\S+\.\S+$/})}
                                type="text"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                <span className="label-text-alt text-red-600">
                                {errors.email?.type === "required" &&
                            "Email is required"}
                                {errors.email?.type === "pattern" &&
                            "Enter a valid Email"}
                                </span>
                            </label>

                            <label className="label">
                                <span className="label-text font-semibold">
                                    Password
                                </span>
                            </label>
                            <input
                                {...register("password", { required: true , minLength: 6})}
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                <span className="label-text-alt text-red-600">
                                {errors.password?.type === 'required' && "Password is required"}
                                {errors.password?.type === "minLength" &&
                            "Minmum 6 character"}
                                </span>
                            </label>
                            <input
                                type="submit"
                                className="btn btn-primary text-white"
                                value="Register"
                            />
                        </div>

                    </form>
                    {
                        errorM
                    }

                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >
                        Sign Up with Google
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;