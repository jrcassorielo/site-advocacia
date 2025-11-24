import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { motion } from 'framer-motion';
import { Plus, Trash2, LogOut, Edit } from 'lucide-react';
import PostEditor from '../components/PostEditor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPage = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    // Auth State
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (session) fetchPosts();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchPosts();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert('Erro ao entrar: ' + error.message);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este artigo?')) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) alert('Erro ao excluir: ' + error.message);
        else fetchPosts();
    };

    const handleEdit = (post) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentPost(null);
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);
        fetchPosts();
    };

    if (loading) return <div className="page-wrapper"><div className="container" style={{ paddingTop: '150px' }}>Carregando...</div></div>;

    if (!session) {
        return (
            <div className="page-wrapper">
                <Navbar />
                <div className="container" style={{ paddingTop: '150px', paddingBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <div className="glass-panel" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Área Administrativa</h2>
                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input type="email" name="email" placeholder="Email" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                            <input type="password" name="password" placeholder="Senha" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }} />
                            <button type="submit" className="btn-primary">Entrar</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Gerenciar Blog</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleCreate} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={18} /> Novo Artigo
                        </button>
                        <button onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={18} /> Sair
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <PostEditor post={currentPost} onSave={handleSave} onCancel={() => setIsEditing(false)} />
                ) : (
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Título</th>
                                    <th style={{ padding: '1rem' }}>Categoria</th>
                                    <th style={{ padding: '1rem' }}>Data</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <tr key={post.id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>{post.title}</td>
                                        <td style={{ padding: '1rem' }}>{post.category}</td>
                                        <td style={{ padding: '1rem' }}>{new Date(post.created_at).toLocaleDateString('pt-BR')}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button onClick={() => handleEdit(post)} style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', marginRight: '1rem' }}>
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                            Nenhum artigo encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminPage;
