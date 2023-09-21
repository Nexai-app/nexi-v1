export const idlFactory = ({ IDL }) => {
  const FloatVector = IDL.Vec(IDL.Float64);
  const FloatMatrix = IDL.Vec(FloatVector);
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Text)),
    'Err' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat32, 'Err' : IDL.Text });
  const CompanyEntry = IDL.Record({
    'vdbId' : IDL.Nat32,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'email' : IDL.Text,
  });
  const CompanyEntry__1 = IDL.Record({
    'vdbId' : IDL.Nat32,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'email' : IDL.Text,
  });
  const CardEntry = IDL.Record({
    'question' : IDL.Text,
    'vdbId' : IDL.Nat32,
    'answer' : IDL.Text,
  });
  const Nexai = IDL.Service({
    'CheckPrincipal' : IDL.Func([], [IDL.Principal], []),
    'VDBAddQandA' : IDL.Func(
        [IDL.Nat32, FloatMatrix, IDL.Vec(IDL.Text)],
        [Result],
        [],
      ),
    'VDBBuildIndex' : IDL.Func([IDL.Nat32], [Result], []),
    'VDBGetSimilar' : IDL.Func(
        [IDL.Nat32, FloatVector, IDL.Int32],
        [Result_1],
        [],
      ),
    'VDBRegister' : IDL.Func([IDL.Text], [Result_2], []),
    'createCompany' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat32],
        [IDL.Opt(CompanyEntry)],
        [],
      ),
    'createQCard' : IDL.Func(
        [IDL.Text, IDL.Text, FloatMatrix, IDL.Vec(IDL.Text)],
        [],
        [],
      ),
    'getAllCompanies' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, CompanyEntry__1))],
        [],
      ),
    'getAllQCards' : IDL.Func(
        [IDL.Nat32],
        [IDL.Opt(IDL.Vec(CardEntry))],
        ['query'],
      ),
    'getAnAnswer' : IDL.Func([IDL.Nat], [IDL.Opt(CardEntry)], []),
    'getCompanyProfile' : IDL.Func([], [IDL.Opt(CompanyEntry)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([], [IDL.Bool], ['query']),
    'makeManager' : IDL.Func([], [IDL.Bool], []),
  });
  return Nexai;
};
export const init = ({ IDL }) => { return []; };
