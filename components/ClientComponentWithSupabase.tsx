"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const ClientComponentWithSupabase = () => {
  useEffect(() => {
    async function loadUsers() {
      try {
        const supabase = createClient();
        const { data: users, error: usersError } = await supabase
          .from("users")
          .select();
        console.log(users, usersError);
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers().catch(console.error);
  }, []);

  return (
    <div>
      <h1>First Component With Supabase</h1>
    </div>
  );
};

export default ClientComponentWithSupabase;
