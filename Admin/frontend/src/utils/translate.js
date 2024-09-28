const showingTranslateValue = (data, lang) => {
  return data !== undefined && Object?.keys(data).includes(lang)
    ? data[lang]
    : data?.en;
};

const showingImage = (data) => {
  return data !== undefined && data;
};

const showingUrl = (data) => {
  return data !== undefined ? data : '!#';
};

export { showingTranslateValue, showingImage, showingUrl };
