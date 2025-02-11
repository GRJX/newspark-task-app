import { useQueryClient } from "@tanstack/react-query";
import styles from "./app.module.scss";
import Loader from "./lib/models/components/loader/loader";
import { useAddPost, usePosts } from "./queries";

const App = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = usePosts();
  const addPost = useAddPost(queryClient);

  if (isFetching) {
    return <Loader />;
  }

  if (!data?.length) {
    return <span className={styles["no-data"]}>No data...</span>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const titleElement = form.elements.item(0) as HTMLInputElement;

    const titleValue = titleElement?.value;
    titleElement.value = "";

    addPost.mutate(titleValue);
  };

  return (
    <main className={styles.posts}>
      <h1>Posts</h1>
      {data.map((post) => (
        <article key={post.id} className={styles.post}>
          <h2>{post.title}</h2>
          <span className={styles.views}>({post.views} views)</span>
        </article>
      ))}

      {addPost.isPending && <Loader />}
      {addPost.isSuccess && <div className={styles.success}>Post added!</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" id="title" name="title" placeholder="Title" />

        <button type="submit">Add Post</button>
      </form>
    </main>
  );
};

export default App;
