import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { fetchNotes } from "@/lib/api";

export default async function SidebarNotes() {
  const notesData = await fetchNotes("", 1);

  const tags = Array.from(
    new Set(notesData.notes.map(note => note.tag).filter(Boolean))
  );

  return (
    <ul className={css.menuList}>
      {/* Всі нотатки */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>

      {/* Унікальні теги */}
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}