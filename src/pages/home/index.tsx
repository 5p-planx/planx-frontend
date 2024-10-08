import MoodSelect from '@/components/MoodSelect';
import { useLikeStore, useMoodSettingStore, useTempMoodStore, useFilterStore, useNoneMoodFilterStore } from '@/store/store';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { useEffect, useState } from 'react';
import { changeMoodName, filterPlaces, cls, getRandomPlaces } from '@/utils/config';
import MoodCollection from '@/components/MoodCollection';
import DetailPlace from '@/components/DetailPlace';
import { seongSuData } from '../../../src/api/temData';

export default function Home() {
  const { mood, findPlace, walkTime, setFindPlace, place } = useMoodSettingStore();
  const { tempStoreMood, setTempStoreMood, setTempStoreWalkTime, setTempStorPlace } = useTempMoodStore();
  const { likeList, setLikeList } = useLikeStore();
  const [showMoodCollection, setShowMoodCollection] = useState(false);
  const [moodCollectionType, setMoodCollectionType] = useState('');
  const { filteredData, setFilteredData } = useFilterStore();
  const [showPlace, setShowPlace] = useState(false);
  const [selectPlace, setSelectPlace] = useState({});
  const { noneMoodFilterData, setNoneMoodFilterData } = useNoneMoodFilterStore();
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.544579, lng: 127.055831 });

  const selectLike = (item: string) => {
    if (likeList.includes(item)) {
      setLikeList(likeList.filter((selected: string) => selected !== item));
    } else {
      setLikeList([...likeList, item]);
    }
  };

  const openMoodCollection = (moodType: React.SetStateAction<string>) => {
    setMoodCollectionType(moodType);
    setShowMoodCollection(true);
  };

  useEffect(() => {
    setTempStoreMood(mood);
    setTempStoreWalkTime(walkTime);
    setTempStorPlace(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPlaceDetail = (item: any) => {
    setShowPlace(true);
    setSelectPlace(item);
  };

  useEffect(() => {
    // 성수동 범위 설정
    const seongsuBounds = {
      north: 37.556237,
      south: 37.535148,
      east: 127.072175,
      west: 127.042945,
    };

    const isWithinSeongsu = (lat: number, lng: number) => {
      return lat <= seongsuBounds.north && lat >= seongsuBounds.south && lng <= seongsuBounds.east && lng >= seongsuBounds.west;
    };

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // 성수동 범위 내에 있는지 확인
          if (isWithinSeongsu(latitude, longitude)) {
            setCurrentLocation({
              lat: latitude,
              lng: longitude,
            });
          } else {
            // 성수동 범위를 벗어난 경우 성수동 기본 좌표 설정
            setCurrentLocation({
              lat: 37.544579, // defaultLat
              lng: 127.055831, // defaultLng
            });
          }
        },
        (error) => {
          console.error(error);

          // 위치 정보를 가져오지 못했을 경우에도 성수동 기본 좌표 설정
          setCurrentLocation({
            lat: 37.544579, // defaultLat
            lng: 127.055831, // defaultLng
          });
        },
        { enableHighAccuracy: true },
      );
    }
  }, []); // currentLocation 상태를 업데이트하기 위한 초기 effect

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      let filtered: any[] = [];
      let noneMoodFiltered: any[] = [];

      // 카테고리별 필터링
      if (place.includes('카페')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.cafe, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('산책/공원')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.park, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('공연/전시')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.art, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('편집샵/쇼핑')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.shop, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      // 필터링된 결과 전역 상태로 저장
      setFilteredData(filtered);

      // noneMoodFilteredData를 로컬 상태로 저장
      setNoneMoodFilterData(noneMoodFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, walkTime, place, currentLocation]);

  return tempStoreMood && findPlace ? (
    <section className="home_conatiner">
      <div className="top_info">
        <div className="logo">
          <Image
            src={LocalImages.logoSnak}
            alt="logoSnak"
            width={38}
            height={38}
          />
        </div>
        <p>
          SeongSu님을 위한
          <br />
          <span>{walkTime}분 이내</span>의 <span>{mood}</span> 성수스낵
        </p>
      </div>
      <div className="filterPlace_area">
        {filteredData.length === 0 ? (
          <div className="none_list_area">
            <div className="none_list">
              <Image
                src={LocalImages.markerEmpty}
                alt="markerEmpty"
                width={21}
                height={24}
              />
              <div>
                <p>추천 장소가 주변에 없어요</p>
                <p>필터 범위를 확대해 주세요</p>
              </div>
            </div>
            <button
              className="re_selectMood"
              type="button"
              onClick={() => setFindPlace(false)}
            >
              나의 <span>#성수스낵</span> 다시찾기
            </button>
          </div>
        ) : (
          <React.Fragment>
            <button
              className="re_selectMood"
              type="button"
              onClick={() => setFindPlace(false)}
            >
              나의 <span>#성수스낵</span> 다시찾기
            </button>
            <div className="randomPlace_area">
              {(filteredData.length > 4 ? getRandomPlaces(filteredData) : filteredData).map((item: any) => (
                <div
                  key={item.name}
                  className="randomPlace"
                  onClick={() => openPlaceDetail(item)}
                >
                  <div className="placeImage_area">
                    <Image
                      src={`/images/place/${item.name}_1.jpg`}
                      width={160}
                      height={160}
                      alt="imgFirst"
                    />
                    <div className="like">
                      {likeList.includes(item) ? (
                        <Image
                          src={LocalImages.iconFillStar}
                          alt="iconEmptyStar"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src={LocalImages.iconEmptyStar}
                          alt="iconEmptyStar"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="re_watchMood">
        <p>#무드 다시찾기</p>
        <div>
          {['분위기좋은', '조용한', '이국적인', '힐링', '즐거운', '트렌디한'].map((moodType: string) => (
            <React.Fragment key={moodType}>
              <div
                className={cls(changeMoodName(moodType))}
                onClick={() => openMoodCollection(moodType)}
              >
                # {moodType}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {showMoodCollection && (
        <MoodCollection
          moodCollectionType={moodCollectionType}
          setShowMoodCollection={setShowMoodCollection}
          noneMoodFilterData={noneMoodFilterData}
        />
      )}
      {showPlace && (
        <DetailPlace
          modalContent={selectPlace}
          setShowPlace={setShowPlace}
        />
      )}
    </section>
  ) : (
    <MoodSelect />
  );
}
