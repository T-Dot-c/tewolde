import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

/* ─── Post data ───────────────────────────────────────────── */
interface Post {
  slug: string;
  title: string;
  tag: string;
  date: string;
  summary: string;
  body: string;
}

const POSTS: Post[] = [
  {
    slug: "tailwind-v4-colors",
    title: "Why your custom Tailwind v4 colors do not show up",
    tag: "React",
    date: "2026-09-20",
    summary:
      "You wrote bg-cream, but the page stays plain. In Tailwind v4 the color has to be declared first.",
    body: `<p>In Tailwind CSS v4, a class like <code>bg-cream</code> only works if a color called <code>cream</code> exists. Tailwind no longer reads a <code>tailwind.config.js</code> file by default. It reads your CSS.</p>
<h3>The fix</h3><p>Declare each color inside an <code>@theme</code> block in your main CSS file:</p>
<pre><code>@import "tailwindcss";

@theme {
  --color-cream: #f5f5f7;
  --color-ink: #050507;
}</code></pre>
<p>The name after <code>--color-</code> becomes the class name, so <code>--color-cream</code> gives you <code>bg-cream</code>, <code>text-cream</code> and <code>border-cream</code>.</p>
<h3>How to check</h3><ul><li>Restart the dev server after editing the CSS.</li><li>Search your built CSS file for the class name. If it is missing, the color is not declared.</li></ul>`,
  },
  {
    slug: "contact-form-no-backend",
    title: "A contact form that works without a backend",
    tag: "Web apps",
    date: "2026-09-12",
    summary: "Two simple ways to get messages from a static site into your inbox.",
    body: `<p>A portfolio site usually has no server. You still want a form that works. There are two easy options.</p>
<h3>Option 1: open the visitor's email app</h3><p>Build a <code>mailto:</code> link from the form values. It needs no account, but the visitor must press send in their email app.</p>
<pre><code>const url = "mailto:you@example.com" +
  "?subject=" + encodeURIComponent(subject) +
  "&amp;body=" + encodeURIComponent(message);
location.href = url;</code></pre>
<h3>Option 2: a form service</h3><p>Services like Formspree or Resend receive the form and email it to you, so the visitor never leaves your page. You need an account and one endpoint URL.</p>
<h3>Which to choose</h3><p>Use <code>mailto:</code> while you are starting out. Switch to a service when you want messages saved and delivered without the visitor's email app.</p>`,
  },
  {
    slug: "launch-checklist",
    title: "Five checks before you launch a website",
    tag: "Websites",
    date: "2026-09-03",
    summary: "A short list that catches most of the problems clients find first.",
    body: `<p>Before I hand over a site, I go through the same five checks.</p>
<ul><li><b>Phone first.</b> Open every page on a real phone. Buttons should be easy to tap and text easy to read.</li><li><b>Every link.</b> Click each one. Remove or fix any that lead nowhere.</li><li><b>Contact path.</b> Send yourself a message through the form and confirm it arrives.</li><li><b>Speed.</b> Resize large photos. A page that loads slowly loses visitors.</li><li><b>Real details.</b> Check names, phone numbers, emails and addresses against the source.</li></ul>
<p>It takes about an hour, and it is the hour that saves the most embarrassment.</p>`,
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */
const readMins = (p: Post) =>
  Math.max(1, Math.round(p.body.replace(/<[^>]+>/g, " ").split(/\s+/).length / 200));

const fmtDate = (d: string) =>
  new Date(d + "T00:00").toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ─── Article view ────────────────────────────────────────── */
function Article({ post, onBack, onNext }: { post: Post; onBack: () => void; onNext: (p: Post) => void }) {
  const idx = POSTS.indexOf(post);
  const next = POSTS[idx + 1] ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  return (
    <div className="blog-article">
      <button className="blog-back-btn" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </button>
      <article>
        <h1 className="blog-article-title">{post.title}</h1>
        <div className="blog-meta">
          <span className="blog-tag">{post.tag}</span>
          <span>{fmtDate(post.date)}</span>
          <span>{readMins(post)} min read</span>
        </div>
        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        {next && (
          <div className="blog-next">
            <span className="blog-next-label">Next post</span>
            <button className="blog-next-btn" onClick={() => onNext(next)}>
              {next.title}
            </button>
          </div>
        )}
      </article>
    </div>
  );
}

/* ─── List view ───────────────────────────────────────────── */
function PostList({ onSelect }: { onSelect: (p: Post) => void }) {
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");

  const allTags = ["All", ...Array.from(new Set(POSTS.map((p) => p.tag)))];

  const visible = POSTS.filter(
    (p) =>
      (activeTag === "All" || p.tag === activeTag) &&
      (p.title + p.summary).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="blog-list">
      <h1 className="blog-heading">Notes from the build.</h1>
      <p className="blog-lead">
        Short posts on what I learn while building websites and web apps.
      </p>

      <div className="blog-tools">
        <input
          type="search"
          className="blog-search"
          placeholder="Search posts"
          aria-label="Search posts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="blog-tags" role="group" aria-label="Filter by topic">
          {allTags.map((t) => (
            <button
              key={t}
              className={`blog-tag-btn${activeTag === t ? " active" : ""}`}
              aria-pressed={activeTag === t}
              onClick={() => setActiveTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-posts">
        {visible.length === 0 ? (
          <p className="blog-none">
            No posts match. Clear the search or pick another topic.
          </p>
        ) : (
          visible.map((p) => (
            <button
              key={p.slug}
              className="blog-post-row"
              onClick={() => onSelect(p)}
            >
              <h2 className="blog-post-title">{p.title}</h2>
              <p className="blog-post-summary">{p.summary}</p>
              <div className="blog-meta">
                <span className="blog-tag">{p.tag}</span>
                <span>{fmtDate(p.date)}</span>
                <span>{readMins(p)} min read</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Root Blog page ──────────────────────────────────────── */
export default function Blog() {
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <div className="blog-page">
      {selected ? (
        <Article
          post={selected}
          onBack={() => setSelected(null)}
          onNext={(p) => setSelected(p)}
        />
      ) : (
        <PostList onSelect={setSelected} />
      )}
    </div>
  );
}
