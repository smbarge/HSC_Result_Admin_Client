let apiServer = import.meta.env.VITE_APISERVER;

const uploadResult = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/result/upload`);
  console.log("url: ", url);

  const formData = new FormData();
  formData.append("file", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, path } = responseResult;
    return { error, errorMsg, path };
  } catch (e) {
    console.log("api.uploadResult failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const uploadSubjectMaster = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/subjectMaster/upload`);
  console.log("url: ", url);

  const formData = new FormData();
  formData.append("file", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }

    const responseResult = await reply.json();
    const { error, errorMsg, path } = responseResult;
    return { error, errorMsg, path };
  } catch (e) {
    console.log("api.uploadResult failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const uploadDivisionMaster = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/divisionMaster/upload`);
  console.log("url: ", url);

  const formData = new FormData();
  formData.append("file", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }

    const responseResult = await reply.json();
    const { error, errorMsg, path } = responseResult;
    return { error, errorMsg, path };
  } catch (e) {
    console.log("api.uploadResult failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

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
    const { error, errorMsg, stats } = responseResult;
    return { error, errorMsg, stats };
  } catch (e) {
    console.log("api.getDbStats failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

export let api = {
  getDbStats,
  uploadResult,
  uploadSubjectMaster,
  uploadDivisionMaster,

};
