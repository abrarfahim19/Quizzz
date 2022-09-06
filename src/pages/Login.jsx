import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { auth } from "../lib/firebase.init";
// import useTokens from "../../../Hooks/useTokens";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword,eUser,eLoading,eError,] = useSignInWithEmailAndPassword(auth);
    // const [tokens] = useTokens(gUser || eUser);
    const [user, loading, error] = useAuthState(auth);
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm();

    if (user || eUser || gUser){
        navigate(from, { replace: true });
    }
    // useEffect( () =>{
    //     if (tokens) {
    //         navigate(from, { replace: true });
    //     }
    // }, [tokens, from, navigate])

    if (gLoading||eLoading){
        return <Loader/>
    };

    let errorM;
    if (gError || eError){
        errorM =<p className="text-red-600 mt-3">{gError?.message || eError?.message}</p>
    };

    const onSubmit = async (data,e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(data.email, data.password);
        resetField("password");
    };

    return (
        <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left mx-5">
                    <h1 className="text-5xl font-bold text-white">Boost Your Knowledge With Us</h1>
                    <p className="py-6 text-white">
                        We have served our product to 10k+ happy customer. We go the extra mile.
                    </p>
                    <h1 className="text-3xl font-bold text-white">Don't Have An Accout?</h1>
                    <p className="py-6">
                    <Link className="btn glass btn-wide text-white mt-3" to='/register'> Register </Link>
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body ">
                    <h2 className="text-xl text-center font-bold">Log In</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
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
                                value="Log In"
                            />
                        </div>
                    {
                        errorM
                    }
                    </form>

                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >
                        Log In with Google
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;