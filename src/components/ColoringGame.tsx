import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  ButtonGroup
} from "@chakra-ui/react"

interface ColoringTemplate {
  id: string
  name: string
  outlineUrl: string
  referenceUrl?: string
}

export default function ColoringGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#FF6B6B')
  const [brushSize, setBrushSize] = useState(8)
  const [currentTemplate, setCurrentTemplate] = useState(0)
  const [currentTool, setCurrentTool] = useState<'brush' | 'bucket'>('brush')
  
  // 반응형 설정
  const isMobile = useBreakpointValue({ base: true, md: false })
  const canvasSize = useBreakpointValue({ base: 350, md: 500 })
  
  // 색칠하기 템플릿들
  const templates: ColoringTemplate[] = [
    {
      id: 'cat',
      name: '고양이',
      outlineUrl: 'https://source.unsplash.com/400x400/?cat,outline,drawing',
    },
    {
      id: 'flower',
      name: '꽃',
      outlineUrl: 'https://source.unsplash.com/400x400/?flower,outline,drawing',
    },
    {
      id: 'butterfly',
      name: '나비',
      outlineUrl: 'https://source.unsplash.com/400x400/?butterfly,outline,drawing',
    }
  ]

  // 색상 팔레트
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85929E', '#2C3E50',
    '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6',
    '#1ABC9C', '#34495E', '#000000', '#FFFFFF', '#95A5A6'
  ]

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvasSize || 400
    canvas.height = canvasSize || 400
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 흰색 배경으로 초기화
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 템플릿 이미지 로드
    loadTemplate()
  }, [canvasSize, currentTemplate])

  const loadTemplate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // 임시로 간단한 선화를 그려줍니다 (실제로는 이미지를 로드)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 샘플 선화 그리기 - 더 강한 선화
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // 나비 모양 그리기 (더 복잡하고 색칠하기 좋은 형태)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const size = Math.min(canvas.width, canvas.height) * 0.2
    
    // 나비 몸통
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - size * 1.5)
    ctx.lineTo(centerX, centerY + size * 1.5)
    ctx.stroke()
    
    // 상단 왼쪽 날개
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - size * 0.8)
    ctx.quadraticCurveTo(centerX - size * 1.2, centerY - size * 1.5, centerX - size * 0.8, centerY - size * 0.2)
    ctx.quadraticCurveTo(centerX - size * 0.4, centerY - size * 0.5, centerX, centerY - size * 0.8)
    ctx.stroke()
    
    // 상단 오른쪽 날개
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - size * 0.8)
    ctx.quadraticCurveTo(centerX + size * 1.2, centerY - size * 1.5, centerX + size * 0.8, centerY - size * 0.2)
    ctx.quadraticCurveTo(centerX + size * 0.4, centerY - size * 0.5, centerX, centerY - size * 0.8)
    ctx.stroke()
    
    // 하단 왼쪽 날개
    ctx.beginPath()
    ctx.moveTo(centerX, centerY + size * 0.2)
    ctx.quadraticCurveTo(centerX - size * 0.9, centerY + size * 1.2, centerX - size * 0.6, centerY + size * 0.8)
    ctx.quadraticCurveTo(centerX - size * 0.3, centerY + size * 0.5, centerX, centerY + size * 0.2)
    ctx.stroke()
    
    // 하단 오른쪽 날개
    ctx.beginPath()
    ctx.moveTo(centerX, centerY + size * 0.2)
    ctx.quadraticCurveTo(centerX + size * 0.9, centerY + size * 1.2, centerX + size * 0.6, centerY + size * 0.8)
    ctx.quadraticCurveTo(centerX + size * 0.3, centerY + size * 0.5, centerX, centerY + size * 0.2)
    ctx.stroke()
    
    // 나비 더듬이
    ctx.beginPath()
    ctx.moveTo(centerX - 5, centerY - size * 1.5)
    ctx.lineTo(centerX - 15, centerY - size * 1.8)
    ctx.moveTo(centerX + 5, centerY - size * 1.5)
    ctx.lineTo(centerX + 15, centerY - size * 1.8)
    ctx.stroke()
    
    // 날개 무늬
    ctx.beginPath()
    ctx.arc(centerX - size * 0.6, centerY - size * 0.8, size * 0.15, 0, Math.PI * 2)
    ctx.arc(centerX + size * 0.6, centerY - size * 0.8, size * 0.15, 0, Math.PI * 2)
    ctx.arc(centerX - size * 0.4, centerY + size * 0.6, size * 0.1, 0, Math.PI * 2)
    ctx.arc(centerX + size * 0.4, centerY + size * 0.6, size * 0.1, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Flood fill 알고리즘
  const floodFill = (x: number, y: number, fillColor: string) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    const targetColor = getPixelColor(data, x, y, canvas.width)
    const fillColorRgb = hexToRgb(fillColor)
    
    if (!fillColorRgb || colorsEqual(targetColor, fillColorRgb)) return
    
    const stack = [{x, y}]
    
    while (stack.length > 0) {
      const {x: currentX, y: currentY} = stack.pop()!
      
      if (currentX < 0 || currentX >= canvas.width || currentY < 0 || currentY >= canvas.height) continue
      
      const currentColor = getPixelColor(data, currentX, currentY, canvas.width)
      if (!colorsEqual(currentColor, targetColor)) continue
      
      setPixelColor(data, currentX, currentY, canvas.width, fillColorRgb)
      
      stack.push(
        {x: currentX + 1, y: currentY},
        {x: currentX - 1, y: currentY},
        {x: currentX, y: currentY + 1},
        {x: currentX, y: currentY - 1}
      )
    }
    
    ctx.putImageData(imageData, 0, 0)
  }

  const getPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number) => {
    const index = (y * width + x) * 4
    return {
      r: data[index],
      g: data[index + 1],
      b: data[index + 2],
      a: data[index + 3]
    }
  }

  const setPixelColor = (data: Uint8ClampedArray, x: number, y: number, width: number, color: {r: number, g: number, b: number}) => {
    const index = (y * width + x) * 4
    data[index] = color.r
    data[index + 1] = color.g
    data[index + 2] = color.b
    data[index + 3] = 255
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const colorsEqual = (c1: {r: number, g: number, b: number, a: number}, c2: {r: number, g: number, b: number}) => {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b
  }

  // 그리기 시작
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (currentTool === 'bucket') {
      handleBucketFill(e)
      return
    }
    setIsDrawing(true)
    draw(e)
  }, [currentColor, brushSize, currentTool])

  const handleBucketFill = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    let clientX: number, clientY: number

    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = Math.floor((clientX - rect.left) * scaleX)
    const y = Math.floor((clientY - rect.top) * scaleY)

    floodFill(x, y, currentColor)
  }

  // 그리기 중
  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    let clientX: number, clientY: number

    if ('touches' in e) {
      // 터치 이벤트
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // 마우스 이벤트
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = currentColor
    ctx.beginPath()
    ctx.arc(x, y, brushSize, 0, Math.PI * 2)
    ctx.fill()
  }, [isDrawing, currentColor, brushSize])

  // 그리기 종료
  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  // 캔버스 초기화
  const clearCanvas = () => {
    loadTemplate()
  }

  return (
    <Box minH="100vh" bg="gray.50" p={4}>
      <Box display="flex" flexDirection="column" gap={4} maxW="600px" mx="auto">
        {/* 헤더 */}
        <Box 
          bg="white" 
          rounded="xl" 
          shadow="lg" 
          p={4}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            bgGradient: 'linear(to-r, pink.400, purple.400, blue.400)',
            borderTopRadius: 'xl'
          }}
        >
          <Flex gap={4} align="center">
            {/* 홈 버튼 영역 (1) */}
            <Box flex="1">
              <Button
                size="sm"
                colorScheme="pink"
                variant="ghost"
                borderRadius="full"
                px={2}
                py={2}
                minW="40px"
                h="40px"
                onClick={() => window.history.back()}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.1)",
                  bg: "pink.50"
                }}
                _active={{
                  transform: "scale(0.95)"
                }}
              >
                🏠
              </Button>
            </Box>
            
            {/* 게임 정보 영역 (9) */}
            <Box flex="9">
              <Flex justify="space-between" align="center">
                <Box>
                  <Heading 
                    size={isMobile ? "md" : "lg"} 
                    color="pink.500" 
                    fontWeight="bold" 
                    mb={1}
                    bgGradient="linear(to-r, pink.500, purple.500)"
                    bgClip="text"
                  >
                    🎨 색칠하기 게임
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    {templates[currentTemplate].name} 템플릿
                  </Text>
                </Box>
                <Box textAlign="right">
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    진행률
                  </Text>
                  <Text 
                    fontSize="lg" 
                    fontWeight="bold" 
                    bgGradient="linear(to-r, pink.500, purple.500)"
                    bgClip="text"
                  >
                    {currentTemplate + 1}/{templates.length}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* 캔버스 영역 */}
        <Box bg="white" rounded="xl" shadow="lg" p={4}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
            <canvas
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                cursor: 'crosshair',
                touchAction: 'none',
                maxWidth: '100%',
                height: 'auto'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            
            {/* 도구 선택 */}
            <Flex gap={2} justify="center" mb={2}>
              <Button
                size="sm"
                onClick={() => setCurrentTool('brush')}
                colorScheme={currentTool === 'brush' ? 'pink' : 'gray'}
                variant={currentTool === 'brush' ? 'solid' : 'outline'}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
              >
                🖌️ 브러시
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrentTool('bucket')}
                colorScheme={currentTool === 'bucket' ? 'blue' : 'gray'}
                variant={currentTool === 'bucket' ? 'solid' : 'outline'}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
              >
                🪣 채우기
              </Button>
            </Flex>
            
            {/* 도구 버튼들 */}
            <Flex gap={2} wrap="wrap" justify="center">
              <Button
                size="sm"
                onClick={clearCanvas}
                colorScheme="gray"
                variant="outline"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
              >
                🗑️ 초기화
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrentTemplate((prev) => (prev + 1) % templates.length)}
                colorScheme="purple"
                variant="outline"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
              >
                🖼️ 다음 그림
              </Button>
            </Flex>
          </Box>
        </Box>

        {/* 브러시 크기 조절 */}
        <Box 
          bg="white" 
          rounded="xl" 
          shadow="lg" 
          p={4}
          transition="all 0.3s ease"
          _hover={{
            shadow: "xl"
          }}
        >
          <Text fontSize="sm" fontWeight="semibold" mb={3} textAlign="center" color="gray.700">
            🖌️ 브러시 크기
          </Text>
          <ButtonGroup size="sm" attached variant="outline" w="full" justifyContent="center">
            {[4, 8, 12, 20].map((size) => (
              <Button
                key={size}
                onClick={() => setBrushSize(size)}
                bg={brushSize === size ? "purple.500" : "transparent"}
                color={brushSize === size ? "white" : "gray.800"}
                flex={1}
                transition="all 0.3s ease"
                _hover={{
                  transform: brushSize !== size ? "translateY(-2px)" : "none",
                  bg: brushSize === size ? "purple.600" : "purple.50"
                }}
                _active={{
                  transform: "scale(0.95)"
                }}
              >
                {size}px
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {/* 색상 팔레트 */}
        <Box 
          bg="white" 
          rounded="xl" 
          shadow="lg" 
          p={4}
          transition="all 0.3s ease"
          _hover={{
            shadow: "xl"
          }}
        >
          <Text fontSize="sm" fontWeight="semibold" mb={3} textAlign="center" color="gray.700">
            🎨 색상 선택
          </Text>
          <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
            {colors.map((color, index) => (
              <Button
                key={color}
                h="40px"
                bg={color}
                border={currentColor === color ? "3px solid #2D3748" : "1px solid #E2E8F0"}
                _hover={{ 
                  transform: "scale(1.1)",
                  shadow: "lg",
                  zIndex: 1
                }}
                _active={{
                  transform: "scale(0.95)"
                }}
                onClick={() => setCurrentColor(color)}
                rounded="lg"
                transition="all 0.3s ease"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: currentColor === color ? "pulse 2s infinite" : "none",
                }}
                css={{
                  "@keyframes pulse": {
                    "0%, 100%": { 
                      boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7)" 
                    },
                    "70%": { 
                      boxShadow: "0 0 0 6px rgba(59, 130, 246, 0)" 
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}