import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="section-dark"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 18% 85%, rgba(23, 105, 255, 0.42), transparent 38%), #05070b',
      }}
    >
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <span className="eyebrow light">
          <i /> ERRO 404
        </span>

        <h1
          style={{
            maxWidth: '900px',
            margin: '34px 0 30px',
            fontSize: 'clamp(56px, 9vw, 126px)',
            fontWeight: 500,
            lineHeight: 0.9,
          }}
        >
          Esta página saiu do <em>radar.</em>
        </h1>

        <p
          style={{
            maxWidth: '580px',
            margin: '0 0 38px',
            color: '#b6bece',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            lineHeight: 1.7,
          }}
        >
          O endereço que você tentou acessar não existe ou foi movido. A sua
          próxima grande presença digital continua a um clique de distância.
        </p>

        <Link href="/" className="button button-light">
          Voltar ao Início <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
