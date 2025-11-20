export const validation = {
  title: {
    minLength: 3,
    maxLength: 200,
    validate: (value: string): string | null => {
      const trimmed = value.trim();
      if (!trimmed) return "Title is required";
      if (trimmed.length < validation.title.minLength) {
        return `Title must be at least ${validation.title.minLength} characters`;
      }
      if (trimmed.length > validation.title.maxLength) {
        return `Title must not exceed ${validation.title.maxLength} characters`;
      }
      return null;
    },
  },

  body: {
    maxLength: 5000,
    validate: (value: string): string | null => {
      const trimmed = value.trim();
      if (trimmed.length > validation.body.maxLength) {
        return `Body must not exceed ${validation.body.maxLength} characters`;
      }
      return null;
    },
  },

  email: {
    validate: (value: string): string | null => {
      const trimmed = value.trim();
      if (!trimmed) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return "Invalid email format";
      return null;
    },
  },

  phone: {
    validate: (value: string): string | null => {
      if (!value.trim()) return null;
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(value.trim())) return "Invalid phone format";
      return null;
    },
  },

  website: {
    validate: (value: string): string | null => {
      if (!value.trim()) return null;
      try {
        new URL(value.trim().startsWith("http") ? value.trim() : `https://${value.trim()}`);
        return null;
      } catch {
        return "Invalid website URL format";
      }
    },
  },

  name: {
    minLength: 2,
    maxLength: 100,
    validate: (value: string): string | null => {
      const trimmed = value.trim();
      if (!trimmed) return "Name is required";
      if (trimmed.length < validation.name.minLength) {
        return `Name must be at least ${validation.name.minLength} characters`;
      }
      if (trimmed.length > validation.name.maxLength) {
        return `Name must not exceed ${validation.name.maxLength} characters`;
      }
      return null;
    },
  },
};
