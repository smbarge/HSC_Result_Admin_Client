<script>
  import { Toggle, Fileupload, Label } from "flowbite-svelte";
  import { api } from "../../api/api";
  import { onMount } from "svelte";
  let dbStats = {};
  let dataLoaded = false;
  onMount(async () => {
    dataLoaded = false;
    const { error, errorMsg, stats: _stats } = await api.getDbStats();
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
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const res = await fetch("http://localhost:3000/csv/result/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          console.log("file upload successfully");
        } else {
          console.error("file upload failed ", res.statusText);
        }
      } catch (error) {
        console.log("error during upload ", error.message);
      }

      console.log("upolding fiel :", selectedFile);
      selectedFile = null;
    } else {
      console.error("no file selected");
    }
  };
</script>

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
  loading ....
{/if}

<div class="grid grid-cols-2 gap-4 mx-8 mt-8 rounded-lg">
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class=" gap-2">
      <Label class="pb-2" for="small_size">Upload CSV Result</Label>
      <Fileupload id="small_size" size="sm" on:change={handleFileChange} />
      <button
        on:click={handleUpload}
        class="p-2 px-6 font-bold bg-primary-400 rounded-md mt-2 text-white"
        >Upload</button
      >
    </div>
  </div>
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class="">
      <Label class="pb-2" for="small_size">Upload Subject Master</Label>
      <Fileupload id="small_size" size="sm" />
      <button
        class="p-2 font-bold px-6 bg-primary-400 rounded-md mt-2 text-white"
        >Upload</button
      >
    </div>
  </div>
</div>
<div>
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
          <td class="px-6 py-4">
            <button class="bg-primary-400 p-2 rounded-lg text-white"
              >Insert To Db</button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-4">
  <div
    class="flex m-4 font-bold bg-gray-200 p-2 rounded-md uppercase text-gray-700"
  >
    Uploaded subject Master CSV File
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
        <td class="px-6 py-4">
          <button class="bg-primary-400 p-2 rounded-lg text-white"
            >Insert To Db</button
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-4">
  <div
    class="flex m-4 font-bold bg-gray-200 p-2 rounded-md uppercase text-gray-700"
  >
    Uploaded Division Master CSV File
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
        <td class="px-6 py-4">
          <button class="bg-primary-400 p-2 rounded-lg text-white"
            >Insert To Db</button
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
