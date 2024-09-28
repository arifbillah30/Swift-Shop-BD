import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
//internal import
import useToggleDrawer from "hooks/useToggleDrawer";
import AttributeDrawer from "components/drawer/AttributeDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import EditDeleteButton from "components/table/EditDeleteButton";
import DeleteModal from "components/modal/DeleteModal";
import { showingTranslateValue } from "utils/translate";

const AttributeTable = ({ lang, isCheck, setIsCheck, attributes }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // console.log('attributes', attributes);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <AttributeDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {attributes?.map((attribute) => (
          <TableRow key={attribute._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="attribute"
                id={attribute._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(attribute._id)}
              />
            </TableCell>

            <TableCell className="font-semibold uppercase text-xs">
              {attribute?._id?.substring(20, 24)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute.title, lang)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {showingTranslateValue(attribute.name, lang)}
            </TableCell>

            <TableCell className="font-medium text-sm">
              {attribute.option}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={attribute._id} status={attribute.status} />
            </TableCell>

            <TableCell className="flex justify-center">
              <Link
                to={`/attributes/${attribute._id}`}
                className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
              >
                <Tooltip
                  id="edit values"
                  Icon={FiEdit}
                  title="Edit Values"
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={attribute._id}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(attribute.title, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AttributeTable;
