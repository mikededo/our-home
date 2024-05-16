/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OUR_HOME_SUPABASE_URL: string;
  readonly OUR_HOME_SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
