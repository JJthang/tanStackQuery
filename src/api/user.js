import axios from "axios";

const fuctionGetData = () => {
  return axios
    .get("https://65532f3b5449cfda0f2e4651.mockapi.io/Information")
    .then(({ data }) => data);
};

const handDeleteAPI = (id) => {
  return axios.delete(
    "https://65532f3b5449cfda0f2e4651.mockapi.io/Information/" + id
  );
};

const handPostAPI = (data) => {
  return axios.post(
    "https://65532f3b5449cfda0f2e4651.mockapi.io/Information",
    data
  );
};

const handSearchAPI = (page, search) => {
  return axios.get(
    `https://65532f3b5449cfda0f2e4651.mockapi.io/Information/?page=${page}&limit=10&name=${search}`
  );
};

const handUpdateAPI = (id, data) => {
  return axios.put(
    `https://65532f3b5449cfda0f2e4651.mockapi.io/Information/${id}`,
    data
  );
};

export {
  fuctionGetData,
  handDeleteAPI,
  handSearchAPI,
  handUpdateAPI,
  handPostAPI,
};
