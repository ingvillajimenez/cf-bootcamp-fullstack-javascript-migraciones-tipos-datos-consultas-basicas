import { createClient } from "@/lib/supabase/server";

const ServerComponentWithSupabase = async () => {
  const supabase = await createClient();
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select();
  console.log(users, usersError);

  return (
    <div>
      <h1>Server Component With Supabase</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default ServerComponentWithSupabase;
