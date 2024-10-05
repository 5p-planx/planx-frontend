const tempSeongSuData = {
  카페: [
    {
      name: '자그마치',
      address: '성수이로 88',
      hours: '매일 11:00 - 23:00',
      latitude: 37.5426704339174,
      longitude: 127.056766212447,
      mood: ['트렌디한'],
      placeType: '카페',
      description: '자그마치는 넓은 공간을 자랑하며, 모던하고 트렌디한 인테리어로 성수동의 대표적인 카페로 자리 잡았습니다.',
    },
    {
      name: '대림창고',
      address: '성수이로 78',
      hours: '매일 11:00 - 23:00',
      latitude: 37.5416392066484,
      longitude: 127.056647865179,
      mood: ['이국적인', '힐링'],
      placeType: '카페',
      description: '과거 창고를 개조하여 만든 성수동의 대표적인 힐링 카페입니다.',
    },
    {
      name: '훔볼트',
      address: '성수이로 58',
      hours: '평일 07:00 - 22:00 / 주말 10:00 - 22:00',
      latitude: 37.5400995344191,
      longitude: 127.055602663956,
      mood: ['조용한'],
      placeType: '카페',
      description: '조용하고 차분한 분위기의 훔볼트는 성수동에서 업무나 독서를 즐기는 이들에게 인기가 많습니다.',
    },
    {
      name: '양면성',
      address: '성수이로12길 13',
      hours: '화-일 11:30 - 21:00 (월요일 휴무)',
      latitude: 37.5397823826391,
      longitude: 127.056738790521,
      mood: ['트렌디한', '즐거운'],
      placeType: '카페',
      description: '이국적인 인테리어와 독특한 메뉴 구성이 돋보이는 양면성은 성수동의 새로운 핫플레이스입니다.',
    },
    {
      name: '카멜커피',
      address: '성덕정19길 6',
      hours: '매일 11:30 - 20:00',
      latitude: 37.5372437584684,
      longitude: 127.055912373351,
      mood: ['조용한', '트렌디한'],
      placeType: '카페',
      description: '카멜커피는 깔끔한 디자인과 함께 트렌디한 분위기를 자아내는 곳입니다.',
    },
    {
      name: '레필로소피',
      address: '성수이로 65',
      hours: '평일 08:00 - 23:00 / 주말 13:00 - 23:00',
      latitude: 37.5409753805242,
      longitude: 127.055444676004,
      mood: ['분위기 좋은'],
      placeType: '카페',
      description: '아늑한 분위기와 고급스러운 인테리어가 돋보이는 카페입니다.',
    },
    {
      name: '사진창고',
      address: '성수이로7길 26',
      hours: '매일 09:30 - 22:00',
      latitude: 37.5415884366623,
      longitude: 127.05424639,
      mood: ['이국적인'],
      placeType: '카페',
      description: '사진 스튜디오를 개조한 이색적인 분위기의 카페입니다.',
    },
    {
      name: '쉐어드테이블',
      address: '연무장길 47',
      hours: '매일 09:00 - 23:00',
      latitude: 37.5427988846981,
      longitude: 127.05473417315,
      mood: ['트렌디한', '즐거운'],
      placeType: '카페',
      description: '현대적이고 활기찬 분위기의 트렌디한 카페입니다.',
    },
    {
      name: '멜로워',
      address: '성수이로7길 39',
      hours: '평일 08:00 - 22:00 / 주말 10:00 - 22:00',
      latitude: 37.5425331453144,
      longitude: 127.053233219739,
      mood: ['조용한'],
      placeType: '카페',
      description: '커피 애호가들에게 추천할 만한 조용하고 깔끔한 카페입니다.',
    },
    {
      name: '오르에르',
      address: '연무장길 18',
      hours: '매일 11:00 - 22:00',
      latitude: 37.5435207423,
      longitude: 127.051376477438,
      mood: ['힐링', '이국적인'],
      placeType: '카페',
      description: '자연스러운 인테리어와 편안한 분위기를 제공하는 힐링 카페입니다.',
    },
  ],
  산책로_공원: [
    {
      name: '서울숲',
      address: '뚝섬로 273',
      hours: '상시 개방',
      latitude: 37.544547,
      longitude: 127.037758,
      mood: ['힐링', '즐거운'],
      placeType: '산책',
      description: '서울숲은 넓은 공간과 다양한 테마를 갖춘 공원으로 산책과 여가를 즐기기 좋은 장소입니다.',
    },
    {
      name: '뚝섬유원지',
      address: '성수동1가 685-541',
      hours: '상시 개방',
      latitude: 37.529682,
      longitude: 127.066062,
      mood: ['힐링'],
      placeType: '산책',
      description: '한강을 따라 산책할 수 있는 공간으로, 피크닉과 야경을 즐기기 좋은 명소입니다.',
    },
    {
      name: '성수근린공원',
      address: '성수동1가 656',
      hours: '상시 개방',
      latitude: 37.543123,
      longitude: 127.058582,
      mood: ['조용한', '힐링'],
      placeType: '공원',
      description: '작은 규모의 공원으로 조용한 산책을 즐기기 좋으며, 휴식 공간이 잘 마련되어 있습니다.',
    },
    {
      name: '양화대교 북단',
      address: '성수동1가',
      hours: '상시 개방',
      latitude: 37.533102,
      longitude: 127.061875,
      mood: ['이국적인', '힐링'],
      placeType: '산책',
      description: '양화대교와 한강을 배경으로 이국적인 풍경을 감상할 수 있는 산책로입니다.',
    },
  ],
};
