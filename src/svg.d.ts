declare module "*.svg" {
  const content: string;
  export default content;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_BASE_URL: string; // Declare your environment variables here
  // Add more variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
