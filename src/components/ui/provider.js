"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, } from "./color-mode";
import React from "react";
export function Provider(props) {
    return (React.createElement(ChakraProvider, { value: defaultSystem },
        React.createElement(ColorModeProvider, { ...props })));
}
