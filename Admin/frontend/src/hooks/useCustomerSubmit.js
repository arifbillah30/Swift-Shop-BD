import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from 'context/SidebarContext';
import CustomerServices from 'services/CustomerServices';
import { notifyError, notifySuccess } from 'utils/toast';

const useCustomerSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const customerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      if (id) {
        const res = await CustomerServices.updateCustomer(id, customerData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await CustomerServices.getCustomerById(id);
          if (res) {
            setValue('name', res.name);
            setValue('phone', res.phone);
            setValue('email', res.email);
            setValue('address', res.address);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
  };
};

export default useCustomerSubmit;
