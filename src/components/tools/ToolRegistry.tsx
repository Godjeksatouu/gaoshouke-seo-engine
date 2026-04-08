import {
  WordCounterTool, CharacterCounterTool, JsonFormatterTool,
  Base64EncoderTool, UrlEncoderTool, PasswordGeneratorTool,
  UuidGeneratorTool, LoremIpsumGeneratorTool, ColorPickerTool,
  EmailValidatorTool, MarkdownEditorTool, RegexTesterTool,
  CsvToJsonTool, JsonToCsvTool, TextDiffTool, IpAddressFinderTool,
  HtmlMinifierTool, CssMinifierTool, JsMinifierTool,
  MetaTagGeneratorTool, CaseConverterTool, UnixTimestampTool,
  HashGeneratorTool, NumberBaseConverterTool,
} from "./ToolImplementations";

// Fixed registry for exact matches
const toolRegistry: Record<string, React.FC> = {
  "word-counter": WordCounterTool,
  "character-counter": CharacterCounterTool,
  "json-formatter": JsonFormatterTool,
  "base64-encoder": Base64EncoderTool,
  "url-encoder": UrlEncoderTool,
  "password-generator": PasswordGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "lorem-ipsum-generator": LoremIpsumGeneratorTool,
  "color-picker": ColorPickerTool,
  "email-validator": EmailValidatorTool,
  "markdown-editor": MarkdownEditorTool,
  "regex-tester": RegexTesterTool,
  "csv-to-json": CsvToJsonTool,
  "json-to-csv": JsonToCsvTool,
  "text-diff-tool": TextDiffTool,
  "ip-address-finder": IpAddressFinderTool,
  "html-minifier": HtmlMinifierTool,
  "css-minifier": CssMinifierTool,
  "js-minifier": JsMinifierTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "case-converter": CaseConverterTool,
  "unix-timestamp": UnixTimestampTool,
  "hash-generator": HashGeneratorTool,
  "number-base-converter": NumberBaseConverterTool,
};

// Fuzzy patterns to capture 1000+ variations
const patterns = [
  { keywords: ["word", "count"], component: WordCounterTool },
  { keywords: ["character", "count"], component: CharacterCounterTool },
  { keywords: ["json", "format"], component: JsonFormatterTool },
  { keywords: ["base64"], component: Base64EncoderTool },
  { keywords: ["url", "encod"], component: UrlEncoderTool },
  { keywords: ["password", "gen"], component: PasswordGeneratorTool },
  { keywords: ["uuid", "gen"], component: UuidGeneratorTool },
  { keywords: ["lorem", "ipsum"], component: LoremIpsumGeneratorTool },
  { keywords: ["color", "pick"], component: ColorPickerTool },
  { keywords: ["email", "valid"], component: EmailValidatorTool },
  { keywords: ["markdown"], component: MarkdownEditorTool },
  { keywords: ["regex"], component: RegexTesterTool },
  { keywords: ["csv", "json"], component: CsvToJsonTool },
  { keywords: ["diff"], component: TextDiffTool },
  { keywords: ["ip", "address"], component: IpAddressFinderTool },
  { keywords: ["minif", "html"], component: HtmlMinifierTool },
  { keywords: ["minif", "css"], component: CssMinifierTool },
  { keywords: ["minif", "js"], component: JsMinifierTool },
  { keywords: ["meta", "tag"], component: MetaTagGeneratorTool },
  { keywords: ["case", "convert"], component: CaseConverterTool },
  { keywords: ["timestamp"], component: UnixTimestampTool },
  { keywords: ["hash"], component: HashGeneratorTool },
  { keywords: ["binary", "hex", "base"], component: NumberBaseConverterTool },
];

export function getToolComponent(slug: string): React.FC | null {
  // 1. Check exact match
  if (toolRegistry[slug]) return toolRegistry[slug];

  // 2. Check fuzzy patterns (enables 1000+ generated tools to use real components)
  const normalized = slug.toLowerCase();
  for (const p of patterns) {
    if (p.keywords.every(k => normalized.includes(k))) {
      return p.component;
    }
  }

  return null;
}

