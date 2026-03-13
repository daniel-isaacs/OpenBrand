import { UrlForm } from "@/components/url-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            OpenBrand
          </h1>
          <p className="text-neutral-500">
            Enter a website to extract its brand assets — logos, colors, and
            images.
          </p>
        </div>
        <UrlForm />
      </main>
    </div>
  );
}
