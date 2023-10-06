export type ProfileT = {
  vdbId: number | undefined;
  email: string;
  name: string;
  description: string;
  qA?: QuestionAnswerT[]
};


export type QuestionAnswerT = {
  id: number;
  qa: string
}