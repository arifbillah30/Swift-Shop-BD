import React from 'react';

const Stock = ({ stock, card, volume, totalVolume, unit }) => {
  return (
    <>
      {stock <= 0 ? (
        <span className="bg-red-100 dark:bg-gray-600 text-red-500 dark:text-red-400 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-medium font-serif">
          Stock Out
        </span>
      ) : (
        <span>
          <span
            className={`${
              card
                ? 'bg-gray-100 dark:bg-gray-600 text-green-500 rounded-full text-xs px-2 py-0 font-medium'
                : 'bg-green-100 dark:bg-gray-600 text-green-500 rounded-full inline-flex items-center justify-center px-2 py-0 text-xs font-semibold  font-serif'
            }`}
          >
            Stock :
            <span className="text-red-500 dark:text-red-400 dark:bg-gray-600 pl-1 font-bold">
              {stock}{' '}
            </span>
          </span>
          {totalVolume > 0 && !card && (
            <span className="dark:text-gray-200 text-gray-500 rounded-full text-xs px-2 py-0 font-medium">
              ({totalVolume}
              <span className="dark:text-gray-200 text-gray-500 rounded-full text-xs py-0 font-semibold">
                {' '}
                {unit})
              </span>
            </span>
          )}
        </span>
      )}
    </>
  );
};

export default Stock;
