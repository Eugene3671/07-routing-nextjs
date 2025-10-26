"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Modal } from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => router.back();

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>Loading...</div>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <div className={css.container}>Note not found 😕</div>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
          </div>

          <div className={css.content}>{note.content}</div>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>

          <button onClick={handleClose} className={css.backBtn}>
            ← Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
