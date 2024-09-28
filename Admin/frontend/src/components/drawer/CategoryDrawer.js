import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useCategorySubmit from "hooks/useCategorySubmit";
import Tree from "rc-tree";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
//internal import
import CategoryServices from "services/CategoryServices";
import { notifyError } from "utils/toast";
import { showingTranslateValue } from "utils/translate";

const CategoryDrawer = ({ id, data, lang }) => {
  const { t } = useTranslation();

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
  } = useCategorySubmit(id, data);

  console.log("image=======>", imageUrl);

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category.name, lang),
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = async (key) => {
    // console.log('key', key, 'id', id);
    if (key === undefined) return;
    if (id) {
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      } else if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);

        const obj = data[0];
        const result = findObject(obj, key);

        setSelectCategoryName(showingTranslateValue(result?.name, lang));
      }
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);

      setSelectCategoryName(showingTranslateValue(result?.name, lang));
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Category title"
                  name="name"
                  type="text"
                  placeholder={t("ParentCategoryPlaceholder")}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  required
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Category Description"
                />
                <Error errorName={errors.description} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ParentCategory")} />
              <div className="col-span-8 sm:col-span-4 relative">
                <Input
                  readOnly
                  {...register(`parent`, {
                    required: false,
                  })}
                  name="parent"
                  value={selectCategoryName ? selectCategoryName : "Home"}
                  placeholder={t("ParentCategory")}
                  type="text"
                  className="border h-12 w-full text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

                <div className="draggable-demo capitalize">
                  <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                  <Tree
                    expandAction="click"
                    treeData={renderCategories(data)}
                    selectedKeys={[checked]}
                    onSelect={(v) => handleSelect(v[0])}
                    motion={motion}
                    animation="slide-up"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CategoryIcon")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
