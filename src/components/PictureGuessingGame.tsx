import React, {useState} from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue
} from "@chakra-ui/react"

interface GameImage {
  src: string
}

export default function PictureGuessingGame() {
  // 더 다양한 동물 검색어들
  const animalKeywords = [
    'cat', 'dog', 'elephant', 'lion', 'tiger', 'bear', 'wolf', 'fox', 
    'rabbit', 'deer', 'horse', 'cow', 'pig', 'sheep', 'giraffe', 'zebra',
    'panda', 'koala', 'monkey', 'gorilla', 'penguin', 'owl', 'eagle', 'parrot',
    'turtle', 'dolphin', 'whale', 'shark', 'fish', 'butterfly', 'bird', 'snake'
  ]

  // 실제 동물 이미지 URL들 (테스트용)
  const generateRandomImages = () => {
    const animalImages = [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop', // 고양이
      'https://images.unsplash.com/photo-1552053628-33e5423c6d70?w=800&h=600&fit=crop', // 강아지
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 코끼리
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop', // 사자
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop', // 호랑이
      'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&h=600&fit=crop', // 곰
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=600&fit=crop', // 늑대
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=600&fit=crop', // 여우
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop', // 토끼
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop', // 사슴
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', // 말
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop', // 소
      'https://images.unsplash.com/photo-1539307522126-471455ecbbf6?w=800&h=600&fit=crop', // 돼지
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&h=600&fit=crop', // 양
      'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop', // 기린
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&h=600&fit=crop', // 얼룩말
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 팬더
      'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=800&h=600&fit=crop', // 코알라
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop', // 원숭이
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop'  // 고릴라
    ]
    
    const shuffled = [...animalImages].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 15).map((src, index) => ({
      src: src,
      keyword: animalKeywords[index] || 'animal'
    }))
  }

  const [images, setImages] = useState<(GameImage & {keyword?: string})[]>(generateRandomImages)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [revealPercentage, setRevealPercentage] = useState(10)
  const [isDragging, setIsDragging] = useState(false)
  const [shownImageIndices, setShownImageIndices] = useState<Set<number>>(new Set())

  // 초기 이미지들을 표시된 목록에 추가
  React.useEffect(() => {
    const allImages = getAllImages()
    const initialIndices = images.map(img => allImages.findIndex(src => src === img.src)).filter(idx => idx !== -1)
    setShownImageIndices(new Set(initialIndices))
  }, [])

  // 사용되지 않은 이미지들로 새로운 세트 생성
  const refreshImages = () => {
    // 동물 이미지 (검증된 이미지들만)
    const animalImages = [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop', // 고양이
      'https://images.unsplash.com/photo-1552053628-33e5423c6d70?w=800&h=600&fit=crop', // 강아지
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 코끼리
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop', // 사자
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop', // 호랑이
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=600&fit=crop', // 늑대
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=600&fit=crop', // 여우
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop', // 토끼
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop', // 사슴
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', // 말
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop', // 소
      'https://images.unsplash.com/photo-1539307522126-471455ecbbf6?w=800&h=600&fit=crop', // 돼지
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&h=600&fit=crop', // 양
      'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop', // 기린
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&h=600&fit=crop', // 얼룩말
      'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=800&h=600&fit=crop', // 코알라
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop', // 원숭이
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop', // 펭귄
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=600&fit=crop', // 부엉이
      'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&h=600&fit=crop', // 앵무새
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=600&fit=crop', // 거북이
      'https://images.unsplash.com/photo-1544550581-6425c2b07f07?w=800&h=600&fit=crop', // 돌고래
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나비
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // 알파카
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=800&h=600&fit=crop', // 라마
      'https://images.unsplash.com/photo-1608496601160-f86d19a44f9f?w=800&h=600&fit=crop', // 수달
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&h=600&fit=crop', // 고슴도치
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop', // 돌고래2
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop', // 도마뱀
      'https://images.unsplash.com/photo-1611090539351-0a9b00db9d18?w=800&h=600&fit=crop'  // 악어
    ]

    // 과일 이미지 (검증된 이미지들만)
    const fruitImages = [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop', // 사과
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&h=600&fit=crop', // 바나나
      'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=600&fit=crop', // 오렌지
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&h=600&fit=crop', // 딸기
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=600&fit=crop', // 포도
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop', // 파인애플
      'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&h=600&fit=crop', // 키위
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop', // 체리
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 수박
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop', // 블루베리
      'https://images.unsplash.com/photo-1577003833619-76bbd7f82b8d?w=800&h=600&fit=crop', // 레몬
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop', // 라임
      'https://images.unsplash.com/photo-1596040033229-a75961d4c3ae?w=800&h=600&fit=crop', // 아보카도
      'https://images.unsplash.com/photo-1548826564-9be1cc98eb8e?w=800&h=600&fit=crop', // 무화과
      'https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?w=800&h=600&fit=crop', // 배
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&h=600&fit=crop', // 용과
      'https://images.unsplash.com/photo-1565875605266-9c40fcbf1a66?w=800&h=600&fit=crop', // 패션프루트
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 크랜베리
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=600&fit=crop', // 망고
      'https://images.unsplash.com/photo-1571082847467-58de18f5e3a9?w=800&h=600&fit=crop'  // 복숭아
    ]

    // 채소 이미지 (검증된 이미지들만)
    const vegetableImages = [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop', // 당근
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop', // 토마토
      'https://images.unsplash.com/photo-1459307738818-935adf4314df?w=800&h=600&fit=crop', // 브로콜리
      'https://images.unsplash.com/photo-1557322437-8c8b5c2d3b75?w=800&h=600&fit=crop', // 감자
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=600&fit=crop', // 고추
      'https://images.unsplash.com/photo-1618684142201-e4421b279a6b?w=800&h=600&fit=crop', // 상추
      'https://images.unsplash.com/photo-1550301572-f7d4d6c9e8da?w=800&h=600&fit=crop', // 배추
      'https://images.unsplash.com/photo-1509963178-13b2134d5e79?w=800&h=600&fit=crop', // 가지
      'https://images.unsplash.com/photo-1534940027829-c0fe4c7b81b8?w=800&h=600&fit=crop', // 호박
      'https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=800&h=600&fit=crop', // 시금치
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop', // 마늘
      'https://images.unsplash.com/photo-1571082847467-58de18f5e3a9?w=800&h=600&fit=crop', // 고구마
      'https://images.unsplash.com/photo-1589663200631-8b6c8db3ae8e?w=800&h=600&fit=crop', // 오이
      'https://images.unsplash.com/photo-1551515018-86c6ad52e2b7?w=800&h=600&fit=crop', // 양파
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop', // 피망
      'https://images.unsplash.com/photo-1566491597503-06b0e8c50eaa?w=800&h=600&fit=crop', // 셀러리
      'https://images.unsplash.com/photo-1566491597503-06b0e8c50eaa?w=800&h=600&fit=crop', // 아스파라거스
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 무
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop', // 케일
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop'  // 생강
    ]

    // 곤충 이미지 (검증된 이미지들만)
    const insectImages = [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나비
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop', // 벌
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 개미
      'https://images.unsplash.com/photo-1583901101205-c6b239c9aa14?w=800&h=600&fit=crop', // 거미
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&h=600&fit=crop', // 잠자리
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 메뚜기
      'https://images.unsplash.com/photo-1557088080-3b26d3839b95?w=800&h=600&fit=crop', // 사마귀
      'https://images.unsplash.com/photo-1560910110-fb7c6c5a8b4b?w=800&h=600&fit=crop', // 무당벌레
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 딱정벌레
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop', // 매미
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop', // 장수풍뎅이
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop', // 반딧불이
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 꿀벌
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나방
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop'  // 하루살이
    ]

    // 모든 이미지를 하나의 배열로 합치기
    const allImages = [...animalImages, ...fruitImages, ...vegetableImages, ...insectImages]

    // 한 번도 표시되지 않은 이미지들만 필터링 (전체 세션 기준)
    const availableImages = allImages
      .map((src, index) => ({ src, originalIndex: index }))
      .filter(img => !shownImageIndices.has(img.originalIndex))

    // 사용 가능한 이미지가 20개 미만이면 알림 (더 이상 새로운 이미지 없음)
    if (availableImages.length < 20) {
      // 모든 이미지를 다 봤으면 알림
      if (availableImages.length === 0) {
        alert('🎉 모든 이미지를 다 보셨습니다! 새로고침하면 다시 시작할 수 있어요.')
        return
      }
      // 남은 이미지가 20개 미만이면 남은 것들로만 구성
      const shuffled = [...availableImages].sort(() => Math.random() - 0.5)
      const newImages = shuffled.map((img, index) => ({
        src: img.src,
        keyword: 'mystery'
      }))
      setImages(newImages)
      
      // 새로 선택된 이미지들을 표시된 목록에 추가
      const selectedIndices = shuffled.map(img => img.originalIndex)
      setShownImageIndices(prev => new Set([...prev, ...selectedIndices]))
    } else {
      // 표시되지 않은 이미지들 중에서 랜덤 20개 선택
      const shuffled = [...availableImages].sort(() => Math.random() - 0.5)
      const selectedImages = shuffled.slice(0, 20)
      
      const newImages = selectedImages.map((img) => ({
        src: img.src,
        keyword: 'mystery'
      }))
      
      setImages(newImages)
      // 새로 선택된 이미지들을 표시된 목록에 추가
      const selectedIndices = selectedImages.map(img => img.originalIndex)
      setShownImageIndices(prev => new Set([...prev, ...selectedIndices]))
    }
    
    setCurrentImageIndex(0)
    setRevealPercentage(10)
  }

  // 반응형 크기 설정
  const isMobile = useBreakpointValue({ base: true, md: false })
  const imageHeight = useBreakpointValue({ base: "70vh", md: "60vh" })
  const containerPadding = useBreakpointValue({ base: 2, md: 4 })

  // 현재 이미지를 표시된 목록에 추가
  const markCurrentImageAsShown = () => {
    const currentImageSrc = images[currentImageIndex]?.src
    if (currentImageSrc) {
      // 전체 이미지 배열에서 현재 이미지의 인덱스 찾기
      const allImages = getAllImages()
      const globalIndex = allImages.findIndex(src => src === currentImageSrc)
      if (globalIndex !== -1) {
        setShownImageIndices(prev => new Set([...prev, globalIndex]))
      }
    }
  }

  // 모든 이미지 배열을 반환하는 헬퍼 함수 (refreshImages와 정확히 동일)
  const getAllImages = () => {
    // 동물 이미지 (검증된 이미지들만)
    const animalImages = [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=600&fit=crop', // 고양이
      'https://images.unsplash.com/photo-1552053628-33e5423c6d70?w=800&h=600&fit=crop', // 강아지
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 코끼리
      'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&h=600&fit=crop', // 사자
      'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop', // 호랑이
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&h=600&fit=crop', // 늑대
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&h=600&fit=crop', // 여우
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop', // 토끼
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&h=600&fit=crop', // 사슴
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop', // 말
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop', // 소
      'https://images.unsplash.com/photo-1539307522126-471455ecbbf6?w=800&h=600&fit=crop', // 돼지
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=800&h=600&fit=crop', // 양
      'https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=800&h=600&fit=crop', // 기린
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&h=600&fit=crop', // 얼룩말
      'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?w=800&h=600&fit=crop', // 코알라
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop', // 원숭이
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop', // 펭귄
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=600&fit=crop', // 부엉이
      'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&h=600&fit=crop', // 앵무새
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=600&fit=crop', // 거북이
      'https://images.unsplash.com/photo-1544550581-6425c2b07f07?w=800&h=600&fit=crop', // 돌고래
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나비
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // 알파카
      'https://images.unsplash.com/photo-1555169062-013468b47731?w=800&h=600&fit=crop', // 라마
      'https://images.unsplash.com/photo-1608496601160-f86d19a44f9f?w=800&h=600&fit=crop', // 수달
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&h=600&fit=crop', // 고슴도치
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=600&fit=crop', // 돌고래2
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop', // 도마뱀
      'https://images.unsplash.com/photo-1611090539351-0a9b00db9d18?w=800&h=600&fit=crop'  // 악어
    ]

    // 과일 이미지 (검증된 이미지들만)
    const fruitImages = [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop', // 사과
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&h=600&fit=crop', // 바나나
      'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&h=600&fit=crop', // 오렌지
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&h=600&fit=crop', // 딸기
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=600&fit=crop', // 포도
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop', // 파인애플
      'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&h=600&fit=crop', // 키위
      'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&h=600&fit=crop', // 체리
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 수박
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&h=600&fit=crop', // 블루베리
      'https://images.unsplash.com/photo-1577003833619-76bbd7f82b8d?w=800&h=600&fit=crop', // 레몬
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop', // 라임
      'https://images.unsplash.com/photo-1596040033229-a75961d4c3ae?w=800&h=600&fit=crop', // 아보카도
      'https://images.unsplash.com/photo-1548826564-9be1cc98eb8e?w=800&h=600&fit=crop', // 무화과
      'https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?w=800&h=600&fit=crop', // 배
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&h=600&fit=crop', // 용과
      'https://images.unsplash.com/photo-1565875605266-9c40fcbf1a66?w=800&h=600&fit=crop', // 패션프루트
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 크랜베리
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&h=600&fit=crop', // 망고
      'https://images.unsplash.com/photo-1571082847467-58de18f5e3a9?w=800&h=600&fit=crop'  // 복숭아
    ]

    // 채소 이미지 (검증된 이미지들만)
    const vegetableImages = [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop', // 당근
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop', // 토마토
      'https://images.unsplash.com/photo-1459307738818-935adf4314df?w=800&h=600&fit=crop', // 브로콜리
      'https://images.unsplash.com/photo-1557322437-8c8b5c2d3b75?w=800&h=600&fit=crop', // 감자
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=600&fit=crop', // 고추
      'https://images.unsplash.com/photo-1618684142201-e4421b279a6b?w=800&h=600&fit=crop', // 상추
      'https://images.unsplash.com/photo-1550301572-f7d4d6c9e8da?w=800&h=600&fit=crop', // 배추
      'https://images.unsplash.com/photo-1509963178-13b2134d5e79?w=800&h=600&fit=crop', // 가지
      'https://images.unsplash.com/photo-1534940027829-c0fe4c7b81b8?w=800&h=600&fit=crop', // 호박
      'https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=800&h=600&fit=crop', // 시금치
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop', // 마늘
      'https://images.unsplash.com/photo-1571082847467-58de18f5e3a9?w=800&h=600&fit=crop', // 고구마
      'https://images.unsplash.com/photo-1589663200631-8b6c8db3ae8e?w=800&h=600&fit=crop', // 오이
      'https://images.unsplash.com/photo-1551515018-86c6ad52e2b7?w=800&h=600&fit=crop', // 양파
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop', // 피망
      'https://images.unsplash.com/photo-1566491597503-06b0e8c50eaa?w=800&h=600&fit=crop', // 셀러리
      'https://images.unsplash.com/photo-1566491597503-06b0e8c50eaa?w=800&h=600&fit=crop', // 아스파라거스
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 무
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop', // 케일
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop'  // 생강
    ]

    // 곤충 이미지 (검증된 이미지들만)
    const insectImages = [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나비
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop', // 벌
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 개미
      'https://images.unsplash.com/photo-1583901101205-c6b239c9aa14?w=800&h=600&fit=crop', // 거미
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&h=600&fit=crop', // 잠자리
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop', // 메뚜기
      'https://images.unsplash.com/photo-1557088080-3b26d3839b95?w=800&h=600&fit=crop', // 사마귀
      'https://images.unsplash.com/photo-1560910110-fb7c6c5a8b4b?w=800&h=600&fit=crop', // 무당벌레
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // 딱정벌레
      'https://images.unsplash.com/photo-1567621905961-7e7d4ac2fe7d?w=800&h=600&fit=crop', // 매미
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop', // 장수풍뎅이
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop', // 반딧불이
      'https://images.unsplash.com/photo-1563142651-04502981d311?w=800&h=600&fit=crop', // 꿀벌
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', // 나방
      'https://images.unsplash.com/photo-1571079570759-504c0ca7957e?w=800&h=600&fit=crop'  // 하루살이
    ]

    return [...animalImages, ...fruitImages, ...vegetableImages, ...insectImages]
  }

  // 이미지 내비게이션 함수
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      markCurrentImageAsShown() // 현재 이미지를 표시된 목록에 추가
      setCurrentImageIndex(prev => prev - 1)
      setRevealPercentage(10)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      markCurrentImageAsShown() // 현재 이미지를 표시된 목록에 추가
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
                <Box 
                  bg="purple.100" 
                  color="purple.800" 
                  px={3} 
                  py={1} 
                  rounded="full" 
                  fontSize="sm" 
                  fontWeight="bold"
                >
                  {currentImageIndex + 1} / {images.length}
                </Box>
                <Box 
                  bg="green.100" 
                  color="green.800" 
                  px={3} 
                  py={1} 
                  rounded="full" 
                  fontSize="sm" 
                  fontWeight="bold"
                >
                  {revealPercentage}% 선명도
                </Box>
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
            <Box 
              w="100px" 
              h="4" 
              bg="gray.200" 
              rounded="full" 
              overflow="hidden"
            >
              <Box 
                h="full" 
                bg="purple.500" 
                w={`${(currentImageIndex + 1) / images.length * 100}%`}
                transition="width 0.3s"
              />
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
          <Button
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
            bg="whiteAlpha.900"
            color="purple.500"
            _hover={{
              bg: "white",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _disabled={{
              opacity: 0.3,
              cursor: "not-allowed"
            }}
            shadow="lg"
            transition="all 0.2s"
            borderRadius="full"
            w="12"
            h="12"
            fontSize="xl"
            fontWeight="bold"
          >
            ←
          </Button>
          
          <Button
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNextImage}
            disabled={currentImageIndex === images.length - 1}
            bg="whiteAlpha.900"
            color="purple.500"
            _hover={{
              bg: "white",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _disabled={{
              opacity: 0.3,
              cursor: "not-allowed"
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