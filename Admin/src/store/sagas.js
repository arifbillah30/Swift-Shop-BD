import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import ecommerceSaga from "./e-commerce/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import invoiceSaga from "./invoices/saga";
import jobsSaga from "./jobs/saga";
import projectsSaga from "./projects/saga";
import tasksSaga from "./tasks/saga";
import mailsSaga from "./mails/saga";
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga), 
    fork(invoiceSaga),
    fork(jobsSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga)
  ]);
}
