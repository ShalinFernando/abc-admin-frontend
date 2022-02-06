import appConstants from "./appConstants";

const Host = appConstants.localServer;

const apiCollection = {
  customer: Host + "/customer",
  customerCount: Host + "/customer/count",
  accountCount: Host + "/accounts/count",
  transactionCount: Host + "/transaction/count",
  adminLogin: Host + "/login/admin",
  account: Host + "/accounts",
  transaction: Host + "/transaction",
  
};
export default apiCollection;
