import React, {useState} from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  Badge,
  useColorModeValue
} from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

interface GameImage {
  src: string
}

export default function PictureGuessingGame() {
  const [images] = useState<GameImage[]>([
    {src: '/images/1.jpg'},
    {src: '/images/2.jpg'},
    {src: '/images/3.jpg'},
    {src: '/images/4.jpg'},
    {src: '/images/5.jpg'},
    {src: '/images/6.jpg'},
    {src: '/images/7.jpg'},
    {src: '/images/8.jpg'},
    {src: '/images/9.jpg'},
    {src: '/images/10.jpg'},
    {src: '/images/11.jpg'},
  ])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [revealPercentage, setRevealPercentage] = useState(10)

  // 반응형 크기 설정
  const isMobile = useBreakpointValue({ base: true, md: false })
  const imageHeight = useBreakpointValue({ base: "70vh", md: "60vh" })
  const containerPadding = useBreakpointValue({ base: 2, md: 4 })
  
  // 색상 테마 설정
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.800", "gray.100")
  const accentColor = useColorModeValue("purple.500", "purple.300")
  const buttonBg = useColorModeValue("purple.500", "purple.400")

  // 이미지 내비게이션 함수
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
      setRevealPercentage(10)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
      setRevealPercentage(10)
    }
  }

  // 퍼센트에 따라 블러 강도를 계산하는 함수
  function getBlurIntensity(percent: number): string {
    if (percent >= 100) {
      return "0px";
    }

    const maxBlur = 20;
    const minBlur = 0.2;
    const blur = maxBlur - ((maxBlur - minBlur) * percent) / 100;
    return `${Math.max(blur, 0)}px`;
  }

  return (
    <Box minH="100vh" bg={bgColor} p={containerPadding}>
      <VStack spacing={4} h="100vh">
        {/* 헤더 */}
        <Box 
          w="full" 
          bg={cardBg} 
          rounded="xl" 
          shadow="lg" 
          p={4}
          borderWidth={1}
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size={isMobile ? "md" : "lg"} color={accentColor} fontWeight="bold">
                🖼️ 그림 맞추기
              </Heading>
              <HStack spacing={2}>
                <Badge colorScheme="purple" variant="subtle" rounded="full" px={3}>
                  {currentImageIndex + 1} / {images.length}
                </Badge>
                <Badge colorScheme="green" variant="subtle" rounded="full" px={3}>
                  {revealPercentage}% 선명도
                </Badge>
              </HStack>
            </VStack>
            <Progress 
              value={(currentImageIndex + 1) / images.length * 100} 
              size="lg" 
              colorScheme="purple" 
              w="100px" 
              rounded="full"
            />
          </Flex>
        </Box>

        {/* 이미지 영역 */}
        <Box 
          position="relative" 
          w="full" 
          h={imageHeight}
          bg={cardBg}
          rounded="2xl" 
          shadow="2xl"
          overflow="hidden"
          borderWidth={2}
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Image
            src={images[currentImageIndex].src}
            alt={`게임 이미지 ${currentImageIndex + 1}`}
            objectFit="cover"
            w="full"
            h="full"
            filter={`blur(${getBlurIntensity(revealPercentage)})`}
            transition="all 0.4s ease-in-out"
            draggable={false}
          />

          {/* 네비게이션 버튼들 */}
          <IconButton
            aria-label="이전 이미지"
            icon={<ChevronLeftIcon boxSize={6} />}
            size="lg"
            isRound
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrevImage}
            isDisabled={currentImageIndex === 0}
            bg={useColorModeValue("whiteAlpha.900", "gray.700")}
            color={buttonBg}
            _hover={{
              bg: useColorModeValue("white", "gray.600"),
              transform: "translateY(-50%) scale(1.1)",
            }}
            _disabled={{
              opacity: 0.3,
              cursor: "not-allowed"
            }}
            shadow="lg"
            transition="all 0.2s"
          />
          
          <IconButton
            aria-label="다음 이미지"
            icon={<ChevronRightIcon boxSize={6} />}
            size="lg"
            isRound
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNextImage}
            isDisabled={currentImageIndex === images.length - 1}
            bg={useColorModeValue("whiteAlpha.900", "gray.700")}
            color={buttonBg}
            _hover={{
              bg: useColorModeValue("white", "gray.600"),
              transform: "translateY(-50%) scale(1.1)",
            }}
            _disabled={{
              opacity: 0.3,
              cursor: "not-allowed"
            }}
            shadow="lg"
            transition="all 0.2s"
          />
        </Box>

        {/* 컨트롤 패널 */}
        <Box 
          w="full" 
          bg={cardBg} 
          rounded="xl" 
          shadow="lg" 
          p={6}
          borderWidth={1}
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <VStack spacing={6}>
            {/* 퀵 버튼들 */}
            <VStack spacing={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                🎯 선명도 조절
              </Text>
              <ButtonGroup size={isMobile ? "sm" : "md"} isAttached variant="outline" w="full">
                {[10, 30, 50, 80, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    onClick={() => setRevealPercentage(percentage)}
                    flex={1}
                    bg={revealPercentage === percentage ? buttonBg : "transparent"}
                    color={revealPercentage === percentage ? "white" : textColor}
                    borderColor={buttonBg}
                    _hover={{
                      bg: revealPercentage === percentage ? buttonBg : useColorModeValue("purple.50", "purple.800"),
                      transform: "translateY(-2px)",
                    }}
                    transition="all 0.2s"
                    fontWeight="bold"
                  >
                    {percentage}%
                  </Button>
                ))}
              </ButtonGroup>
            </VStack>

            {/* 슬라이더 */}
            <VStack spacing={4} w="full">
              <Flex justify="space-between" w="full" fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                <Text fontWeight="medium">🌫️ 흐림</Text>
                <Text fontWeight="bold" fontSize="lg" color={accentColor}>
                  {revealPercentage}%
                </Text>
                <Text fontWeight="medium">✨ 선명</Text>
              </Flex>
              
              <Slider
                value={revealPercentage}
                onChange={setRevealPercentage}
                min={10}
                max={100}
                step={5}
                w="full"
                colorScheme="purple"
                size="lg"
              >
                <SliderTrack bg={useColorModeValue("gray.200", "gray.600")} h={2} rounded="full">
                  <SliderFilledTrack rounded="full" />
                </SliderTrack>
                <SliderThumb 
                  boxSize={6} 
                  bg={buttonBg}
                  shadow="lg"
                  _focus={{ boxShadow: `0 0 0 3px ${useColorModeValue("purple.100", "purple.800")}` }}
                />
              </Slider>
              
              <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} textAlign="center">
                👆 슬라이더를 드래그하거나 버튼을 눌러 선명도를 조절하세요
              </Text>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}