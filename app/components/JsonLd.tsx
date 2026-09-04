type JsonLdData =
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

type JsonLdProps = {
  id: string;
  data: JsonLdData;
};

export default function JsonLd({
  id,
  data,
}: JsonLdProps) {
  const json = JSON.stringify(data).replace(
    /</g,
    '\\u003c',
  );

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json,
      }}
    />
  );
}
