import {questions} from '../data/questions';
import type {Answers,Scores} from '../types/quiz';
export function calculateResult(answers:Answers){
 if(answers.length!==12) throw new Error('12개 문항에 모두 응답해 주세요.');
 const scores:Scores={E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
 questions.forEach((q,i)=>{const o=q.options.find(o=>o.id===answers[i]);if(!o)throw new Error('응답이 누락되었거나 잘못되었습니다.');scores[o.trait]++;});
 const mbti=['EI','SN','TF','JP'].map(([a,b])=>scores[a]>scores[b]?a:b).join('');
 return {mbti,scores};
}
