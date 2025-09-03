"use client";

import { posts } from "./data/posts";
import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  let trendingPosts = posts.filter((p) => p.trending === true);

  return (
    <main className="flex flex-col lg:flex-row m-2 md:m-6 lg:m-10 px-2 sm:px-4 lg:px-12 gap-6 lg:gap-10">
      {/* Main Blog Section */}
      <div className="lg:w-3/4 w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Blogs</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 sm:px-4 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col sm:flex-row gap-4 bg-white"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-1/3 lg:w-1/4">
                <Link href={`/blogs/${post.slug}`}>
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-lg object-cover w-full h-44 sm:h-32 lg:h-40"
                  />
                </Link>
              </div>

              {/* Blog Info */}
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  <Link href={`/blogs/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  {post.date} • {post.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Trending</h2>
        <ul className="space-y-4 border p-4 rounded-lg bg-gray-50">
          {trendingPosts.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <Link href={`/blogs/${post.slug}`}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                />
              </Link>

              <Link
                href={`/blogs/${post.slug}`}
                className="text-blue-600 hover:underline text-sm sm:text-base"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
