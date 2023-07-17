const getToken = () => {
  const currentToken = localStorage.getItem("accessToken");
  return currentToken || "";
};

export default getToken;
