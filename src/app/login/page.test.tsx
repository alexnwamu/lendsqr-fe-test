import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./page";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Mock next/navigation and toast
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("LoginPage", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("shows an error if credentials are incorrect", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@example.com",
        password: "correctpassword",
        token: "dummyToken",
      }),
    );
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(toast.error).toHaveBeenCalledWith("Invalid email or password.");
  });

  it("logs in and redirects to dashboard if credentials are correct", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@example.com",
        password: "correctpassword",
        token: "dummyToken",
      }),
    );
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "correctpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(localStorage.getItem("authToken")).toBe("dummyToken");
    expect(toast.success).toHaveBeenCalledWith("Login successful!");
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows a warning and redirects to signup if no account is found", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(toast.warn).toHaveBeenCalledWith(
      "No account found. Please sign up first.",
    );
    expect(pushMock).toHaveBeenCalledWith("/signup");
  });

  it("toggles password visibility", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByText(/show/i);

    // Check that password input type is initially "password"
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
