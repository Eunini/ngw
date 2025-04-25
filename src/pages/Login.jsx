import { ArrowLeft, Mail, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Suspense, lazy } from "react";
import { scrollToTop } from "../App";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-[#1B4965] rounded-full animate-bounce opacity-30"></div>
      <div className="w-3 h-3 bg-[#62B6CB] rounded-full animate-bounce opacity-30 delay-150"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce opacity-30 delay-300"></div>
    </div>
  </div>
);

const LoginForm = lazy(() => import("../components/LoginForm"));
const SignInForm = lazy(() => import("../components/SignInForm"));

function Login() {
  const [searchParams] = useSearchParams();

  return (
    <Suspense fallback={<Loading />}>
      <section className="flex flex-row flex-wrap pt-28">
        <section className="bg-gradient-to-b from-[#1B4965] to-[#62B6CB] w-[50%] md:block hidden overflow-hidden relative">
          {/* Background image */}
          <div className="absolute inset-0 bg-[url('/ngwater-expert1.png')] bg-cover bg-center opacity-70 z-0" />
        </section>
        {searchParams.get("signup") === "true" ? <SignInForm /> : <LoginForm />}
      </section>
    </Suspense>
  );
}

export default Login;
