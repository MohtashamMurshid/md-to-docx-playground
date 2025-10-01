import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { convertMarkdownToDocx, downloadDocx } from "@mohtasham/md-to-docx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DEFAULT_MD } from "../../utils/md";
import { HomeIcon } from "lucide-react";



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
    <div className="mx-auto max-w-7xl px-4 py-6">
      <header className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">md-to-docx Playground</h1>
          <p className="text-sm text-[rgb(var(--muted))]">Minimal, monotone, browser-based converter</p>
        </div>
        <a href="/">
          <Button variant="outline">
            <HomeIcon className="w-4 h-4" />
            Home
          </Button>
        </a>
        <div className="flex items-center gap-2">
          <a
            className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] underline"
            href="https://github.com/mohtashammurshid"
            target="_blank"
            rel="noreferrer"
          >
            github: @mohtashammurshid
          </a>
          <Separator className="w-px h-4" />
          <a
            className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] underline"
            href="https://www.npmjs.com/package/@mohtasham/md-to-docx"
            target="_blank"
            rel="noreferrer"
          >
            npm: @mohtasham/md-to-docx
          </a>
          <Separator className="w-px h-4" />
          <a
            className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] underline"
            href="https://github.com/mohtashammurshidmadani/md-to-docx"
            target="_blank"
            rel="noreferrer"
          >
            repo
          </a>
        </div>
      </header>

      <Separator className="my-6" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="markdown">Markdown</Label>
            <div className="flex items-center gap-2">
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
          <Textarea
            id="markdown"
            className="min-h-[300px]"
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
        <div className="flex flex-col gap-3">
          <Label>Preview</Label>
          <div className="text-xs text-[rgb(var(--muted))]">Tip: Add "[TOC]" at the top for a table of contents. Use \\pagebreak for a new page.</div>
          <div className="doc-surface overflow-hidden">
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
  );
}

export default Playground;



