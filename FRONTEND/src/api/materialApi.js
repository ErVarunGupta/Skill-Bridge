const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getMaterials = async () => {
  try {
    const url = `${API_URL}/get_materials`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMaterial = async ({ material_id, formData }) => {
  // console.log(material_id)
  // console.log(formData);
  try {
    const url = `${API_URL}/update_material/${material_id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const handlePreview = async (fileUrl, filename) => {
  try {
    if (!fileUrl) {
      alert("File does not exist");
      return;
    }

    const res = await fetch(fileUrl, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (!res.ok) {
      alert("Failed to load file");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Open PDF in new tab
    window.open(url, "_blank");
  } catch (error) {
    console.error(error);
  }
};

