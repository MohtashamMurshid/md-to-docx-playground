import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { convertMarkdownToDocx, downloadDocx } from "@mohtasham/md-to-docx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DEFAULT_MD = `# Markdown → DOCX

Type or paste Markdown on the left. Click Convert to save a .docx.

- Monotone UI using Tailwind
- Shadcn-like minimal components
- Powered by @mohtasham/md-to-docx

[TOC]

## Features

1. Headings, lists, code, tables
2. Blockquotes and images
3. TOC and page breaks (\\pagebreak)
`;

export function Playground() {
  const [markdown, setMarkdown] = React.useState<string>(DEFAULT_MD);
  const [isConverting, setIsConverting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleConvert = async () => {
    setIsConverting(true);
    setError("");
    try {
      const blob = await convertMarkdownToDocx(markdown);
      downloadDocx(blob, "markdown.docx");
    } catch (err) {
      setError("Conversion failed. Please try again.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 text-neutral-900">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">md-to-docx Playground</h1>
          <p className="text-sm text-neutral-500">Minimal, monotone, browser-based converter</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 underline"
            href="https://github.com/mohtashammurshidmadani"
            target="_blank"
            rel="noreferrer"
          >
            github: @mohtashammurshidmadani
          </a>
          <Separator className="w-px h-4 bg-neutral-300" />
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 underline"
            href="https://www.npmjs.com/package/@mohtasham/md-to-docx"
            target="_blank"
            rel="noreferrer"
          >
            npm: @mohtasham/md-to-docx
          </a>
          <Separator className="w-px h-4 bg-neutral-300" />
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 underline"
            href="https://github.com/mohtashammurshidmadani/md-to-docx"
            target="_blank"
            rel="noreferrer"
          >
            repo
          </a>
        </div>
      </header>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="markdown">Markdown</Label>
          <Textarea
            id="markdown"
            className="mt-2 min-h-[420px] bg-white"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type markdown here..."
          />
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Actions</Label>
            <div className="mt-2 flex items-center gap-2">
              <Button onClick={handleConvert} disabled={isConverting}>
                {isConverting ? "Converting..." : "Convert to DOCX"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setMarkdown(DEFAULT_MD)}
                disabled={isConverting}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="text-sm text-neutral-500">
            Tip: Add "[TOC]" at the top for a table of contents. Use \\pagebreak for a new page.
          </div>
          <div>
            <Label className="mb-2 block">Preview</Label>
            <div className="doc-surface rounded-md overflow-hidden">
              <div className="doc-a4">
                <article className="prose prose-neutral max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;



