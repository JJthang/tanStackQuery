import axios from "axios";

const fuctionGetData = async () => {
  const url = new URL(
    "https://65532f3b5449cfda0f2e4651.mockapi.io/Information"
  );
  url.searchParams.append("completed", false);
  url.searchParams.append("page", 1);
  url.searchParams.append("limit", 10);
  console.log(url);
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {}
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

const handSearchAPI = (page, search, limit) => {
  console.log(limit);
  const url = new URL(
    "https://65532f3b5449cfda0f2e4651.mockapi.io/Information"
  );
  url.searchParams.append("name", search);
  url.searchParams.append("completed", false);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit.length);
  return axios.get(`${url.href}`);
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
