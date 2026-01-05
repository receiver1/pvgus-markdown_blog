import toml from '@iarna/toml';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export interface Post {
  slug: string;
  name: string;
  description: string;
  content: string;
  date: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(contentDir, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents, {
          engines: {
            toml: toml.parse.bind(toml),
          },
        });
        return {
          slug: file.replace('.md', ''),
          name: data.name as string,
          description: data.description as string,
          date: data.date,
          content,
        };
      })
  );
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}