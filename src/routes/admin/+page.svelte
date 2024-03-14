<script>
  import { Toggle, Fileupload, Label } from "flowbite-svelte";
  import { api } from "../../api/api";
  import { onMount } from "svelte";
  import { Spinner } from "flowbite-svelte";

  let resultData = [
    // {
    //   fileName: "Result_Data_2024.csv",
    //   TOTAL: "600",
    //   PAS: "120",
    //   RES: "140",
    //   DEB: "140",
    //   GRD: "120",
    //   ISO: "120",
    //   FFF: "10",
    // },
    // {
    //   fileName: "Result_Data__Pune_2024.csv",
    //   TOTAL: "600",
    //   PAS: "120",
    //   RES: "140",
    //   DEB: "140",
    //   GRD: "120",
    //   ISO: "120",
    //   FFF: "10",
    // },
  ];

  let dbStats = {};
  let dataLoaded = false;
  onMount(async () => {
    dataLoaded = false;
    const { error, errorMsg, stats: _stats } = await api.getDbStats();
    const {
      error: lerror,
      errorMsg: lerrorMsg,
      data,
    } = await api.getResultCSVFilesData();
    console.log("csv files data is: ", data)
    resultData = [...data]
    dbStats = { ..._stats };

    dataLoaded = true;
    console.log("dbStats : ", dbStats);
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
  const handleFileChange = (e) => {
    selectedFile = e.target.files[0];
    console.log("selected file :", selectedFile);
  };

  const handleUpload = async () => {
    if (selectedFile) {
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
      console.log("uploding file :", selectedFile);
      selectedFile = null;
    } else {
      console.error("no file selected");
    }
  };
  const uploadSubjectMaster = async () => {
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
      console.log("uploding file :", selectedFile);
      selectedFile = null;
    } else {
      console.error("no file selected");
    }
  };
  const uploadDivisionMaster = async () => {
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
      console.log("uploding file :", selectedFile);
      selectedFile = null;
    } else {
      console.error("no file selected");
    }
  };

  let responseData = null;
  let error = null;

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:3000/csv/result/stats/hscdata.csv"
      );
      if (response.ok) {
        responseData = await response.json();
        console.log("responseData is", responseData);
        error = null;
      } else {
        error = `Error: ${response.status} - ${response.statusText}`;
        responseData = null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      error = "Error fetching data. Please try again later.";
      responseData = null;
    }
  }
</script>

<!-- <button on:click={fetchData}>getdata</button> -->
<div class="flex bg-gray-200 m-2 rounded-lg">
  <div
    class="text-3xl mt-4 border-b-2 font-semibold flex justify-center item-center"
  >
    HSC Result Admin Panel
  </div>
</div>

<div class="flex justify-end p-2 mx-10 rounded-lg">
  <div class="flex">
    <Toggle size="large">Publish</Toggle>
  </div>
</div>
{#if dataLoaded}
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
{:else}
  <!-- loading .... -->
  <div class="text-center">
    <Spinner size={12} />
  </div>
{/if}

<div class="grid grid-cols-1 gap-4 mx-8 mt-8 rounded-lg">
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class=" gap-2">
      <div class="text-2xl font-bold flex justify-center items-center">
        Upload Result CSV
      </div>
      <Label class="pb-2" for="small_size">Upload CSV Result</Label>
      <Fileupload id="small_size" size="sm" on:change={handleFileChange} />
      <div class="ml-2 text-blue-700 flex gap-2 mt-2">
        HSC_Result_Data
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
        </span>
      </div>
      <button
        on:click={handleUpload}
        class="p-2 px-6 font-bold bg-primary-400 hover:bg-primary-600 rounded-md mt-2 text-white"
        >Upload</button
      >

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
                  {data.fileName}
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
                <td class="px-6 py-4">Pending</td>

                <td class="px-6 py-4">
                  <button
                    class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                    >Insert To DB</button
                  >
                </td>
                <td class="px-6 py-4">
                  <button
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
      <Fileupload id="small_size" size="sm" on:change={handleFileChange} />
      <div class="ml-2 text-blue-700 flex gap-2 mt-2">
        HSC_Result_Data
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
        </span>
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
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              HSCData.CSV
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>

            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>

            <td class="px-6 py-4">Pending</td>
            <td class="px-6 py-4">
              <button
                class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                >Insert To DB</button
              >
            </td>

            <td class="px-6 py-4">
              <button
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
        </tbody>
      </table>
    </div>
  </div>
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class="">
      <div class="text-2xl font-bold flex justify-center items-center">
        Upload Division Master CSV
      </div>
      <Label class="pb-2" for="small_size">Upload Division Master</Label>
      <Fileupload id="small_size" size="sm" on:change={handleFileChange} />
      <div class="ml-2 text-blue-700 flex gap-2 mt-2">
        HSC_Result_Data
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
        </span>
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
          <tr
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              HSCData.CSV
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>

            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              100
            </th>
            <td class="px-6 py-4">Pending</td>

            <td class="px-6 py-4">
              <button
                class="bg-primary-400 hover:bg-primary-600 p-2 rounded-lg text-white"
                >Insert To DB</button
              >
            </td>
            <td class="px-6 py-4">
              <button
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
        </tbody>
      </table>
    </div>
  </div>
</div>
<!-- <div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-4">
    <div
      class="flex m-4 font-bold bg-gray-200 p-2 rounded-md uppercase text-gray-700"
    >
      Uploaded Result CSV File
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
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
          <th scope="col" class="px-6 py-3"> Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            HSCData.CSV
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>

          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            100
          </th>
          <td class="px-6 py-4">-</td>

          <!-- <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
          </td> -->
<!-- <td class="px-6 py-4">
            <button class="bg-primary-400 p-2 rounded-lg text-white"
              >Insert To DB</button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div> -->
-->
