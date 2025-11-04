import { NextResponse } from "next/server";

/**
 * API Route para buscar posts do Instagram
 *
 * Esta rota busca os posts mais recentes do Instagram usando a Basic Display API
 *
 * Configuração:
 * 1. Adicione as variáveis de ambiente no arquivo .env.local:
 *    - INSTAGRAM_ACCESS_TOKEN
 *    - INSTAGRAM_USER_ID
 *
 * 2. Siga o guia completo em: /apps/web/src/app/(public)/estetica/INSTAGRAM_SETUP.md
 */

// Cache simples em memória (expira após 1 hora)
let cachedPosts: any = null;
let lastFetch = 0;
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

export async function GET() {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
      return NextResponse.json(
        {
          error: "Instagram API não configurada",
          message:
            "Adicione INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID no arquivo .env.local",
          docs: "/estetica/INSTAGRAM_SETUP.md",
        },
        { status: 500 }
      );
    }

    // Verificar cache
    const now = Date.now();
    if (cachedPosts && now - lastFetch < CACHE_DURATION) {
      return NextResponse.json({
        data: cachedPosts,
        cached: true,
        timestamp: lastFetch,
      });
    }

    // Buscar posts do Instagram
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,media_type,timestamp,thumbnail_url&access_token=${accessToken}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Instagram API Error:", errorData);

      return NextResponse.json(
        {
          error: "Erro ao buscar posts do Instagram",
          details: errorData,
          message: "Verifique se o Access Token está válido e não expirou",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Atualizar cache
    cachedPosts = data.data;
    lastFetch = now;

    return NextResponse.json({
      data: data.data,
      cached: false,
      timestamp: now,
    });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);

    return NextResponse.json(
      {
        error: "Erro interno ao buscar posts",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

// Endpoint para limpar o cache manualmente (útil para desenvolvimento)
export async function DELETE() {
  cachedPosts = null;
  lastFetch = 0;

  return NextResponse.json({
    message: "Cache limpo com sucesso",
  });
}
