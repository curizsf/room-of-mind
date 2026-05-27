import { LoadingSequence } from "@/components/LoadingSequence";

type LoadingPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function LoadingPage({ searchParams }: LoadingPageProps) {
  const params = await searchParams;

  return <LoadingSequence initialLanguage={params?.lang} />;
}
