import { compileMDX } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';

export async function renderMarkdown(source: string) {
  return compileMDX({
    source,
    options: { mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }]],
    } },
  });
}
