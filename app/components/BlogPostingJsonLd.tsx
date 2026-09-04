import JsonLd from './JsonLd';
import {
  createBlogPostingSchema,
  type BlogPostingSchemaInput,
} from '@/lib/structured-data';

type BlogPostingJsonLdProps = BlogPostingSchemaInput & {
  scriptId?: string;
};

export default function BlogPostingJsonLd({
  scriptId = 'blog-posting-json-ld',
  ...article
}: BlogPostingJsonLdProps) {
  return (
    <JsonLd id={scriptId} data={createBlogPostingSchema(article)} />
  );
}
