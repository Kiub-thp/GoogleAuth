import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (password) => {
    const minLength = /.{6,}/; // Dài ít nhất 6 ký tự
    const hasUppercase = /[A-Z]/; // Ít nhất một chữ hoa
    const hasLowercase = /[a-z]/; // Ít nhất một chữ thường
    const hasNumber = /\d/; // Ít nhất một số
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Ít nhất một ký tự đặc biệt

    return (
      minLength.test(password) &&
      hasUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong(formData.password)) {
      setError(
        "Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
