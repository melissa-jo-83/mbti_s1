/** 첨부 캐릭터의 4×4 아틀라스. 순서는 왼쪽→오른쪽, 위→아래입니다. */
export const characterOrder = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'] as const;
export function characterCell(type:string){const index=characterOrder.indexOf(type as typeof characterOrder[number]);if(index<0)throw new Error('알 수 없는 캐릭터입니다.');return {column:index%4,row:Math.floor(index/4)};}
export const characterAtlasPath = 'characters/researchers.png';
