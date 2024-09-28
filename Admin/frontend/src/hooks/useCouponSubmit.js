import * as dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SidebarContext } from 'context/SidebarContext';
import CouponServices from 'services/CouponServices';
import { notifyError, notifySuccess } from 'utils/toast';

const useCouponSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState('');
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const settings = useSelector((state) => state.setting);
  const { settingItem } = settings;

  const globalSetting = settingItem.find(
    (value) => value.name === 'globalSetting'
  );
  const currency = globalSetting?.default_currency || '$';

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('coupon data',data)
    try {
      setIsSubmitting(true);
      const couponData = {
        title: {
          [language]: data.title,
        },
        couponCode: data.couponCode,
        endTime: data.endTime,
        minimumAmount: data.minimumAmount,
        logo: imageUrl,
        lang: language,
        status: published ? 'show' : 'hide',
        discountType: {
          type: discountType ? 'percentage' : 'fixed',
          value: data.discountPercentage,
        },
        productType:data.productType
      };

      if (id) {
        const res = await CouponServices.updateCoupon(id, couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await CouponServices.addCoupon(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue('title', resData.title[lang ? lang : 'en']);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue('title');
      setValue('productType');
      setValue('couponCode');
      setValue('endTime');
      setValue('discountPercentage');
      setValue('minimumAmount');
      setImageUrl('');
      clearErrors('title');
      clearErrors('productType');
      clearErrors('couponCode');
      clearErrors('endTime');
      clearErrors('discountPercentage');
      clearErrors('minimumAmount');
      setLanguage(lang);
      setValue('language', language);
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await CouponServices.getCouponById(id);
          if (res) {
            // console.log('res coupon', res);
            setResData(res);
            setValue('title', res.title[language ? language : 'en']);
            setValue('productType', res.productType);
            setValue('couponCode', res.couponCode);

            setValue('endTime', dayjs(res.endTime).format('YYYY-MM-DD HH:mm'));
            setValue('discountPercentage', res.discountType?.value);
            setValue('minimumAmount', res.minimumAmount);
            setPublished(res.status === 'show' ? true : false);
            setDiscountType(
              res.discountType?.type === 'percentage' ? true : false
            );
            setImageUrl(res.logo);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

  return {
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
    isSubmitting,
    setDiscountType,
    handleSelectLanguage,
  };
};

export default useCouponSubmit;
