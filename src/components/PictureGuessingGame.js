import React, { useState } from 'react';
import { Box, Card, CardBody, CardFooter, CardHeader, Container, Flex, Heading, HStack, IconButton, Image, Slider, Text, VStack, } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
export function PictureGuessingGame() {
    const [images] = useState([
        { src: '/images/1.jpg' },
        { src: '/images/2.jpg' },
        { src: '/images/3.jpg' },
        { src: '/images/4.jpg' },
        { src: '/images/5.jpg' },
        { src: '/images/6.jpg' },
        { src: '/images/7.jpg' },
        { src: '/images/8.jpg' },
        { src: '/images/9.jpg' },
        { src: '/images/10.jpg' },
        { src: '/images/11.jpg' },
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [revealPercentage, setRevealPercentage] = useState(10);
    // 배경색 설정 (라이트/다크 모드 대응)
    const bgColor = useColorModeValue("blue.50", "gray.800");
    const cardBgColor = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const accentColor = useColorModeValue("blue.500", "blue.300");
    // 이미지 내비게이션 함수
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            setRevealPercentage(10);
        }
    };
    const handleNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
            setRevealPercentage(10);
        }
    };
    const handleRevealChange = (value) => {
        setRevealPercentage(value);
    };
    // 퍼센트에 따라 블러 강도를 계산하는 함수
    function getBlurIntensity(percent) {
        // 100%일 때는 블러 없음 (완전 선명)
        if (percent >= 100) {
            return "0px";
        }
        // 10%일 때 20px(매우 흐림), 99%일 때 0.2px(거의 선명)
        const maxBlur = 20; // 최대 블러 강도(px)
        const minBlur = 0.2; // 최소 블러 강도(px)
        // percent가 클수록 블러가 적게 적용됨(더 선명해짐)
        const blur = maxBlur - ((maxBlur - minBlur) * percent) / 100;
        return `${Math.max(blur, 0)}px`;
    }
    return (React.createElement(Box, { minH: "100vh", bg: bgColor },
        React.createElement(Container, { maxW: "container.lg", py: 4, px: 4, h: "100vh", display: "flex", flexDirection: "column" },
            React.createElement(Card, null,
                React.createElement(CardHeader, { bg: useColorModeValue("blue.50", "blue.900"), py: 3, px: 5, borderBottom: "1px solid", borderColor: borderColor },
                    React.createElement(Flex, { justify: "space-between", align: "center" },
                        React.createElement(Heading, { size: "md", color: textColor }, "\uADF8\uB9BC \uB9DE\uCD94\uAE30"),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "medium", color: textColor },
                            currentImageIndex + 1,
                            " / ",
                            images.length))),
                React.createElement(CardBody, { p: 6, flex: "1", display: "flex", flexDirection: "column" },
                    React.createElement(Box, { position: "relative", flex: "1", borderRadius: "lg", overflow: "hidden", boxShadow: "sm" },
                        React.createElement(Flex, { position: "relative", w: "100%", h: "100%", borderRadius: "lg", overflow: "hidden", bg: useColorModeValue("gray.100", "gray.900") },
                            React.createElement(Image, { src: images[currentImageIndex].src, alt: `게임 이미지 ${currentImageIndex + 1}`, objectFit: "cover", w: "full", h: "full", filter: `blur(${getBlurIntensity(revealPercentage)})`, transition: "filter 0.3s ease", draggable: false }),
                            React.createElement(IconButton, { "aria-label": "\uC774\uC804 \uC774\uBBF8\uC9C0", size: "md", isRound: true, position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", onClick: handlePrevImage, isDisabled: currentImageIndex === 0, bg: useColorModeValue("whiteAlpha.800", "gray.700"), _hover: { bg: useColorModeValue("white", "gray.600") }, borderColor: borderColor }),
                            React.createElement(IconButton, { "aria-label": "\uB2E4\uC74C \uC774\uBBF8\uC9C0", size: "md", isRound: true, position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", onClick: handleNextImage, isDisabled: currentImageIndex === images.length - 1, bg: useColorModeValue("whiteAlpha.800", "gray.700"), _hover: { bg: useColorModeValue("white", "gray.600") }, borderColor: borderColor })))),
                React.createElement(CardFooter, { bg: useColorModeValue("blue.50", "blue.900"), p: 6, borderTop: "1px solid", borderColor: borderColor, flexDirection: "column", gap: 4 },
                    React.createElement(VStack, { w: "full" },
                        React.createElement(Text, { fontSize: "xl", fontWeight: "bold", color: accentColor },
                            revealPercentage,
                            "%"),
                        React.createElement(Box, { w: "full", position: "relative", pt: 6 },
                            React.createElement(Flex, { justify: "space-between", fontSize: "xs", color: "gray.500", position: "absolute", top: "0", left: "0", right: "0" },
                                React.createElement(Text, null, "\uD750\uB9BC"),
                                React.createElement(Text, null, "\uC120\uBA85\uD568")),
                            React.createElement(Slider.Root, { maxW: "sm", size: "sm", defaultValue: [40] },
                                React.createElement(HStack, { justify: "space-between" },
                                    React.createElement(Slider.Label, null, "Volume"),
                                    React.createElement(Slider.ValueText, null)),
                                React.createElement(Slider.Control, null,
                                    React.createElement(Slider.Track, null,
                                        React.createElement(Slider.Range, null)),
                                    React.createElement(Slider.Thumbs, { rounded: "l1" })))),
                        React.createElement(Text, { fontSize: "sm", color: "gray.500", textAlign: "center" }, "\uC2AC\uB77C\uC774\uB354\uB97C \uC6C0\uC9C1\uC5EC \uC774\uBBF8\uC9C0 \uC120\uBA85\uB3C4\uB97C \uC870\uC808\uD558\uC138\uC694")))))));
}
