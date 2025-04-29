// lib/posts.js

export const posts = [
    { id: '1', title: 'First Post', content: 'This is the content of the first post.' },
    { id: '2', title: 'Second Post', content: 'This is the content of the second post.' },
    { id: '3', title: 'Third Post', content: 'This is the content of the third post.' },
  ];
  
  // Function to fetch a single post
  export function getPost(id) {
    return posts.find((post) => post.id === id);
  }
  
  // Function to get all post IDs
  export function getAllPostIds() {
    return posts.map((post) => ({ id: post.id }));
  }
  