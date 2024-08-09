import jwt from "jsonwebtoken";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const apiKeySecret = useRuntimeConfig(event).apiKeySecret;
    const headers = event.req.headers;

    const apiKey = headers["api-key"];
    if (!apiKey) throw new Error("Invalid api key");

    jwt.verify(apiKey, apiKeySecret);

    const client = await serverSupabaseClient(event);

    const { data } = await client
      .from("users")
      .select("id, display_name, created_at");

    return { statusCode: 200, success: true, data };
  } catch (err) {
    console.log();
    return { statusCode: 400, success: false, message: (err as Error).message };
  }
});
