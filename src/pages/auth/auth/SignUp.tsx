import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { Props } from "../../../types/SignInProps";

const SignUp: React.FC<Props> = ({ setState }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();
    const { createUser, clearError, setError } = UserAuth();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError(null);
        clearError();
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError(null);
        clearError();
    };

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            await createUser(email, password);
            navigate("/account");
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    const switchToLogin = () => {
        clearError();
        setState(true);
    };

    return (
        <div className="col-span-1 col-start-2 h-full w-full">
            <form className="relative w-full space-y-6 px-8 py-8 sm:w-96" onSubmit={handleSignUp}>
                <div>
                    <h2 className="text-left text-3xl font-bold text-gray-800">S'inscrire</h2>
                </div>
                <div>
                    <input className="placeholder:text-md w-full rounded-full border border-gray-300 bg-gray-50 p-4 text-gray-500 placeholder:text-gray-400 focus:outline-none" type="email" name="sign-up-email" id="sign-up-email" autoComplete="true" onChange={handleEmailChange} placeholder="Email" />
                </div>
                <div>
                    <input className="placeholder:text-md mb-2 w-full rounded-full border border-gray-300 bg-gray-50 p-4 text-gray-500 placeholder:text-gray-400 focus:outline-none" type="password" name="sign-up-password" id="sign-up-password" autoComplete="current-password" onChange={handlePasswordChange} placeholder="Mot de passe" />
                </div>
                <div>
                    <button className="button mb-4 w-full rounded-full bg-blue-500 py-3 text-xl text-white" type="submit">
                        Créer un compte
                    </button>
                    <p className="text-center text-gray-400">
                        Vous avez déjà un compte ?{" "}
                        <span onClick={switchToLogin} className="hover:underline">
                            Se connecter
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;