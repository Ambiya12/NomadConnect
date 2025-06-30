interface RegisterResponse {
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
};
