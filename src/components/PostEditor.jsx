import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Save, X } from 'lucide-react';

const PostEditor = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        image_url: post?.image_url || '',
        category: post?.category || 'Trabalhista'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Auto-generate slug from title if slug is empty
            slug: name === 'title' && !prev.slug ? value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : prev.slug
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (post?.id) {
                // Update
                const { error } = await supabase
                    .from('posts')
                    .update(formData)
                    .eq('id', post.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from('posts')
                    .insert([formData]);
                if (error) throw error;
            }
            onSave();
        } catch (error) {
            alert('Erro ao salvar: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2>{post ? 'Editar Artigo' : 'Novo Artigo'}</h2>
                <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    />
                </div>

                <div className="form-group">
                    <label>Slug (URL amigável)</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    />
                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    >
                        <option value="Trabalhista">Trabalhista</option>
                        <option value="Previdenciário">Previdenciário</option>
                        <option value="Família">Família</option>
                        <option value="Dicas">Dicas</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Link da Imagem (URL)</label>
                    <input
                        type="url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    />
                </div>

                <div className="form-group">
                    <label>Resumo (Excerpt)</label>
                    <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        rows="3"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                    />
                </div>

                <div className="form-group">
                    <label>Conteúdo (HTML permitido)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="15"
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', fontFamily: 'monospace' }}
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Dica: Use tags HTML como &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt; para formatar.
                    </p>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Save size={18} /> {loading ? 'Salvando...' : 'Salvar Artigo'}
                </button>
            </form>
        </div>
    );
};

export default PostEditor;
