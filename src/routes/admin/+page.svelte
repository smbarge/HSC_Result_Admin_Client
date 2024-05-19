<script>
  import { Toggle, Fileupload, Label } from "flowbite-svelte";
  import { api } from "../../api/api";
  import { onMount } from "svelte";
  import { Spinner } from "flowbite-svelte";
  // import { flip } from "svelte/animate";
  import { Alert } from "flowbite-svelte";
  import ShowModel from "../../component/ShowModel.svelte";
  import { Button, Modal } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  let popupModalPublish = false;
  let popupModalUnPublish = false;
  let popupModal2 = false;

  // let clicked = false;
  let resultData = [];
  let subjectMaster = [];
  let divisionMaster = [];
  // );
  // let onUpload = false;
  let insertMessage = "";
  let subjectMasterMessage = "";
  let divisionMasterMessage = "";
  let publish = "";
  let subjMessage = false;
  let iMessage = false;
  let divisionMessage = false;

  let dbStats = {};
  let dataLoaded = false;
  let insertedResultCSVFiles = [];
  let insertedSubjectMasterCSVFiles = [];
  let insertedDivisionMasterCSVFiles = [];

  const setInsertedCSVs = (files) => {
    //   "files": [
    //   {
    //     "key": "csv:divisionMaster:divisions.csv",
    //     "timestamp": "2024-03-21T11:59:35.507Z",
    //     "filename": "divisions.csv",
    //     "recordCount": 9
    //   }
    // ]

    insertedDivisionMasterCSVFiles = files
      .filter((e) => {
        const pattern = /^csv:divisionMaster:.+$/;
        return pattern.test(e.key);
      })
      .map((e) => e.filename);

    insertedSubjectMasterCSVFiles = files
      .filter((e) => {
        const pattern = /^csv:subjectMaster:.+$/;
        return pattern.test(e.key);
      })
      .map((e) => e.filename);

    insertedResultCSVFiles = files
      .filter((e) => {
        const pattern = /^csv:result:.+$/;
        return pattern.test(e.key);
      })
      .map((e) => e.filename);
  };

  const onInit = async () => {
    dataLoaded = false;
    // onUpload = false;
    const { error, errorMsg, stats: _stats } = await api.getDbStats();
    const {
      error: lerror,
      errorMsg: lerrorMsg,
      data,
    } = await api.getResultCSVFilesData();
    const {
      error: lerror2,
      errorMsg: errorMsg2,
      data: ldata,
    } = await api.getSubjectMasterCSVFilesData();

    const {
      error: lerror3,
      errorMsg: errorMsg3,
      data: diviData,
    } = await api.getDivisionMasterCSVFilesData();
    let {
      error: error4,
      errorMsg: errorMsg4,
      publish: lpublish,
    } = await api.getPublish();
    if (lpublish == null) lpublish = "false";
    publish = lpublish;

    let {
      error: error5,
      errorMsg: errorMsg5,
      files,
    } = await api.getInsertedCSVs();

    setInsertedCSVs(files);

    // const divisionRep = await api.getDivisionMasterCSVFiles();
    // console.log("division master file",divisionRep)
    // console.log("subjectMaster data..", ldata);

    // console.log("csv files data is: ", data);
    resultData = [...data];

    subjectMaster = [...ldata];
    divisionMaster = [...diviData];
    dbStats = { ..._stats };

    dataLoaded = true;
    // console.log("dbStats : ", dbStats);
  };
  onMount(async () => {
    await onInit();
  });
  let divisionCodes = [
    { name: "Pune", div: 1 },
    { name: "Nagpur", div: 2 },
    { name: "Aurangabad", div: 3 },
    { name: "Mumbai", div: 4 },
    { name: "Kolhapur", div: 5 },
    { name: "Amravati", div: 6 },
    { name: "Nashik", div: 7 },
    { name: "Latur", div: 8 },
    { name: "Kokan", div: 9 },
  ];

  let selectedFile;
  let fileUploading = false;

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        fileUploading = true;
        const { error, errorMsg, path } = await api.uploadResult({
          fileName: selectedFile,
        });
        if (error) {
          console.log(
            "failed to uploaded result file: ",
            selectedFile,
            "error is : ",
            errorMsg
          );
          selectedFile = null;
          return;
        }

        // console.log("uploding file :", selectedFile);
        selectedFile = undefined;
      } else {
        console.error("no file selected");
      }
    } catch (e) {
      console.log("exception in processing handleUpload");
    } finally {
      const { error, errorMsg, data } = await api.getResultCSVFilesData();
      if (error) return;
      resultData = [...data];

      fileUploading = false;
      // console.log("resultData is: ", resultData);
    }
  };

  // const handleShouldPublish = async () => {
  //   try {
  //     let { error, errorMsg, result } = await api.getShouldPublish({});
  //     console.log("error is", error);
  //     console.log("errorMsg  is", errorMsg);
  //   } catch (error) {
  //     console.log("error is ", error);
  //   }
  // };

  const refreshStats = async () => {
    await onInit();
  };
  const handleInsert = async (fileName) => {
    // console.log("filename is", fileName);

    try {
      const { error, errorMsg, filename, message } = await api.insertIntoDb({
        fileName,
      });
      // console.log("path is ", filename, message);
      insertMessage = message;
      iMessage = true;
      setTimeout(() => {
        iMessage = false;
      }, 3000);

      // await onInit();
      if (error) {
        console.log(
          "failed to insert csv file in db : ",
          fileName,
          "error is : ",
          errorMsg
        );

        return;
      }
      let {
        error: error5,
        errorMsg: errorMsg5,
        files,
      } = await api.getInsertedCSVs();

      setInsertedCSVs(files);
    } catch (e) {
      console.log("exception in processing handleUpload");
    }
  };
  const clearDb = async () => {
    // console.log("clear db called");
    try {
      // console.log("clear db called in try catch");
      const { error, errorMsg, result } = await api.dbClear({});
      // console.log("clear db called end");
      // console.log("result is ", result);
      // insertMessage = message;
      // iMessage = true;
      // setTimeout(() => {
      //   iMessage = false;
      // }, 3000);
      await onInit();
      if (error) {
        console.log(
          "failed to clear db  in db : ",

          "error is : ",
          errorMsg
        );
        return;
      }
    } catch (e) {
      console.log("exception in processing clear db");
    }
  };
  const saveData = async () => {
    let result="data"
    // console.log("saveData  called..........");
    try {
      const { error, errorMsg, result } = await api.saveData({result:result1});
      // console.log("data is ", result);
    } catch (e) {
      console.log("exception in processing ");
    }
  };

  let alertMessage = "";
  const onPublish = async () => {
    try {
      {
        let { error, errorMsg, result } = await api.getShouldPublish({});
        if (error == -1) {
          alertMessage = errorMsg;
          return;
        }
        setTimeout(() => {
          alertMessage = "";
        }, 3000);
        // console.log("error is", error);
        // console.log("errorMsg  is", errorMsg);
      }

      const {
        error,
        errorMsg,
        publish: lpublish,
      } = await api.publishResult({});
      // console.log("result is ", lpublish);
      // insertMessage = message;
      publish = lpublish;
      // iMessage = true;
      // setTimeout(() => {
      //   iMessage = false;
      // }, 3000);
      if (error) {
        console.log(
          "failed to publish  : ",

          "error is : ",
          errorMsg
        );
        return;
      }
    } catch (e) {
      console.log("exception in processing publish");
    }
  };
  $: if (alertMessage) {
    setTimeout(() => {
      alertMessage = "";
    }, 4000);
  }
  const onUnPublish = async () => {
    try {
      const {
        error,
        errorMsg,
        publish: lpublish,
      } = await api.unPublishResult({});
      // console.log("result is ", lpublish);
      // insertMessage = message;
      publish = lpublish;
      // iMessage = true;
      // setTimeout(() => {
      //   iMessage = false;
      // }, 3000);
      if (error) {
        console.log(
          "failed to publish  : ",

          "error is : ",
          errorMsg
        );
        return;
      }
    } catch (e) {
      console.log("exception in processing publish");
    }
  };

  const getPublish = async () => {
    try {
      let { error, errorMsg, publish: lpublish } = await api.getPublish({});
      // console.log("result is ", lpublish);
      // insertMessage = message;
      if (lpublish == null) lpublish = "false";

      publish = lpublish;
      // iMessage = true;
      // setTimeout(() => {
      //   iMessage = false;
      // }, 3000);
      if (error) {
        console.log(
          "failed to publish  : ",

          "error is : ",
          errorMsg
        );
        return;
      }
    } catch (e) {
      console.log("exception in processing publish");
    }
  };

  const handleInsertSubjectMaster = async (fileName) => {
    // console.log("filename is", fileName);

    try {
      const { error, errorMsg, filename, message } =
        await api.insertSubjectMasterIntoDb({
          fileName,
        });
      // console.log("path is ", filename, message);
      subjectMasterMessage = message;
      subjMessage = true;
      setTimeout(() => {
        subjMessage = false;
      }, 3000);
      if (error) {
        console.log(
          "failed to insert csv file in db : ",
          fileName,
          "error is : ",
          errorMsg
        );
        return;
      }
      let {
        error: error5,
        errorMsg: errorMsg5,
        files,
      } = await api.getInsertedCSVs();

      setInsertedCSVs(files);
    } catch (e) {
      console.log("exception in processing handleUpload");
    }
  };

  const handleInsertDivisionMaster = async (fileName) => {
    // console.log("filename is", fileName);

    try {
      const { error, errorMsg, filename, message } =
        await api.insertDivisionMasterIntoDb({
          fileName,
        });
      // console.log("path is ", filename, message);
      divisionMasterMessage = message;
      divisionMessage = true;
      setTimeout(() => {
        divisionMessage = false;
      }, 3000);
      if (error) {
        console.log(
          "failed to insert csv file in db : ",
          fileName,
          "error is : ",
          errorMsg
        );
        return;
      }
      let {
        error: error5,
        errorMsg: errorMsg5,
        files,
      } = await api.getInsertedCSVs();
      setInsertedCSVs(files);
    } catch (e) {
      console.log("exception in processing handleUpload");
    }
  };

  const uploadSubjectMaster = async () => {
    try {
      if (selectedFile) {
        const { error, errorMsg, path } = await api.uploadSubjectMaster({
          fileName: selectedFile,
        });
        if (error) {
          console.log(
            "failed to uploaded result file: ",
            selectedFile,
            "error is : ",
            errorMsg
          );
          selectedFile = null;
          return;
        }
        // console.log("uploding file :", selectedFile);
        selectedFile = null;
      } else {
        console.error("no file selected");
      }
    } catch (error) {
      console.log("exception in processing handleUpload");
    } finally {
      const {
        error,
        errorMsg,
        data: ldata,
      } = await api.getSubjectMasterCSVFilesData();
      if (error) return;
      subjectMaster = [...ldata];
      // console.log("resultData is: ", subjectMaster);
    }
  };
  const uploadDivisionMaster = async () => {
    try {
      if (selectedFile) {
        const { error, errorMsg, path } = await api.uploadDivisionMaster({
          fileName: selectedFile,
        });
        if (error) {
          console.log(
            "failed to uploaded result file: ",
            selectedFile,
            "error is : ",
            errorMsg
          );
          selectedFile = null;
          return;
        }
        // console.log("uploding file :", selectedFile);
        selectedFile = null;
      } else {
        console.error("no file selected");
      }
    } catch (error) {
      // console.log("exception in processing handleUpload");
    } finally {
      const {
        error,
        errorMsg,
        data: diviData,
      } = await api.getDivisionMasterCSVFilesData();
      if (error) return;
      divisionMaster = [...diviData];
      // console.log("divisionData is: ", divisionMaster);
    }
  };

  let responseData = null;
  let error = null;
  let removing = false;
  const handleDelete = async (fileName) => {
    // console.log("handle delete called", fileName);
    try {
      removing = true;
      // console.log("handle delete called");
      // const filename = 'your-file-name';
      // const response = await deleteFile(filename);
      const response = await api.deleteCSVFiles({ fileName });

      if (response.success) {
        console.log("File deleted successfully");
      } else {
        console.error("Failed to delete file:", response.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      const { error, errorMsg, data } = await api.getResultCSVFilesData();
      if (error) return; // handle error
      resultData = [...data];
      removing = false;
    }
  };

  const handleSubjectMasterDelete = async (fileName) => {
    // console.log("handlesubjectMAster delete called", fileName);
    try {
      // console.log("handle subjectMaster delete called");
      // const filename = 'your-file-name';
      // const response = await deleteFile(filename);
      const response = await api.deleteSubjectMasterCSVFiles({ fileName });

      if (response.success) {
        console.log("File deleted successfully");
      } else {
        console.error("Failed to delete file:", response.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      const {
        error,
        errorMsg,
        data: ldata,
      } = await api.getSubjectMasterCSVFilesData();
      if (error) return; // handle error
      subjectMaster = [...ldata];
    }
  };
  const handleDivisionMasterDelete = async (fileName) => {
    // console.log("handle divison Master delete called", fileName);
    try {
      // console.log("handle divsionMaster delete called");
      // const filename = 'your-file-name';
      // const response = await deleteFile(filename);
      const response = await api.deleteDivisionMasterCSVFiles({ fileName });

      if (response.success) {
        console.log("File deleted successfully");
      } else {
        console.error("Failed to delete file:", response.error);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      const {
        error,
        errorMsg,
        data: diviData,
      } = await api.getDivisionMasterCSVFilesData();
      if (error) return; // handle error
      divisionMaster = [...diviData];
    }
  };
  const onFileChange = (e) => {
    selectedFile = e.target.files[0];
    // console.log("selected file: ", selectedFile);
  };
  const customSize =
    "w-14 h-10 after:top-1 after:left-[4px]  after:h-8 after:w-8";
</script>

{#if dataLoaded}
  <!-- {JSON.stringify(alertMessage)} -->
  <!-- publish is{JSON.stringify(publish)} -->
  <!-- {JSON.stringify(divisionMaster)} -->
  <!-- <button on:click={fetchData}>getdata</button> -->
  <div class="flex bg-primary-200 m-2 p-2 rounded-lg justify-between">
    <div
      class="text-3xl font-semibold flex justify-center text-gray-700 p-2 item-center"
    >
      HSC Result Admin Panel : {publish == "true"
        ? "The result is published"
        : "The result is not published"}
    </div>
    <div class="mt-2">
      <Button on:click={() => (popupModal2 = true)}
        >Clear DB
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clip-rule="evenodd"
          />
        </svg>
      </Button>
    </div>
  </div>

  <div class="flex justify-end p-2 mx-10 rounded-lg">
    <div class="flex gap-2">
      <!-- <Toggle size="custom" {customSize}>Publish</Toggle> -->
      {#if publish == "false"}
        <Button
          on:click={() => {
            getPublish();
            popupModalPublish = true;
          }}
          color="primary"
          >Publish
        </Button>
      {:else}
        <Button
          on:click={() => {
            getPublish();
            popupModalUnPublish = true;
          }}
          color="primary"
          >UnPublish
        </Button>
      {/if}

      <Button
        on:click={() => {
          refreshStats();
        }}
        >Refresh Stats
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 ml-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
            clip-rule="evenodd"
          />
        </svg>
      </Button>
      <Button
        on:click={() => {
          saveData();
        }}>Save</Button
      >

      <!-- <button on:click={publish} class="bg-primary-700 p-2 px-8 rounded-lg text-white"
    >Publish
    </button
  > -->
      <!-- <button
      on:click={clearDb}
      class=" flex bg-primary-700 p-2 px-8 rounded-lg text-white"
    >
      Clear DB
      <span class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button> -->
    </div>
  </div>
  <div class="m-8">
    {#if alertMessage}
      <div
        class="p-4 mb-4 text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-bold text-3xl">Alert!</span>
        {alertMessage}
      </div>
    {/if}
  </div>

  <!-- delete model -->
  <Modal bind:open={popupModal2} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
      />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to Clear this DB?
      </h3>
      <Button on:click={clearDb} color="red" class="me-2">Yes, I'm sure</Button>
      <Button color="alternative">No, cancel</Button>
    </div>
  </Modal>

  <!-- publish model -->
  <Modal bind:open={popupModalPublish} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
      />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to Publish this ?
      </h3>
      {#if publish == "false"}
        <Button color="primary" class="me-2" on:click={() => onPublish()}
          >Yes, I'm sure</Button
        >
      {:else}
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          It Is Already Published
        </h3>
      {/if}
      <Button color="alternative">No, cancel</Button>
    </div>
  </Modal>

  <!-- un-publish model -->
  <Modal bind:open={popupModalUnPublish} size="xs" autoclose>
    <div class="text-center">
      <ExclamationCircleOutline
        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
      />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to un-Publish the result ?
      </h3>
      {#if publish == "true"}
        <Button color="primary" class="me-2" on:click={() => onUnPublish()}
          >Yes, I'm sure</Button
        >
      {:else}
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          It Is Already un-Published
        </h3>
      {/if}
      <Button color="alternative">No, cancel</Button>
    </div>
  </Modal>

  <div class="bg-gray-200 p-2 rounded-md m-8">
    <div class="bg-gray-100 grid grid-cols-1">
      <div class=" col-span-1 bg-gray-100 p-4 rounded-md">
        <span class="text-xl font-semibold flex ml-2 uppercase">
          State Data
        </span>

        <div class="grid grid-cols-7 gap-2">
          <div class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md">
            Total
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.records}<span /></span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            Pass
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.PAS}</span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            RES
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.RES}</span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            DEB
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.DEB}</span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            GRD
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.GRD}</span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            ISO
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.ISO}</span>
            </div>
          </div>
          <div
            class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
          >
            FFF
            <div class="flex">
              <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
              <span class="ml-2 font-bold">{dbStats.FFF}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-200 p-2 m-8">
    <div class="bg-gray-100 grid grid-cols-1">
      <div class=" col-span-1 bg-gray-100 p-4 rounded-md">
        <span class="text-xl font-semibold flex ml-2 uppercase">
          Division Data
        </span>

        <div class="grid grid-cols-8 font-bold text-center gap-2">
          <div class="p-2 rounded-md" />
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            Total
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            Pass
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            RES
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            DEB
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            GRD
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            ISO
          </div>
          <div
            class="bg-gray-200 flex justify-center items-center p-2 rounded-md text-sm"
          >
            FFF
          </div>
        </div>
        {#each divisionCodes as division}
          <div class="grid grid-cols-8 text-center font-bold gap-2 mt-2">
            <div
              class="bg-gray-200 p-2 font-bold text-center rounded-md text-sm"
            >
              {division.name}
            </div>

            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].records}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].PAS}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].RES}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].DEB}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].GRD}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].ISO}
            </div>
            <div class="bg-white p-2 rounded-md text-sm">
              {dbStats.divisions[division.div].FFF}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 mx-8 mt-8 rounded-lg">
    <div class=" bg-gray-200 p-8 rounded-md">
      <div class=" gap-2">
        <div class="text-2xl font-bold flex justify-center items-center">
          Upload Result CSV
        </div>

        <Label class="pb-2" for="small_size">Upload CSV Result</Label>
        <!-- <Fileupload id="small_size" size="sm" bind:value={selectedFile} on:change={()=> fileUploading = false}/> -->
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          on:change={onFileChange}
        />

        <div class="ml-2 text-blue-700 flex gap-2 mt-2">
          <!-- HSC_Result_Data -->
          <!-- <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </span> -->
        </div>
        {#if fileUploading == false}
          <button
            on:click={handleUpload}
            class="p-2 px-6 font-bold bg-primary-400 hover:bg-primary-600 rounded-md mt-2 text-white"
            >Upload</button
          >
        {:else}
          <!-- Uploading.... -->
          <div class="">
            <span class="font-semibold"> Uploading...</span>
            <Spinner size={8} />
          </div>
        {/if}
        {#if iMessage}
          <div class="mt-2">
            <Alert color="green">
              <span class="font-medium text-2xl">
                {insertMessage}
              </span>
            </Alert>
          </div>
        {/if}
        <div class="mt-4">
          <table
            class="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3"> File Name </th>
                <th scope="col" class="px-6 py-3"> Total </th>
                <th scope="col" class="px-6 py-3"> Pass </th>
                <th scope="col" class="px-6 py-3"> RES </th>
                <th scope="col" class="px-6 py-3"> DEB </th>
                <th scope="col" class="px-6 py-3"> GRD </th>
                <th scope="col" class="px-6 py-3"> ISO </th>
                <th scope="col" class="px-6 py-3"> FFF </th>
                <th scope="col" class="px-6 py-3"> Status </th>
                <th scope="col" class="px-6 py-3"> </th>
                <th scope="col" class="px-6 py-3"> </th>
              </tr>
            </thead>
            <tbody>
              {#each resultData as data}
                <tr
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.fileName},Md5: {data.md5checksum}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.TOTAL}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.PAS}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.RES}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.DEB}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.GRD}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.ISO}
                  </th>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.FFF}
                  </th>
                  <td class="px-6 py-4">
                    {insertedResultCSVFiles.find((e) => e == data.fileName)
                      ? "Inserted to db"
                      : "not inserted"}
                  </td>

                  <td class="px-6 py-4">
                    <button
                      on:click={handleInsert(data.fileName)}
                      class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                      >Insert To DB</button
                    >
                  </td>
                  <td class="px-6 py-4">
                    <button
                      on:click={() => {
                        handleDelete(data.fileName);
                      }}
                      class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class=" bg-gray-200 p-8 rounded-md">
      <div class="">
        <div class="text-2xl font-bold flex justify-center items-center">
          Upload Subject Master CSV
        </div>
        <Label class="pb-2" for="small_size">Upload Subject Master</Label>
        <!-- <Fileupload
          id="small_size"
          size="sm"
          bind:value={selectedFile}
          on:change={() => (fileUploading = false)}
        /> -->
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          on:change={onFileChange}
        />

        <div class="ml-2 text-blue-700 flex gap-2 mt-2">
          <!-- HSC_Result_Data
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </span> -->
        </div>
        <button
          on:click={uploadSubjectMaster}
          class="p-2 font-bold px-6 bg-primary-400 hover:bg-primary-600 rounded-md mt-2 text-white"
          >Upload</button
        >
      </div>
      <div class="mt-4">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3"> File Name </th>
              <th scope="col" class="px-6 py-3"> Total </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> status </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {#each subjectMaster as subdata}
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {subdata.fileName}, md5:{subdata.md5checksum}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {subdata.TOTAL}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <td class="px-6 py-4">
                  {insertedSubjectMasterCSVFiles.find(
                    (e) => e == subdata.fileName
                  )
                    ? "Inserted to db"
                    : "not inserted"}
                </td>
                <td class="px-6 py-4">
                  <button
                    on:click={handleInsertSubjectMaster(subdata.fileName)}
                    class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                    >Insert To DB</button
                  >
                </td>

                <td class="px-6 py-4">
                  <button
                    on:click={handleSubjectMasterDelete(subdata.fileName)}
                    class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
        {#if subjMessage}
          <div class="mt-2">
            <Alert color="green">
              <span class="font-medium"> </span>
              {subjectMasterMessage}
              <div></div>
            </Alert>
          </div>
        {/if}
      </div>
    </div>
    <div class=" bg-gray-200 p-8 rounded-md">
      <div class="">
        <div class="text-2xl font-bold flex justify-center items-center">
          Upload Division Master CSV
        </div>
        <Label class="pb-2" for="small_size">Upload Division Master</Label>
        <!-- <Fileupload
          id="small_size"
          size="sm"
          bind:value={selectedFile}
          on:change={() => (fileUploading = false)}
        /> -->
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          on:change={onFileChange}
        />

        <div class="ml-2 text-blue-700 flex gap-2 mt-2">
          <!-- HSC_Result_Data -->
          <!-- <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </span> -->
        </div>
        <button
          on:click={uploadDivisionMaster}
          class="p-2 font-bold px-6 bg-primary-400 hover:bg-primary-600 rounded-md mt-2 text-white"
          >Upload</button
        >
      </div>
      <div class="mt-4">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3"> File Name </th>
              <th scope="col" class="px-6 py-3"> Total </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> Status </th>
              <th scope="col" class="px-6 py-3"> </th>
              <th scope="col" class="px-6 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {#each divisionMaster as divData}
              <tr
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {divData.fileName}, md5: {divData.md5checksum}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {divData.TOTAL}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>

                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                </th>
                <td class="px-6 py-4">
                  {insertedDivisionMasterCSVFiles.find(
                    (e) => e == divData.fileName
                  )
                    ? "Inserted to db"
                    : "not inserted"}
                </td>

                <td class="px-6 py-4">
                  <button
                    on:click={handleInsertDivisionMaster(divData.fileName)}
                    class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                    >Insert To DB</button
                  >
                </td>
                <td class="px-6 py-4">
                  <button
                    on:click={handleDivisionMasterDelete(divData.fileName)}
                    class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td></tr
              >
            {/each}
          </tbody>
        </table>
        {#if divisionMessage}
          <div class="mt-2">
            <Alert color="green">
              <span class="font-medium"></span>
              {divisionMasterMessage}
            </Alert>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <!-- loading .... -->
  <div class="  flex justify-center p-6 mt-96">
    <Spinner size={20} />
    <div class="ml-2 flex item-center justify-center mt-6 text-xl">
      Loading Data Please Wait .....
    </div>
  </div>
{/if}
