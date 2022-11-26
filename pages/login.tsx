import Head from "next/head";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Log In - Netflix</title>
        <meta name="description" content="Log In To Your Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        alt="bg"
        fill
        className="-z-10 !hidden object-cover opacity-60 sm:!inline"
      />

      <Link href="/">
        <img
          src="https://rb.gy/ulxxee"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
          alt="logo"
        />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 6 and 20 characters.
              </p>
            )}
          </label>
        </div>

        <button className="w-full rounded bg-[#e50914] py-3">Sign In</button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <Link href="/signup" className="text-[#e50914] underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
