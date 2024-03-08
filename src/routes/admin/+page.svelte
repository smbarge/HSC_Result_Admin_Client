<script>
  import { Toggle, Fileupload, Label } from "flowbite-svelte";
</script>

<div class="flex justify-center items-center bg-gray-200 m-2 rounded-lg">
  <div class="text-2xl mt-4 border-b-2 font-semibold">
    HSC Result <span class="text-4xl text-primary-600 font-bold">Admin</span>Panel
  </div>
</div>

<div class="flex justify-end p-2 mx-10 rounded-lg">
  <div class="flex">
    <Toggle size="large">Publish</Toggle>
  </div>
</div>

<div class="bg-gray-200 p-2 rounded-md m-8">
  <div class="bg-gray-100 grid grid-cols-1">
    <div class=" col-span-1 bg-gray-100 p-4 rounded-md">
      <span class="text-xl font-semibold flex ml-2"> State </span>
      <div class="grid grid-cols-7 gap-2">
        <div class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md">
          Total
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100<span /></span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          Pass

          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          RES
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          DEB
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          GRD
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          ISO
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
        <div
          class="col-span-5 md:col-span-1 bg-gray-200 p-2 rounded-md text-sm"
        >
          FFF
          <div class="flex">
            <!-- <Fa icon={faRupeeSign} class="text-xs md:text-lg leading-lg  opacity-75" /> -->
            <span class="ml-2 font-bold">100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="bg-gray-200 p-2 m-8">
  <div class="bg-gray-100 grid grid-cols-1">
    <div class=" col-span-1 bg-gray-100 p-4 rounded-md">
      <span class="text-xl font-semibold flex ml-2"> Division </span>

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
      <div class="grid grid-cols-8 text-center font-bold gap-2 mt-2">
        <div class="bg-gray-200 p-2 font-bold text-center rounded-md text-sm">
          Pune
        </div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
        <div class="bg-white p-2 rounded-md text-sm">1000</div>
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-2 gap-4 mx-8 mt-8 rounded-lg">
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class=" gap-2">
      <Label class="pb-2" for="small_size">Upload CSV Result</Label>
      <Fileupload id="small_size" size="sm" />
      <button
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
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3"> File Name </th>
          <th scope="col" class="px-6 py-3"> Status </th>
          <th scope="col" class="px-6 py-3"> View </th>
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
          <td class="px-6 py-4">-</td>
          

          <td class="px-6 py-4">    
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
          </td>
        </tr>
        <tr
          class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
           subjectMaster.csv
          </th>
          <td class="px-6 py-4"> - </td>
          <td class="px-6 py-4">
            <a
              href="/"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
