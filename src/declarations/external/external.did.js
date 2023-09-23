export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Text)),
    'Err' : IDL.Text,
  });
  const External = IDL.Service({
    'Greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'VDBGetSimilar' : IDL.Func(
        [IDL.Nat32, IDL.Vec(IDL.Float64), IDL.Int32],
        [Result_1],
        [],
      ),
    'test' : IDL.Func([IDL.Nat], [IDL.Nat], []),
  });
  return External;
};
export const init = ({ IDL }) => { return []; };
