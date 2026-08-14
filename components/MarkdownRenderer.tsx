import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';


export default function MarkdownView({ source }: { source: string }) {
  return (
   <Markdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
    >
        {source}
    </Markdown>
  );
}