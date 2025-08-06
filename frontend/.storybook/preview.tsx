import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import { ThemeProvider, ThemeToggle } from "../components/index";
import { themes } from "storybook/theming";


const DesktopViewports = {
  PC: {
    name: "Desktop",
    styles: {
      width: "900px",
      height: "500px",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    docs: {
      theme: themes.dark, // The replacement theme to use
    },
  },

  decorators: [
    (Story, context) => {

      return (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!context.parameters?.__removeThemeToggle && (
            <ThemeToggle className="absolute top-3 right-3"/>
          )}
          <div style={{padding: "3em"}}>
            <Story/>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
