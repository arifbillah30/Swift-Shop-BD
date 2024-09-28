import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import * as dayjs from "dayjs";

//internal import

import { useEffect } from "react";
import { useState } from "react";
import useToggleDrawer from "hooks/useToggleDrawer";
import useAsync from "hooks/useAsync";
import SettingServices from "services/SettingServices";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import CouponDrawer from "components/drawer/CouponDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import { showDateFormat } from "utils/dateFormate";

const CouponTable = ({ lang, isCheck, coupons, setIsCheck }) => {
  const [updatedCoupons, setUpdatedCoupons] = useState([]);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const currency = globalSetting?.default_currency || "$";

  useEffect(() => {
    const result = coupons?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate,
      };
      return newObj;
    });
    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <CouponDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {updatedCoupons?.map((coupon, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={coupon?.title?.en}
                id={coupon._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(coupon._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {coupon?.logo ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={coupon?.logo}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <span className="text-sm">
                    {showingTranslateValue(coupon?.title, lang)}
                  </span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm"> {coupon.couponCode}</span>{" "}
            </TableCell>

            {coupon?.discountType?.type ? (
              <TableCell>
                {" "}
                <span className="text-sm font-semibold">
                  {" "}
                  {coupon?.discountType?.type === "percentage"
                    ? `${coupon?.discountType?.value}%`
                    : `${currency}${coupon?.discountType?.value}`}
                </span>{" "}
              </TableCell>
            ) : (
              <TableCell>
                {" "}
                <span className="text-sm font-semibold"> </span>{" "}
              </TableCell>
            )}

            <TableCell className="text-center">
              <ShowHideButton id={coupon._id} status={coupon.status} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(coupon.startTime).format("MMM D, YYYY")} */}
                {showDateFormat(
                  coupon.startTime,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(coupon.endTime).format("MMM D, YYYY")} */}
                {showDateFormat(
                  coupon.endTime,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="align-middle ">
              {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                <Badge type="danger">Expired</Badge>
              ) : (
                <Badge type="success">Active</Badge>
              )}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={coupon?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(coupon?.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CouponTable;
