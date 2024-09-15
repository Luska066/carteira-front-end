import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home/Home";
import { CheckoutPage } from "../pages/StudentId/Checkout";
import { CreateStudentIdPage } from "../pages/StudentId/Create";
import { HistoricPage } from "../pages/StudentId/Historic";
import { UploadPhotoPage } from "../pages/StudentId/UploadPhoto";
import { DetailsPage } from "../pages/StudentId/Validate/Details";
import { ValidatePage } from "../pages/StudentId/Validate/Validate";
import { RequireAuth } from "../contexts/RequireAuth";
import { GenerationPage } from "../pages/StudentId/Generation";
import { Login } from "../pages/StudentId/Login/Login";
import { RequireLoggin } from "../contexts/RequireLoggin";
import { Pixs} from "../pages/StudentId/Payments/Pixs";
import {DetailsPageLogged} from "../pages/StudentId/Validate/DetailsLogged";

export const router = createBrowserRouter([
  {
    path: "/register",
    element:  <HomePage /> ,
    loader: () =>  import("../pages/Home/Home") ,
  },
  {
    path: "/student-id/create",
	//@ts-ignore
    element: <CreateStudentIdPage/>,
    loader: () => import("../pages/StudentId/Create"),
  },
  {
    path: "/student-id/create/upload-photo",
	//@ts-ignore
    element:<RequireLoggin> <UploadPhotoPage/> </RequireLoggin>,
    loader: () => import("../pages/StudentId/UploadPhoto"),
  },
  {
    path: "/student-id/create/checkout",
	//@ts-ignore
    element:<RequireLoggin><CheckoutPage /></RequireLoggin>,
    loader: () => import("../pages/StudentId/Checkout"),
  },
  {
    path: "/student-id/gerar-carteira/",
	//@ts-ignore
    element:  <RequireLoggin><GenerationPage /></RequireLoggin>,
    loader: () => import("../pages/StudentId/Generation"),
  },
  {
    path: "/student-id/payment/pix",
    //@ts-ignore
    element:  <RequireLoggin><Pixs/></RequireLoggin>,
    loader: () => import("../pages/StudentId/Payments/Pixs"),
  },
  {
    path: "/student-id/historic",
    element: <HistoricPage />,
    loader: () => import("../pages/StudentId/Historic"),
  },
  {
    path: "/student-id/validate/:uuid",
    element: <ValidatePage />,
    loader: () => import("../pages/StudentId/Validate/Validate"),
  },
  {
    path: "/student-id/validate/details/:uuid",
    element: <DetailsPage/>,
    loader: () => import("../pages/StudentId/Validate/Details"),
  },
  {
    path: "/student-id/validate/details/logged/",
    element: <RequireLoggin><DetailsPageLogged /></RequireLoggin>,
    loader: () => import("../pages/StudentId/Validate/DetailsLogged"),
  },
  {
    path: "/",
    element: <Login/>,
    loader: () => import("../pages/StudentId/Login/Login"),
  },
]);

