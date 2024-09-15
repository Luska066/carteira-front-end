import { createContext, useMemo, useState } from "react";

interface IContextData {
  studentInfo: {
    id: string;
    name: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
  };
  studentIdInfo: {
    picture: string;
    payment: {
      type: string;
    };
  };

  setStudentInfo: (studentInfo: IContextData["studentInfo"]) => void;
  setStudentIdInfo: (studentIdInfo: IContextData["studentIdInfo"]) => void;
}

const initalState = {} as IContextData;

const Context = createContext<IContextData>(initalState);

const Provider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [studentInfo, setStudentInfo] = useState<IContextData["studentInfo"]>(
    {} as IContextData["studentInfo"]
  );

  const [studentIdInfo, setStudentIdInfo] = useState<
    IContextData["studentIdInfo"]
  >({} as IContextData["studentIdInfo"]);

  const values = useMemo(
    () => ({
      studentInfo,
      setStudentInfo,
      studentIdInfo,
      setStudentIdInfo,
    }),
    [studentInfo, setStudentInfo]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export { Context, Provider };
