import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function analyzeVCF(file, drugs) {
  const formData = new FormData();
  formData.append("vcf", file);
  formData.append("drugs", drugs);

  const response = await axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
}