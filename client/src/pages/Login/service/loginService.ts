import type { LoginResponse, ProfileResponse, LoginResult } from "../../../types/login";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const loginResponse = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const loginData: LoginResponse = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(loginData.message);
    }

    const accessToken = loginData.accessToken;
    if (!accessToken) {
      throw new Error("No access token received");
    }

    const profileResponse = await fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profileData: ProfileResponse = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error("Failed to get user profile");
    }

    const user = {
      id: profileData._id,
      email: profileData.email,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      profile_picture: profileData.profile_picture || "", 
    };

    return {
      user,
      accessToken,
      refreshToken: loginData.refreshToken,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
};
