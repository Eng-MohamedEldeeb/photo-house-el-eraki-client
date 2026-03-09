import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../../api/auth.api";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  setCredentials,
  selectIsAuthenticated,
} from "../../../store/slices/authSlice";
import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";

const schema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [error, setError] = useState<string | null>(null);
  // Already logged in? go to dashboard
  useEffect(() => {
    if (isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated, navigate]);
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      try {
        const res = await authApi.login(values);
        dispatch(setCredentials({ token: res.accessToken, admin: res.admin }));
        navigate("/admin", { replace: true });
      } catch {
        setError("Invalid username or password");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-display text-2xl text-gold mb-1">PHOTO HOUSE</p>
          <p className="font-ui text-text3 text-sm">Admin Control Panel</p>
        </div>
        {/* Card */}
        <div className="bg-dark2 border border-dark3 rounded p-8">
          <h1 className="font-ui font-semibold text-text text-lg mb-6">
            Admin Login
          </h1>
          {error && (
            <div
              className="mb-4 p-3 bg-red/10 border border-red/30
              rounded text-red text-sm font-arabic text-center"
            >
              {error}
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-ui text-xs text-text3 mb-1 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-dark border border-dark3
                  focus:border-gold text-text text-sm rounded
                  px-3 py-2.5 outline-none transition-colors"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red text-xs mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div>
              <label className="font-ui text-xs text-text3 mb-1 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full bg-dark border border-dark3
                  focus:border-gold text-text text-sm rounded
                  px-3 py-2.5 outline-none transition-colors"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <Button
              type="submit"
              loading={formik.isSubmitting}
              className="mt-2 w-full"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
