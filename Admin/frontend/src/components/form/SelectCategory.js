import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

//internal import

import useAsync from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import { showingTranslateValue } from "utils/translate";

const SelectCategory = ({ setCategory, lang }) => {
  const { data } = useAsync(CategoryServices.getAllCategories);
  // console.log('data category',data)
  const { t } = useTranslation();
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="All" defaultValue hidden>
          {t("Category")}
        </option>
        {data?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {showingTranslateValue(cat?.name, lang)}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCategory;
