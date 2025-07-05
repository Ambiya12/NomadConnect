const API_URL = import.meta.env.VITE_API_URL;

export const submitComment = async (
  destinationId: string,
  comment: string
): Promise<boolean> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_URL}/api/destinations/${destinationId}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error adding comment:", error);
    return false;
  }
};
