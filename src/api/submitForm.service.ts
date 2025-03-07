/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// const WEBHOOK_URL = "https://hiengiabao12.app.n8n.cloud/webhook-test/109b1dd8-0f10-43ca-842c-a6a8a1a706ab";
const WEBHOOK_URL = "https://hiengiabao12.app.n8n.cloud/webhook/109b1dd8-0f10-43ca-842c-a6a8a1a706ab";

export const submitForm = async (data: any) => {
  try {
    const response = await axios.post(WEBHOOK_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from webhook:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
