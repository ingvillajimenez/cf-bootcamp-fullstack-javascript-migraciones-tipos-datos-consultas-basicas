"use server";

import { createClient } from "@/lib/supabase/server";

export async function createUser(formData: FormData) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("users").insert({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      age: formData.get("age"),
    });

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateUser(formData: FormData) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("users")
      .update({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        age: Number(formData.get("age")),
      })
      .eq("id", formData.get("id"));

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
