import { useParams } from 'react-router-dom';
import { getPostBySlug } from '@/blog/posts';
import BlogPostTemplate from '@/templates/blog/BlogPostTemplate';
import NotFound from '@/pages/NotFound';

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = getPostBySlug(slug || '');

    if (!post) {
        return <NotFound />;
    }

    return <BlogPostTemplate post={post} />;
}
