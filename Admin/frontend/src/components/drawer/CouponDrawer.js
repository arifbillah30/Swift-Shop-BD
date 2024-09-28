import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useCouponSubmit from "hooks/useCouponSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";

const CouponDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
  } = useCouponSubmit(id);

  return (
    <>
      <div className="w-full relative  p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCoupon")}
            description={t("UpdateCouponDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCoupon")}
            description={t("AddCouponDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CouponBannerImage")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="coupon"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CampaignName")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Coupon title"
                  name="title"
                  type="text"
                  placeholder={t("CampaignName")}
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CampaignCode")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Coupon Code"
                  name="couponCode"
                  type="text"
                  placeholder={t("CampaignCode")}
                />
                <Error errorName={errors.couponCode} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CouponValidityTime")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`endTime`, {
                    required: "Coupon Validation End Time",
                  })}
                  label="Coupon Validation End Time"
                  name="endTime"
                  type="datetime-local"
                  placeholder={t("CouponValidityTime")}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

                <Error errorName={errors.endTime} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("DiscountType")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggleFour
                  handleProcess={setDiscountType}
                  processOption={discountType}
                />
                <Error errorName={errors.discountType} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Discount")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product
                  register={register}
                  maxValue={discountType ? 99 : 1000}
                  minValue={1}
                  label="Discount"
                  name="discountPercentage"
                  type="number"
                  placeholder={discountType ? "Percentage" : "Fixed Amount"}
                  currency={discountType ? "%" : currency}
                />

                <Error errorName={errors.discountPercentage} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("MinimumAmount")} />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  product
                  register={register}
                  maxValue={200000}
                  minValue={100}
                  label="Minimum Amount"
                  name="minimumAmount"
                  type="number"
                  placeholder={t("MinimumAmountPlasholder")}
                  currency={currency}
                />
                <Error errorName={errors.minimumAmount} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
                <Error errorName={errors.productType} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Coupon" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;
