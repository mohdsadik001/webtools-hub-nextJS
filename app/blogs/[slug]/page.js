import { posts } from "../data/posts";

// Generate static paths for all posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <main>

    <article className="px-4 md:px-25 mt-2 md:m-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.date} • {post.author}
      </p>
      <p className="text-lg leading-relaxed">{post.content}</p>
    </article>
    {/* <aside className="w-1/4">
        <h2 className="text-xl font-bold mb-4">Trending</h2>
        <ul className="space-y-3 border p-4 rounded-lg">
          {trendingPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside> */}
    </main>
  );
}
