"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  created_at?: string;
};

type UserItemProps = User & {
  onRefresh: () => void;
  setFormValues: (values: User) => void;
};

const supabase = createClient();

export default function UserItem({
  id,
  first_name: firstName,
  last_name: lastName,
  age,
  onRefresh,
  setFormValues,
}: UserItemProps) {
  const [error, setError] = useState<PostgrestError | string | null>(null);
  const [deleteLabel, setDeleteLabel] = useState("Eliminar");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDeleteUser() {
    setDeleteLabel("Eliminando...");
    setError(null);

    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        setError(error);
        console.error(error);
        return;
      }
      onRefresh();
    } catch (error) {
      setError("Ha ocurrido un error");
      console.error(error);
    }
  }

  function handleConfirmDelete() {
    setDeleteLabel("Confirmar");
    setConfirmDelete(true);
  }

  function onEdit(user: User) {
    setFormValues(user);
  }

  return (
    <div className="mb-4">
      <div className="flex flex-row">
        <p>{`${firstName} ${lastName}, `}</p>
        <p className="text-md ml-1">{`Edad ${age}`}</p>
      </div>
      {error && <p className="text-red-500 text-sm">{error.toString()}</p>}
      <button
        className="border-white text-white border-2 text-sm text-black px-4 rounded-sm hover:bg-red-500"
        onClick={confirmDelete ? handleDeleteUser : handleConfirmDelete}
      >
        {deleteLabel}
      </button>
      <button
        className="ml-2 bg-white text-sm text-black px-4 rounded-sm hover:bg-slate-200"
        onClick={() =>
          onEdit({
            id,
            first_name: firstName,
            last_name: lastName,
            age,
          })
        }
      >
        Editar
      </button>
    </div>
  );
}
