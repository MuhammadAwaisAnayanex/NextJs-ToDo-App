// app/posts/[id]/page.js
import { getPost } from '../../lib/posts'; // Adjust path if needed
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }) {
  const post = getPost(params.id);

  if (!post) {
    notFound(); // Show 404 if post not found
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
