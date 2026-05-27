import { Hero } from "@/components/Hero";

type HomeProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return <Hero initialLanguage={params?.lang} />;
}
