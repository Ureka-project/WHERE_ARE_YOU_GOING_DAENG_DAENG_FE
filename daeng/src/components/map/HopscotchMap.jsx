import { useEffect, useRef, useState } from 'react';
import { createRoot } from "react-dom/client";
import Loading from "../commons/Loading";
import styled from "styled-components";
import geojson from "../../data/sig.json";
import useGoogleMapsStore from '../../stores/useGoogleMapsStore';
import useLocationStore from '../../stores/useLocationStore';
import LandOwnerProfile from "../../components/map/LandOwnerProfile";
import CustomOverlay from "./CustomOverlay";

const MapContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
`;

const HopscotchMap = ({ removeUi, setSelectedArea }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const { isLoaded } = useGoogleMapsStore();
    const userLocation = useLocationStore((state) => state.userLocation);
    const [overlayContent, setOverlayContent] = useState(null);

    useEffect(() => {
      if (isLoaded && !map) {
        const center =
        userLocation.lat === 0.0 && userLocation.lng === 0.0
          ? { lat: 37.5665, lng: 126.978 } // 서울 중심
          : userLocation;

        const googleMap = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          disableDefaultUI: removeUi,
        });
        setMap(googleMap);
      }
    }, [isLoaded, map, removeUi]);
  
    useEffect(() => {
      if (map && isLoaded) {
        const polygons = [];
        const infoWindow = new window.google.maps.InfoWindow({
          pixelOffset: new window.google.maps.Size(0, -10),
        });

        const observer = new MutationObserver(() => {
          const closeButton = document.querySelector(".gm-ui-hover-effect");
          if (closeButton) {
            closeButton.style.display = "none";
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        geojson.features.forEach((feature) => {
          const geometryType = feature.geometry.type;
          const coordinatesList =
            geometryType === "MultiPolygon"
              ? feature.geometry.coordinates
              : [feature.geometry.coordinates];
    
          coordinatesList.forEach((polygonCoordinates) => {
            const coordinates = polygonCoordinates[0].map((coord) => ({
              lat: coord[1],
              lng: coord[0],
            }));
    
            const region = feature.properties.CTP_KOR_NM
            const subRegionFull = feature.properties.SIG_KOR_NM;
            const subRegion = subRegionFull.includes("시 ")
              ? subRegionFull.split(" ")[0]
              : subRegionFull;

            const polygon = new window.google.maps.Polygon({
              paths: coordinates,
              strokeColor: "#FF69A9",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#fff",
              fillOpacity: 0.7,
            });
            polygon.set("sub", subRegionFull);
            polygon.setMap(map);
            polygons.push(polygon);
    
            polygon.addListener("mouseover", () => {
              polygons.forEach((polygon) => {
                const polygonSub = polygon.get("sub");
                if (polygonSub && polygonSub.startsWith(subRegion)) {
                  polygon.setOptions({ fillColor: "#FF69A9"});
                }
              });
              infoWindow.setContent(`<div style="font-size:14px; margin-left:5px;">${region} ${subRegion}</div>`); // 지역 이름 설정
              infoWindow.setPosition({ lat: center.lat(), lng: center.lng() });
              
              infoWindow.open(map);
              
            });
    
            polygon.addListener("mouseout", () => {
              polygons.forEach((polygon) => {
                const polygonSub = polygon.get("sub");
                if (polygonSub && polygonSub.startsWith(subRegion)) {
                  polygon.setOptions({ fillColor: "#fff"});
                }
              });
              infoWindow.close();
              // setOverlayContent(null); //마우스 아웃되면 프로필도 같이 없앨건지?
            });
            
            const calculatePolygonCenter = (paths) => {
              const bounds = new window.google.maps.LatLngBounds();
              paths.forEach((path) => bounds.extend(path));
              return bounds.getCenter();
            };
            const center = calculatePolygonCenter(coordinates);
            
            polygon.addListener("click", () => {
              infoWindow.close();
              const regionOwner =
                hopsdata.data.regionOwners[region]?.[subRegion] || null;
                const ownerInfo = regionOwner
              ? {
                  nickname: regionOwner.nickname,
                  hops: regionOwner.count,
                  pets: regionOwner.pets,
                }
              : {
                  nickname: null,
                  hops: 0,
                  pets: [],
                };

                polygons.forEach((polygon) => {
                  const polygonSub = polygon.get("sub");
                  if (polygonSub && polygonSub.startsWith(subRegion)) {
                    polygon.setOptions({ fillColor: "#FF69A9", fillOpacity: 0.8 });
                  } else {
                    polygon.setOptions({ fillColor: "#fff", fillOpacity: 0.7 });
                  }
                });

              setSelectedArea([region, subRegion, regionOwner?.count]);
              setOverlayContent(null);
              console.log(ownerInfo.nickname)
              setTimeout(() => {
                setOverlayContent({
                  position: { lat: center.lat(), lng: center.lng() },
                  component: <LandOwnerProfile
                    area={`${region} ${subRegion}`}
                    nickname={ownerInfo.nickname}
                    hops={ownerInfo.hops}
                    pets={ownerInfo.pets} />,
                  offset: ownerInfo.nickname ? { x: 0, y: -80 } : { x: 0, y: -40 },
                });
              }, 0);
            });
          });
        });
    
        return () => {
          polygons.forEach((polygon) => polygon.setMap(null));
        };
      }
    }, [map, isLoaded]);    
  
    return (
      <MapContainer ref={mapRef} $removeUi={removeUi}>
        {!isLoaded && <Loading label="지도 로딩 중..." />}
        {map && overlayContent && (
        <CustomOverlay
          map={map}
          position={overlayContent.position}
          offset={overlayContent.offset}
        >
          {overlayContent.component}
        </CustomOverlay>
      )}
      </MapContainer>
    );
};
const hopsdata = {
  "message": "success",
  "data": {
      "regionOwners": {
          "울산": {
              "남구": null,
              "중구": null,
              "동구": null,
              "북구": null,
              "울주군": null
          },
          "충북": {
              "청주시": null,
              "충주시": null,
              "제천시": null,
              "영동군": null,
              "진천군": null,
              "괴산군": null,
              "옥천군": null,
              "보은군": null,
              "증평군": null,
              "음성군": null,
              "단양군": null
          },
          "서울": {
              "동대문구": null,
              "강남구": {
                  "userId": 4,
                  "nickname": "UserTwo",
                  "count": 7,
                  "pets": [
                      {
                          "petId": 19,
                          "petName": "Buddy",
                          "petImg": ""
                      },
                      {
                          "petId": 20,
                          "petName": "Mittens",
                          "petImg": ""
                      }
                  ]
              },
              "은평구": null,
              "중랑구": null,
              "성동구": null,
              "성북구": null,
              "종로구": null,
              "영등포구": null,
              "강동구": null,
              "광진구": null,
              "마포구": null,
              "구로구": null,
              "양천구": null,
              "중구": null,
              "용산구": null,
              "관악구": null,
              "노원구": null,
              "서대문구": null,
              "서초구": null,
              "동작구": null,
              "송파구": null,
              "강서구": null,
              "강북구": null,
              "도봉구": null,
              "금천구": null
          },
          "전북": {
              "진안군": null,
              "전주시": null,
              "정읍시": null,
              "익산시": null,
              "김제시": null,
              "고창군": null,
              "임실군": null,
              "부안군": null,
              "장수군": null,
              "완주군": null,
              "남원시": null,
              "순창군": null,
              "군산시": null,
              "무주군": null
          },
          "경기": {
              "연천군": null,
              "군포시": null,
              "시흥시": null,
              "남양주시": null,
              "안산시": null,
              "여주시": null,
              "성남시": null,
              "안양시": null,
              "용인시": null,
              "양주시": null,
              "광주시": null,
              "수원시": null,
              "김포시": null,
              "가평군": null,
              "포천시": null,
              "평택시": null,
              "파주시": null,
              "과천시": null,
              "부천시": null,
              "화성시": null,
              "양평군": null,
              "동두천시": null,
              "광명시": null,
              "고양시": null,
              "오산시": null,
              "안성시": null,
              "이천시": null,
              "의왕시": null,
              "하남시": null,
              "의정부시": null,
              "구리시": null
          },
          "충남": {
              "계룡시": null,
              "안면도": null,
              "부여군": null,
              "서산시": null,
              "천안시": null,
              "당진시": null,
              "보령시": null,
              "아산시": null,
              "태안군": null,
              "금산군": null,
              "홍성군": null,
              "청양군": null,
              "공주시": null,
              "예산군": null,
              "논산시": null,
              "서천군": null
          },
          "부산": {
              "중구": null,
              "해운대구": null,
              "동구": null,
              "부산진구": null,
              "서구": null,
              "사하구": null,
              "수영구": null,
              "남구": null,
              "영도구": null,
              "동래구": null,
              "금정구": null,
              "강서구": null,
              "북구": null,
              "사상구": null,
              "기장군": null,
              "연제구": null
          },
          "강원": {
              "태백시": null,
              "정선군": null,
              "춘천시": null,
              "평창군": null,
              "인제군": null,
              "양양군": null,
              "양구군": null,
              "속초시": null,
              "삼척시": null,
              "원주시": null,
              "강릉시": null,
              "화천군": null,
              "철원군": null,
              "동해시": null,
              "홍천군": null,
              "횡성군": null,
              "영월군": null,
              "고성군": null
          },
          "경북": {
              "영주시": null,
              "영천시": null,
              "영덕군": null,
              "문경시": null,
              "청송군": null,
              "봉화군": null,
              "김천시": null,
              "울진군": null,
              "고령군": null,
              "경산시": null,
              "성주군": null,
              "포항시": null,
              "상주시": null,
              "청도군": null,
              "안동시": null,
              "구미시": null,
              "칠곡군": null,
              "의성군": null,
              "경주시": null,
              "예천군": null,
              "울릉군": null,
              "영양군": null
          },
          "대전": {
              "대덕구": null,
              "중구": null,
              "동구": null,
              "유성구": null,
              "서구": null
          },
          "세종": {
              "세종": null
          },
          "제주": {
              "제주시": null,
              "서귀포시": null
          },
          "대구": {
              "중구": null,
              "남구": null,
              "수성구": null,
              "동구": null,
              "서구": null,
              "달서구": null,
              "북구": null,
              "달성군": null,
              "군위군": null
          },
          "인천": {
              "강화군": null,
              "부평구": null,
              "중구": null,
              "옹진군": null,
              "동구": null,
              "남동구": null,
              "서구": null,
              "미추홀구": null,
              "연수구": null,
              "계양구": null
          },
          "전남": {
              "곡성군": null,
              "장성군": null,
              "영암군": null,
              "고흥군": null,
              "나주시": null,
              "무안군": null,
              "담양군": null,
              "해남군": null,
              "순천시": null,
              "목포시": null,
              "완도군": null,
              "보성군": null,
              "여수시": null,
              "화순군": null,
              "함평군": null,
              "장흥군": null,
              "진도군": null,
              "신안군": null,
              "영광군": null,
              "구례군": null,
              "광양시": null,
              "강진군": null
          },
          "경남": {
              "김해시": null,
              "양산시": null,
              "사천시": null,
              "거창군": null,
              "합천군": null,
              "함안군": null,
              "진주시": null,
              "창녕군": null,
              "의령군": null,
              "거제시": null,
              "밀양시": null,
              "남해군": null,
              "하동군": null,
              "통영시": null,
              "창원시": {
                "userId": 5,
                "nickname": "UserTwo",
                "count": 7,
                "pets": [
                    {
                        "petId": 13,
                        "petName": "Buddy",
                        "petImg": ""
                    },
                    {
                        "petId": 25,
                        "petName": "Mittens",
                        "petImg": ""
                    }
                ]
            },
              "고성군": null,
              "함양군": null,
              "산청군": null
          },
          "광주": {
              "남구": null,
              "동구": null,
              "서구": null,
              "광산구": null,
              "북구": null
          }
      }
  },
  "timestamp": "2024-12-11T02:25:29"
}
export default HopscotchMap;
