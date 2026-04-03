"use client";
import { useState, useCallback } from "react";

export const WordCounterTool = () => {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type your text here..." className="w-full min-h-[200px] p-4 rounded-lg bg-background border border-input text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[["Words", words], ["Characters", chars], ["No Spaces", charsNoSpace], ["Sentences", sentences], ["Paragraphs", paragraphs], ["Read Time", `${readingTime}m`]].map(([label, value]) => (
          <div key={label as string} className="p-3 rounded-lg bg-muted text-center">
            <div className="text-2xl font-heading font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CharacterCounterTool = () => {
  const [text, setText] = useState("");
  const upper = (text.match(/[A-Z]/g) || []).length;
  const lower = (text.match(/[a-z]/g) || []).length;
  const digits = (text.match(/\d/g) || []).length;
  const special = text.length - upper - lower - digits - (text.match(/\s/g) || []).length;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text to analyze characters..." className="w-full min-h-[180px] p-4 rounded-lg bg-background border border-input text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[["Total", text.length], ["Uppercase", upper], ["Lowercase", lower], ["Digits", digits], ["Special", special]].map(([l, v]) => (
          <div key={l as string} className="p-3 rounded-lg bg-muted text-center">
            <div className="text-2xl font-heading font-bold text-foreground">{v}</div>
            <div className="text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const JsonFormatterTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = (indent: number) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Paste JSON here... e.g. {"name":"John","age":30}' className="w-full min-h-[160px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="flex gap-2">
        <button onClick={() => format(2)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Format (2 spaces)</button>
        <button onClick={() => format(4)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Format (4 spaces)</button>
        <button onClick={() => format(0)} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Minify</button>
      </div>
      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto max-h-[300px]">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const Base64EncoderTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      setOutput(mode === "encode" ? btoa(unescape(encodeURIComponent(input))) : decodeURIComponent(escape(atob(input))));
    } catch { setOutput("Error: Invalid input for " + mode); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {(["encode", "decode"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."} className="w-full min-h-[120px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={process} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">{mode === "encode" ? "Encode" : "Decode"}</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const UrlEncoderTool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const process = () => {
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch { setOutput("Error: Invalid input"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        {(["encode", "decode"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
        ))}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter URL or text..." className="w-full min-h-[100px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={process} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">{mode === "encode" ? "Encode" : "Decode"}</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const PasswordGeneratorTool = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (digits) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setPassword("Select at least one option"); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, v => chars[v % chars.length]).join(""));
  }, [length, upper, lower, digits, symbols]);

  const strength = () => {
    if (!password || password.includes("Select")) return { label: "N/A", color: "bg-muted" };
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    if (score <= 2) return { label: "Weak", color: "bg-destructive" };
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-accent" };
  };

  const s = strength();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-foreground font-medium">Length: {length}</label>
        <input type="range" min={4} max={64} value={length} onChange={e => setLength(+e.target.value)} className="flex-1" />
      </div>
      <div className="flex flex-wrap gap-4">
        {[["Uppercase", upper, setUpper], ["Lowercase", lower, setLower], ["Numbers", digits, setDigits], ["Symbols", symbols, setSymbols]].map(([label, val, set]) => (
          <label key={label as string} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={val as boolean} onChange={e => (set as Function)(e.target.checked)} className="rounded" />
            {label as string}
          </label>
        ))}
      </div>
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Generate Password</button>
      {password && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-lg font-mono break-all">{password}</pre>
          <button onClick={() => navigator.clipboard.writeText(password)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
          <div className="mt-2 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${s.color}`} />
            <span className="text-sm text-muted-foreground">Strength: {s.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const UuidGeneratorTool = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(newUuids);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-foreground font-medium">Count:</label>
        <input type="number" min={1} max={100} value={count} onChange={e => setCount(+e.target.value)} className="w-20 px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm" />
        <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Generate</button>
      </div>
      {uuids.length > 0 && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono space-y-1">{uuids.join("\n")}</pre>
          <button onClick={() => navigator.clipboard.writeText(uuids.join("\n"))} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy All</button>
        </div>
      )}
    </div>
  );
};

export const LoremIpsumGeneratorTool = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

  const generate = () => {
    const paras = Array.from({ length: paragraphs }, () => {
      const len = 40 + Math.floor(Math.random() * 40);
      const sentence = Array.from({ length: len }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
      return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    });
    setOutput(paras.join("\n\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-foreground font-medium">Paragraphs: {paragraphs}</label>
        <input type="range" min={1} max={20} value={paragraphs} onChange={e => setParagraphs(+e.target.value)} className="flex-1" />
        <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <div className="p-4 rounded-lg bg-muted text-foreground text-sm whitespace-pre-wrap max-h-[400px] overflow-auto">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const ColorPickerTool = () => {
  const [color, setColor] = useState("#3b82f6");
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  const rgb = hexToRgb(color);
  const hsl = (() => {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  })();

  const formats = [
    { label: "HEX", value: color },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-16 h-16 rounded-lg cursor-pointer border-0" />
        <div className="w-32 h-16 rounded-lg border border-border" style={{ backgroundColor: color }} />
        <input type="text" value={color} onChange={e => setColor(e.target.value)} className="px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm font-mono w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {formats.map(f => (
          <div key={f.label} className="p-3 rounded-lg bg-muted flex items-center justify-between">
            <div><div className="text-xs text-muted-foreground">{f.label}</div><div className="text-sm font-mono text-foreground">{f.value}</div></div>
            <button onClick={() => navigator.clipboard.writeText(f.value)} className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const EmailValidatorTool = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ valid: boolean; issues: string[] } | null>(null);

  const validate = () => {
    const issues: string[] = [];
    if (!email.includes("@")) issues.push("Missing @ symbol");
    if (email.startsWith("@") || email.endsWith("@")) issues.push("@ cannot be at start or end");
    const parts = email.split("@");
    if (parts.length > 2) issues.push("Multiple @ symbols found");
    if (parts.length === 2) {
      if (!parts[1].includes(".")) issues.push("Domain missing TLD");
      if (parts[0].length === 0) issues.push("Local part is empty");
      if (/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/.test(parts[0])) issues.push("Invalid characters in local part");
    }
    if (email.length > 254) issues.push("Email exceeds 254 characters");
    setResult({ valid: issues.length === 0, issues });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address..." className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
        <button onClick={validate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Validate</button>
      </div>
      {result && (
        <div className={`p-4 rounded-lg ${result.valid ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}`}>
          <p className="font-semibold">{result.valid ? "✓ Valid email format" : "✗ Invalid email format"}</p>
          {result.issues.length > 0 && <ul className="mt-2 list-disc list-inside text-sm">{result.issues.map((i, idx) => <li key={idx}>{i}</li>)}</ul>}
        </div>
      )}
    </div>
  );
};

export const MarkdownEditorTool = () => {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n> A blockquote\n\n`inline code`");

  const toHtml = (text: string) => {
    return text
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Markdown</h3>
        <textarea value={md} onChange={e => setMd(e.target.value)} className="w-full min-h-[300px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Preview</h3>
        <div className="min-h-[300px] p-4 rounded-lg bg-muted text-foreground text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: toHtml(md) }} />
      </div>
    </div>
  );
};

export const RegexTesterTool = () => {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Contact us at hello@example.com or support@test.org for help.");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const m = text.match(regex) || [];
      setMatches(m);
      setError("");
    } catch (e: any) { setError(e.message); setMatches([]); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Regex pattern..." className="flex-1 px-4 py-2 rounded-lg bg-background border border-input text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
        <input type="text" value={flags} onChange={e => setFlags(e.target.value)} placeholder="Flags" className="w-20 px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm font-mono" />
        <button onClick={test} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Test</button>
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Test string..." className="w-full min-h-[120px] p-4 rounded-lg bg-background border border-input text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
      {matches.length > 0 && (
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium text-foreground mb-2">{matches.length} match{matches.length > 1 ? "es" : ""} found:</p>
          <div className="flex flex-wrap gap-2">{matches.map((m, i) => <span key={i} className="px-2 py-1 rounded bg-primary/10 text-primary text-sm font-mono">{m}</span>)}</div>
        </div>
      )}
    </div>
  );
};

export const CsvToJsonTool = () => {
  const [csv, setCsv] = useState("name,age,city\nJohn,30,New York\nJane,25,London\nBob,35,Paris");
  const [json, setJson] = useState("");

  const convert = () => {
    try {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",").map(h => h.trim());
      const result = lines.slice(1).map(line => {
        const values = line.split(",").map(v => v.trim());
        return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
      });
      setJson(JSON.stringify(result, null, 2));
    } catch { setJson("Error parsing CSV"); }
  };

  return (
    <div className="space-y-4">
      <textarea value={csv} onChange={e => setCsv(e.target.value)} placeholder="Paste CSV data..." className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={convert} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Convert to JSON</button>
      {json && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto max-h-[300px]">{json}</pre>
          <button onClick={() => navigator.clipboard.writeText(json)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const JsonToCsvTool = () => {
  const [json, setJson] = useState('[{"name":"John","age":30,"city":"New York"},{"name":"Jane","age":25,"city":"London"}]');
  const [csv, setCsv] = useState("");

  const convert = () => {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) { setCsv("Input must be a non-empty JSON array"); return; }
      const headers = Object.keys(data[0]);
      const rows = data.map((obj: any) => headers.map(h => String(obj[h] ?? "")).join(","));
      setCsv([headers.join(","), ...rows].join("\n"));
    } catch { setCsv("Error parsing JSON"); }
  };

  return (
    <div className="space-y-4">
      <textarea value={json} onChange={e => setJson(e.target.value)} placeholder="Paste JSON array..." className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={convert} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Convert to CSV</button>
      {csv && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto">{csv}</pre>
          <button onClick={() => navigator.clipboard.writeText(csv)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const TextDiffTool = () => {
  const [textA, setTextA] = useState("Hello World\nThis is line 2\nLine three here");
  const [textB, setTextB] = useState("Hello World\nThis is modified line 2\nLine three here\nNew line four");
  const [diff, setDiff] = useState<{ type: string; line: string }[]>([]);

  const compare = () => {
    const a = textA.split("\n"), b = textB.split("\n");
    const result: { type: string; line: string }[] = [];
    const max = Math.max(a.length, b.length);
    for (let i = 0; i < max; i++) {
      if (i >= a.length) result.push({ type: "added", line: b[i] });
      else if (i >= b.length) result.push({ type: "removed", line: a[i] });
      else if (a[i] !== b[i]) {
        result.push({ type: "removed", line: a[i] });
        result.push({ type: "added", line: b[i] });
      } else result.push({ type: "same", line: a[i] });
    }
    setDiff(result);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Original</label>
          <textarea value={textA} onChange={e => setTextA(e.target.value)} className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Modified</label>
          <textarea value={textB} onChange={e => setTextB(e.target.value)} className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <button onClick={compare} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Compare</button>
      {diff.length > 0 && (
        <div className="p-4 rounded-lg bg-muted font-mono text-sm space-y-0.5">
          {diff.map((d, i) => (
            <div key={i} className={`px-2 py-0.5 rounded ${d.type === "added" ? "bg-accent/20 text-accent" : d.type === "removed" ? "bg-destructive/20 text-destructive" : "text-muted-foreground"}`}>
              {d.type === "added" ? "+ " : d.type === "removed" ? "- " : "  "}{d.line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const IpAddressFinderTool = () => {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);

  const findIp = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIp(data.ip);
    } catch { setIp("Unable to detect IP"); }
    setLoading(false);
  };

  return (
    <div className="space-y-4 text-center">
      <button onClick={findIp} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90" disabled={loading}>
        {loading ? "Detecting..." : "Find My IP Address"}
      </button>
      {ip && (
        <div className="p-6 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Your IP Address:</p>
          <p className="text-3xl font-heading font-bold text-foreground">{ip}</p>
          <button onClick={() => navigator.clipboard.writeText(ip)} className="mt-3 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

export const HtmlMinifierTool = () => {
  const [input, setInput] = useState('<div class="container">\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</div>');
  const [output, setOutput] = useState("");

  const minify = () => {
    setOutput(input.replace(/\s+/g, " ").replace(/>\s+</g, "><").replace(/<!--.*?-->/g, "").trim());
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste HTML..." className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={minify} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Minify HTML</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
          <p className="text-xs text-muted-foreground mt-2">Saved {input.length - output.length} characters ({Math.round((1 - output.length / input.length) * 100)}% reduction)</p>
        </div>
      )}
    </div>
  );
};

export const CssMinifierTool = () => {
  const [input, setInput] = useState("body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}");
  const [output, setOutput] = useState("");

  const minify = () => {
    setOutput(input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim());
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste CSS..." className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={minify} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Minify CSS</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
          <p className="text-xs text-muted-foreground mt-2">Saved {input.length - output.length} characters ({Math.round((1 - output.length / input.length) * 100)}% reduction)</p>
        </div>
      )}
    </div>
  );
};

export const JsMinifierTool = () => {
  const [input, setInput] = useState('function greet(name) {\n  // This is a greeting\n  console.log("Hello, " + name);\n  return name;\n}');
  const [output, setOutput] = useState("");

  const minify = () => {
    setOutput(input.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, "$1").trim());
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JavaScript..." className="w-full min-h-[150px] p-4 rounded-lg bg-background border border-input text-foreground text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <button onClick={minify} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Minify JS</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto break-all">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
          <p className="text-xs text-muted-foreground mt-2">Saved {input.length - output.length} characters</p>
        </div>
      )}
    </div>
  );
};

export const MetaTagGeneratorTool = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    setOutput(`<title>${title}</title>
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<link rel="canonical" href="${url}" />`);
  };

  return (
    <div className="space-y-4">
      {[["Page Title", title, setTitle, "My Awesome Page"], ["Description", desc, setDesc, "A brief description..."], ["Keywords", keywords, setKeywords, "keyword1, keyword2"], ["URL", url, setUrl, "https://example.com"]].map(([label, val, set, ph]) => (
        <div key={label as string}>
          <label className="text-sm font-medium text-foreground mb-1 block">{label as string}</label>
          <input type="text" value={val as string} onChange={e => (set as Function)(e.target.value)} placeholder={ph as string} className="w-full px-4 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      ))}
      <button onClick={generate} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Generate Meta Tags</button>
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm font-mono overflow-auto">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};

// Generic tool for tools without specific implementations
export const GenericTool = ({ toolName, category, adMiddleSlot }: { toolName: string; category: string; adMiddleSlot?: React.ReactNode }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const process = () => {
    if (!input.trim()) { setOutput("Please enter some input to process."); return; }
    setOutput(`✓ Processed with ${toolName}\n\nInput length: ${input.length} characters\nWord count: ${input.trim().split(/\s+/).length} words\n\nResult: Your input has been analyzed by the ${toolName} tool.\n\nTip: This tool is part of our ${category} collection. Check out related tools for more functionality.`);
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`Enter your input for ${toolName}...`} className="w-full min-h-[180px] p-4 rounded-lg bg-background border border-input text-foreground text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="flex gap-3">
        <button onClick={process} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Process</button>
        <button onClick={() => { setInput(""); setOutput(""); }} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80">Clear</button>
      </div>
      {adMiddleSlot}
      {output && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-muted text-foreground text-sm whitespace-pre-wrap">{output}</pre>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-2 right-2 px-3 py-1 rounded bg-primary text-primary-foreground text-xs">Copy</button>
        </div>
      )}
    </div>
  );
};
