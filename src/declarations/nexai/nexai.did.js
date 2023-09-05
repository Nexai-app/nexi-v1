export const idlFactory = ({ IDL }) => {
  const CompanyEntry__1 = IDL.Record({
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'email' : IDL.Text,
  });
  const CardEntry = IDL.Record({
    'question' : IDL.Text,
    'answer' : IDL.Text,
    'email' : IDL.Text,
  });
  const CompanyEntry = IDL.Record({
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'email' : IDL.Text,
  });
  const Nexai = IDL.Service({
    'CheckPrincipal' : IDL.Func([], [IDL.Principal], []),
    'createCompany' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'createQCard' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'getAllCompanies' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, CompanyEntry__1))],
        [],
      ),
    'getAllQCards' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(CardEntry))], []),
    'getAnAnswer' : IDL.Func([IDL.Nat], [IDL.Opt(CardEntry)], []),
    'getCompanyProfile' : IDL.Func([], [IDL.Opt(CompanyEntry)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([], [IDL.Bool], ['query']),
  });
  return Nexai;
};
export const init = ({ IDL }) => { return []; };
