import { redirect } from "next/navigation";
import { UrlForm } from "@/components/url-form";
import { createClient } from "@/lib/supabase/server";
import { GetStartedTabs } from "@/components/get-started-tabs";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const { url } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10 flex items-start justify-between">
          <div>
            <a href="/" className="flex items-center gap-3 mb-2 no-underline">
              <img src="/logo.svg" alt="OpenBrand logo" width={32} height={34} />
              <h1 className="text-3xl font-bold text-neutral-900">
                OpenBrand
              </h1>
            </a>
            <p className="text-neutral-500">
              Enter a website to extract its brand assets - logos, colors, and
              images.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://github.com/ethanjyx/openbrand"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="GitHub stars"
                src="https://img.shields.io/github/stars/ethanjyx/openbrand?style=social"
              />
            </a>
          </div>
        </div>
        <UrlForm initialUrl={url} />

        <GetStartedTabs />
      </main>
      <footer className="max-w-4xl mx-auto px-6 pb-10 text-center text-sm text-neutral-400">
        OpenBrand is designed, built, and backed by{" "}
        <a
          href="http://tight.software/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-600 transition-colors"
        >
          Tight Software LLC
        </a>
        .
      </footer>
    </div>
  );
}
