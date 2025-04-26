import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { registerUser } from "../features/auth/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email format").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values) => {
            dispatch(registerUser({ email: values.email, password: values.password })).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    navigate("/login");
                }
            });
        },
    });

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Register</h2>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-4 bg-white text-gray-900 border border-gray-300 rounded mb-2"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-4 bg-white text-gray-900 border border-gray-300 rounded mb-2"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm mb-2">{formik.errors.password}</p>
                    )}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-4 bg-white text-gray-900 border border-gray-300 rounded mb-2"
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="text-red-500 text-sm mb-2">{formik.errors.confirmPassword}</p>
                    )}

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-700 text-white py-3 rounded hover:bg-orange-800 transition text-lg"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-900">
                    Already have an account?{" "}
                    <a href="/login" className="text-orange-700 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}
