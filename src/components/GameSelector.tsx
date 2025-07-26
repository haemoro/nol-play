import React, {useState} from 'react'
import {Box, Button, Heading, Text} from "@chakra-ui/react"
import PictureGuessingGame from './PictureGuessingGame'
import ColoringGame from './ColoringGame'

type GameType = 'selector' | 'picture-guessing' | 'coloring'

export default function GameSelector() {
  const [currentGame, setCurrentGame] = useState<GameType>('selector')

  const games = [
    {
      id: 'picture-guessing' as GameType,
      title: '🖼️ 그림 맞추기',
      description: '흐린 이미지를 보고 무엇인지 맞춰보세요!',
      color: 'purple'
    },
    {
      id: 'coloring' as GameType,
      title: '🎨 색칠하기',
      description: '선화에 예쁜 색깔을 칠해보세요!',
      color: 'pink'
    }
  ]

  if (currentGame === 'picture-guessing') {
    return (
        <Box>
          <Button
              position="fixed"
              top={4}
              left={4}
              onClick={() => setCurrentGame('selector')}
              colorScheme="purple"
              size="sm"
              shadow="xl"
              zIndex={9999}
              borderRadius="full"
              px={4}
          >
            🏠 홈
          </Button>
          <PictureGuessingGame/>
        </Box>
    )
  }

  if (currentGame === 'coloring') {
    return (
        <Box>
          <Button
              position="fixed"
              top={4}
              left={4}
              onClick={() => setCurrentGame('selector')}
              colorScheme="pink"
              size="sm"
              shadow="xl"
              zIndex={9999}
              borderRadius="full"
              px={4}
          >
            🏠 홈
          </Button>
          <ColoringGame/>
        </Box>
    )
  }

  return (
      <Box minH="100vh" bg="gray.50" p={4}>
        <Box maxW="800px" mx="auto">
          {/* 메인 배너 */}
          <Box 
            position="relative"
            rounded="2xl" 
            overflow="hidden" 
            shadow="2xl" 
            mb={8}
            mt={4}
            h={{base: "200px", md: "300px"}}
          >
            <Box
              w="full"
              h="full"
              bgImage="url('/main.JPG')"
              bgRepeat="no-repeat"
              bgSize="cover"
              position="relative center"
            >
              {/* 오버레이 */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="blackAlpha.400"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box textAlign="center" color="white">

                </Box>
              </Box>
            </Box>
          </Box>

          {/* 게임 카드들 */}
          <Box display="grid" gridTemplateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap={6}>
            {games.map((game) => (
                <Box
                    key={game.id}
                    bg="white"
                    rounded="xl"
                    shadow="lg"
                    p={8}
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "xl"
                    }}
                    onClick={() => setCurrentGame(game.id)}
                >
                  <Text fontSize="4xl" mb={4}>
                    {game.title.split(' ')[0]}
                  </Text>
                  <Heading size="lg" mb={3} color={`${game.color}.600`}>
                    {game.title.split(' ').slice(1).join(' ')}
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    {game.description}
                  </Text>
                  <Button
                      colorScheme={game.color}
                      size="lg"
                      w="full"
                  >
                    게임 시작 →
                  </Button>
                </Box>
            ))}
          </Box>

          {/* 푸터 */}
          <Box textAlign="center" mt={12} opacity={0.7}>
            <Text fontSize="sm" color="gray.500">
              모바일에 최적화된 재미있는 놀이 게임들
            </Text>
          </Box>
        </Box>
      </Box>
  )
}