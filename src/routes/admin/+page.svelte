<script>
  import { Toggle, Fileupload, Label } from "flowbite-svelte";
</script>

<div class="flex justify-center items-center">
  <h1 class="text-2xl mt-4 border-b-2">
    HSC RESULT <span class="text-4xl text-blue-600 font-bold">Admin</span> Panel
  </h1>
</div>
<div class="flex justify-end p-2 mx-10 rounded-lg">
  <div class="flex">
    <Toggle size="large" checked>Publish</Toggle>
  </div>
</div>
<div class="grid grid-cols-2 gap-4 mx-8 mt-8 rounded-lg">
  <div class=" bg-gray-200 p-8 rounded-md">
    <div class="  gap-2">
      <Label class="pb-2" for="small_size">Upload CSV Result</Label>
      <Fileupload id="small_size" size="sm" />
      <button class="p-2 px-6 bg-primary-400 rounded-md mt-2 text-white"
        >Insert</button
      >
    </div>

    <div class="mt-8">
      <Label class="pb-2" for="small_size">Upload Subject Master</Label>
      <Fileupload id="small_size" size="sm" />
      <button class="p-2 px-6 bg-primary-400 rounded-md mt-2 text-white"
        >Insert</button
      >
    </div>
  </div>
  <div class=" rounded-lg">
    <div class="relative">
      <div class="absolute border">Stats
<div>Total</div>
      </div>
    </div>
  </div>
</div>
