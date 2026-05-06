export const encodeStaticAssetPath = (assetPath: string): string => {
  const normalizedPath = assetPath.trim();

  if (!normalizedPath.startsWith("/")) {
    throw new Error("Static asset path must start with '/'.");
  }

  // Encode each segment so reserved characters like `#` don't break URLs.
  return normalizedPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
};
