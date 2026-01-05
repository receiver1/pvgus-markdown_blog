"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Parse markdown content to extract headings
    // This regex matches headings that are not inside code blocks
    const headingRegex = /^(#{1,2})\s+([\w\sа-яА-ЯёЁ-]+)$/;
    const newHeadings: Heading[] = [];

    // Split content by lines and process only lines that are not in code blocks
    const lines = content.split('\n');
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if we're entering or exiting a code block
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      // Skip processing if we're in a code block
      if (inCodeBlock) {
        continue;
      }

      // Check if this line is a heading
      const match = line.match(headingRegex);
      if (match) {
        console.log(match)
        const level = match[1].length;
        const text = match[2].trim();

        // Create anchor ID from heading text (same logic as in markdown-renderer)
        const anchorId = text
          .toLowerCase()
          .replace(/[^a-z0-9а-яё]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');

        console.log(anchorId)

        newHeadings.push({
          id: anchorId,
          text,
          level
        });
      }
    }

    console.log(newHeadings)

    setHeadings(newHeadings);
  }, [content]);

  useEffect(() => {
    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0.1
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-0 h-[100vh] hidden xl:block w-64 ml-8 self-start">
      <div className="bg-background border-l p-4 h-full">
        <h3 className="font-semibold mb-4 text-sm">Содержание</h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`pl-${heading.level === 1 ? '2' : '4'} ${
                activeId === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              <Link
                href={`#${heading.id}`}
                className="hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(heading.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${heading.id}`);
                  }
                }}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}