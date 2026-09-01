const WHATSAPP_URL = 'https://wa.me/5521991182709';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp"
      aria-label="Atendimento via WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span aria-hidden="true">◔</span>
      <b>WhatsApp</b>
    </a>
  );
}
