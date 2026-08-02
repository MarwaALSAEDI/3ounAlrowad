export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>تعذّر تحميل الصفحة | عيون الرواد</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.7 system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #fffbfb, #ffebeb); color: #120000; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; border: 1px solid #da4444; border-radius: 1.5rem; background: #fffbfb; box-shadow: 0 30px 80px -28px rgb(92 0 0 / .28); }
      h1 { font-size: 1.35rem; margin: 0 0 0.5rem; }
      p { color: #751717; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.7rem 1.1rem; border-radius: 0.9rem; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #5c0000; color: #fff7f7; }
      .secondary { background: #ffebeb; color: #5c0000; border-color: #da4444; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>تعذّر تحميل الصفحة</h1>
      <p>حدث خطأ مؤقت. يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">إعادة المحاولة</button>
        <a class="secondary" href="/">العودة للرئيسية</a>
      </div>
    </div>
  </body>
</html>`;
}
