import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabaseClient';
import { blogPosts as localPosts } from '../data/blogPosts';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    // Fallback to local data if DB is empty or error
                    setPosts(localPosts);
                } else {
                    setPosts(data);
                }
            } catch (e) {
                setPosts(localPosts);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />

            <main style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h1 className="section-title">Blog Jurídico</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Informação clara e direta sobre seus direitos. Entenda a lei sem juridiquês.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div style={{ textAlign: 'center' }}>Carregando...</div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {posts.map((post) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -5 }}
                                    className="glass-panel"
                                    style={{
                                        padding: '0',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}
                                >
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img
                                            src={post.image_url || post.image}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <Tag size={14} color="var(--accent-primary)" /> {post.category}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                <Calendar size={14} /> {new Date(post.created_at || post.date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>

                                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                                            <Link to={`/blog/${post.slug}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--accent-primary)',
                                                fontWeight: '600',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Ler Artigo <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;
