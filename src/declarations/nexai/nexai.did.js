export const idlFactory = ({ IDL }) => {
  const FloatVector = IDL.Vec(IDL.Float64);
  const FloatMatrix = IDL.Vec(FloatVector);
  const Result__1 = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
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
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const CompanyEntry__1 = IDL.Record({
    'vdbId' : IDL.Nat32,
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'email' : IDL.Text,
  });
  const ConnectionEntry = IDL.Record({
    'id' : IDL.Nat,
    'createdAt' : IDL.Int,
    'account1' : IDL.Principal,
    'account2' : IDL.Principal,
  });
  const CardEntry = IDL.Record({
    'question' : IDL.Text,
    'vdbId' : IDL.Nat32,
    'answer' : IDL.Text,
  });
  const MessageEntry = IDL.Record({
    'id' : IDL.Nat,
    'body' : IDL.Text,
    'createdAt' : IDL.Int,
    'connectionId' : IDL.Nat,
    'sender' : IDL.Principal,
  });
  const Nexai = IDL.Service({
    'CheckPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'VDBAddQandA' : IDL.Func(
        [IDL.Nat32, FloatMatrix, IDL.Vec(IDL.Text)],
        [Result__1],
        [],
      ),
    'VDBBuildIndex' : IDL.Func([IDL.Nat32], [Result__1], []),
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
        [Result],
        [],
      ),
    'deleteQCard' : IDL.Func([IDL.Nat], [], []),
    'editCompanyDetails' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Opt(CompanyEntry)],
        [],
      ),
    'editQCard' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [], []),
    'getAllCompanies' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, CompanyEntry__1))],
        ['query'],
      ),
    'getAllConnections' : IDL.Func(
        [],
        [IDL.Opt(IDL.Vec(ConnectionEntry))],
        ['query'],
      ),
    'getAllQCards' : IDL.Func(
        [IDL.Nat32],
        [IDL.Opt(IDL.Vec(CardEntry))],
        ['query'],
      ),
    'getAnAnswer' : IDL.Func([IDL.Nat], [IDL.Opt(CardEntry)], []),
    'getCompanyProfile' : IDL.Func([], [IDL.Opt(CompanyEntry)], ['query']),
    'getMessage' : IDL.Func([IDL.Nat], [IDL.Opt(MessageEntry)], []),
    'getMessages' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(MessageEntry)],
        ['query'],
      ),
    'getVDB_ID' : IDL.Func([IDL.Nat], [IDL.Nat32], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([], [IDL.Bool], ['query']),
    'makeManager' : IDL.Func([], [IDL.Bool], []),
    'sendMessage' : IDL.Func(
        [IDL.Principal, IDL.Text],
        [IDL.Opt(IDL.Null)],
        [],
      ),
  });
  return Nexai;
};
export const init = ({ IDL }) => { return []; };
