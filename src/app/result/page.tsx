import { ResultLoader } from "@/components/ResultLoader";

type ResultPageProps = {
  searchParams?: Promise<{
    text?: string;
    lang?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  return (
    <ResultLoader
      initialText={params?.text}
      initialLanguage={params?.lang}
    />
  );
}
