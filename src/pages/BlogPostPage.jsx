import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabaseClient';
import { blogPosts as localPosts } from '../data/blogPosts';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error || !data) {
                    // Fallback to local
                    const local = localPosts.find(p => p.slug === slug);
                    setPost(local || null);
                } else {
                    setPost(data);
                }
            } catch (e) {
                const local = localPosts.find(p => p.slug === slug);
                setPost(local || null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <div className="page-wrapper"><div className="container" style={{ paddingTop: '150px' }}>Carregando...</div></div>;

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>{post.title} | Cassorielo Tose Advocacia</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <Navbar />

            <main style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
                <article className="container" style={{ maxWidth: '800px' }}>
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Voltar para o Blog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.8rem', borderRadius: '20px' }}>
                                    <Tag size={14} color="var(--accent-primary)" /> {post.category}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Calendar size={16} /> {new Date(post.created_at || post.date).toLocaleDateString('pt-BR')}
                                </span>
                            </div>

                            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>{post.title}</h1>
                        </div>

                        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', marginBottom: '3rem' }}>
                            <img
                                src={post.image_url || post.image}
                                alt={post.title}
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>

                        <div
                            className="blog-content"
                            style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Gostou deste artigo?</h3>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                                Se você está passando por uma situação parecida, entre em contato para uma análise detalhada do seu caso.
                            </p>
                            <a
                                href="https://wa.me/5514996029862"
                                target="_blank"
                                className="btn-primary"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                Falar com Advogado
                            </a>
                        </div>
                    </motion.div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPostPage;
