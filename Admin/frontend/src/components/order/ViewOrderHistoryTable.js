import { TableBody, TableCell, TableRow } from '@windmill/react-ui';
import React from 'react';

const ViewOrderHistoryTable = ({ order, currency, t, lang }) => {
  return (
    <>
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
        {order?.cart?.map((item, i) => (
          <TableRow key={i} className="dark:border-gray-700 dark:text-gray-400">
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-gray-300 text-left">
              {i + 1}{' '}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-gray-300">
              {item.title?.substring(0, 30)}
              <div>
                {item?.extras?.length > 0 && (
                  <>
                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300 border-b">
                      {t('Extras')} :
                    </span>{' '}
                    <ul className="m-0 font-medium text-gray-600 mb-1">
                      {item?.extras?.map((extra, i) => (
                        <li key={i} className="-mt-1">
                          <span className="text-xs m-0">
                            {' '}
                            {i + 1}. {extra?.name} X {extra.addedQuantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="text-sm">
                {item?.notes?.length > 0 && (
                  <>
                    <span className="font-semibold text-gray-700 dark:text-gray-600 border-b">
                      {t('Notes')} :
                    </span>{' '}
                    <ul>
                      {item?.notes?.map((note, i) => (
                        <li key={i} className="-mt-1">
                          <span className="text-xs">
                            {' '}
                            {i + 1}. {note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap font-semibold text-xs text-gray-600">
              {item?.seller?.name.en
                ? item?.seller?.name[lang]
                : item?.seller?.name
                ? item?.seller?.name
                : item?.seller?.name.en}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.quantity}{' '}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-right">
              {currency ? currency : '$'}
              {parseFloat(item.price).toFixed(2)}{' '}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-gray-900 dark:text-green-500">
              {currency ? currency : '$'}
              {(item.price * item.quantity).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ViewOrderHistoryTable;
