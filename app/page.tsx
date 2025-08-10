"use client";

import Link from "next/link";
import UserItem from "@/components/UserItem";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { createUser, updateUser } from "./actions";
// import ClientComponentWithSupabase from "@/components/ClientComponentWithSupabase";
// import ServerComponentWithSupabase from "@/components/ServerComponentWithSupabase";

// https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

type User = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  created_at?: string;
};

const initialState = {
  id: -1,
  first_name: "",
  last_name: "",
  age: 0,
};

const supabase = createClient();

export default function Home() {
  const [formValues, setFormValues] = useState<User>(initialState);
  const [users, setUsers] = useState<User[] | null>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  async function loadUsers() {
    try {
      const { data: users, error: usersError } = await supabase
        .from("users")
        .select()
        .order("id");

      if (usersError) setError(usersError);

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadUsers().catch(console.error);
  }, []);

  async function handleFormAction(formData: FormData) {
    if (formValues.id === -1) {
      // Es un nuevo usuario
      await createUser(formData);
    } else {
      // Es un usuario existente
      await updateUser(formData);
    }

    setFormValues(initialState);
    loadUsers();
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  }

  function handleEditUser(user: User) {
    setFormValues(user);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 w-full flex flex-col gap-20">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Primer CRUD a Supabase</Link>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {/* <ClientComponentWithSupabase />
          <ServerComponentWithSupabase /> */}
          {/* <Hero /> */}
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h4 className="text-3xl">Lista de usuarios</h4>
            <form
              action={handleFormAction}
              className="w-[480px] mb-12 border-2 border-white rounded-md px-4 py-6"
            >
              <label className="flex flex-col mb-3">
                Nombre(s)
                <input
                  type="text"
                  name="first_name"
                  className="bg-white rounded-sm text-black text-sm p-1 w-full"
                  required
                  maxLength={100}
                  minLength={1}
                  value={formValues.first_name}
                  onChange={handleFormChange}
                />
              </label>
              <label className="flex flex-col mb-3">
                Apellido
                <input
                  type="text"
                  name="last_name"
                  className="bg-white rounded-sm text-black text-sm p-1 w-full"
                  required
                  maxLength={200}
                  minLength={1}
                  value={formValues.last_name}
                  onChange={handleFormChange}
                />
              </label>
              <label className="flex flex-col mb-3">
                Edad
                <input
                  name="age"
                  type="number"
                  className="bg-white rounded-sm text-black text-sm p-1 w-12"
                  max={100}
                  min={1}
                  required
                  value={formValues.age}
                  onChange={handleFormChange}
                />
              </label>
              <input type="hidden" name="id" value={formValues?.id} />
              <button
                type="submit"
                className="w-24 border-white text-white border-2 text-sm h-8 rounded-sm mt-4 hover:bg-slate-900"
              >
                Guardar
              </button>
              <button
                type="reset"
                className="w-24 bg-white border-none text-black text-sm h-8 rounded-sm ml-2 hover:bg-slate-200"
                onClick={() => setFormValues(initialState)}
              >
                Limpiar
              </button>
            </form>
            {error && (
              <p className="text-red-500 text-sm">{error?.toString()}</p>
            )}
            <div>
              {users?.map((user) => (
                <UserItem
                  key={user.id}
                  {...user}
                  onRefresh={loadUsers}
                  onEdit={handleEditUser}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
