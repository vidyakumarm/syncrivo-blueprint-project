import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    console.log('🎨 [ThemeToggle] Current theme state', {
        timestamp: new Date().toISOString(),
        theme,
        currentTheme: theme
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="relative h-11 w-11 hover:bg-accent/10 transition-all duration-200"
                    aria-label="Toggle theme"
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-xl rounded-lg p-1">
                <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer px-3 py-2.5 rounded-md transition-colors duration-200 hover:bg-accent/50">
                    <Sun className="mr-3 h-4 w-4" />
                    <span className="font-medium">Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer px-3 py-2.5 rounded-md transition-colors duration-200 hover:bg-accent/50">
                    <Moon className="mr-3 h-4 w-4" />
                    <span className="font-medium">Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer px-3 py-2.5 rounded-md transition-colors duration-200 hover:bg-accent/50">
                    <Palette className="mr-3 h-4 w-4" />
                    <span className="font-medium">System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}