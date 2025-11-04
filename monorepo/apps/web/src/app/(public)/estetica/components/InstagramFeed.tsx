"use client";

import { useState } from "react";

export function InstagramFeed() {
  // CONFIGURE: Adicione o @ do Instagram
  const instagramHandle = "@seu_instagram_aqui";
  const instagramUrl = `https://instagram.com/${instagramHandle.replace(
    "@",
    ""
  )}`;

  // MOCK DATA: Substitua pelos posts reais do Instagram
  const mockPosts = [
    {
      id: 1,
      image: "/placeholder-instagram-1.jpg",
      likes: 234,
      comments: 12,
      caption: "Antes e depois incrível! 💫",
    },
    {
      id: 2,
      image: "/placeholder-instagram-2.jpg",
      likes: 456,
      comments: 23,
      caption: "Harmonização facial perfeita ✨",
    },
    {
      id: 3,
      image: "/placeholder-instagram-3.jpg",
      likes: 189,
      comments: 8,
      caption: "Preenchimento labial natural 💋",
    },
    {
      id: 4,
      image: "/placeholder-instagram-4.jpg",
      likes: 567,
      comments: 34,
      caption: "Resultado de botox impecável 🌟",
    },
    {
      id: 5,
      image: "/placeholder-instagram-5.jpg",
      likes: 321,
      comments: 15,
      caption: "Cliente feliz é tudo! 💖",
    },
    {
      id: 6,
      image: "/placeholder-instagram-6.jpg",
      likes: 445,
      comments: 28,
      caption: "Técnica avançada de preenchimento 💎",
    },
  ];

  return (
    <section className="instagram-section">
      <div className="instagram-header">
        <h2>Veja Nossos Resultados</h2>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-handle"
        >
          <span>📸</span> {instagramHandle}
        </a>
      </div>

      <div className="instagram-grid">
        {mockPosts.map((post) => (
          <a
            key={post.id}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-post"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                background: `linear-gradient(${
                  135 + post.id * 30
                }deg, #f8f0f5 0%, #e8e0f0 100%)`,
              }}
            >
              {["💅", "✨", "💄", "🌸", "💖", "⭐"][post.id - 1]}
            </div>
            <div className="instagram-overlay">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </a>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
        >
          <span>📱</span>
          Ver Mais no Instagram
        </a>
      </div>
    </section>
  );
}
