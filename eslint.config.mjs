import { tseslint } from "typescript-eslint";

export default tseslint.config({
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic", // optional cho code style
    "next/core-web-vitals", // 👈 tương đương dòng bạn dùng trong FlatCompat
  ],
  parserOptions: {
    project: true, // nếu dùng tsconfig.json (có thể bỏ nếu không cần)
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error", //tạp ton lỗi khi dùng any
    // Thêm các rule khác nếu bạn cần
  },
});
