import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div className="w-screen h-screen bg-primary/10 flex">
            <Head title="Forgot Password" />

            <form
                onSubmit={submit}
                className="w-[350px] m-auto bg-white p-5 rounded-md"
            >
                <div className="mb-4 text-sm text-gray-600">
                    Lupa kata sandi Anda? Masukkan email anda dan kami akan
                    mengirimkan link untuk merubah sandi baru
                </div>
                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <button
                        className="ml-4 py-1 px-5 rounded-md text-white font-semibold bg-primary cursor-pointer"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </div>
    );
}
