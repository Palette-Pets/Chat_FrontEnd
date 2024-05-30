/**
 * pet api
 * - 펫 등록
 * - 펫 수정
 * - 펫 삭제
 * - 펫 한건 조회
 * - 펫 리스트 조회
 * + 펫 이미지 리스트 연동 등록
 * + 펫 이미지 리스트 삭제
 */

import axios from "axios";
import jwtAxios from "./jwtAxios.js";

const API_SERVER_HOST = `http://localhost:8080`;

const jsonHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `http://localhost:3000`,
}

// new FormData() 로 파일 보낼때는 json 헤더말고 이 헤더를 쓰기
const defaultHeaders = {
    "Access-Control-Allow-Origin": `http://localhost:3000`,
}

axios.defaults.withCredentials = true; // withCredentials 전역 설정
axios.defaults.baseURL = API_SERVER_HOST;

// 펫 등록 POST
export const petRegisterRequest = (dto, file) => {

    const formData = new FormData();
    formData.append('file', file);
    const data = {
        createdWho: dto.createdWho,
        petName: dto.petName,
        petImage: dto.petImage,
        petCategory1: dto.petCategory1,
        petCategory2: dto.petCategory2,
        petBirth: dto.petBirth,
        petGender: dto.petGender,
        petWeight: dto.petWeight,
    };

    console.log("dto = " + dto.petName);
    console.log("data = " + data.petName);

    const blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    formData.append('dto', blob);

    return jwtAxios.post(`${API_SERVER_HOST}/pet`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 수정 PUT
export const petUpdateRequest = (dto, file) => {

    const formData = new FormData();
    if (typeof file !== 'string') {
        formData.append('file', file);
    }  else {
        formData.append('file', null);
    }

    const data = {
        petId: dto.petId,
        createdWho: dto.createdWho,
        petName: dto.petName,
        petImage: dto.petImage,
        petCategory1: dto.petCategory1,
        petCategory2: dto.petCategory2,
        petBirth: dto.petBirth,
        petGender: dto.petGender,
        petWeight: dto.petWeight,
    }
    const blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    formData.append('dto', blob);

    return jwtAxios.put(`${API_SERVER_HOST}/pet/${dto.petId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 삭제 DELETE
export const petDeleteRequest = (petId) => {
    return jwtAxios.delete(`${API_SERVER_HOST}/pet/${petId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 이미지 등록 POST
export const petImgRegisterRequest = (dto, file) => {

    const formData = new FormData();
    formData.append('file', file);
    const blob = new Blob([JSON.stringify(dto)], {type: "application/json"});
    formData.append('dto', blob);

    return jwtAxios.post(`${API_SERVER_HOST}/pet/img`, formData)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 이미지 삭제 DELETE
export const petImgDeleteRequest = (imgId) => {
    return jwtAxios.delete(`${API_SERVER_HOST}/pet/img/${imgId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 리스트 GET 요청 -> 회원이 소유한 반려 동물 리스트
export const petListRequest = (memberId) => {
    return jwtAxios.get(`${API_SERVER_HOST}/pet/list/${memberId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 펫 상세 정보 한 건 GET 요청
export const petDetailRequest = (petId) => {
    return jwtAxios.get(`${API_SERVER_HOST}/pet/${petId}`)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
            return error.response.data;
        });
}

// 이미지 등록 테스트용 요청
export const petImgTest = async (file, dto) => {
    const formData = new FormData();
    formData.append('file', file);
    const blob = new Blob([JSON.stringify(dto)], {type: "application/json"});
    formData.append('dto', blob);

    try {
        const response = await axios.post(`${API_SERVER_HOST}/pet/img/test`, formData, {
            headers: {
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};