let apiServer = import.meta.env.VITE_APISERVER;
import { goto } from "$app/navigation";
const uploadResult = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/result/upload`);
  console.log("url: ", url);
  console.log("fileName: ", fileName);
  const formData = new FormData();
  formData.append("file", fileName);
  formData.append("index", "0");

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

const insertIntoDb = async ({ fileName }) => {
  let url = new URL(`${apiServer}/db/result/insert/${fileName}`);
  console.log("url: ", url);
  console.log("fileName: ", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, filename, message } = responseResult;
    console.log("mesage is--", message);
    return { error, errorMsg, filename, message };
  } catch (e) {
    console.log("api.insert into db failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const dbClear = async ({}) => {
  let url = new URL(`${apiServer}/db/clear`);
  console.log("url: ", url);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, result } = responseResult;
    console.log("Result is-------", result);
    return { error, errorMsg, result };
  } catch (e) {
    console.log("api.clear db  failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const publishResult = async ({}) => {
  let url = new URL(`${apiServer}/db/publish`);
  console.log("url: ", url);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, publish } = responseResult;
    console.log("publish is-------", publish);
    return { error, errorMsg, publish };
  } catch (e) {
    console.log("api.publish failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const unPublishResult = async () => {
  let url = new URL(`${apiServer}/db/unpublish`);
  console.log("url: ", url);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, publish } = responseResult;
    console.log("publish is-------", publish);
    return { error, errorMsg, publish };
  } catch (e) {
    console.log("api.publish failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const insertSubjectMasterIntoDb = async ({ fileName }) => {
  let url = new URL(`${apiServer}/db/subjectMaster/insert/${fileName}`);
  console.log("url: ", url);
  console.log("fileName: ", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, filename, message } = responseResult;
    console.log("mesage is--", message);
    return { error, errorMsg, filename, message };
  } catch (e) {
    console.log("api.insert into db failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};

const insertDivisionMasterIntoDb = async ({ fileName }) => {
  let url = new URL(`${apiServer}/db/divisionMaster/insert/${fileName}`);
  console.log("url: ", url);
  console.log("fileName: ", fileName);

  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (reply.status != 200) {
      const responseResult = await reply.json();
      throw Error(responseResult.errorMsg);
    }
    const responseResult = await reply.json();
    const { error, errorMsg, filename, message } = responseResult;
    console.log("mesage is--", message);
    return { error, errorMsg, filename, message };
  } catch (e) {
    console.log("api.insert into db failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
// Define the endpoint URL

// Make the API call

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

const getResultCSVFilesData = async () => {
  try {
    const { error, errorMsg, files } = await getResultCSVFiles();
    if (error) return { error, errorMsg };
    console.log("files is: ", files);

    let promises = files.map(async (file) => {
      const { error, errorMsg, stats } = await getCSVFilesData({
        fileName: file.fileName,
      });
      return {
        fileName: file.fileName,
        md5checksum: file.md5checksum,
        ...stats,
      };
    });
    let data = await Promise.all(promises);
    console.log('data is ',data)
    return { error: 0, errorMsg: "", data };
  } catch (e) {
    return {
      error: -1,
      errorMsg: "exception in processing result csv files : ",
      e,
    };
  }
};
const login = async ({ username, password, token }) => {
  let url = new URL(`${apiServer}/auth/login`);
  console.log("url: ", url.href);
  // console.log("token is --: ", token);
  console.log("data is---", username, password);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!reply.ok) {
      console.log("reply is not ok:");
      throw new Error("Failed to login");
    }
    const data = await reply.json();
    if (data.token) {
      // Store token in localStorage or sessionStorage
      // console.log("token is ", data.token);
      localStorage.setItem("token", data.token);
      // console.log("token is ", data.token);
      goto("/admin");
      // Redirect to dashboard or next page on successful login
      return {
        // token: data.token,
        status:302,
        headers: {
          location: "/admin",
        },
      };
    } else {
      throw new Error("Token not received");
    }
  } catch (e) {
    console.log("api.login  failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const getSubjectMasterCSVFilesData = async () => {
  try {
    const { error, errorMsg, files } = await getSubjectMasterCSVFiles();
    if (error) return { error, errorMsg };
    console.log("files is: ", files);
    // let promises = files.map(async (file) => {
    //   const { error, errorMsg, stats } = await getSubjectMasterData({
    //     fileName: file,
    //   });
    //   return { fileName: file, ...stats };
    // });
    // let data = await Promise.all(promises);

    // return { error: 0, errorMsg: "", data };

    let promises = files.map(async (file) => {
      const { error, errorMsg, stats } = await getSubjectMasterData({
        fileName: file.fileName,
      });
      return {
        fileName: file.fileName,
        md5checksum: file.md5checksum,
        ...stats,
      };
    });
    let data = await Promise.all(promises);
    return { error: 0, errorMsg: "", data };
  } catch (e) {
    return {
      error: -1,
      errorMsg: "exception in processing subject csv files : ",
      e,
    };
  }
};

const getDivisionMasterCSVFilesData = async () => {
  try {
    const { error, errorMsg, files } = await getDivisionMasterCSVFiles();
    if (error) return { error, errorMsg };
    console.log("files is: ", files);
    // let promises = files.map(async (file) => {
    //   const { error, errorMsg, stats } = await getDivisionMasterData({
    //     fileName: file,
    //   });
    //   return { fileName: file, ...stats };
    // });
    // let data = await Promise.all(promises);
    // return { error: 0, errorMsg: "", data };
    let promises = files.map(async (file) => {
      const { error, errorMsg, stats } = await getDivisionMasterData({
        fileName: file.fileName,
      });
      return {
        fileName: file.fileName,
        md5checksum: file.md5checksum,
        ...stats,
      };
    });
    let data = await Promise.all(promises);
    return { error: 0, errorMsg: "", data };
  } catch (e) {
    return {
      error: -1,
      errorMsg: "exception in processing result division csv files : ",
      e,
    };
  }
};

const getResultCSVFiles = async () => {
  let url = new URL(`${apiServer}/csv/result`);
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
    const { files } = responseResult;
    console.log("files is--:", files);
    return { error: 0, errorMsg: "", files };
  } catch (e) {
    console.log("api.getResultCSVFiles:", e);
    return { error: -1, errorMsg: e };
  }
};

const getCSVFilesData = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/result/stats/${fileName}`);
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
    const { filename, stats } = responseResult;
    console.log("filesname :", filename);
    return { error: 0, errorMsg: "", filename, stats };
  } catch (e) {
    console.log("api.getCSVFileData:", e);
    return { error: -1, errorMsg: e };
  }
};

const getSubjectMasterCSVFiles = async () => {
  let url = new URL(`${apiServer}/csv/subjectMaster`);
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
    const { files } = responseResult;
    console.log("files :", files);
    return { error: 0, errorMsg: "", files };
  } catch (e) {
    console.log("api.getSubjectMasterCSVFiles:", e);
    return { error: -1, errorMsg: e };
  }
};
const getDivisionMasterCSVFiles = async () => {
  let url = new URL(`${apiServer}/csv/divisionMaster`);
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
    const { files } = responseResult;
    console.log("files :", files);
    return { error: 0, errorMsg: "", files };
  } catch (e) {
    console.log("api.getDivisionMasterCSVFiles:", e);
    return { error: -1, errorMsg: e };
  }
};

const getSubjectMasterData = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/subjectMaster/stats/${fileName}`);
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
    const { filename, stats } = responseResult;
    console.log("filesname :", filename);
    return { error: 0, errorMsg: "", filename, stats };
  } catch (e) {
    console.log("api.getSubjectMasterData:", e);
    return { error: -1, errorMsg: e };
  }
};

const getDivisionMasterData = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/divisionMaster/stats/${fileName}`);
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
    const { filename, stats } = responseResult;
    console.log("filesname :", filename);
    return { error: 0, errorMsg: "", filename, stats };
  } catch (e) {
    console.log("api.getdivisionMasterData:", e);
    return { error: -1, errorMsg: e };
  }
};

const deleteCSVFiles = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/result/${fileName}`);
  console.log("url: ", url);

  try {
    let response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: error.message };
  }
};

const deleteSubjectMasterCSVFiles = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/subjectMaster/${fileName}`);
  console.log("url: ", url);

  try {
    let response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting_Subject_Master file:", error);
    return { success: false, error: error.message };
  }
};

const deleteDivisionMasterCSVFiles = async ({ fileName }) => {
  let url = new URL(`${apiServer}/csv/divisionMaster/${fileName}`);
  console.log("url: ", url);

  try {
    let response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    return { success: true };
  } catch (error) {
    console.error("Error divsion master file:", error);
    return { success: false, error: error.message };
  }
};
// api.js

// export async function deleteFile(filename) {
//   try {
//     const response = await fetch(`http://your-server/result/${filename}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete file');
//     }

//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     return { success: false, error: error.message };
//   }
// }

const getPublish = async () => {
  let url = new URL(`${apiServer}/db/publish`);
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
    const { error, errorMsg, publish } = responseResult;
    console.log("publish is-------", publish);
    return { error, errorMsg, publish };
  } catch (e) {
    console.log("api.publish failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
const getInsertedCSVs = async () => {
  let url = new URL(`${apiServer}/db/insertedCSVs`);
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
    const { error, errorMsg, files } = responseResult;
    console.log("inserted csvs are: ", files);
    return { error, errorMsg, files };
  } catch (e) {
    console.log("api.getInsertedCSVs failed with error :", e);
    return { error: -1, errorMsg: e };
  }
};
export let api = {
  getDbStats,
  uploadResult,
  uploadSubjectMaster,
  uploadDivisionMaster,

  getResultCSVFilesData,
  deleteCSVFiles,

  getSubjectMasterCSVFiles,
  getSubjectMasterData,
  getSubjectMasterCSVFilesData,
  deleteSubjectMasterCSVFiles,

  getDivisionMasterCSVFiles,
  getDivisionMasterData,
  getDivisionMasterCSVFilesData,
  deleteDivisionMasterCSVFiles,
  insertIntoDb,
  insertSubjectMasterIntoDb,
  insertDivisionMasterIntoDb,

  dbClear,
  publishResult,
  unPublishResult,
  getPublish,
  getInsertedCSVs,

  login,
};
