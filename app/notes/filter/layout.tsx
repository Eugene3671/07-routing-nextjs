import css from "./NotesLayout.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <main className={css.main}>
      <section className={css.container}>
        <aside className={css.sidebar}>{sidebar}</aside>

        <div className={css.notesWrapper}>{children}</div>
      </section>
    </main>
  );
};

export default NotesLayout;
