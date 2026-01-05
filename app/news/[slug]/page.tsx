import { MarkdownRenderer } from '@/components/markdown-renderer';
import { TableOfContents } from '@/components/table-of-contents';
import { getAllPosts } from '@/lib/posts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  if (!post) {
    notFound();
  }

  const newerPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const olderPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  
  return (
    <div className="container border-l border-r mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="p-5 md:p-10 flex-1 min-w-0">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-2">{post.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
            <div className="mt-8">
              <MarkdownRenderer content={post.content} />
            </div>
            {post.date && <small className="text-muted-foreground">Дата публикации статьи: {new Date(post.date).toLocaleDateString()}</small>}
          </article>
        </main>

        <TableOfContents content={post.content} />
      </div>

      <div className="grid border-t grid-cols-1 md:grid-cols-2 p-5">
        {newerPost ? (
          <Link
            href={`/news/${newerPost.slug}`}
            className="border-r group p-4 transition-colors text-left flex items-center gap-4"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            <div>
              <div className="text-sm text-muted-foreground mb-1">Предыдущая новость</div>
              <div className="font-medium text-primary group-hover:text-primary/80 transition-colors line-clamp-1">
                {newerPost.name}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {olderPost ? (
          <Link
            href={`/news/${olderPost.slug}`}
            className="border-l group p-4 transition-colors text-right flex items-center justify-end gap-4"
          >
            <div>
              <div className="text-sm text-muted-foreground mb-1">Следующая новость</div>
              <div className="font-medium text-primary group-hover:text-primary/80 transition-colors line-clamp-1">
                {olderPost.name}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}