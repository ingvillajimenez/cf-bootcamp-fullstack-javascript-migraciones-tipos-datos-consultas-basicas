"use client";

import { useState } from "react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  created_at?: string;
};

type UserItemProps = User & {
  setFormValues: (values: User) => void;
};

export default function UserItem({
  id,
  first_name: firstName,
  last_name: lastName,
  age,
  setFormValues,
}: UserItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [deleteLabel, setDeleteLabel] = useState("Eliminar");
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDeleteUser() {
    alert("Usuario eliminado");
    setDeleteLabel("Eliminar");
    setConfirmDelete(false);
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
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
