import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
export default function PictureGuessingGame() {
    const [currentImage, setCurrentImage] = useState(null);
    const [revealPercentage, setRevealPercentage] = useState(10);
    const [isDragging, setIsDragging] = useState(false);
    const [shownImageIndices, setShownImageIndices] = useState(new Set());
    const [previousPercentage, setPreviousPercentage] = useState(10);
    // 초기 이미지 로드
    useEffect(() => {
        loadNextRandomImage();
    }, []);
    // 선명도가 100%가 되면 이미지 이름을 소리로 읽어주는 효과
    useEffect(() => {
        if (revealPercentage === 100 && previousPercentage !== 100 && currentImage?.name) {
            speakImageName(currentImage.name);
        }
        setPreviousPercentage(revealPercentage);
    }, [revealPercentage, currentImage]);
    // 이미지 이름을 소리로 읽어주는 함수
    const speakImageName = (name) => {
        if ('speechSynthesis' in window) {
            // 진행 중인 음성이 있으면 중지
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(name);
            utterance.lang = 'en-US'; // 영어로 설정
            utterance.rate = 0.9; // 약간 느린 속도로 설정
            utterance.pitch = 1; // 기본 음높이
            window.speechSynthesis.speak(utterance);
        }
    };
    // 다음 랜덤 이미지를 로드하는 함수
    const loadNextRandomImage = () => {
        const allImages = getAllImages();
        // 아직 보지 않은 이미지들 필터링
        const availableImages = allImages
            .map((image, index) => ({ ...image, originalIndex: index }))
            .filter(img => !shownImageIndices.has(img.originalIndex));
        // 모든 이미지를 다 봤으면 알림
        if (availableImages.length === 0) {
            alert('🎉 모든 이미지를 다 보셨습니다! 새로고침하면 다시 시작할 수 있어요.');
            return;
        }
        // 랜덤하게 하나 선택
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];
        setCurrentImage({ src: selectedImage.src, name: selectedImage.name });
        setShownImageIndices(prev => new Set([...prev, selectedImage.originalIndex]));
        setRevealPercentage(10);
    };
    // 새 이미지 세트 시작 (표시된 이미지 목록 초기화)
    const refreshImages = () => {
        setShownImageIndices(new Set());
        loadNextRandomImage();
    };
    // 반응형 크기 설정
    const isMobile = useBreakpointValue({ base: true, md: false });
    const imageHeight = useBreakpointValue({ base: "70vh", md: "60vh" });
    const containerPadding = useBreakpointValue({ base: 2, md: 4 });
    // 모든 이미지 배열을 반환하는 헬퍼 함수
    const getAllImages = () => {
        // public/images/picture-guessing-game/ 폴더의 이미지들
        return [
            { src: '/images/picture-guessing-game/apple.jpg', name: 'Apple' },
            { src: '/images/picture-guessing-game/banana.jpg', name: 'Banana' },
            { src: '/images/picture-guessing-game/carrot.jpg', name: 'Carrot' },
            { src: '/images/picture-guessing-game/cat.jpg', name: 'Cat' },
            { src: '/images/picture-guessing-game/cherry.jpg', name: 'Cherry' },
            { src: '/images/picture-guessing-game/dog.jpg', name: 'Dog' },
            { src: '/images/picture-guessing-game/donut.jpg', name: 'Donut' },
            { src: '/images/picture-guessing-game/fox.jpg', name: 'Fox' },
            { src: '/images/picture-guessing-game/giraffe.jpg', name: 'Giraffe' },
            { src: '/images/picture-guessing-game/blueberry.jpg', name: 'BlueBerry' },
            { src: '/images/picture-guessing-game/cat2.jpg', name: 'Cat' },
            { src: '/images/picture-guessing-game/horse.jpg', name: 'Horse' },
            { src: '/images/picture-guessing-game/apple2.jpg', name: 'Apple' },
            { src: '/images/picture-guessing-game/orange2.jpg', name: 'Orange' },
            { src: '/images/picture-guessing-game/koala.jpg', name: 'Koala' },
            { src: '/images/picture-guessing-game/lion.jpg', name: 'Lion' },
            { src: '/images/picture-guessing-game/parrot.jpg', name: 'Parrot' },
            { src: '/images/picture-guessing-game/banana.jpg', name: 'Banana' },
            { src: '/images/picture-guessing-game/cat.jpg', name: 'Cat' },
            { src: '/images/picture-guessing-game/panda.jpg', name: 'Panda' },
            { src: '/images/picture-guessing-game/lemon.jpg', name: 'Lemon' },
            { src: '/images/picture-guessing-game/dog.jpg', name: 'Dog' },
            { src: '/images/picture-guessing-game/pig.jpg', name: 'Pig' },
            { src: '/images/picture-guessing-game/watermelon.jpg', name: 'Watermelon' },
            { src: '/images/picture-guessing-game/rabbit.jpg', name: 'Rabbit' },
            { src: '/images/picture-guessing-game/tomato.jpg', name: 'Tomato' },
            { src: '/images/picture-guessing-game/turtle.jpg', name: 'Turtle' },
        ];
    };
    // 다음 이미지로 넘어가기
    const handleNextImage = () => {
        loadNextRandomImage();
    };
    // 퍼센트에 따라 블러 강도를 계산하는 함수
    function getBlurIntensity(percent) {
        if (percent >= 100) {
            return "0px";
        }
        const maxBlur = 20;
        const minBlur = 0.2;
        const blur = maxBlur - ((maxBlur - minBlur) * percent) / 100;
        return `${Math.max(blur, 0)}px`;
    }
    return (React.createElement(Box, { minH: "100vh", bg: "gray.50", p: containerPadding },
        React.createElement(Box, { display: "flex", flexDirection: "column", gap: 4, h: "100vh" },
            React.createElement(Box, { w: "full", bg: "white", rounded: "xl", shadow: "lg", p: 4, borderWidth: 1, borderColor: "gray.200" },
                React.createElement(Flex, { justify: "space-between", align: "center" },
                    React.createElement(Box, null,
                        React.createElement(Heading, { size: isMobile ? "md" : "lg", color: "purple.500", fontWeight: "bold" }, "\uD83D\uDDBC\uFE0F \uADF8\uB9BC \uB9DE\uCD94\uAE30"),
                        React.createElement(Flex, { gap: 2, mt: 2 },
                            React.createElement(Button, { size: "sm", onClick: refreshImages, colorScheme: "blue", variant: "outline", fontSize: "xs", px: 3, py: 1, h: "auto", minH: "28px", _hover: {
                                    transform: "translateY(-1px)",
                                    shadow: "md"
                                }, transition: "all 0.2s" }, "\uD83D\uDD04 \uC0C8 \uC774\uBBF8\uC9C0"))))),
            React.createElement(Box, { position: "relative", w: "full", h: imageHeight, bg: "white", rounded: "2xl", shadow: "2xl", overflow: "hidden", borderWidth: 2, borderColor: "gray.200" },
                currentImage && (React.createElement(React.Fragment, null,
                    React.createElement(Image, { src: currentImage.src, alt: "\uAC8C\uC784 \uC774\uBBF8\uC9C0", objectFit: "cover", w: "full", h: "full", filter: `blur(${getBlurIntensity(revealPercentage)})`, transition: "all 0.4s ease-in-out", draggable: false }),
                    revealPercentage >= 80 && currentImage.name && (React.createElement(Box, { position: "absolute", bottom: 0, left: 0, right: 0, bg: "blackAlpha.700", color: "white", py: 3, px: 4, textAlign: "center", opacity: revealPercentage >= 95 ? 1 : (revealPercentage - 80) / 20, transition: "opacity 0.4s ease-in-out" },
                        React.createElement(Text, { fontSize: "xl", fontWeight: "bold" }, currentImage.name))))),
                React.createElement(Button, { position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", onClick: handleNextImage, bg: "whiteAlpha.900", color: "purple.500", _hover: {
                        bg: "white",
                        transform: "translateY(-50%) scale(1.1)",
                    }, shadow: "lg", transition: "all 0.2s", borderRadius: "full", w: "12", h: "12", fontSize: "xl", fontWeight: "bold" }, "\u2192")),
            React.createElement(Box, { w: "full", bg: "white", rounded: "xl", shadow: "lg", p: 6, borderWidth: 1, borderColor: "gray.200" },
                React.createElement(Box, { display: "flex", flexDirection: "column", gap: 6 },
                    React.createElement(Box, { display: "flex", flexDirection: "column", gap: 3, w: "full" },
                        React.createElement(Text, { fontSize: "lg", fontWeight: "semibold", color: "gray.800" }, "\uD83C\uDFAF \uC120\uBA85\uB3C4 \uC870\uC808"),
                        React.createElement(Flex, { gap: 1, w: "full", justify: "center" }, [10, 30, 50, 80, 100].map((percentage) => (React.createElement(Button, { key: percentage, onClick: () => setRevealPercentage(percentage), w: "50px", h: "32px", bg: revealPercentage === percentage ? "purple.500" : "transparent", color: revealPercentage === percentage ? "white" : "gray.800", borderColor: "purple.500", borderWidth: 1, _hover: {
                                bg: revealPercentage === percentage ? "purple.500" : "purple.50",
                                transform: "translateY(-1px)",
                            }, transition: "all 0.2s", fontWeight: "bold", fontSize: "xs", rounded: "md" },
                            percentage,
                            "%"))))),
                    React.createElement(Box, { display: "flex", flexDirection: "column", gap: 4, w: "full" },
                        React.createElement(Flex, { justify: "space-between", w: "full", fontSize: "sm", color: "gray.600" },
                            React.createElement(Text, { fontWeight: "medium" }, "\uD83C\uDF2B\uFE0F \uD750\uB9BC"),
                            React.createElement(Text, { fontWeight: "bold", fontSize: "lg", color: "purple.500" },
                                revealPercentage,
                                "%"),
                            React.createElement(Text, { fontWeight: "medium" }, "\u2728 \uC120\uBA85")),
                        React.createElement(Box, { position: "relative", w: "full", h: "8", display: "flex", alignItems: "center" },
                            React.createElement(Box, { w: "full", h: "3", bg: "gray.200", rounded: "full", position: "relative", cursor: "pointer", onClick: (e) => {
                                    if (!isDragging) {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const percentage = Math.round((x / rect.width) * 90 + 10);
                                        setRevealPercentage(Math.max(10, Math.min(100, percentage)));
                                    }
                                } },
                                React.createElement(Box, { h: "full", bg: "purple.500", rounded: "full", w: `${(revealPercentage - 10) / 90 * 100}%`, transition: isDragging ? "none" : "width 0.2s" }),
                                React.createElement(Box, { position: "absolute", top: "50%", left: `${(revealPercentage - 10) / 90 * 100}%`, transform: "translate(-50%, -50%)", w: "7", h: "7", bg: "white", border: "3px solid", borderColor: "purple.500", rounded: "full", shadow: "lg", cursor: isDragging ? "grabbing" : "grab", _hover: { transform: "translate(-50%, -50%) scale(1.1)" }, transition: isDragging ? "none" : "transform 0.1s", onMouseDown: (e) => {
                                        setIsDragging(true);
                                        const handleMouseMove = (moveEvent) => {
                                            const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                                            if (rect) {
                                                const x = moveEvent.clientX - rect.left;
                                                const percentage = Math.round((x / rect.width) * 90 + 10);
                                                setRevealPercentage(Math.max(10, Math.min(100, percentage)));
                                            }
                                        };
                                        const handleMouseUp = () => {
                                            setIsDragging(false);
                                            document.removeEventListener('mousemove', handleMouseMove);
                                            document.removeEventListener('mouseup', handleMouseUp);
                                        };
                                        document.addEventListener('mousemove', handleMouseMove);
                                        document.addEventListener('mouseup', handleMouseUp);
                                    } }))),
                        React.createElement(Text, { fontSize: "sm", color: "gray.600", textAlign: "center" }, "\uD83D\uDC46 \uC2AC\uB77C\uC774\uB354\uB97C \uB4DC\uB798\uADF8\uD558\uAC70\uB098 \uBC84\uD2BC\uC744 \uB20C\uB7EC \uC120\uBA85\uB3C4\uB97C \uC870\uC808\uD558\uC138\uC694")))))));
}
