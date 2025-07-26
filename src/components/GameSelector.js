import React, { useState } from 'react';
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import PictureGuessingGame from './PictureGuessingGame';
import ColoringGame from './ColoringGame';
export default function GameSelector() {
    const [currentGame, setCurrentGame] = useState('selector');
    const games = [
        {
            id: 'picture-guessing',
            title: '🖼️ 그림 맞추기',
            description: '흐린 이미지를 보고 무엇인지 맞춰보세요!',
            color: 'purple'
        },
        {
            id: 'coloring',
            title: '🎨 색칠하기',
            description: '선화에 예쁜 색깔을 칠해보세요!',
            color: 'pink'
        }
    ];
    if (currentGame === 'picture-guessing') {
        return (React.createElement(Box, null,
            React.createElement(Button, { position: "fixed", top: 4, left: 4, onClick: () => setCurrentGame('selector'), colorScheme: "purple", size: "sm", shadow: "xl", zIndex: 9999, borderRadius: "full", px: 4 }, "\uD83C\uDFE0 \uD648"),
            React.createElement(PictureGuessingGame, null)));
    }
    if (currentGame === 'coloring') {
        return (React.createElement(Box, null,
            React.createElement(Button, { position: "fixed", top: 4, left: 4, onClick: () => setCurrentGame('selector'), colorScheme: "pink", size: "sm", shadow: "xl", zIndex: 9999, borderRadius: "full", px: 4 }, "\uD83C\uDFE0 \uD648"),
            React.createElement(ColoringGame, null)));
    }
    return (React.createElement(Box, { minH: "100vh", bg: "gray.50", p: 4 },
        React.createElement(Box, { maxW: "800px", mx: "auto" },
            React.createElement(Box, { position: "relative", rounded: "2xl", overflow: "hidden", shadow: "2xl", mb: 8, mt: 4, h: { base: "200px", md: "300px" } },
                React.createElement(Box, { w: "full", h: "full", bgImage: "url('/main.JPG')", bgRepeat: "no-repeat", bgSize: "cover", position: "relative center" },
                    React.createElement(Box, { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, bg: "blackAlpha.400", display: "flex", alignItems: "center", justifyContent: "center" },
                        React.createElement(Box, { textAlign: "center", color: "white" })))),
            React.createElement(Box, { display: "grid", gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" }, gap: 6 }, games.map((game) => (React.createElement(Box, { key: game.id, bg: "white", rounded: "xl", shadow: "lg", p: 8, textAlign: "center", cursor: "pointer", transition: "all 0.2s", _hover: {
                    transform: "translateY(-4px)",
                    shadow: "xl"
                }, onClick: () => setCurrentGame(game.id) },
                React.createElement(Text, { fontSize: "4xl", mb: 4 }, game.title.split(' ')[0]),
                React.createElement(Heading, { size: "lg", mb: 3, color: `${game.color}.600` }, game.title.split(' ').slice(1).join(' ')),
                React.createElement(Text, { color: "gray.600", mb: 6 }, game.description),
                React.createElement(Button, { colorScheme: game.color, size: "lg", w: "full" }, "\uAC8C\uC784 \uC2DC\uC791 \u2192"))))),
            React.createElement(Box, { textAlign: "center", mt: 12, opacity: 0.7 },
                React.createElement(Text, { fontSize: "sm", color: "gray.500" }, "\uBAA8\uBC14\uC77C\uC5D0 \uCD5C\uC801\uD654\uB41C \uC7AC\uBBF8\uC788\uB294 \uB180\uC774 \uAC8C\uC784\uB4E4")))));
}
