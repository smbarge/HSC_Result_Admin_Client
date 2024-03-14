<script>
  import { FloatingLabelInput, Helper } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  let sendotp = false;
</script>

<div class="bg-gray-50 dark:bg-gray-900">
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl border-b-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          HSC Result Admin
        </h1>
        <div>
          <div
            id="exampleWrapper"
            class="grid gap-6 items-end w-full md:grid-cols-1"
          >
            <FloatingLabelInput
              style="outlined"
              id="floating_outlined"
              name="floating_outlined"
              type="text"
            >
              Mobile Number
            </FloatingLabelInput>
          </div>

          <div>
            <button
            on:click={()=>{
              sendotp=true;
            }}
            class="px-2 py-2 mt-2 rounded-lg text-white bg-primary-400"
              >Send OTP</button
            >
          </div>
        </div>
        {#if sendotp}
          <div
            id="exampleWrapper"
            class="grid gap-6 items-end w-full md:grid-cols-1"
          >
            <FloatingLabelInput
              style="outlined"
              id="floating_outlined1"
              name="floating_outlined"
              type="text"
            >
              Enter OTP
            </FloatingLabelInput>
          </div>
        {/if}

        <div class="flex justify-center items-center">
          <button
            on:click={() => {
              goto("/admin");
            }}
            class="bg-primary-400 p-2 flex justify-center items-center text-white rounded-md px-8"
            >Sign in</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
