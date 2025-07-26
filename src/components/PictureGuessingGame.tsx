import React, {useState, useEffect} from 'react'
import {Box, Button, Flex, Heading, Image, Text, useBreakpointValue} from "@chakra-ui/react"

interface GameImage {
  src: string;
  name?: string; // 이미지 이름 추가
}

export default function PictureGuessingGame() {
  const [currentImage, setCurrentImage] = useState<GameImage | null>(null)
  const [revealPercentage, setRevealPercentage] = useState(10)
  const [isDragging, setIsDragging] = useState(false)
  const [shownImageIndices, setShownImageIndices] = useState<Set<number>>(new Set())
  const [previousPercentage, setPreviousPercentage] = useState(10)

  // 초기 이미지 로드
  useEffect(() => {
    loadNextRandomImage()
  }, [])

  // 선명도가 100%가 되면 이미지 이름을 소리로 읽어주는 효과
  useEffect(() => {
    if (revealPercentage === 100 && previousPercentage !== 100 && currentImage?.name) {
      speakImageName(currentImage.name);
    }
    setPreviousPercentage(revealPercentage);
  }, [revealPercentage, currentImage]);

  // 이미지 이름을 소리로 읽어주는 함수
  const speakImageName = (name: string) => {
    if ('speechSynthesis' in window) {
      // 진행 중인 음성이 있으면 중지
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(name);
      utterance.lang = 'en-US'; // 영어로 설정
      utterance.rate = 0.9; // 약간 느린 속도로 설정
      utterance.pitch = 1; // 기본 음높이

      window.speechSynthesis.speak(utterance);
    }
  }

  // 다음 랜덤 이미지를 로드하는 함수
  const loadNextRandomImage = () => {
    const allImages = getAllImages()
    
    // 아직 보지 않은 이미지들 필터링
    const availableImages = allImages
      .map((image, index) => ({ ...image, originalIndex: index }))
      .filter(img => !shownImageIndices.has(img.originalIndex))

    // 모든 이미지를 다 봤으면 알림
    if (availableImages.length === 0) {
      alert('🎉 모든 이미지를 다 보셨습니다! 새로고침하면 다시 시작할 수 있어요.')
      return
    }
    
    // 랜덤하게 하나 선택
    const randomIndex = Math.floor(Math.random() * availableImages.length)
    const selectedImage = availableImages[randomIndex]
    
    setCurrentImage({ src: selectedImage.src, name: selectedImage.name })
    setShownImageIndices(prev => new Set([...prev, selectedImage.originalIndex]))
    setRevealPercentage(10)
  }

  // 새 이미지 세트 시작 (표시된 이미지 목록 초기화)
  const refreshImages = () => {
    setShownImageIndices(new Set())
    loadNextRandomImage()
  }
  // 반응형 크기 설정
  const isMobile = useBreakpointValue({ base: true, md: false })
  const imageHeight = useBreakpointValue({ base: "70vh", md: "60vh" })
  const containerPadding = useBreakpointValue({ base: 2, md: 4 })


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
    ]
  }

  // 다음 이미지로 넘어가기
  const handleNextImage = () => {
    loadNextRandomImage()
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
    <Box minH="100vh" bg="gray.50" p={containerPadding}>
      <Box display="flex" flexDirection="column" gap={4} h="100vh">
        {/* 헤더 */}
        <Box 
          w="full" 
          bg="white" 
          rounded="xl" 
          shadow="lg" 
          p={4}
          borderWidth={1}
          borderColor="gray.200"
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size={isMobile ? "md" : "lg"} color="purple.500" fontWeight="bold">
                🖼️ 그림 맞추기
              </Heading>
              <Flex gap={2} mt={2}>
                <Button
                  size="sm"
                  onClick={refreshImages}
                  colorScheme="blue"
                  variant="outline"
                  fontSize="xs"
                  px={3}
                  py={1}
                  h="auto"
                  minH="28px"
                  _hover={{
                    transform: "translateY(-1px)",
                    shadow: "md"
                  }}
                  transition="all 0.2s"
                >
                  🔄 새 이미지
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* 이미지 영역 */}
        <Box 
          position="relative" 
          w="full" 
          h={imageHeight}
          bg="white"
          rounded="2xl" 
          shadow="2xl"
          overflow="hidden"
          borderWidth={2}
          borderColor="gray.200"
        >
          {currentImage && (
            <>
              <Image
                src={currentImage.src}
                alt="게임 이미지"
                objectFit="cover"
                w="full"
                h="full"
                filter={`blur(${getBlurIntensity(revealPercentage)})`}
                transition="all 0.4s ease-in-out"
                draggable={false}
              />

              {/* 이미지 이름 표시 - 선명도가 80% 이상일 때만 표시 */}
              {revealPercentage >= 80 && currentImage.name && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg="blackAlpha.700"
                  color="white"
                  py={3}
                  px={4}
                  textAlign="center"
                  opacity={revealPercentage >= 95 ? 1 : (revealPercentage - 80) / 20}
                  transition="opacity 0.4s ease-in-out"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    {currentImage.name}
                  </Text>
                </Box>
              )}
            </>
          )}

          {/* 다음 이미지 버튼 */}
          <Button
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNextImage}
            bg="whiteAlpha.900"
            color="purple.500"
            _hover={{
              bg: "white",
              transform: "translateY(-50%) scale(1.1)",
            }}
            shadow="lg"
            transition="all 0.2s"
            borderRadius="full"
            w="12"
            h="12"
            fontSize="xl"
            fontWeight="bold"
          >
            →
          </Button>
        </Box>

        {/* 컨트롤 패널 */}
        <Box 
          w="full" 
          bg="white" 
          rounded="xl" 
          shadow="lg" 
          p={6}
          borderWidth={1}
          borderColor="gray.200"
        >
          <Box display="flex" flexDirection="column" gap={6}>
            {/* 퀵 버튼들 */}
            <Box display="flex" flexDirection="column" gap={3} w="full">
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                🎯 선명도 조절
              </Text>
              <Flex gap={1} w="full" justify="center">
                {[10, 30, 50, 80, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    onClick={() => setRevealPercentage(percentage)}
                    w="50px"
                    h="32px"
                    bg={revealPercentage === percentage ? "purple.500" : "transparent"}
                    color={revealPercentage === percentage ? "white" : "gray.800"}
                    borderColor="purple.500"
                    borderWidth={1}
                    _hover={{
                      bg: revealPercentage === percentage ? "purple.500" : "purple.50",
                      transform: "translateY(-1px)",
                    }}
                    transition="all 0.2s"
                    fontWeight="bold"
                    fontSize="xs"
                    rounded="md"
                  >
                    {percentage}%
                  </Button>
                ))}
              </Flex>
            </Box>

            {/* 슬라이더 영역 */}
            <Box display="flex" flexDirection="column" gap={4} w="full">
              <Flex justify="space-between" w="full" fontSize="sm" color="gray.600">
                <Text fontWeight="medium">🌫️ 흐림</Text>
                <Text fontWeight="bold" fontSize="lg" color="purple.500">
                  {revealPercentage}%
                </Text>
                <Text fontWeight="medium">✨ 선명</Text>
              </Flex>
              
              {/* 드래그 가능한 슬라이더 */}
              <Box position="relative" w="full" h="8" display="flex" alignItems="center">
                <Box 
                  w="full" 
                  h="3" 
                  bg="gray.200" 
                  rounded="full" 
                  position="relative"
                  cursor="pointer"
                  onClick={(e) => {
                    if (!isDragging) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = Math.round((x / rect.width) * 90 + 10);
                      setRevealPercentage(Math.max(10, Math.min(100, percentage)));
                    }
                  }}
                >
                  <Box 
                    h="full" 
                    bg="purple.500" 
                    rounded="full"
                    w={`${(revealPercentage - 10) / 90 * 100}%`}
                    transition={isDragging ? "none" : "width 0.2s"}
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left={`${(revealPercentage - 10) / 90 * 100}%`}
                    transform="translate(-50%, -50%)"
                    w="7"
                    h="7"
                    bg="white"
                    border="3px solid"
                    borderColor="purple.500"
                    rounded="full"
                    shadow="lg"
                    cursor={isDragging ? "grabbing" : "grab"}
                    _hover={{ transform: "translate(-50%, -50%) scale(1.1)" }}
                    transition={isDragging ? "none" : "transform 0.1s"}
                    onMouseDown={(e) => {
                      setIsDragging(true);
                      const handleMouseMove = (moveEvent: MouseEvent) => {
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
                    }}
                  />
                </Box>
              </Box>
              
              <Text fontSize="sm" color="gray.600" textAlign="center">
                👆 슬라이더를 드래그하거나 버튼을 눌러 선명도를 조절하세요
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}