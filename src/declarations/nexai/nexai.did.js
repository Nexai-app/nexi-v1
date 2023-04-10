export const idlFactory = ({ IDL }) => {
  const CompanyEntry = IDL.Record({
    'about' : IDL.Text,
    'username' : IDL.Text,
    'founderName' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
  });
  const CardEntry = IDL.Record({
    'username' : IDL.Text,
    'question' : IDL.Text,
    'answer' : IDL.Text,
  });
  const Nexai = IDL.Service({
    'CheckPrincipal' : IDL.Func([], [IDL.Principal], []),
    'createCompany' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'createQCard' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'getAllCompanies' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, CompanyEntry))],
        [],
      ),
    'getAnAnswer' : IDL.Func([IDL.Nat], [IDL.Opt(CardEntry)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([], [IDL.Bool], ['query']),
  });
  return Nexai;
};
export const init = ({ IDL }) => { return []; };
