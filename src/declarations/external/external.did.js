export const idlFactory = ({ IDL }) => {
  const External = IDL.Service({
    'Greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'test' : IDL.Func([IDL.Nat], [IDL.Nat], []),
  });
  return External;
};
export const init = ({ IDL }) => { return []; };
