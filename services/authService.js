import { signIn } from "next-auth/react";

export class AuthService {
  static async signUp(userData) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed. Please try again.");
    }

    return data;
  }

  static async autoSignIn(credentials) {
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    return result;
  }

  static async signInUser(credentials) {
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    return result;
  }
}
