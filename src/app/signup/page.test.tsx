import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import SignUpPage from "./page";
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
  },
}));

describe("SignUpPage", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("successfully signs up and navigates to login when all fields are filled", () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(localStorage.getItem("user")).toBeTruthy();
    expect(toast.success).toHaveBeenCalledWith(
      "Sign-up successful! You can now log in.",
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("toggles password visibility", () => {
    render(<SignUpPage />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleButton = screen.getByText(/show/i);

    // Default to password type
    expect(passwordInput).toHaveAttribute("type", "password");

    // Toggle to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Toggle back to hide password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
