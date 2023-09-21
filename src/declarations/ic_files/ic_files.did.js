export const idlFactory = ({ IDL }) => {
  const Profile__init__ = IDL.Record({
    'userName' : IDL.Text,
    'access_priviledges' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'createdAt' : IDL.Int,
    'email' : IDL.Text,
    'updated' : IDL.Bool,
    'identity' : IDL.Principal,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const icfiles = IDL.Service({
    'Fetch_All_Users' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Profile__init__))],
        [],
      ),
    'Init_Profile' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'Test' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'Test1' : IDL.Func([IDL.Text], [IDL.Text], []),
    'Update_Email' : IDL.Func([IDL.Text], [Result], []),
    'Update_Username' : IDL.Func([IDL.Text], [Result], []),
    'logIn' : IDL.Func([], [IDL.Bool], []),
  });
  return icfiles;
};
export const init = ({ IDL }) => { return []; };
