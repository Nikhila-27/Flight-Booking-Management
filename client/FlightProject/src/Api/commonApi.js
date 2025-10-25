export const commonApi = async (url, method, data = null, token = null, isMultipart = false) => {
  try {
    const headers = {};

  
    if (!isMultipart) headers["Content-Type"] = "application/json";

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
      body: null,
    };

    if (data) {
      options.body = isMultipart ? data : JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", response.status, errorData);
      return errorData;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { error: "Network or server error" };
  }
};
