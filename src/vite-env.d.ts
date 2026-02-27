/// <reference types="vite/client" />

// vite-imagetools srcset imports
declare module '*&as=srcset' {
  const src: string;
  export default src;
}
declare module '*&as=picture' {
  const src: { sources: Record<string, string>; img: { src: string; w: number; h: number } };
  export default src;
}
declare module '*?format=webp*' {
  const src: string;
  export default src;
}
declare module '*.jpg?w=400&format=webp' {
  const src: string;
  export default src;
}
declare module '*.jpg?w=800&format=webp' {
  const src: string;
  export default src;
}
