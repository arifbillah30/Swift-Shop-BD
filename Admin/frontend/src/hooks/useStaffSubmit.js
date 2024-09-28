import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

import { AdminContext } from "context/AdminContext";
import { SidebarContext } from "context/SidebarContext";
import AdminServices from "services/AdminServices";
import { notifyError, notifySuccess } from "utils/toast";

const useStaffSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const staffData = {
        name: {
          [language]: data.name,
        },
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        joiningDate: selectedDate
          ? selectedDate
          : dayjs(new Date()).format("YYYY-MM-DD"),
        image: imageUrl,
        lang: language,
      };

      if (id) {
        // console.log('id is ',id)
        const res = await AdminServices.updateStaff(id, staffData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await AdminServices.addStaff({ staffData });
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const getStaffData = async () => {
    try {
      const res = await AdminServices.getStaffById(id, {
        email: adminInfo.email,
      });
      if (res) {
        setResData(res);
        setValue("name", res.name[language ? language : "en"]);
        setValue("email", res.email);
        setValue("password");
        setValue("phone", res.phone);
        setValue("role", res.role);
        setSelectedDate(dayjs(res.joiningData).format("YYYY-MM-DD"));
        setImageUrl(res.image);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);

    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("phone");
      setValue("role");
      setValue("joiningDate");
      setImageUrl("");
      clearErrors("name");
      clearErrors("email");
      clearErrors("password");
      clearErrors("phone");
      clearErrors("role");
      clearErrors("joiningDate");
      setImageUrl("");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  useEffect(() => {
    if (location.pathname === "/edit-profile" && Cookies.get("adminInfo")) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    language,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useStaffSubmit;
