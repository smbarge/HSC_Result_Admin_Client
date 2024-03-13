let apiServer = import.meta.env.VITE_APISERVER;

const getDbStats = async () => {
  let url = new URL(`${apiServer}/db/stats`);
  console.log("url: ", url);

  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }

    const responseResult = await reply.json();
    const { error, errorMsg, stats} = responseResult;
    return { error, errorMsg, stats};
  } catch (e) {
    console.log("api.getDbStats failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

export let api = {
  getDbStats,
};