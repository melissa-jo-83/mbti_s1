import {characterCell,characterAtlasPath} from '../data/characterVisuals';
export function CharacterVisual({type,className=''}:{type:string;className?:string}){
 const {column,row}=characterCell(type);
 return <svg className={'character '+className} viewBox={`${column*320} ${row*320} 320 320`} role="img" aria-label={`${type} 초능력 연구원 캐릭터`} width="320" height="320" preserveAspectRatio="xMidYMid meet"><image href={import.meta.env.BASE_URL+characterAtlasPath} width="1280" height="1280"/></svg>;
}
