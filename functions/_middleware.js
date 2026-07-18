// Cloudflare Pages Function
// *.pages.dev へのアクセスを、本番ドメイン zukailab.com へ 301 リダイレクトする。
// 置き場所：リポジトリ直下の functions/_middleware.js
// （.com へのアクセスはそのまま通すので、リダイレクトループにはならない）

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // プレビュー用の *.pages.dev で来たリクエストだけを本番へ飛ばす
  if (url.hostname.endsWith(".pages.dev")) {
    url.protocol = "https:";
    url.hostname = "zukailab.com";
    // パス・クエリはそのまま維持して 301（恒久リダイレクト）
    return Response.redirect(url.toString(), 301);
  }

  // それ以外（zukailab.com など）は通常どおり配信
  return context.next();
}
