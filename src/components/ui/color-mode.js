"use client";
import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";
export function ColorModeProvider(props) {
    return (React.createElement(ThemeProvider, { attribute: "class", disableTransitionOnChange: true, ...props }));
}
export function useColorMode() {
    const { resolvedTheme, setTheme, forcedTheme } = useTheme();
    const colorMode = forcedTheme || resolvedTheme;
    const toggleColorMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    return {
        colorMode: colorMode,
        setColorMode: setTheme,
        toggleColorMode,
    };
}
export function useColorModeValue(light, dark) {
    const { colorMode } = useColorMode();
    return colorMode === "dark" ? dark : light;
}
export function ColorModeIcon() {
    const { colorMode } = useColorMode();
    return colorMode === "dark" ? React.createElement(LuMoon, null) : React.createElement(LuSun, null);
}
export const ColorModeButton = React.forwardRef(function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();
    return (React.createElement(ClientOnly, { fallback: React.createElement(Skeleton, { boxSize: "8" }) },
        React.createElement(IconButton, { onClick: toggleColorMode, variant: "ghost", "aria-label": "Toggle color mode", size: "sm", ref: ref, ...props, css: {
                _icon: {
                    width: "5",
                    height: "5",
                },
            } },
            React.createElement(ColorModeIcon, null))));
});
export const LightMode = React.forwardRef(function LightMode(props, ref) {
    return (React.createElement(Span, { color: "fg", display: "contents", className: "chakra-theme light", colorPalette: "gray", colorScheme: "light", ref: ref, ...props }));
});
export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
    return (React.createElement(Span, { color: "fg", display: "contents", className: "chakra-theme dark", colorPalette: "gray", colorScheme: "dark", ref: ref, ...props }));
});
