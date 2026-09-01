import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/app/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Política de Privacidade e Termos de Uso',
  description:
    'Consulte a Política de Privacidade, Proteção de Dados, Cookies e os Termos de Uso da Alvenn.ai.',
  alternates: {
    canonical: 'https://alvenn.ai/politica-de-privacidade',
  },
};

const sectionStyle = {
  marginTop: '52px',
} as const;

const headingStyle = {
  margin: '0 0 18px',
  color: '#f8f9fc',
  fontSize: 'clamp(24px, 3vw, 34px)',
  fontWeight: 500,
  lineHeight: 1.2,
} as const;

const subheadingStyle = {
  margin: '34px 0 14px',
  color: '#f8f9fc',
  fontSize: 'clamp(18px, 2vw, 23px)',
  fontWeight: 500,
  lineHeight: 1.3,
} as const;

const paragraphStyle = {
  margin: '0 0 16px',
  color: '#b6bece',
  fontSize: '14px',
  lineHeight: 1.85,
} as const;

const listStyle = {
  margin: '22px 0 0',
  paddingLeft: '22px',
  color: '#b6bece',
  fontSize: '14px',
  lineHeight: 1.85,
} as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="island">
        <Link href="/" className="brand" aria-label="Alvenn.ai — início">
          <Image
            src="/alvenn-logo.png"
            width={34}
            height={34}
            alt=""
            priority
          />
          <span>alvenn.ai</span>
        </Link>

        <Link className="nav-cta" href="/">
          Voltar ao início <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <main
        className="section-dark"
        style={{
          minHeight: '100svh',
          padding: '150px 0 120px',
          background:
            'radial-gradient(circle at 15% 12%, rgba(23, 105, 255, 0.24), transparent 34%), radial-gradient(circle at 88% 62%, rgba(96, 51, 255, 0.17), transparent 34%), #05070b',
        }}
      >
        <article className="wrap" style={{ maxWidth: '900px' }}>
          <span className="eyebrow light">
            <i /> PRIVACIDADE, LGPD E TERMOS
          </span>

          <h1
            style={{
              margin: '34px 0 28px',
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 500,
              lineHeight: 0.96,
            }}
          >
            Privacidade e <em>Termos de Uso.</em>
          </h1>

          <p
            style={{
              ...paragraphStyle,
              maxWidth: '720px',
              fontSize: '16px',
            }}
          >
            Esta página reúne a Política de Privacidade, Proteção de Dados,
            Cookies e os Termos de Uso da Alvenn.ai.
          </p>

          <p style={{ ...paragraphStyle, color: '#737b8c', fontSize: '11px' }}>
            Última atualização: 31 de agosto de 2026.
          </p>

          <section style={sectionStyle}>
            <h2 style={headingStyle}>1. Política de Privacidade e Cookies</h2>

            <h3 style={subheadingStyle}>1.1. Informações gerais</h3>
            <p style={paragraphStyle}>
              A Alvenn.ai está comprometida com a privacidade, a segurança e a
              proteção dos dados pessoais tratados em suas atividades. Esta
              política explica como coletamos, utilizamos, armazenamos e
              protegemos informações pessoais, em conformidade com a Lei Geral
              de Proteção de Dados Pessoais — LGPD (Lei nº 13.709/2018).
            </p>

            <h3 style={subheadingStyle}>1.2. Dados coletados e finalidade</h3>
            <p style={paragraphStyle}>
              Coletamos somente os dados necessários para responder às
              solicitações enviadas pelo formulário de contato e conduzir o
              relacionamento comercial:
            </p>
            <ul style={listStyle}>
              <li>
                <strong style={{ color: '#f8f9fc' }}>Nome:</strong> para
                identificação e atendimento personalizado.
              </li>
              <li>
                <strong style={{ color: '#f8f9fc' }}>E-mail:</strong> para
                responder à solicitação, manter contato e enviar propostas.
              </li>
              <li>
                <strong style={{ color: '#f8f9fc' }}>WhatsApp:</strong> para
                contato comercial direto relacionado ao projeto solicitado.
              </li>
              <li>
                <strong style={{ color: '#f8f9fc' }}>Mensagem:</strong> para
                compreender o contexto, as necessidades e o escopo do projeto.
              </li>
            </ul>

            <h3 style={subheadingStyle}>1.3. Base e forma de tratamento</h3>
            <p style={paragraphStyle}>
              O envio do formulário ocorre mediante ação livre e afirmativa do
              titular, que declara concordar com o tratamento dos dados para a
              finalidade de contato comercial informada. Os dados não serão
              utilizados para finalidades incompatíveis sem informação e base
              legal adequadas.
            </p>

            <h3 style={subheadingStyle}>1.4. Armazenamento e segurança</h3>
            <p style={paragraphStyle}>
              Os dados do formulário são armazenados em infraestrutura segura
              de nuvem, com uso do Firebase, serviço do Google Cloud. A
              Alvenn.ai adota medidas técnicas e administrativas razoáveis,
              como criptografia em trânsito e controles de acesso, para reduzir
              riscos de acesso não autorizado, perda, alteração ou divulgação
              indevida.
            </p>

            <h3 style={subheadingStyle}>1.5. Compartilhamento e retenção</h3>
            <p style={paragraphStyle}>
              A Alvenn.ai não comercializa dados pessoais e não os compartilha
              com terceiros para fins publicitários. Os dados poderão ser
              processados por provedores de infraestrutura, hospedagem e
              ferramentas operacionais estritamente necessários à prestação do
              serviço, observadas medidas de segurança e confidencialidade.
              Serão mantidos pelo período necessário ao atendimento da
              solicitação, à gestão da relação comercial e ao cumprimento de
              obrigações legais ou regulatórias aplicáveis.
            </p>

            <h3 style={subheadingStyle}>1.6. Cookies e tecnologias similares</h3>
            <p style={paragraphStyle}>
              O site poderá utilizar cookies e tecnologias similares nas
              seguintes categorias:
            </p>
            <ul style={listStyle}>
              <li>
                <strong style={{ color: '#f8f9fc' }}>
                  Cookies essenciais:
                </strong>{' '}
                necessários ao funcionamento, à segurança e à navegação do
                site e de seus componentes visuais.
              </li>
              <li>
                <strong style={{ color: '#f8f9fc' }}>
                  Cookies analíticos:
                </strong>{' '}
                utilizados, quando habilitados, para mensurar o tráfego e
                compreender o uso do site de forma agregada, inclusive por meio
                do Google Analytics.
              </li>
            </ul>

            <h3 style={subheadingStyle}>1.7. Direitos do titular</h3>
            <p style={paragraphStyle}>
              O titular pode solicitar, conforme aplicável, confirmação da
              existência de tratamento, acesso aos dados, correção de
              informações incompletas ou desatualizadas, informação sobre
              compartilhamento, portabilidade, anonimização, bloqueio ou
              eliminação, além da revogação do consentimento e demais direitos
              previstos na LGPD.
            </p>
            <p style={paragraphStyle}>
              As solicitações devem ser enviadas para{' '}
              <a
                href="mailto:contato@alvenn.ai"
                style={{
                  color: '#78aeff',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                contato@alvenn.ai
              </a>
              . Poderemos solicitar informações adicionais para confirmar a
              identidade do requerente e proteger os dados contra acesso
              indevido.
            </p>
          </section>

          <section style={{ ...sectionStyle, marginTop: '84px' }}>
            <h2 style={headingStyle}>2. Termos de Uso</h2>

            <h3 style={subheadingStyle}>2.1. Aceitação e escopo do serviço</h3>
            <p style={paragraphStyle}>
              Ao acessar este site, solicitar uma proposta ou contratar um
              serviço da Alvenn.ai, o usuário declara ter lido e compreendido
              estes Termos de Uso. A Alvenn.ai oferece licença de uso de landing
              pages e experiências digitais por assinatura. Conforme o plano
              ou a proposta contratada, o serviço poderá incluir criação,
              hospedagem, manutenção, suporte técnico, publicação,
              monitoramento e relatórios de desempenho.
            </p>
            <p style={paragraphStyle}>
              A licença permanece válida durante a vigência da assinatura. Os
              valores, prazos, entregas, condições de pagamento, renovação e
              cancelamento serão definidos na proposta ou no contrato
              correspondente.
            </p>

            <h3 style={subheadingStyle}>2.2. Propriedade intelectual</h3>
            <p style={paragraphStyle}>
              Os direitos autorais sobre a marca Alvenn.ai, o design, a
              estrutura, os componentes, o código, os sistemas visuais e as
              soluções desenvolvidas pela Alvenn.ai permanecem pertencentes à
              Alvenn.ai, salvo disposição expressa em contrato escrito. A
              licença de uso não implica transferência automática desses
              direitos.
            </p>
            <p style={paragraphStyle}>
              O cliente preserva os direitos sobre sua marca, logotipos, textos,
              imagens e demais materiais próprios fornecidos para o projeto. A
              reprodução, revenda, sublicença ou distribuição da solução
              desenvolvida depende de autorização prévia e expressa da
              Alvenn.ai.
            </p>

            <h3 style={subheadingStyle}>2.3. Suporte técnico e modificações</h3>
            <p style={paragraphStyle}>
              O suporte abrange a correção de falhas técnicas, a manutenção dos
              recursos previstos no plano contratado e o atendimento pelos
              canais informados pela Alvenn.ai. Prazos e horários de atendimento
              poderão variar de acordo com o plano ou a proposta comercial.
            </p>
            <p style={paragraphStyle}>
              Solicitações de ajustes de conteúdo, layout, integrações ou novas
              funcionalidades serão avaliadas quanto à viabilidade, ao prazo e
              ao impacto no escopo. Demandas que ultrapassem o plano contratado
              poderão ser objeto de orçamento adicional.
            </p>

            <h3 style={subheadingStyle}>2.4. Responsabilidades do cliente</h3>
            <p style={paragraphStyle}>
              O cliente é responsável pela exatidão, pela legalidade e pelos
              direitos de uso dos materiais e informações que fornecer, bem
              como pela aprovação dos conteúdos antes da publicação. Também
              deverá manter atualizados os dados necessários à prestação do
              serviço e utilizar a solução de forma lícita.
            </p>

            <h3 style={subheadingStyle}>2.5. Disponibilidade e terceiros</h3>
            <p style={paragraphStyle}>
              A operação pode depender de provedores de hospedagem,
              infraestrutura, domínios, integrações e serviços de terceiros.
              Embora sejam adotadas medidas razoáveis de disponibilidade e
              recuperação, poderão ocorrer interrupções temporárias por
              manutenção, atualização, falha de terceiros, caso fortuito ou
              força maior.
            </p>

            <h3 style={subheadingStyle}>2.6. Atualizações e contato</h3>
            <p style={paragraphStyle}>
              Esta página poderá ser atualizada para refletir alterações
              legais, regulatórias, técnicas, operacionais ou comerciais. A
              versão vigente estará disponível nesta rota com a respectiva data
              de atualização. Dúvidas podem ser enviadas para{' '}
              <a
                href="mailto:contato@alvenn.ai"
                style={{
                  color: '#78aeff',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                }}
              >
                contato@alvenn.ai
              </a>
              .
            </p>
          </section>

          <div style={{ marginTop: '64px' }}>
            <Link href="/" className="button button-light">
              Voltar ao Início <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
