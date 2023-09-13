export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'test' : IDL.Func([IDL.Nat], [IDL.Nat], []) });
};
export const init = ({ IDL }) => { return []; };
