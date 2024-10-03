import { mOne, one, seongsuBoundary, three } from '@/utils/seongsuLocation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { cls } from '@/utils/config';
import { useLikeStore, useMoodSettingStore } from '@/store/store';

const temData = [
  {
    name: '마를리',
    address: '서울 성동구 연무장길 47 홍원빌딩',
    lat: 37.544953,
    lng: 127.058436,
  },
  {
    name: '센터커피 서울숲점',
    address: '서울 성동구 서울숲2길 28-11',
    lat: 37.544889,
    lng: 127.041935,
  },
];

/*
100m 범위: zoom 값 18
200m 범위: zoom 값 17
300m 범위: zoom 값 16
500m 범위: zoom 값 15
*/

export default function Map() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showLike, setShowLike] = useState(false);
  const { mood, setMod, walkTime, setWalkTime, place, setPlace } = useMoodSettingStore();
  const { likeList, setLikeList } = useLikeStore();

  const selectPlace = (placeName: string) => {
    if (place.includes(placeName)) {
      setPlace(place.filter((selected: string) => selected !== placeName));
    } else {
      setPlace([...place, placeName]);
    }
  };

  useEffect(() => {
    const initMap = (lat: number, lng: number, isInSeongsu: boolean) => {
      const currentLocation = new naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: currentLocation,
        zoom: 15,
      };

      const map = new naver.maps.Map('map', mapOptions);

      // 현재 위치 마커 생성
      const currentLocationMarker = new naver.maps.Marker({
        position: currentLocation,
        map: map,
        title: '현재 위치',
        clickable: true,
        icon: {
          url: '/images/marker_my.svg',
          size: new naver.maps.Size(43, 53),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(21.5, 53),
        },
      });

      // 반경 100m 서클 생성
      const circle = new naver.maps.Circle({
        map: map,
        center: currentLocation,
        radius: 100, // 반경 100m
        strokeColor: '#FF977A',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#FEAD97',
        fillOpacity: 0.11,
      });

      // InfoWindow 생성 (마커 클릭 시 표시될 정보 창)
      const infoWindow = new naver.maps.InfoWindow({
        content: '', // 내용은 빈 상태로 초기화
      });

      temData.forEach((place) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.lat, place.lng),
          map: map,
          title: place.name,
          clickable: true,
        });

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () => {
          const content = `
            <div style="padding:10px;">
              <h4>${place.name}</h4>
              <p>${place.address}</p>
            </div>
          `;

          // InfoWindow에 내용 설정 후 해당 마커 위치에 표시
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      });
    };

    const loadMap = () => {
      // 성수동 중심 좌표
      const defaultLat = 37.544579;
      const defaultLng = 127.055831;

      // 성공 콜백 함수
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // 성수동의 대략적인 범위 설정
        const isInSeongsu = latitude >= 37.543 && latitude <= 37.546 && longitude >= 127.054 && longitude <= 127.058;

        if (isInSeongsu) {
          initMap(latitude, longitude, isInSeongsu); // 성수동 내 위치
        } else {
          initMap(defaultLat, defaultLng, isInSeongsu); // 성수동 외 위치
        }
      };

      // 오류 콜백 함수
      const error = () => {
        initMap(defaultLat, defaultLng, false); // 오류가 발생하면 성수역 좌표로 지도 초기화
      };

      // 현재 위치 확인
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, {
          enableHighAccuracy: true, // 높은 정확도 사용
        }); // 현재 위치 요청
      } else {
        // Geolocation을 지원하지 않으면 기본 좌표 사용
        initMap(defaultLat, defaultLng, false);
      }
    };

    if (window.naver && window.naver.maps) {
      loadMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => loadMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder`;
      document.head.appendChild(mapScript);
    }
  }, []);

  return (
    <div className="map_container">
      <div className="filter_area">
        <ul>
          <li className="bg-[#FFFFFF]">
            무드
            <Image
              src={LocalImages.iconDropArrow}
              alt="iconDropArrow"
              width={20}
              height={20}
            />
          </li>
          <li className="bg-[#ECE9E3]">
            시간
            <Image
              src={LocalImages.iconDropArrow}
              alt="iconDropArrow"
              width={20}
              height={20}
            />
          </li>
          <li
            onClick={() => selectPlace('카페')}
            className={cls(place.includes('카페') ? 'selectCafe' : 'noneSelectCafe')}
          >
            카페
          </li>
          <li
            onClick={() => selectPlace('공연/전시')}
            className={cls(place.includes('공연/전시') ? 'selectArt' : 'noneSelectArt')}
          >
            공연/전시
          </li>
          <li
            onClick={() => selectPlace('산책/공원')}
            className={cls(place.includes('산책/공원') ? 'selectTree' : 'noneSelectTree')}
          >
            산책/공원
          </li>
          <li
            onClick={() => setShowLike(!showLike)}
            className={cls('like', showLike ? 'selectLike' : 'noneSelectLike')}
          >
            <Image
              src={LocalImages.iconfilterLike}
              alt="iconfilterLike"
              width={20}
              height={20}
            />
          </li>
        </ul>
      </div>
      <div
        id="map"
        style={{ width: '480px', height: '100%' }}
      ></div>
    </div>
  );
}
