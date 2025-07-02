interface RegisterResponse {
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture?: string;
    bio?: string;
  };
  message?: string;
  accessToken?: string;
  refreshToken?: string;
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  bio?: string,
  profilePicture?: File | null
): Promise<RegisterResponse> => {
  try {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    
    if (bio) {
      formData.append('bio', bio);
    }
    
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection.');
  }
};