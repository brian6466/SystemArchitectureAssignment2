import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RootState, AppDispatch } from "../app/store";

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values)).then((res: any) => {
                if (res.meta.requestStatus === "fulfilled") {
                    if (res.payload.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/profile");
                    }
                }
            });
        },
    });

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Login</h2>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-4 bg-white text-gray-900 border border-gray-300 rounded mb-2"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mb-4">{formik.errors.email}</p>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-4 bg-white text-gray-900 border border-gray-300 rounded mb-2"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm mb-4">{formik.errors.password}</p>
                    )}

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-700 text-white py-3 rounded hover:bg-orange-800 transition text-lg"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-900">
                    Don't have an account?{" "}
                    <a href="/register" className="text-orange-700 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
