import Image from 'next/image';
import Link from 'next/link';
import FloatingWhatsApp from './FloatingWhatsApp';

const INSTAGRAM_URL = 'https://www.instagram.com/alvenn.ai/';
const WHATSAPP_URL = 'https://wa.me/5521991182709';
const CONTACT_EMAIL = 'contato@alvenn.ai';

export default function SiteFooter() {
  return (
    <>
      <footer>
        <div className="wrap footer-top">
          <div>
            <Link href="/" className="footer-brand" aria-label="Alvenn.ai — início">
              <Image
                src="/alvenn-logo.png"
                width={48}
                height={48}
                alt="Logo da Alvenn"
              />
              <span>alvenn.ai</span>
            </Link>

            <p>
              Sites que unem design,
              <br />
              estratégia e experiência.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <small>CONTATO</small>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                @alvenn.ai
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                (21) 99118-2709
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>

            <div>
              <small>LEGAL</small>
              <Link href="/politica-de-privacidade">
                Política de Privacidade
              </Link>
              <Link href="/politica-de-privacidade">Termos de Uso</Link>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <span>© 2026 Alvenn. Todos os direitos reservados.</span>
          <span>CNPJ: 68.312.868/0001-60</span>
          <span>Feito com intenção no Brasil.</span>
        </div>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
