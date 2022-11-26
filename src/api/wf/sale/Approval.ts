import { InnovateData } from "/@/type/views/hr/Innovate";
import request from "/@/utils/request";
const api = {
  PostApprovalCustomer: "/sale/api/Customer/PostApprovalCustomer",
};
// 审批请假
export function PostApprovalCustomer(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalCustomer,
    method: "post",
    data: param,
  });
}
