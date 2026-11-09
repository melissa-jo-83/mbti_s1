import {characterCell,characterAtlasPath} from '../data/characterVisuals';
import type {Character} from '../types/quiz';
import {resultUrl} from './shareResult';
export async function exportImage(c:Character){
 await document.fonts.ready;
 const img=new Image();img.src=import.meta.env.BASE_URL+characterAtlasPath;await img.decode();
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const x=canvas.getContext('2d')!;
 x.fillStyle='#f8f6ff';x.fillRect(0,0,1080,1350);x.fillStyle='#7c4dff';x.fillRect(50,50,980,8);
 x.textAlign='center';x.fillStyle='#7c4dff';x.font='bold 27px Pretendard, sans-serif';x.fillText('USELESS POWER LAB · 공식 연구 결과',540,122);
 const {column,row}=characterCell(c.mbti);const cellWidth=img.naturalWidth/4,cellHeight=img.naturalHeight/4;
 x.drawImage(img,column*cellWidth,row*cellHeight,cellWidth,cellHeight,265,140,550,550);x.font='bold 30px Pretendard, sans-serif';x.fillText(c.mbti+'  ·  '+c.id,540,760);
 x.fillStyle='#26223d';x.font='bold 61px Pretendard, sans-serif';x.fillText(c.name,540,850);x.font='32px Pretendard, sans-serif';x.fillText(c.power,540,925);
 x.fillStyle='#7c4dff';x.font='bold 35px Pretendard, sans-serif';x.fillText('“'+c.intro+'”',540,1025);
 x.fillStyle='#26223d';x.font='bold 28px Pretendard, sans-serif';x.fillText('쓸데없는 초능력 연구소',540,1150);x.font='20px Pretendard, sans-serif';
 const url=resultUrl(c.mbti);for(let i=0;i<url.length;i+=80)x.fillText(url.slice(i,i+80),540,1210+(i/80)*28);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('이미지 생성에 실패했습니다.')),'image/png'));
 const href=URL.createObjectURL(blob);const a=document.createElement('a');a.href=href;a.download=`초능력-${c.mbti}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(href),10000);
}
