import { lazy } from "react";
import {
  WordCounterTool, CharacterCounterTool, JsonFormatterTool,
  Base64EncoderTool, UrlEncoderTool, PasswordGeneratorTool,
  UuidGeneratorTool, LoremIpsumGeneratorTool, ColorPickerTool,
  EmailValidatorTool, MarkdownEditorTool, RegexTesterTool,
  CsvToJsonTool, JsonToCsvTool, TextDiffTool, IpAddressFinderTool,
  HtmlMinifierTool, CssMinifierTool, JsMinifierTool,
  MetaTagGeneratorTool, GenericTool,
} from "./ToolImplementations";

// Map slug → component
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
};

export function getToolComponent(slug: string, toolName: string, category: string): React.FC {
  if (toolRegistry[slug]) return toolRegistry[slug];
  // Return a bound generic tool for non-implemented tools
  return () => <GenericTool toolName={toolName} category={category} />;
}
