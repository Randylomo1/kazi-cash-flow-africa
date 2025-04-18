
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="h-10 w-10 rounded-full"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
