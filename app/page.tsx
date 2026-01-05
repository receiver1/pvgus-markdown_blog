import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container border-l border-r mx-auto md:min-h-[94.482vh]">
      <div className="p-5 md:p-10">
        <h1 className="text-3xl font-bold mb-2">Новости</h1>
        <p className="text-muted-foreground">Последние новости и обновления</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] py-[1px] bg-border">
        {posts.map((post) => (
          <Link key={post.slug} href={`/news/${post.slug}`} className="block">
            <div className="p-5 bg-background flex flex-col h-full cursor-pointer group">
              <h1 className="mb-4 text-lg group-hover:text-primary/80 transition-colors">{post.name}</h1>
              <p className="mb-4">{post.description}</p>
              <small className="mt-auto text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Нажмите, чтобы прочитать полностью
              </small>
            </div>
          </Link>
        ))}
        <div className="bg-background pointer-events-none overflow-hidden pattern-lines"></div>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Пока нет новостей</p>
        </div>
      )}
    </div>
  );
}
